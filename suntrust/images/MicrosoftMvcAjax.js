Type.registerNamespace("Sys.Mvc"),Sys.Mvc.$create_AjaxOptions=function(){return{}},Sys.Mvc.InsertionMode=function(){},Sys.Mvc.InsertionMode.prototype={replace:0,insertBefore:1,insertAfter:2},Sys.Mvc.InsertionMode.registerEnum("Sys.Mvc.InsertionMode",!1),Sys.Mvc.AjaxContext=function(n,t,i,r){this.$3=n,this.$4=t,this.$1=i,this.$0=r},Sys.Mvc.AjaxContext.prototype={$0:0,$1:null,$2:null,$3:null,$4:null,get_data:function(){return this.$2?this.$2.get_responseData():null},get_insertionMode:function(){return this.$0},get_loadingElement:function(){return this.$1},get_object:function(){var n=this.get_response();return n?n.get_object():null},get_response:function(){return this.$2},set_response:function(n){return this.$2=n,n},get_request:function(){return this.$3},get_updateTarget:function(){return this.$4}},Sys.Mvc.AsyncHyperlink=function(){},Sys.Mvc.AsyncHyperlink.handleClick=function(n,t,i){t.preventDefault(),Sys.Mvc.MvcHelpers.$2(n.href,"post","",n,i)},Sys.Mvc.MvcHelpers=function(){},Sys.Mvc.MvcHelpers.$0=function(n,t,i){var f,e;if(n.disabled)return null;f=n.name;if(f){var o=n.tagName.toUpperCase(),r=encodeURIComponent(f),u=n;if(o==="INPUT"){e=u.type;if(e==="submit")return r+"="+encodeURIComponent(u.value);if(e==="image")return r+".x="+t+"&"+r+".y="+i}else if(o==="BUTTON"&&f.length&&u.type==="submit")return r+"="+encodeURIComponent(u.value)}return null},Sys.Mvc.MvcHelpers.$1=function(n){for(var v=n.elements,t=new Sys.StringBuilder,y=v.length,i,r,e,l,u,c,a,f,s,h,o=0;o<y;o++){i=v[o],r=i.name;if(!r||!r.length)continue;e=i.tagName.toUpperCase();if(e==="INPUT")l=i,u=l.type,(u==="text"||u==="password"||u==="hidden"||(u==="checkbox"||u==="radio")&&i.checked)&&(t.append(encodeURIComponent(r)),t.append("="),t.append(encodeURIComponent(l.value)),t.append("&"));else if(e==="SELECT")for(c=i,a=c.options.length,f=0;f<a;f++)s=c.options[f],s.selected&&(t.append(encodeURIComponent(r)),t.append("="),t.append(encodeURIComponent(s.value)),t.append("&"));else e==="TEXTAREA"&&(t.append(encodeURIComponent(r)),t.append("="),t.append(encodeURIComponent(i.value)),t.append("&"))}return h=n._additionalInput,h&&(t.append(h),t.append("&")),t.toString()},Sys.Mvc.MvcHelpers.$2=function(n,t,i,r,u){var e,c,l,f,a,o,s,h;if(u.confirm)if(!confirm(u.confirm))return;u.url&&(n=u.url),u.httpMethod&&(t=u.httpMethod),i.length>0&&!i.endsWith("&")&&(i+="&"),i+="X-Requested-With=XMLHttpRequest",e=t.toUpperCase(),c=e==="GET"||e==="POST",c||(i+="&",i+="X-HTTP-Method-Override="+e),l="",e==="GET"||e==="DELETE"?n.indexOf("?")>-1?(n.endsWith("&")||(n+="&"),n+=i):(n+="?",n+=i):l=i,f=new Sys.Net.WebRequest,f.set_url(n),c?f.set_httpVerb(t):(f.set_httpVerb("POST"),f.get_headers()["X-HTTP-Method-Override"]=e),f.set_body(l),t.toUpperCase()==="PUT"&&(f.get_headers()["Content-Type"]="application/x-www-form-urlencoded;"),f.get_headers()["X-Requested-With"]="XMLHttpRequest",a=null,u.updateTargetId&&(a=$get(u.updateTargetId)),o=null,u.loadingElementId&&(o=$get(u.loadingElementId)),s=new Sys.Mvc.AjaxContext(f,a,o,u.insertionMode),h=!0,u.onBegin&&(h=u.onBegin(s)!==!1),o&&Sys.UI.DomElement.setVisible(s.get_loadingElement(),!0),h&&(f.add_completed(Function.createDelegate(null,function(){Sys.Mvc.MvcHelpers.$3(f,u,s)})),f.invoke())},Sys.Mvc.MvcHelpers.$3=function($p0,$p1,$p2){var $0,$1;$p2.set_response($p0.get_executor());if($p1.onComplete&&$p1.onComplete($p2)===!1)return;$0=$p2.get_response().get_statusCode();if($0>=200&&$0<300||$0===304||$0===1223){$0!==204&&$0!==304&&$0!==1223&&($1=$p2.get_response().getResponseHeader("Content-Type"),$1&&$1.indexOf("application/x-javascript")!==-1?eval($p2.get_data()):Sys.Mvc.MvcHelpers.updateDomElement($p2.get_updateTarget(),$p2.get_insertionMode(),$p2.get_data()));if($p1.onSuccess)$p1.onSuccess($p2)}else if($p1.onFailure)$p1.onFailure($p2);$p2.get_loadingElement()&&Sys.UI.DomElement.setVisible($p2.get_loadingElement(),!1)},Sys.Mvc.MvcHelpers.updateDomElement=function(n,t,i){if(n)switch(t){case 0:n.innerHTML=i;break;case 1:i&&i.length>0&&(n.innerHTML=i+n.innerHTML.trimStart());break;case 2:i&&i.length>0&&(n.innerHTML=n.innerHTML.trimEnd()+i)}},Sys.Mvc.AsyncForm=function(){},Sys.Mvc.AsyncForm.handleClick=function(n,t){var i=Sys.Mvc.MvcHelpers.$0(t.target,t.offsetX,t.offsetY);n._additionalInput=i},Sys.Mvc.AsyncForm.handleSubmit=function(n,t,i){var u,r,e,f;t.preventDefault(),u=n.validationCallbacks;if(u)for(r=0;r<u.length;r++){e=u[r];if(!e())return}f=Sys.Mvc.MvcHelpers.$1(n),Sys.Mvc.MvcHelpers.$2(n.action,n.method||"post",f,n,i)},Sys.Mvc.AjaxContext.registerClass("Sys.Mvc.AjaxContext"),Sys.Mvc.AsyncHyperlink.registerClass("Sys.Mvc.AsyncHyperlink"),Sys.Mvc.MvcHelpers.registerClass("Sys.Mvc.MvcHelpers"),Sys.Mvc.AsyncForm.registerClass("Sys.Mvc.AsyncForm");