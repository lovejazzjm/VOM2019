import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TopNaviContainer from './containers/TopNaviContainer'
import store from './modules/store'


const About = () => {  

    return (
      <Provider store={store}>       
        <TopNaviContainer></TopNaviContainer> 
      </Provider>        
    )
 
}
 
ReactDOM.render(<About/>, document.getElementById('root'));