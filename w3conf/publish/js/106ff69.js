window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var b=[].slice.call(arguments);typeof console.log==="object"?log.apply.call(console.log,console,b):console.log.apply(console,b)}};
(function(b){function e(){}for(var h="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),f;f=h.pop();)b[f]=b[f]||e})(function(){try{return console.log(),window.console}catch(b){return window.console={}}}());
typeof Element!=="undefined"&&function(){var b=Element.prototype,e=Object;if(!e.hasOwnProperty.call(b,"classList")){var h=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},f=Array.prototype.indexOf||function(a){for(var c=0,b=this.length;c<b;c++)if(c in this&&this[c]===a)return c;return-1},g=function(a,c){if(c==="")throw"SYNTAX_ERR";if(/\s/.test(c))throw"INVALID_CHARACTER_ERR";return f.call(a,c)},i=function(a){for(var c=h.call(a.className),c=c?c.split(/\s+/):[],b=0,d=c.length;b<
d;b++)this.push(c[b]);this.updateClassName=function(){a.className=this.toString()}},d=i.prototype=[],j=function(){return new i(this)};d.item=function(a){return this[a]||null};d.contains=function(a){a+="";return g(this,a)!==-1};d.add=function(a){a+="";g(this,a)===-1&&(this.push(a),this.updateClassName())};d.remove=function(a){a+="";a=g(this,a);a!==-1&&(this.splice(a,1),this.updateClassName())};d.toggle=function(a){a+="";g(this,a)===-1?this.add(a):this.remove(a)};d.toString=function(){return this.join(" ")};
if(e.defineProperty){d={get:j,enumerable:!0,configurable:!0};try{e.defineProperty(b,"classList",d)}catch(k){if(k.number===-2146823252)d.enumerable=!1,e.defineProperty(b,"classList",d)}}else e.prototype.__defineGetter__&&b.__defineGetter__("classList",j)}}();
var slideshow=new SlideShow(document.getElementById("presentation"));
