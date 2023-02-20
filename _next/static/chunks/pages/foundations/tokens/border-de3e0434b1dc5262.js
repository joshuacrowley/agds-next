(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[839],{14376:function(e,t,n){"use strict";n.d(t,{G_:function(){return p},LR:function(){return d},eJ:function(){return h},zE:function(){return u}});var r=n(10043),o=n(97865),i=n(71389),c=n(34144),s=n(45751),a=n(53009),l=n(87800),d=function(){var e=c.tokens.breakpoint;return(0,l.tZ)("ul",{children:Object.entries(e).map(function(e){var t=(0,o.Z)(e,2),n=t[0],r=t[1],i="".concat(n," - ").concat(r,"px");return(0,l.tZ)("li",{children:i},n)})})},u=function(){var e=c.tokens.borderWidth;return(0,l.tZ)(i.Flex,{gap:.5,className:s.proseBlockClassname,children:Object.entries(e).map(function(e){var t=(0,o.Z)(e,2),n=t[0],r=t[1],c="".concat(n," (").concat(r,"px)");return(0,l.tZ)(i.Box,{padding:.5,border:!0,borderWidth:n,children:(0,l.tZ)(a.Text,{children:c})},n)})})},p=function(){return(0,l.tZ)(i.Stack,{gap:.5,className:s.proseBlockClassname,children:[0,.25,.5,.75,1,1.5,2,3,4,5,6].map(function(e){var t="".concat(e," (").concat(16*e,"px)");return(0,l.BX)(i.Flex,{gap:.25,children:[(0,l.tZ)(i.Box,{css:(0,r.iv)({backgroundColor:c.boxPalette.systemInfoMuted,width:16*e},"","")}),(0,l.tZ)(a.Text,{children:t})]},e)})})},h=function(){var e=["xxxl","xxl","xl","lg","md","sm","xs"];return(0,l.BX)(i.Flex,{gap:1,className:s.proseBlockClassname,children:[(0,l.BX)(i.Flex,{flexDirection:"column",gap:1,children:[(0,l.tZ)(a.Text,{fontSize:"sm",fontWeight:"bold",children:"Default"}),e.map(function(e){return(0,l.tZ)(i.Box,{background:"shade",children:(0,l.tZ)(a.Text,{fontSize:e,children:e.toUpperCase()})},e)})]}),(0,l.BX)(i.Flex,{flexDirection:"column",gap:1,children:[(0,l.tZ)(a.Text,{fontSize:"sm",fontWeight:"bold",children:"Heading"}),e.map(function(e){return(0,l.tZ)(i.Box,{background:"shade",children:(0,l.tZ)(a.Text,{fontSize:e,lineHeight:"heading",children:e.toUpperCase()})},e)})]}),(0,l.BX)(i.Flex,{flexDirection:"column",gap:1,children:[(0,l.tZ)(a.Text,{fontSize:"sm",fontWeight:"bold",children:"Nospace"}),e.map(function(e){return(0,l.tZ)(i.Box,{background:"shade",children:(0,l.tZ)(a.Text,{fontSize:e,lineHeight:"nospace",children:e.toUpperCase()})},e)})]})]})}},33536:function(e,t,n){"use strict";n.d(t,{A:function(){return a}});var r=n(18590),o=n(14072),i=n(57489),c=n(3029),s=n(87800),a=function(e){var t=e.breadcrumbs,n=e.editPath,a=e.children,l=e.title,d=e.description;return(0,s.tZ)(o.L,{children:(0,s.BX)(i.X,{sideNav:{title:"Tokens",titleLink:"/foundations/tokens",items:r.Gw.map(function(e){var t=e.label;return{href:e.href,label:t}})},editPath:n,breadcrumbs:t,children:[(0,s.tZ)(c.V,{title:l,introduction:d}),a]})})}},18590:function(e,t,n){"use strict";n.d(t,{Gw:function(){return c},Qu:function(){return s},Sg:function(){return i}});var r=n(90849);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var i={border:{slug:"border",label:"Border",pageTitle:"Border tokens",description:"Guidelines for using borders across the Design System."},breakpoints:{slug:"breakpoints",label:"Breakpoint",pageTitle:"Breakpoint tokens",description:"Breakpoints are a set of predefined widths that can be used to change the layout of a webpage to ensure it accommodates different device widths."},colour:{slug:"colour",label:"Colour",pageTitle:"Colour tokens",description:"How to use colour to design consistent, purposeful, and accessible products."},maxWidth:{slug:"max-width",label:"Max width",pageTitle:"Max width tokens",description:"Used to set the maximum width of elements and containers in a page layout."},spacing:{slug:"spacing",label:"Spacing",pageTitle:"Spacing tokens",description:"Space is the distance between interface elements. It can affect grouping, visual hierarchy, and aesthetics."},typography:{slug:"typography",label:"Typography",pageTitle:"Typography tokens",description:"A set of predefined text styles to ensure text is consistent and legible."}},c=Object.values(i).map(function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({href:"/foundations/tokens/".concat(e.slug)},e)});function s(e){return[{label:"Home",href:"/"},{label:"Foundations",href:"/foundations"},{label:"Tokens",href:"/foundations/tokens"},{label:e.label}]}},3711:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(45751),o=n(71389),i=n(34144),c=n(58119),s=n(33536),a=n(14376),l=n(18590),d=n(87800);function u(){return(0,d.BX)(d.HY,{children:[(0,d.tZ)(c.$,{title:l.Sg.border.pageTitle,description:l.Sg.border.description}),(0,d.tZ)(s.A,{title:l.Sg.border.pageTitle,description:l.Sg.border.description,breadcrumbs:(0,l.Qu)(l.Sg.border),editPath:"/docs/pages/foundations/tokens/border.tsx",children:(0,d.BX)(r.Prose,{children:[(0,d.tZ)("h2",{children:"Border width"}),(0,d.BX)("p",{children:["The following ",Object.keys(i.tokens.borderWidth).length," tokens can be used to set the thickness of borders."]}),(0,d.tZ)(a.zE,{}),(0,d.tZ)("h2",{children:"Border radius tokens"}),(0,d.tZ)("p",{children:"Use the following border radius token to apply rounded corners to containers."}),(0,d.tZ)("ul",{children:(0,d.BX)("li",{children:[i.tokens.borderRadius,"px"]})}),(0,d.BX)("p",{children:["Use it by setting ",(0,d.tZ)("code",{children:"rounded"})," on the Box component as seen in the following example."]}),(0,d.tZ)(o.Box,{border:!0,rounded:!0,padding:.5,className:r.proseBlockClassname,children:"A Box with rounded corners"})]})})]})}},55723:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/foundations/tokens/border",function(){return n(3711)}])},55732:function(e,t,n){"use strict";function r(e,t,n,r,o,i,c){try{var s=e[i](c),a=s.value}catch(l){n(l);return}s.done?t(a):Promise.resolve(a).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(o,i){var c=e.apply(t,n);function s(e){r(c,o,i,s,a,"next",e)}function a(e){r(c,o,i,s,a,"throw",e)}s(void 0)})}}n.d(t,{Z:function(){return o}})}},function(e){e.O(0,[519,367,334,751,774,888,179],function(){return e(e.s=55723)}),_N_E=e.O()}]);