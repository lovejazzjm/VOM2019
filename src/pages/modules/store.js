import { combineReducers} from 'redux';
import axiosMiddleware from '../middleware/axios-middleware';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import sideNaviReducer from '../reducers/sideNaviId';


export const createReducerWithActionName = (actionName = '') => {
    return function requestApi(state = {}, action) {
        switch (action.type) {
            case `${actionName}_LOADING`:
                return {...state, isLoading:true}
            case `${actionName}_SUCCESS`:
                return action.payload
            case `${actionName}_FAILURE`:
                return action.error
            case `${actionName}_ACCESS_DENIED`:
                    return action.payload
            case `${actionName}_END`:
                    return {...state, isLoading:false}
            default:
                return state
        }
    }
}

const staticReducers = {
    sideNaviId: sideNaviReducer
}

function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers
    })
}

const middleware = [...getDefaultMiddleware(), axiosMiddleware];
const store = configureStore({reducer:staticReducers, middleware : middleware})

store.asyncReducers = {}

store.injectReducer = (key, asyncReducer) => {
    if(!store.asyncReducers[key]){

        store.asyncReducers[key] = asyncReducer
        store.replaceReducer(createReducer(store.asyncReducers))
    }else{
        console.log('Can not use reducers with the same name.');
    }    
}


export default store;



