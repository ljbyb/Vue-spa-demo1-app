(function(e){function t(t){for(var r,n,i=t[0],s=t[1],u=t[2],d=0,l=[];d<i.length;d++)n=i[d],a[n]&&l.push(a[n][0]),a[n]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(l.length)l.shift()();return c.push.apply(c,u||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,n=1;n<o.length;n++){var i=o[n];0!==a[i]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=o[0]))}return e}var r={},n={app:0},a={app:0},c=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-0a5035ae":"78be45a1","chunk-2eff7568":"501dbb52","chunk-4d20e448":"f3526374","chunk-38b1b327":"12507d3d","chunk-72ea123c":"22eb04c5"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.e=function(e){var t=[],o={"chunk-0a5035ae":1,"chunk-2eff7568":1,"chunk-4d20e448":1,"chunk-38b1b327":1,"chunk-72ea123c":1};n[e]?t.push(n[e]):0!==n[e]&&o[e]&&t.push(n[e]=new Promise(function(t,o){for(var r="css/"+({}[e]||e)+"."+{"chunk-0a5035ae":"b21f98f6","chunk-2eff7568":"40ee89c9","chunk-4d20e448":"d4f133e7","chunk-38b1b327":"b800cc3d","chunk-72ea123c":"690d3b71"}[e]+".css",a=s.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var u=c[i],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===a))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){u=l[i],d=u.getAttribute("data-href");if(d===r||d===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete n[e],p.parentNode.removeChild(p),o(c)},p.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){n[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise(function(t,o){r=a[e]=[t,o]});t.push(r[2]=c);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=i(e),u=function(t){d.onerror=d.onload=null,clearTimeout(l);var o=a[e];if(0!==o){if(o){var r=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src,c=new Error("Loading chunk "+e+" failed.\n("+r+": "+n+")");c.type=r,c.request=n,o[1](c)}a[e]=void 0}};var l=setTimeout(function(){u({type:"timeout",target:d})},12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var p=d;c.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"56d7":function(e,t,o){"use strict";o.r(t);o("cadf"),o("551c"),o("f751"),o("097d");var r=o("2b0e"),n=o("bb71"),a=(o("da64"),o("c0a4")),c=o.n(a),i=o("5025"),s=o.n(i);r["a"].use(n["a"],{iconfont:"md",theme:{primary:c.a.green.darken4,secondary:c.a.green.darken1,accent:c.a.green.lighten2},lang:{locales:{zhHans:s.a},current:"zhHans"}});var u=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-app",[o("Header"),o("v-content",[o("v-container",{attrs:{fluid:""}},[o("keep-alive",[e.$route.meta.keepAlive?o("router-view"):e._e()],1),e.$route.meta.keepAlive?e._e():o("router-view")],1)],1),o("Footer")],1)},d=[],l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-toolbar",{attrs:{dark:"",color:e.mycolor,fixed:"",app:""}},[o("v-toolbar-side-icon"),o("v-toolbar-title",{staticClass:"white--text"},[e._v("\n        Hi, "+e._s(this.$store.state.user)+"\n    ")]),o("v-spacer"),o("UserLogin")],1)},p=[],f=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-dialog",{attrs:{persistent:"","max-width":"300px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[o("v-btn",{attrs:{flat:"",icon:""}},[o("v-icon",e._g({},r),[e._v("account_circle")])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-card-title",[o("span",{staticClass:"headline"},[e._v("用户登录")])]),o("v-card-text",[o("v-form",[o("v-text-field",{attrs:{"prepend-icon":"person",name:"login",label:"用户名",type:"text"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),o("v-text-field",{attrs:{"prepend-icon":"lock",name:"password",label:"密码",id:"password",type:"password"}})],1)],1),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("取消")]),o("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.userLogin}},[e._v("确定")])],1)],1)],1)},m=[],v={name:"UserLogin",data:function(){return{bottomNav:0,userName:"",dialog:!1}},methods:{userLogin:function(){this.dialog=!1,this.$store.dispatch("setUser",this.userName)}}},h=v,g=o("0c7c"),b=o("6544"),y=o.n(b),k=o("8336"),S=o("b0af"),w=o("99d9"),_=o("12b2"),x=o("169a"),O=o("4bd4"),T=o("132d"),N=o("9910"),D=o("2677"),V=Object(g["a"])(h,f,m,!1,null,"d3833682",null),j=V.exports;y()(V,{VBtn:k["a"],VCard:S["a"],VCardActions:w["a"],VCardText:w["b"],VCardTitle:_["a"],VDialog:x["a"],VForm:O["a"],VIcon:T["a"],VSpacer:N["a"],VTextField:D["a"]});var C={name:"Header",components:{UserLogin:j},data:function(){return{bottomNav:0}},computed:{mycolor:function(){return"deep-orange darken-2"}}},A=C,E=o("71d9"),$=o("706c"),I=o("2a7f"),J=Object(g["a"])(A,l,p,!1,null,"6e846e74",null),L=J.exports;y()(J,{VSpacer:N["a"],VToolbar:E["a"],VToolbarSideIcon:$["a"],VToolbarTitle:I["a"]});var P=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-footer",{attrs:{dark:"",fixed:"",app:""}},[o("v-bottom-nav",{attrs:{active:e.bottomNav,color:e.color,value:!0,absolute:"",dark:""},on:{"update:active":function(t){e.bottomNav=t}}},[o("v-btn",{attrs:{dark:""}},[o("span",[e._v("首页")]),o("v-icon",[e._v("home")])],1),o("v-btn",{attrs:{dark:""}},[o("span",[e._v("记录")]),o("v-icon",[e._v("queue_music")])],1),o("v-btn",{attrs:{dark:""}},[o("span",[e._v("运动")]),o("v-icon",[e._v("directions_walk")])],1),o("v-btn",{attrs:{dark:""}},[o("span",[e._v("待办")]),o("v-icon",[e._v("event_note")])],1),o("v-btn",{attrs:{dark:""}},[o("span",[e._v("我的")]),o("v-icon",[e._v("person")])],1)],1)],1)},F=[],R=(o("a481"),{name:"Footer",data:function(){return{bottomNav:0}},computed:{color:function(){switch(this.bottomNav){case 0:return this.$router.replace({path:"/"}),"deep-orange darken-2";case 1:return this.$router.replace({path:"/record"}),"primary";case 2:return this.$router.replace({path:"/sport"}),"blue";case 3:return this.$router.replace({path:"/note/all"}),"purple";case 4:return this.$router.replace({path:"/user"}),"purple";default:return"deep-orange darken-2"}}}}),B=R,U=o("887a"),H=o("553a"),M=Object(g["a"])(B,P,F,!1,null,"2f731bba",null),q=M.exports;y()(M,{VBottomNav:U["a"],VBtn:k["a"],VFooter:H["a"],VIcon:T["a"]});var Y={name:"App",components:{Footer:q,Header:L}},z=Y,G=o("7496"),K=o("a523"),Q=o("549c"),W=Object(g["a"])(z,u,d,!1,null,null,null),X=W.exports;y()(W,{VApp:G["a"],VContainer:K["a"],VContent:Q["a"]});var Z=o("8c4f"),ee=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-card",{attrs:{color:"deep-orange darken-2","min-height":"400px"}},[o("v-container",{attrs:{"fill-height":""}},[o("v-layout",{attrs:{"align-center":"",column:"","justify-center":""}},[o("h1",{staticClass:"white--text display-2 font-weight-medium my-3"},[e._v("欢迎")]),o("h4",{attrs:{className:"subheading"}},[e._v("©"+e._s((new Date).getFullYear())+" — "),o("strong",[e._v("ABO")]),e._v(" for YuanYuan")])])],1)],1)},te=[],oe={data:function(){return{}}},re=oe,ne=o("a722"),ae=Object(g["a"])(re,ee,te,!1,null,null,null),ce=ae.exports;y()(ae,{VCard:S["a"],VContainer:K["a"],VLayout:ne["a"]}),r["a"].use(Z["a"]);var ie=new Z["a"]({mode:"hash",base:"",routes:[{path:"/",name:"home",component:ce},{path:"/sport",name:"sport",meta:{keepAlive:!0,title:"title"},component:function(){return o.e("chunk-38b1b327").then(o.bind(null,"3a0c"))}},{path:"/note/:filter",name:"note",component:function(){return Promise.all([o.e("chunk-0a5035ae"),o.e("chunk-4d20e448")]).then(o.bind(null,"639e"))},beforeEach:function(e,t,o){["all","active","completed"].some(function(t){return t===e.params.filter})?o():o("/note/all")}},{path:"/record",name:"record",component:function(){return Promise.all([o.e("chunk-0a5035ae"),o.e("chunk-2eff7568")]).then(o.bind(null,"43ef"))}},{path:"/user",name:"user",component:function(){return o.e("chunk-72ea123c").then(o.bind(null,"1511"))}}]}),se=ie,ue=o("768b"),de=(o("ac4d"),o("8a81"),o("6b54"),o("456d"),o("ac6a"),o("5df3"),o("f400"),o("2f62"));r["a"].use(de["a"]);var le="todos",pe="sporttime",fe="sportday",me="records",ve="user";function he(e){var t=new Map,o=localStorage.getItem(e);if(null!==o)for(var r=JSON.parse(o),n=0,a=Object.keys(r);n<a.length;n++){var c=a[n];t.set(c,r[c])}return t}var ge={todos:JSON.parse(localStorage.getItem(le)||"[]"),sporttime:JSON.parse(localStorage.getItem(pe)||"[]"),sportday:he(fe),records:JSON.parse(localStorage.getItem(me)||"[]"),user:JSON.parse(localStorage.getItem(ve))},be={addTodo:function(e,t){e.todos.push(t)},removeTodo:function(e,t){e.todos.splice(e.todos.indexOf(t),1)},editTodo:function(e,t){var o=t.todo,r=t.text,n=void 0===r?o.text:r,a=t.done,c=void 0===a?o.done:a;o.text=n,o.done=c},addSportTimeData:function(e,t){e.sporttime.push(t)},updateSportTimeData:function(e,t){t===e.sporttime[e.sporttime.length-1][0]?e.sporttime[e.sporttime.length-1][1]++:e.sporttime.push([t,1])},removeSportTimeData:function(e){e.sporttime.length=0},addSportDayData:function(e,t){e.sportday.set(t.date,t.count)},updateSportDayData:function(e,t){if(e.sportday.has(t)){var o=e.sportday.get(t);e.sportday.set(t,o+1)}else e.sportday.set(t,1)},addRecord:function(e,t){e.records.push(t)},removeRecord:function(e,t){e.records.splice(e.records.indexOf(t),1)},editRecord:function(e,t){var o=t.index,r=t.record;e.records[o].date=r.date,e.records[o].content=r.content,e.records[o].count=r.count,e.records[o].score=r.score},setUser:function(e,t){e.user=t}},ye={addTodo:function(e,t){var o=e.commit;o("addTodo",{uid:Date.now(),text:t,done:!1})},removeTodo:function(e,t){var o=e.commit;o("removeTodo",t)},toggleTodo:function(e,t){var o=e.commit;o("editTodo",{todo:t,done:!t.done})},editTodo:function(e,t){var o=e.commit,r=t.todo,n=t.value;o("editTodo",{todo:r,text:n})},toggleAll:function(e,t){var o=e.state,r=e.commit;o.todos.forEach(function(e){r("editTodo",{todo:e,done:t})})},clearCompleted:function(e){var t=e.state,o=e.commit;t.todos.filter(function(e){return e.done}).forEach(function(e){o("removeTodo",e)})},addSportTimeData:function(e,t){var o=e.commit;o("addSportTimeData",[t,0])},updateSportTimeData:function(e,t){var o=e.commit;o("updateSportTimeData",t)},removeSportTimeData:function(e){var t=e.commit;t("removeSportTimeData")},addSportDayData:function(e,t){var o=e.commit;o("addSportDayData",{date:t,count:0})},updateSportDayData:function(e,t){var o=e.commit;o("updateSportDayData",t)},addRecord:function(e,t){var o=e.commit,r=t.uuid,n=t.date,a=t.content,c=t.count,i=t.score;o("addRecord",{uuid:r,date:n,content:a,count:c,score:i})},removeRecord:function(e,t){var o=e.commit;o("removeRecord",t)},editRecord:function(e,t){var o=e.commit,r=t.index,n=t.record;o("editRecord",{index:r,record:n})},setUser:function(e,t){var o=e.commit;t.length>0&&o("setUser",t)}},ke=[function(e){e.subscribe(function(e,t){if(-1!==e.type.toString().indexOf("Todo"))window.localStorage.setItem(le,JSON.stringify(t.todos));else if(-1!==e.type.toString().indexOf("Sport")){var o=Object.create(null),r=!0,n=!1,a=void 0;try{for(var c,i=t.sportday[Symbol.iterator]();!(r=(c=i.next()).done);r=!0){var s=Object(ue["a"])(c.value,2),u=s[0],d=s[1];o[u]=d}}catch(l){n=!0,a=l}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}window.localStorage.setItem(fe,JSON.stringify(o)),window.localStorage.setItem(pe,JSON.stringify(t.sporttime))}else-1!==e.type.toString().indexOf("Record")?window.localStorage.setItem(me,JSON.stringify(t.records)):-1!==e.type.toString().indexOf("User")&&window.localStorage.setItem(ve,JSON.stringify(t.user))})}],Se=new de["a"].Store({state:ge,mutations:be,actions:ye,plugins:ke}),we=o("9483");Object(we["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var _e,xe,Oe={name:"Global",userName:""},Te=Oe,Ne=Object(g["a"])(Te,_e,xe,!1,null,"a8a6c642",null),De=Ne.exports;r["a"].config.productionTip=!1,r["a"].prototype.GLOBAL=De,new r["a"]({router:se,store:Se,render:function(e){return e(X)}}).$mount("#app")}});
//# sourceMappingURL=app.4e520e6a.js.map