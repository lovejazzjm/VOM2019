const apiPath = {}

if(process.env.NODE_ENV==='development'){ 

    apiPath.LOGIN = '../data/login.json'
    apiPath.LOGOUT = '../data/logout.json'
    apiPath.SIDENAVI = '../data/sideNavi.json'
    apiPath.TOPNAVI = '../data/topNavi.json'
    apiPath.MEMBERINFO = '../data/memberInfo.json'

}else{    
    apiPath.LOGIN = '../data/login.json'
    apiPath.LOGOUT = '../data/logout.json'
    apiPath.SIDENAVI = '../data/sideNavi.json'
    apiPath.TOPNAVI = '../data/topNavi.json'
    apiPath.MEMBERINFO = '../data/memberInfo.json'
    
}


export default apiPath

   

