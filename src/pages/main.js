import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SideNaviContainer from './containers/SideNaviContainer';
import TopNaviContainer from './containers/TopNaviContainer';
import MemberInfoContainer from './containers/MemberInfoContainer';
import store from './modules/store';
import '../scss/base.scss';

const Main = () => {
  return (
    <Provider store={store}>
      <TopNaviContainer></TopNaviContainer>
      <SideNaviContainer></SideNaviContainer>
      <MemberInfoContainer></MemberInfoContainer>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
