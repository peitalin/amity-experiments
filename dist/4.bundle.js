webpackJsonp([4],{116:function(e,t,n){"use strict";var a=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function a(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(0);n(971);var s=n(972),i=n(974),l=n(976),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.componentDidMount=function(){},t.prototype.render=function(){var e=new Date("2 August 2017 13:30:00 GMT+10:00"),t=new Date("3 August 2017 03:30:00 GMT+10:00");new Date("4 August 2017 03:30:00 GMT+10:00");return r.createElement("div",{className:"collections__container"},r.createElement("br",null),r.createElement(s.default,{height:20,width:20,percentage:.7}),r.createElement(i.default,{regenPips:5,style:{marginTop:"4px"}}),r.createElement("div",{className:"countdown-timers-container"},r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer1",height:180,width:180,date:e,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}}),r.createElement("h2",{style:{padding:10}},"30/50 Spots"))),r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer2",height:180,width:180,date:t,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}}),r.createElement("h2",{style:{padding:10}},"30/50 Spots "))),r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer3",height:180,width:180,date:e,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}}),r.createElement("h2",{style:{padding:10}},"30/50 Spots"))),r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer4",height:240,width:240,date:e,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}}),r.createElement("h2",{style:{padding:10}},"30/50 Spots"))),r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer5",height:240,width:240,date:t,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}}),r.createElement("h2",{style:{padding:10}},"30/50 Spots "))),r.createElement("div",{className:"video-card-container"},r.createElement("div",{className:"video-card"},r.createElement(l.default,{id:"timer8",height:300,width:300,date:e,holdDuration:500,countdownDays:4,onHoldComplete:function(){return alert("KUDOS")}})))))},t}(o.Component);t.default=c},971:function(e,t){},972:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);n(973);var r=function(e){var t=e.height,n=e.width,r=e.percentage,o=Math.floor(20*r),s=Math.ceil(20*(1-r));return a.createElement("div",{className:"manabar"},Array.from(Array(o).keys()).map(function(e){return a.createElement("div",{className:"parallelogram filled",key:e,style:{height:t,width:n}})}),Array.from(Array(s).keys()).map(function(e){return a.createElement("div",{className:"parallelogram unfilled",key:e,style:{height:t,width:n}})}))};t.default=r},973:function(e,t){},974:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);n(975);var r=function(e){var t=e.regenPips,n=e.style;return a.createElement("div",{className:"regen",style:n},Array.from(Array(t).keys()).map(function(e,n){return a.createElement("div",{key:n,className:"regen__pip",style:{animation:"blink "+.4*Array(t).length+"s infinite",animationDelay:.2*n+"s"}},"▶")}),a.createElement("div",{className:"regen__text"},t+"min / hr"))};t.default=r},975:function(e,t){},976:function(e,t,n){"use strict";var a=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function a(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}();Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(0);n(977);var s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={ETA:{totalms:0,hours:0,minutes:0,seconds:0},mousedown:!1,subscribed:!1,timerID:null,setIntervalID:null},t.onClick=function(){document.getElementById(t.props.id);t.state.subscribed},t.onMouseDown=function(){var e=document.getElementById(t.props.id);e.className=e.className.replace(" subscribed",""),e.className+=" mousedown",t.setState({mousedown:!0,subscribed:!1});var n=setTimeout(function(){t.state.mousedown&&(t.setState({subscribed:!0}),e.className+=" subscribed")},t.props.holdDuration);t.setState({timerID:n})},t.onMouseUp=function(){var e=document.getElementById(t.props.id);e.className=e.className.replace(" mousedown",""),clearTimeout(t.state.timerID),t.setState({mousedown:!1,timerID:void 0})},t.getETA=function(){var e=t.props.date-Date.now(),n=Math.floor(e/36e5).toString(),a=Math.floor(e%36e5/6e4).toString(),r=Math.floor(e%36e5%6e4/1e3).toString();t.setState({ETA:{totalms:e,hours:n.length<2?"0"+n:n,minutes:a.length<2?"0"+a:a,seconds:r.length<2?"0"+r:r}})},t}return a(t,e),t.prototype.componentWillMount=function(){var e=this;this.getETA();var t=setInterval(function(){e.getETA()},1e3);this.setState({setIntervalID:t})},t.prototype.componentDidMount=function(){var e=this;document.getElementById(this.props.id).onmousedown=this.onMouseDown,window.addEventListener("mouseup",this.onMouseUp);var t=document.getElementById(this.props.id+"_container").getElementsByClassName("trapezoid");Array.prototype.map.call(t,function(t,n){t.style.transform="rotate("+(-18*n-60)+"deg) translateX("+Math.floor(e.props.height/2.4)+"px)"})},t.prototype.componentWillUnmount=function(){window.removeEventListener("mouseup",this.onMouseUp),window.clearInterval(this.state.setIntervalID),window.clearTimeout(this.state.timerID)},t.prototype.render=function(){var e=this,t=24*this.props.countdownDays*60*60*1e3,n=this.state.ETA.totalms>0?Math.floor(20*(1-this.state.ETA.totalms/t)):20,a=this.state.ETA.totalms>0?Math.ceil(this.state.ETA.totalms/t*20):0;return r.createElement("div",{id:this.props.id+"_container",className:"countdown_timer",style:{height:this.props.height,width:this.props.width,flexBasis:this.props.height}},r.createElement("div",{id:this.props.id,className:"timer disable-select",style:{height:Math.floor(this.props.height/1.55),width:Math.floor(this.props.width/1.55)}},r.createElement("div",{className:"time"},r.createElement("span",null,this.state.ETA.hours+":"),r.createElement("span",null,this.state.ETA.minutes+":"),r.createElement("span",null,""+this.state.ETA.seconds)),r.createElement("div",{className:"subscribe"},this.state.subscribed?r.createElement("div",{className:"subscribed-text"},"Subscribed"):r.createElement("div",{className:"unsubscribed-text"},"Unsubscribed",r.createElement("div",{style:{fontSize:"0.9rem"}},"Hold to Subscribe")))),Array.from(Array(n).keys()).map(function(t){return r.createElement("div",{key:t,className:"trapezoid filled",style:{height:.14*e.props.height}})}),Array.from(Array(a).keys()).map(function(t){return r.createElement("div",{key:t,className:"trapezoid unfilled",style:{height:.14*e.props.height}})}))},t.defaultProps={countdownDays:7,date:2*Date.now()},t}(o.Component);t.default=s},977:function(e,t){}});