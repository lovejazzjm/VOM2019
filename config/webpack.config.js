const fs = require("fs");
const isWsl = require("is-wsl");
const path = require("path");
const webpack = require("webpack");
const resolve = require("resolve");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const ManifestPlugin = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const paths = require("./paths");
const modules = require("./modules");
const getClientEnvironment = require("./env");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");

const SpritesmithPlugin = require("webpack-spritesmith");

//const eslint = require('eslint');

const postcssNormalize = require("postcss-normalize");
const appPackageJson = require(paths.appPackageJson);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false";

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
);

const useTypeScript = fs.existsSync(paths.appTsConfig);
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const relativePublicPath = path.join("public", path.sep);
const relativePagesPath = path.join("src", "pages", path.sep);

const getPageValue = argv => {
  const re = /--([\w]+)(?==)=([\w]+)/;
  const result = argv.reduce((acc, value) => {
    const rArr = re.exec(value);
    if (rArr && rArr[1] && rArr[2]) {
      acc[rArr[1]] = rArr[2];
    }
    return acc;
  }, {});
  return result;
};

const pageValue = getPageValue(process.argv);

const getFilesFromDir = (dir, fileTypes, isLoop = true) => {
  const filesToReturn = [];
  const walkDir = currentPath => {
    const files = fs.readdirSync(currentPath);
    for (let i in files) {
      const curFile = path.join(currentPath, files[i]);
      if (
        fs.statSync(curFile).isFile() &&
        fileTypes.indexOf(path.extname(curFile)) !== -1
      ) {
        filesToReturn.push(curFile);
      } else if (fs.statSync(curFile).isDirectory()) {
        if (isLoop) walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
};

const getFolderFromDir = dir => {
  const folderToReturn = [];
  const walkDir = currentPath => {
    const files = fs.readdirSync(currentPath);
    for (let i in files) {
      const curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isDirectory()) {
        folderToReturn.push(curFile);
      }
    }
  };
  walkDir(dir);
  return folderToReturn;
};

const spritesmiths = () => {
  const arr = getFolderFromDir(relativePublicPath + "images/icon");
  const result = arr.map(filePath => {
    const folderName = filePath.replace(
      relativePublicPath + "images/icon/",
      ""
    );
    return new SpritesmithPlugin({
      src: {
        cwd: relativePublicPath + "images/icon/" + folderName,
        glob: "*.{jpg,png,gif,jpeg}"
      },
      target: {
        image: relativePublicPath + "images/" + folderName + "_sprite.png",
        css: paths.appSrc + "/scss/util/_" + folderName + "_sprite.scss"
      },
      apiOptions: {
        cssImageRef: "/images/" + folderName + "_sprite.png"
      },
      retina: "@2x"
    });
  });

  return result;
};

const htmlPlugins = (htmlName, isEnvProduction) => {
  const arr = getFilesFromDir(relativePublicPath, [".html"]);
  if (htmlName && htmlName !== undefined && htmlName !== "") {
    arr.filter(filePath => {
      const baseName = path
        .basename(filePath)
        .replace(path.extname(filePath), "");
      return baseName === htmlName;
    });
  }

  const result = arr.map(filePath => {
    const fileName = filePath.replace(relativePublicPath, "");
    return new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          chunks: [
            path.basename(fileName).replace(path.extname(fileName), ""),
            "vendor"
          ],
          template: filePath,
          filename: fileName
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeRedundantAttributes: false,
                useShortDoctype: false,
                removeEmptyAttributes: false,
                removeStyleLinkTypeAttributes: false,
                keepClosingSlash: false,
                minifyJS: false,
                minifyCSS: false,
                minifyURLs: false
              }
            }
          : undefined
      )
    );
  });
  return result;
};

const entry = (jsName, isEnvDevelopment) => {
  const result = getFilesFromDir(relativePagesPath, [".js"], false).reduce(
    (obj, filePath) => {
      const entryName = path
        .basename(filePath)
        .replace(path.extname(filePath), "")
        .replace(relativePagesPath, "");
      obj[entryName] = [
        isEnvDevelopment &&
          require.resolve("react-dev-utils/webpackHotDevClient"),
        `./${filePath}`
      ].filter(Boolean);
      return obj;
    },
    {}
  );

  if (!jsName || jsName === undefined || jsName === "") return result;
  const prop = jsName;
  const filterResult = Object.keys(result).reduce((object, key) => {
    if (key === prop) object[key] = result[key];
    return object;
  }, {});

  return filterResult;
};

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes("--profile");
  const isPage = pageValue.hasOwnProperty("page") && pageValue.page;

  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && "/";
  const shouldUseRelativeAssetPaths = publicPath === "./";
  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && "/";

  const env = getClientEnvironment(publicUrl);

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: "../../" } : {}
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009"
              },
              stage: 3
            }),
            postcssNormalize()
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap
        }
      }
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap
          }
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true
          }
        }
      );
    }
    return loaders;
  };

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    entry: entry(isPage, isEnvDevelopment),
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/[name].bundle.js",
      futureEmitAssets: true,
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      publicPath: publicPath,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, "/")
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: "this"
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: { safari10: true },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: { ecma: 5, comments: false, ascii_only: true }
          },
          parallel: !isWsl,
          cache: true,
          sourceMap: shouldUseSourceMap
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? { inline: false, annotation: true }
              : false
          }
        })
      ],
      splitChunks: {
        chunks: "all",
        name: false
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes("ts")),
      alias: {
        "react-native": "react-native-web",
        ...(isEnvProductionProfile && {
          "react-dom$": "react-dom/profiling",
          "scheduler/tracing": "scheduler/tracing-profiling"
        }),
        ...(modules.webpackAliases || {})
      },
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
      ]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("react-dev-utils/eslintFormatter"),
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: __dirname
              },
              loader: require.resolve("eslint-loader")
            }
          ],
          include: paths.appSrc
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: imageInlineSizeLimit,
                name: "static/media/[name].[hash:8].[ext]"
              }
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve("babel-loader"),
              options: {
                customize: require.resolve(
                  "babel-preset-react-app/webpack-overrides"
                ),

                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            "@svgr/webpack?-svgo,+titleProp,+ref![path]"
                        }
                      }
                    }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction
              }
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve("babel-preset-react-app/dependencies"),
                    { helpers: true }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: false
              }
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap
              }),
              sideEffects: true
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              })
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap
                },
                "sass-loader"
              ),
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent
                },
                "sass-loader"
              )
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...htmlPlugins(isPage, isEnvProduction),
      ...spritesmiths(),

      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin(env.stringified),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
        }),

      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: publicPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          /*
          console.log('=======');
          console.log(entrypoints);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );
          */

          return {
            files: manifestFiles
            //entrypoints: entrypointFiles,
          };
        }
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: "cdn",
          navigateFallback: publicUrl + "/index.html",
          navigateFallbackBlacklist: [
            new RegExp("^/_"),
            new RegExp("/[^/?]+\\.[^/]+$")
          ]
        }),

      // TypeScript type checking
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync("typescript", {
            basedir: paths.appNodeModules
          }),
          async: isEnvDevelopment,
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          resolveModuleNameModule: process.versions.pnp
            ? `${__dirname}/pnpTs.js`
            : undefined,
          resolveTypeReferenceDirectiveModule: process.versions.pnp
            ? `${__dirname}/pnpTs.js`
            : undefined,
          tsconfig: paths.appTsConfig,
          reportFiles: [
            "**",
            "!**/__tests__/**",
            "!**/?(*.)(spec|test).*",
            "!**/src/setupProxy.*",
            "!**/src/setupTests.*"
          ],
          silent: true,
          formatter: isEnvProduction ? typescriptFormatter : undefined
        })
    ].filter(Boolean),

    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },

    performance: false
  };
};
