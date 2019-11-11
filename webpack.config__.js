const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDirectory = "dist";
const PAGE_DIR = path.join("src", "pages", path.sep);


const getFilesFromDir = (dir, fileTypes) => {
    const filesToReturn = [];
    const walkDir = (currentPath) => {
      const files = fs.readdirSync(currentPath);
      for (let i in files) {
        const curFile = path.join(currentPath, files[i]);      
        if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) !== -1) {
          filesToReturn.push(curFile);
        } else if (fs.statSync(curFile).isDirectory()) {
          walkDir(curFile);
        }
      }
    };
    walkDir(dir);
    return filesToReturn; 
}

const htmlPlugins = htmlName =>{   
  let arr = getFilesFromDir(PAGE_DIR, [".html"]).filter( filePath => {
    const baseName = path.basename(filePath).replace(path.extname(filePath), "");
    return baseName === htmlName;
  });
  if(htmlName===undefined || htmlName==='') arr = getFilesFromDir(PAGE_DIR, [".html"]);
  const result = arr.map( filePath => {
    const fileName = filePath.replace(PAGE_DIR, "");  
    return new HtmlWebPackPlugin({
      chunks:[path.basename(fileName).replace(path.extname(fileName), ""), "vendor"],
      template: filePath,
      filename: fileName
    })
  });
  return result;
}


const entry = jsName => {  
  const result = getFilesFromDir(PAGE_DIR, [".js"]).reduce( (obj, filePath) => {
    const entryChunkName = path.basename(filePath).replace(path.extname(filePath), "").replace(PAGE_DIR, "");
    obj[entryChunkName] = ['@babel/polyfill', `./${filePath}`];
    return obj;
  }, {})    

  if(jsName===undefined || jsName==='') return result;
  const prop = jsName;
  const filter = Object.keys(result).reduce((object, key) => {
    if (key === prop) object[key] = result[key];
    return object;
  }, {});
  return filter;
}; 



const configModule = isDevMode => ({
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    },
    {
      test: /\.html/,
      use:'html-loader',
      
    },
    {
      test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader:'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath:'images/'
          }
        }
      ]

    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader, 
          options: {
            hmr: isDevMode
          },
        },
        'css-loader',
        'sass-loader',
      ],
    }
  ]
});



const configOptimization = {  
  /* 
  splitChunks: {  
    chunks: 'all',      
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        // cacheGroupKey here is `commons` as the key of the cacheGroup
        name(module, chunks, cacheGroupKey) {
          const moduleFileName = module.identifier().split('/').reduceRight(item => item);
          const allChunksNames = chunks.map((item) => item.name).join('~');
          return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
        },
        chunks: 'all'
      }
    }
  },
  */

  splitChunks: {
    chunks: 'all',
    name:false,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        chunks: "initial",
        name: "vendor",
        enforce: true
      }
    }
  },

};


const configPlugins = htmlName =>{
  
  return [
    new CopyWebpackPlugin([
      {from:'./src/data',to:'data'},
      {from:'./src/images',to:'images'},
    ]),
    new CleanWebpackPlugin({}),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    ...htmlPlugins(htmlName)  
  ];
}



module.exports = (env, argv) => {  
  
  return ({
    mode: 'development',
    entry: entry(argv.page),
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: "[name].bundle.js",
      //chunkFilename: '[id].js' 
      //publicPath: "/"
    },
    devtool:'inline-source-map',
    devServer:{
      contentBase: path.join(__dirname, outputDirectory),
      historyApiFallback: {index:'/'},
    },
  
    module: configModule(argv.mode !== 'production'),
    optimization: configOptimization,
    plugins: configPlugins(argv.page)
  })

};