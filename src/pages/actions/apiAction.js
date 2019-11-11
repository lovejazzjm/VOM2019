import store, {createReducerWithActionName} from '../modules/store'
import api from '../modules/apiPath'


const apiAction = ({      
    actionName = "",
    url = "",    
    method = "GET",        
    data = null, // ["GET", "DELETE"].includes(method) ? "params" : "data"
    accessToken = null,       
    headers = null,
    label = ""
}) => {

    if(actionName==='') return null
    store.injectReducer(
        actionName, 
        createReducerWithActionName(actionName)
    )
    return {
        type: "@@API",
        payload: {
            url,
            method,
            data,
            label,
            actionName, 
            accessToken,
            headers
        }
    }
}


export const apiTopNavi = ({...obj}) =>{    
    return apiAction({
        actionName:'apiTopNavi',
        url : api.TOPNAVI,
        method : 'GET',
        data : obj
    });    
}

export const apiSideNavi = ({...obj}) =>{   
    return apiAction({
        actionName:'apiSideNavi',
        url : api.SIDENAVI,
        method : 'GET',
        data : obj
    });    
}

export const apiLogin = ({...obj}) =>{    
    return apiAction({
        actionName:'apiLogin',
        url : api.LOGIN,
        method : 'GET',
        data : obj
    });    
}

export const apiLogout = ({...obj}) =>{        
    return apiAction({
        actionName:'apiLogout',
        url : api.LOGOUT,
        method : 'GET',
        data : obj
    });    
}

export const apiMemberInfo = ({...obj}) =>{    
    return apiAction({
        actionName:'apiMemberInfo',
        url : api.MEMBERINFO,
        method : 'GET',
        data : obj
    });    
}







