// inspired by https://leanpub.com/redux-book
import axios from "axios";



const apiMiddleware = ({ dispatch }) => next => action => {

  next(action);

  if (action.type !=='@@API' ) return;  


  const {
    label,
    actionName,
    url,
    method,
    data,
    accessToken,
    headers
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `${accessToken}`;


  if(label){

    dispatch({
      type: `${actionName}_LOADING`,
      payload:label
    });
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch({
        type: `${actionName}_SUCCESS`,
        payload: data
      });  
    })
    .catch(error => {
      dispatch({
        type: `${actionName}_FAILURE`,
        error        
      });


      if (error.response && error.response.status === 403) {
        const url  = window.location.pathname;
        dispatch({
          type:  `${actionName}_ACCESS_DENIED`,
          payload: {
            url
          }
        })

        
      }
    })
    .finally(() => {
      if(label){
        dispatch({
          type: `${actionName}_END`,
          payload:label
        });
      }
    });
};

export default apiMiddleware;