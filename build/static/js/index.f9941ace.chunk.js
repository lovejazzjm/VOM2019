(this.webpackJsonpvom=this.webpackJsonpvom||[]).push([[3],{10:function(e,t,a){"use strict";a.d(t,"b",(function(){return o}));var n=a(6),r=new URLSearchParams(document.location.search).get("sideNaviId")||"",c=Object(n.b)({name:"sideNaviId",initialState:r,reducers:{setSideNaviId:function(e,t){return t.payload}}}),o=c.actions.setSideNaviId;t.a=c.reducer},11:function(e,t,a){"use strict";var n=a(2),r=a(4),c={LOGIN:"../data/login.json",LOGOUT:"../data/logout.json",SIDENAVI:"../data/sideNavi.json",TOPNAVI:"../data/topNavi.json",MEMBERINFO:"../data/memberInfo.json"},o=c;a.d(t,"c",(function(){return u})),a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return s}));var i=function(e){var t=e.actionName,a=void 0===t?"":t,n=e.url,c=void 0===n?"":n,o=e.method,i=void 0===o?"GET":o,u=e.data,d=void 0===u?null:u,s=e.accessToken,l=void 0===s?null:s,p=e.headers,f=void 0===p?null:p,v=e.label,m=void 0===v?"":v;return""===a?null:(r.b.injectReducer(a,Object(r.a)(a)),{type:"@@API",payload:{url:c,method:i,data:d,label:m,actionName:a,accessToken:l,headers:f}})},u=function(e){var t=Object(n.a)({},e);return i({actionName:"apiTopNavi",url:o.TOPNAVI,method:"GET",data:t})},d=function(e){var t=Object(n.a)({},e);return i({actionName:"apiSideNavi",url:o.SIDENAVI,method:"GET",data:t})},s=function(e){var t=Object(n.a)({},e);return i({actionName:"apiMemberInfo",url:o.MEMBERINFO,method:"GET",data:t})}},13:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(1),o=a(14),i=(a(18),r.a.memo((function(e){var t=e.data;if(!t)return r.a.createElement("ul",null);var a=Object.entries(t).map((function(e,t){var a=Object(o.a)(e,2),n=a[0],c=a[1];return r.a.createElement("li",{key:t},r.a.createElement("a",{href:c[0]},n))}));return r.a.createElement("ul",null,a)}))),u=a(11);t.a=function(){var e=Object(c.e)((function(e){return e.apiTopNavi?e.apiTopNavi.result:{}}),[]),t=Object(c.d)();return Object(n.useEffect)((function(){return t(Object(u.c)()),function(){}}),[t]),r.a.createElement("header",{className:"topNavi"},r.a.createElement(i,{data:e}))}},18:function(e,t,a){},4:function(e,t,a){"use strict";var n=a(9),r=a(8),c=a(3),o=a(7),i=a.n(o),u=function(e){var t=e.dispatch;return function(e){return function(a){if(e(a),"@@API"===a.type){var n=a.payload,c=n.label,o=n.actionName,u=n.url,d=n.method,s=n.data,l=n.accessToken,p=n.headers,f=["GET","DELETE"].includes(d)?"params":"data";i.a.defaults.baseURL=Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_LOGIN_URL:"../data/header.json",REACT_APP_LOGOUT_URL:"../data/sideNavi.json"}).REACT_APP_BASE_URL||"",i.a.defaults.headers.common["Content-Type"]="application/json",i.a.defaults.headers.common.Authorization="".concat(l),c&&t({type:"".concat(o,"_LOADING"),payload:c}),i.a.request(Object(r.a)({url:u,method:d,headers:p},f,s)).then((function(e){var a=e.data;t({type:"".concat(o,"_SUCCESS"),payload:a})})).catch((function(e){if(t({type:"".concat(o,"_FAILURE"),error:e}),e.response&&403===e.response.status){var a=window.location.pathname;t({type:"".concat(o,"_ACCESS_DENIED"),payload:{url:a}})}})).finally((function(){c&&t({type:"".concat(o,"_END"),payload:c})}))}}}},d=a(6),s=a(10);function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(a,!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.d(t,"a",(function(){return f}));var f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"".concat(e,"_LOADING"):return p({},t,{isLoading:!0});case"".concat(e,"_SUCCESS"):return a.payload;case"".concat(e,"_FAILURE"):return a.error;case"".concat(e,"_ACCESS_DENIED"):return a.payload;case"".concat(e,"_END"):return p({},t,{isLoading:!1});default:return t}}},v={sideNaviId:s.a};var m=[].concat(Object(n.a)(Object(d.c)()),[u]),O=Object(d.a)({reducer:v,middleware:m});O.asyncReducers={},O.injectReducer=function(e,t){var a;O.asyncReducers[e]?console.log("Can not use reducers with the same name."):(O.asyncReducers[e]=t,O.replaceReducer((a=O.asyncReducers,Object(c.combineReducers)(p({},v,{},a)))))};t.b=O},80:function(e,t,a){e.exports=a(81)},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),i=a(1),u=a(13),d=a(4);o.a.render(r.a.createElement((function(){return r.a.createElement(i.a,{store:d.b},r.a.createElement(u.a,null))}),null),document.getElementById("root"))}},[[80,7,0]]]);
//# sourceMappingURL=index.f9941ace.chunk.js.map