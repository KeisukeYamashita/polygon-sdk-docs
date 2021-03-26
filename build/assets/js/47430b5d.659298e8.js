(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{148:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/Architecture-dcd062b11e9f68b1b5e1046e1307a560.jpg"},82:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),i=(n(0),n(96)),a={id:"polygon-sdk-architecture",title:"Architecture",sidebar_label:"Architecture"},c={unversionedId:"home/polygon-sdk-architecture",id:"home/polygon-sdk-architecture",isDocsHomePage:!1,title:"Architecture",description:"We started with the idea of making software that is modular.",source:"@site/docs/home/polygon-sdk-architecture.md",slug:"/home/polygon-sdk-architecture",permalink:"/docs/home/polygon-sdk-architecture",editUrl:"https://github.com/0xPolygon/polygon-sdk-docs/docs/home/polygon-sdk-architecture.md",version:"current",sidebar_label:"Architecture",sidebar:"introduction",previous:{title:"Getting Started",permalink:"/docs/home/getting-started"},next:{title:"CLI Commands",permalink:"/docs/home/cli-commands"}},l=[{value:"Polygon SDK Layering",id:"polygon-sdk-layering",children:[]},{value:"Libp2p",id:"libp2p",children:[]},{value:"Synchronization &amp; Consensus",id:"synchronization--consensus",children:[]},{value:"Blockchain",id:"blockchain",children:[]},{value:"State",id:"state",children:[]},{value:"JSON RPC",id:"json-rpc",children:[]}],s={toc:l};function u(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"We started with the idea of making software that is ",Object(i.b)("em",{parentName:"p"},"modular"),"."),Object(i.b)("p",null,"This is something that is present in almost all parts of the Polygon SDK. Below, you will find a brief overview of the\nbuilt architecture and its layering."),Object(i.b)("h2",{id:"polygon-sdk-layering"},"Polygon SDK Layering"),Object(i.b)("p",null,Object(i.b)("img",{alt:"Polygon SDK Architecture",src:n(148).default})),Object(i.b)("h2",{id:"libp2p"},"Libp2p"),Object(i.b)("p",null,"It all starts at the base networking layer, which utilizes ",Object(i.b)("strong",{parentName:"p"},"libp2p"),". We decided to go with this technology because it\nfits into the designing philosophies of Polygon SDK. Libp2p is:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Modular"),Object(i.b)("li",{parentName:"ul"},"Extensible"),Object(i.b)("li",{parentName:"ul"},"Fast")),Object(i.b)("p",null,"Most importantly, it provides a great foundation for more advanced features, which we'll cover later on."),Object(i.b)("h2",{id:"synchronization--consensus"},"Synchronization & Consensus"),Object(i.b)("p",null,"The separation of the synchronization and consensus protocols allows for modularity and implementation of ",Object(i.b)("strong",{parentName:"p"},"custom")," sync and consensus mechanisms - depending on how the client is being run."),Object(i.b)("p",null,"Polygon SDK is designed to offer off-the-shelf pluggable consensus algortihms."),Object(i.b)("p",null,"The current list of supported consensus algorithms:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Ethereum's Nakamoto PoW"),Object(i.b)("li",{parentName:"ul"},"IBFT (\u26a0\ufe0fWIP)"),Object(i.b)("li",{parentName:"ul"},"Clique PoA (\u26a0\ufe0fWIP)")),Object(i.b)("p",null,"We plan to add support for more consensus algorithms in the future (HotSuff, Tendermint etc).",Object(i.b)("br",null)," ",Object(i.b)("a",{parentName:"p",href:"mailto:contact@polygon.technology"},"Contact the team")," if you would like to use a specific, not yet supported algorithm for your project."),Object(i.b)("h2",{id:"blockchain"},"Blockchain"),Object(i.b)("p",null,"The Blockchain layer is the central layer that coordinates everything in the Polygon SDK system. It is covered in depth in the corresponding ",Object(i.b)("em",{parentName:"p"},"Modules")," section."),Object(i.b)("h2",{id:"state"},"State"),Object(i.b)("p",null,"The State layer contains state transition logic. It deals with how the state changes when a new block is included. It is covered in depth in the corresponding ",Object(i.b)("em",{parentName:"p"},"Modules")," section."),Object(i.b)("h2",{id:"json-rpc"},"JSON RPC"),Object(i.b)("p",null,"The JSON RPC layer is an API layer that dApp developers use to interact with the blockchain. It is covered in depth in the corresponding ",Object(i.b)("em",{parentName:"p"},"Modules")," section."))}u.isMDXComponent=!0},96:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,h=p["".concat(a,".").concat(b)]||p[b]||d[b]||i;return n?o.a.createElement(h,c(c({ref:t},s),{},{components:n})):o.a.createElement(h,c({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var s=2;s<i;s++)a[s]=n[s];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);