(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[435],{3470:function(e,t,r){"use strict";r.d(t,{i:function(){return c}});var n=r(1670),o=r(1504),i=r(7800),c=function(){return(0,i.tZ)("hr",{css:(0,n.iv)({boxSizing:"content-box",height:0,margin:0,overflow:"visible",border:"none",borderTopWidth:1,borderTopStyle:"solid",borderColor:o._X.border,width:"100%"},"","")})}},5908:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return I}});var n=r(8038),o=r(4060),i=r(897),c=r(7956),l=r(849),a=r(89),d=r(7800),u=function(e){var t=e.children;return(0,d.tZ)(o.Kq,{as:"ul",borderTop:!0,children:t})},s=r(1670),f=r(3170),h=r(2832),p=r(1504),b=["children"],g=["children"],y=["as","children","status"];function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){(0,l.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=function(e){var t=e.children,r=(0,a.Z)(e,b);return(0,d.tZ)(w,v(v({as:f.h},r),{},{children:t}))},Z={name:"1h36v61",styles:"appearance:none;background:transparent;cursor:pointer;text-align:left;font-size:inherit"},j=function(e){var t=e.children,r=(0,a.Z)(e,g);return(0,d.tZ)(w,v(v({as:"button",css:Z},r),{},{children:t}))},w=function(e){var t=e.as,r=e.children,n=e.status,i=(0,a.Z)(e,y),c="doing"===n,l=P[n];return(0,d.tZ)("li",{children:(0,d.BX)(o.kC,v(v({as:t,alignItems:"center",gap:.75,padding:.75,color:"text",fontFamily:"body",fontWeight:c?"bold":"normal",borderBottom:!0,borderLeft:!0,borderLeftWidth:"xl",width:"100%",focus:!0,css:(0,s.iv)({borderLeftColor:c?p._X.foregroundAction:"transparent",textDecoration:"none","&:hover":v(v({},p.lB.underline),{},{backgroundColor:p._X.backgroundShade})},"","")},i),{},{children:[(0,d.tZ)(l,{size:1.5,color:"action"}),(0,d.BX)(o.kC,{flexDirection:"column",gap:0,children:[(0,d.tZ)(f.x,{color:"muted",fontSize:"xs",lineHeight:"nospace",children:x[n]}),r]})]}))})},P={doing:h.NB,todo:h.Q2,done:h.d0},x={doing:"Doing",todo:"Todo",done:"Done"},S=["label"];function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){(0,l.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _=function(e){var t=e.items;return(0,d.tZ)(u,{children:t.map((function(e,t){var r=e.label,n=(0,a.Z)(e,S);return q(n)?(0,d.tZ)(O,E(E({},n),{},{children:r}),t):(0,d.tZ)(j,E(E({},n),{},{children:r}),t)}))})},q=function(e){return"href"in e},B=r(9219),X=r(8039),k=r(71),W=r(8301),z=r(443),V=r(3470),C=r(3277),H=r(6219),N=r(6527);function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?K(Object(r),!0).forEach((function(t){(0,l.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var A=W.Ry({day:W.Z_().required("Enter day"),month:W.Z_().required("Enter month"),year:W.Z_().required("Enter year")}).required(),F=function(){var e,t,r,n,i,c,l=(0,X.cI)({resolver:(0,k.X)(A)}),a=l.register,u=l.handleSubmit,s=l.formState.errors;return(0,d.tZ)("form",{onSubmit:u((function(e){console.log(e)})),children:(0,d.BX)(o.Kq,{alignItems:"flex-start",gap:1.5,children:[(0,d.tZ)(C.pg,{legend:(0,d.tZ)(H.H1,{children:"What is your date of birth?"}),hint:(0,d.tZ)(f.x,{fontSize:"md",color:"muted",children:"We will only use this to respond to your requests"}),children:(0,d.BX)(o.Kq,{alignItems:"flex-start",gap:1.5,children:[(0,d.tZ)(N.o,T(T({label:"Day",inputMode:"numeric",maxWidth:"md",required:!0},a("day")),{},{invalid:Boolean(null===(e=s.day)||void 0===e?void 0:e.message),message:null===(t=s.day)||void 0===t?void 0:t.message})),(0,d.tZ)(N.o,T(T({label:"Month",inputMode:"numeric",maxWidth:"md",required:!0},a("month")),{},{invalid:Boolean(null===(r=s.month)||void 0===r?void 0:r.message),message:null===(n=s.month)||void 0===n?void 0:n.message})),(0,d.tZ)(N.o,T(T({label:"Year",inputMode:"numeric",maxWidth:"md",required:!0},a("year")),{},{invalid:Boolean(null===(i=s.year)||void 0===i?void 0:i.message),message:null===(c=s.year)||void 0===c?void 0:c.message}))]})}),(0,d.tZ)(V.i,{}),(0,d.tZ)(z.zx,{type:"submit",children:"Continue"})]})})},I=function(){return(0,d.BX)(B.A,{children:[(0,d.BX)(n.default,{children:[(0,d.tZ)("title",{children:"AG Design System | Example site"}),(0,d.tZ)("meta",{name:"description",content:"An example of things that can be made with AG-DS"}),(0,d.tZ)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.tZ)(i.V,{children:(0,d.tZ)(o.Kq,{gap:3,children:(0,d.BX)(c.o,{children:[(0,d.tZ)(c.s,{columnSpan:{xs:12,md:3},children:(0,d.tZ)(_,{items:[{label:"Personal details",status:"doing"},{label:"Contact details",status:"todo"},{label:"Notification preferences",status:"todo"}]})}),(0,d.tZ)(c.s,{columnSpan:{xs:12,md:8},columnStart:{md:5},children:(0,d.tZ)(F,{})})]})})})]})}},3277:function(e,t,r){"use strict";r.d(t,{pg:function(){return s}});var n=r(4060),o=r(7800);var i={name:"1bfrawq",styles:"padding:0;margin:0;border:none"},c=function(e){var t=e.children;return(0,o.tZ)("fieldset",{css:i,children:(0,o.tZ)(n.Kq,{gap:1.5,children:t})})},l=r(7378),a=r(3170),d=function(e){var t=e.children;return(0,l.isValidElement)(t)?(0,o.tZ)("legend",{children:t}):(0,o.tZ)(a.x,{as:"legend",fontWeight:"bold",fontSize:"lg",lineHeight:"heading",children:t})},u=function(e){var t=e.children;return(0,l.isValidElement)(t)?t:(0,o.tZ)(a.x,{fontSize:"sm",color:"muted",children:t})},s=function(e){var t=e.children,r=e.hint,i=e.legend;return(0,o.BX)(c,{children:[(0,o.BX)(n.Kq,{gap:.75,children:[(0,o.tZ)(d,{children:i}),r?(0,o.tZ)(u,{children:r}):null]}),(0,o.tZ)("div",{children:t})]})}},6219:function(e,t,r){"use strict";r.d(t,{H1:function(){return h},H2:function(){return p}});var n=r(849),o=r(89),i=(r(7378),r(1504)),c=r(4060),l=r(7800),a=["as","type","color","fontSize","fontFamily","fontWeight","lineHeight"];function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s={h1:"xxl",h2:"xl",h3:"lg",h4:"md",h5:"sm",h6:"xs"},f=(0,i.yV)((function(e,t){var r=e.as,n=e.type,i=void 0===n?"h2":n,d=e.color,f=void 0===d?"text":d,h=e.fontSize,p=e.fontFamily,b=void 0===p?"body":p,g=e.fontWeight,y=void 0===g?"bold":g,m=e.lineHeight,v=void 0===m?"heading":m,O=(0,o.Z)(e,a),Z=null!==r&&void 0!==r?r:i,j=null!==h&&void 0!==h?h:s[i];return(0,l.tZ)(c.xu,u({as:Z,ref:t,color:f,fontSize:j,fontFamily:b,fontWeight:y,lineHeight:v},O))})),h=(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h1",type:"h1"},e))})),p=(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h2",type:"h2"},e))}));(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h3",type:"h3"},e))})),(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h4",type:"h4"},e))})),(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h5",type:"h5"},e))})),(0,i.yV)((function(e,t){return(0,l.tZ)(f,u({ref:t,as:"h6",type:"h6"},e))}))},3235:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/form-multi-step",function(){return r(5908)}])}},function(e){e.O(0,[255,110,135,774,888,179],(function(){return t=3235,e(e.s=t);var t}));var t=e.O();_N_E=t}]);