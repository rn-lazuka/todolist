(this.webpackJsonptodolist2=this.webpackJsonptodolist2||[]).push([[0],{103:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(7),s=n.n(o),i=(n(78),n(12)),c=n(32),l=n(14),u=n(13),d=n(15),p=(n(22),n(5)),f=n(133),h=Object(p.a)({root:{type:"contained",color:"primary"}})(f.a),v=n(136),k=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={error:"",title:""},n.onChangingValue=function(t){n.setState({error:"",title:t.currentTarget.value})},n.onAddItemClick=function(){var t=n.state.title;n.setState({title:""}),""===t?n.setState({error:"Field is required"}):(n.setState({error:""}),n.props.addTask(t))},n.onEnterPress=function(t){"Enter"===t.key&&n.onAddItemClick()},n.render=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"todoList-newTaskForm"},r.a.createElement(v.a,{variant:"outlined",value:n.state.title,onChange:n.onChangingValue,onKeyPress:n.onEnterPress,error:!!n.state.error,helperText:n.state.error,placeholder:"New item name"}),r.a.createElement(h,{onClick:n.onAddItemClick},"Add")))},n}return Object(d.a)(e,t),e}(r.a.Component),T=n(38),m=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={editMode:!1,title:n.props.task.title,classForInput:""},n.activateEditMode=function(){n.setState({editMode:!0,title:n.props.task.title})},n.deactivateEditMode=function(){""!==n.state.title?(n.props.changeTitle(n.props.task,n.state.title),n.setState({editMode:!1})):n.setState({classForInput:"error"})},n.onTitleChanged=function(t){var e=t.currentTarget.value;n.setState({title:e})},n.onIsDoneChanged=function(t){var e=t.currentTarget.checked?2:0;n.props.changeStatus(n.props.task,e)},n.deleteTask=function(){n.props.deleteTask(n.props.task.id)},n.render=function(){var t=2===n.props.task.status?"todoList-task done":"todoList-task";return r.a.createElement("div",{className:t},r.a.createElement("input",{type:"checkbox",checked:2===n.props.task.status,onChange:n.onIsDoneChanged}),n.state.editMode?r.a.createElement(v.a,{variant:"outlined",value:n.state.title,onChange:n.onTitleChanged,onBlur:n.deactivateEditMode,autoFocus:!0,className:n.state.classForInput}):r.a.createElement("span",{onClick:n.activateEditMode},n.props.task.id," -",n.props.task.title),r.a.createElement("button",{onClick:n.deleteTask},"X"))},n}return Object(d.a)(e,t),e}(r.a.Component),O=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).render=function(){var t=n.props.tasks.map((function(t){return r.a.createElement(m,{deleteTask:n.props.deleteTask,task:t,key:t.id,changeTitle:n.props.changeTitle,changeStatus:n.props.changeStatus})}));return r.a.createElement("div",{className:"todoList-tasks"},t)},n}return Object(d.a)(e,t),e}(r.a.Component),E=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={isHidden:!1},n.onAllFilterClick=function(){n.props.changeFilter("All")},n.onCompletedFilterClick=function(){n.props.changeFilter("Completed")},n.onActiveFilterClick=function(){n.props.changeFilter("Active")},n.onHideFiltersClick=function(){var t=n.state.isHidden;n.setState({isHidden:!t})},n.onShowFiltersClick=function(){var t=n.state.isHidden;n.setState({isHidden:!t})},n.render=function(){var t="All"===n.props.filterValue?"filter-active":"",e="Completed"===n.props.filterValue?"filter-active":"",a="Active"===n.props.filterValue?"filter-active":"";return r.a.createElement("div",{className:"todoList-footer"},!n.state.isHidden&&r.a.createElement("div",null,r.a.createElement(f.a,{onClick:n.onAllFilterClick,color:"primary",className:t},"All"),r.a.createElement(f.a,{onClick:n.onCompletedFilterClick,className:e},"Completed"),r.a.createElement(f.a,{onClick:n.onActiveFilterClick,className:a},"Active")),!n.state.isHidden&&r.a.createElement("span",{onClick:n.onHideFiltersClick},"Hide"),n.state.isHidden&&r.a.createElement("span",{onClick:n.onShowFiltersClick},"Show"))},n}return Object(d.a)(e,t),e}(r.a.Component),b=n(135),g=n(137),j=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={title:n.props.title,editMode:!1,classForInput:""},n.activateEditMode=function(){n.setState({editMode:!0})},n.deactivateEditMode=function(){""!==n.state.title?(n.props.changeToDoListTitle(n.state.title),n.setState({editMode:!1})):n.setState({classForInput:"error"})},n.onTitleChanged=function(t){var e=t.currentTarget.value;n.setState({title:e})},n.render=function(){return r.a.createElement("div",{className:"todoList-header"},n.state.editMode?r.a.createElement("input",{className:n.state.classForInput,onChange:n.onTitleChanged,onBlur:n.deactivateEditMode,autoFocus:!0,value:n.state.title}):r.a.createElement("h3",{className:"todoList-header__title",onClick:n.activateEditMode},n.state.title),r.a.createElement(b.a,{onClick:n.props.deleteToDoList},r.a.createElement(g.a,null)))},n}return Object(d.a)(e,t),e}(r.a.Component),y=n(25),C=n(10),D=n.n(C),w=n(19),S=n(45),L=n(61),I=n.n(L).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/todo-lists",withCredentials:!0,headers:{"API-KEY":"6d54c1cb-0079-4662-b13d-27d4ae8cf67d"}}),A=function(){return I.get("").then((function(t){return t.data}))},F=function(t){return I.post("",{title:t}).then((function(t){return t.data.data.item}))},N=function(t){return I.get("/".concat(t,"/tasks")).then((function(t){return t.data.items}))},P=function(t){return I.delete("/".concat(t))},x=function(t,e){return I.post("/".concat(t,"/tasks"),{title:e}).then((function(t){return t.data.data.item}))},R=function(t,e){return I.delete("/".concat(t,"/tasks/").concat(e))},M=function(t,e,n){return I.put("/".concat(t,"/tasks/").concat(e),n).then((function(t){if(0===t.data.resultCode)return t.data.data.item}))},H=function(t,e){return I.put("/".concat(t,"/"),{title:e})};function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function U(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(n,!0).forEach((function(e){Object(T.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var V="TODOLIST/REDUCER/ADD_TODOLIST",K="TODOLIST/REDUCER/ADD_TASK",B="TODOLIST/REDUCER/CHANGE_TASK",G="TODOLIST/REDUCER/DELETE_TASK",J="TODOLIST/REDUCER/DELETE_TODOLIST",W="TODOLIST/REDUCER/SET_TODOLISTS",q="TODOLIST/REDUCER/SET_TASKS",X={todolists:[]},Y=function(t,e){return{type:q,tasks:t,todolistId:e}},$=function(t,e){return{type:K,newTask:t,todolistId:e}},z=function(t,e){return{type:B,newTask:t,todolistId:e}},Q=function(t){return{type:J,todolistId:t}},Z=function(t,e){return{type:G,todolistId:t,taskId:e}},tt=function(t,e){return{type:"TODOLIST/REDUCER/CHANGE_TODOLIST_TITLE",todolistId:t,title:e}};function et(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function nt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?et(n,!0).forEach((function(e){Object(T.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):et(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var at=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={filterValue:"All",tasks:[]},n.restoreState=function(){var t=n.props.id;n.props.setTasks(t)},n.changeFilter=function(t){n.setState({filterValue:t})},n.addTask=function(t){var e=n.props.id;n.props.addNewTask(t,e)},n.changeTask=function(t,e){var a=n.props.id;n.props.changeTask(t,e,a)},n.changeStatus=function(t,e){var a=nt({},t,{status:e});n.changeTask(t,a)},n.changeTitle=function(t,e){var a=nt({},t,{title:e});n.changeTask(t,a)},n.changeToDoListTitle=function(t){var e=n.props.id;n.props.changeToDoListTitle(e,t)},n.deleteToDoList=function(){var t=n.props.id;n.props.deleteToDoList(t)},n.deleteTask=function(t){var e=n.props.id;n.props.deleteTask(e,t)},n.render=function(){var t=n.props.tasks,e=void 0===t?[]:t;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"todoList"},r.a.createElement("div",null,r.a.createElement(j,{changeToDoListTitle:n.changeToDoListTitle,deleteToDoList:n.deleteToDoList,title:n.props.title}),r.a.createElement(k,{addTask:n.addTask})),r.a.createElement(O,{changeTitle:n.changeTitle,deleteTask:n.deleteTask,changeStatus:n.changeStatus,tasks:e.filter((function(t){switch(n.state.filterValue){case"All":return!0;case"Completed":return 2===t.status;case"Active":return 0===t.status;default:return!0}}))}),r.a.createElement(E,{changeFilter:n.changeFilter,filterValue:n.state.filterValue})))},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.restoreState()}}]),e}(r.a.Component),rt=Object(y.b)((function(t){return{toDoLists:t.todolists.todolists}}),{changeTask:function(t,e,n){return function(){var a=Object(w.a)(D.a.mark((function a(r){var o;return D.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,M(n,t.id,e);case 2:o=a.sent,r(z(o,n));case 4:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()},deleteTask:function(t,e){return function(){var n=Object(w.a)(D.a.mark((function n(a,r){return D.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,R(t,e);case 2:0===n.sent.data.resultCode&&a(Z(t,e));case 4:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}()},deleteToDoList:function(t){return function(){var e=Object(w.a)(D.a.mark((function e(n){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(t);case 2:0===e.sent.data.resultCode&&n(Q(t));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},changeToDoListTitle:function(t,e){return function(){var n=Object(w.a)(D.a.mark((function n(a){return D.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,H(t,e);case 2:n.sent,a(tt(t,e));case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()},setTasks:function(t){return function(){var e=Object(w.a)(D.a.mark((function e(n){var a;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N(t);case 2:a=e.sent,n(Y(a.reverse(),t));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},addNewTask:function(t,e){return function(){var n=Object(w.a)(D.a.mark((function n(a){var r;return D.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x(e,t);case 2:r=n.sent,a($(r,e));case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}})(at),ot=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).addToDoList=function(t){n.props.addToDoList(t)},n.render=function(){var t=n.props.toDoLists.map((function(t){return r.a.createElement(rt,{key:t.id,id:t.id,title:t.title,tasks:t.tasks})}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(k,{addTask:n.addToDoList})),r.a.createElement("div",{className:"App"},t))},n}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.props.setTodoLists()}}]),e}(r.a.Component),st=Object(y.b)((function(t){return{toDoLists:t.todolists.todolists}}),{setTodoLists:function(){return function(){var t=Object(w.a)(D.a.mark((function t(e){var n;return D.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A();case 2:n=t.sent,e({type:W,todolists:n});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},addToDoList:function(t){return function(){var e=Object(w.a)(D.a.mark((function e(n){var a;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(t);case 2:a=e.sent,n({type:V,newToDoList:a});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})(ot);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var it=n(29),ct=n(62),lt=Object(it.c)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case V:return U({},t,{todolists:[].concat(Object(S.a)(t.todolists),[e.newToDoList])});case W:return U({},t,{todolists:e.todolists.map((function(t){return U({},t,{tasks:[]})}))});case q:return U({},t,{todolists:t.todolists.map((function(t){return t.id===e.todolistId?U({},t,{tasks:e.tasks}):t}))});case K:return U({},t,{todolists:t.todolists.map((function(t){return t.id===e.todolistId?U({},t,{tasks:[].concat(Object(S.a)(t.tasks),[e.newTask])}):t}))});case B:return U({},t,{todolists:t.todolists.map((function(t){return t.id===e.todolistId?U({},t,{tasks:t.tasks.map((function(t){return t.id!==e.newTask.id?t:e.newTask}))}):t}))});case"TODOLIST/REDUCER/CHANGE_TODOLIST_TITLE":return U({},t,{todolists:t.todolists.map((function(t){return t.id===e.todolistId?U({},t,{title:e.title}):t}))});case G:return U({},t,{todolists:t.todolists.map((function(t){return t.id===e.todolistId?U({},t,{tasks:t.tasks.filter((function(t){return t.id!==e.taskId}))}):t}))});case J:return U({},t,{todolists:t.todolists.filter((function(t){return t.id!==e.todolistId}))});default:return t}}}),ut=Object(it.d)(lt,Object(it.a)(ct.a));s.a.render(r.a.createElement(y.a,{store:ut},r.a.createElement(st,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},22:function(t,e,n){},73:function(t,e,n){t.exports=n(103)},78:function(t,e,n){}},[[73,1,2]]]);
//# sourceMappingURL=main.0f65400d.chunk.js.map