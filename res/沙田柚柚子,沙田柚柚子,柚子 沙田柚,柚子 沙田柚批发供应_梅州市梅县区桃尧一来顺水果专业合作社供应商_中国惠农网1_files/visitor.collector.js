var Visit =(function(j){
	
	String.prototype.trim = function()  
 	{  
 	    return this.replace(/(^\s*)|(\s*$)/g, "");  
 	} ;
	
	var V = {};
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var visitor_cookie_key = "visitor_cookie_key";
	var visit_analiysis_url = "http://ac.{domain}/hn-analysis-web/visitor/collect";
//	var visit_analiysis_url = "http://zhou.cnhnkj.cn/hn-analysis-web/visitor/collect";
	var jquery_url = "http://static.cnhnb.com/js/base/jquery-1.7.2.min.js";
	/**
	 * 推送访问记录
	 * @param module 系统模块：如店铺、产品等
	 */
	
	V.push = function(module,visitRecord){
		 var browserName = getBrowserName();
		 visitRecord.browser = browserName;
		 visitRecord.module = module ;
		 visitRecord.clientId = visitor_cookie_value;
		 if(!j){
			 dinamicIncludeJs(jquery_url, function(){
				 j = jQuery ;
				 post(visitRecord);
			 });
		 }else{
			 post(visitRecord);
		 }
	};
	
	
	function post(visitRecord)
	{
		for(i in visitRecord){
			 if(visitRecord[i] == null || typeof  visitRecord[i] === "undefined" || j.trim(visitRecord[i]) == ""){
				  //如果属性值为空或者数据不存在则将属性移除.
				  j(visitRecord).removeProp(i);
			 }
		 };
		 var post_url = visit_analiysis_url.replace("{domain}", getDomain());
		 j.ajax({
			 type : "get",
			 async : false,
			 url : post_url,
			 dataType : "jsonp",
			 jsonp : "",
			 data : visitRecord
			});
	}	
	
	
	/**
 	 * 动态引入js
 	 */
	function dinamicIncludeJs(url, callback){
 		var script = document.createElement("script");
 		script.setAttribute("type","text/javascript");
 		var head = document.getElementsByTagName("head")[0];
 		var hasAppend = false ;
 		script.onload  = script.onreadystatechange = function() {
 		    if(!hasAppend && (!this.readyState
					|| this.readyState == "loaded" || this.readyState == "complete")){
 		    	hasAppend =true ;
 		    	callback.call();
 		    }
 		   script.onload = script.onreadystatechange = null;
 		   head.removeChild(script);
 		};
 		script.setAttribute("src",url);
 		head.appendChild(script);
 	};
 	
 	function getBrowserName(){
 		var agent = window.navigator.userAgent.toLowerCase() ;
 		if(agent.indexOf("msie") > 0)
 		{return "ie"; }
 		else if(agent.indexOf("firefox") > 0)
 		{return "firefox";}
 		else if(agent.indexOf("chrome") > 0)
 		{return "chrome";}
 		else if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
 		{return "safari";}
 		else{return "other";}
 	};
 	
 	function getDomain(){
 	  var domain = window.document.domain; //http://www.cnhnb.com
 	  var domainchars = domain.split(".");
 	  domain = "";
 	  for(var i = 1 ; i < domainchars.length ; i ++){
 		 domain += (i == 1 ? "" : ".") + domainchars[i] ;
 	  }
 	  return domain ;
 	}
 	
 	var visitor_cookie_value  ;
 	function initCookie(){
 		//客户标识
 		visitor_cookie_value = getCookie(visitor_cookie_key);
 	 	if(typeof visitor_cookie_value == 'undefined' || visitor_cookie_value == null){
 	 		visitor_cookie_value = addVisitorCookie();
 	 	}
 	}
 	
    function uuid() {
 	    var chars = CHARS, uuid = new Array(36), rnd=0, r;
 	    for (var i = 0; i < 36; i++) {
 	      if (i==8 || i==13 ||  i==18 || i==23) {
 	        uuid[i] = '-';
 	      } else if (i==14) {
 	        uuid[i] = '4';
 	      } else {
 	        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
 	        r = rnd & 0xf;
 	        rnd = rnd >> 4;
 	        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
 	      }
 	    }
 	    return uuid.join('');
 	};
 	
 	
 	function getCookie(name){
 		var cookies =document.cookie;
 		if(cookies != null && cookies != ""){
 			cookies = cookies.split(";");
 			for(var i = 0 ; i < cookies.length ; i++){
 				var cookie =  cookies[i];
 				var cookiearrs = cookie.split("=");
 				if(cookiearrs != null && name == cookiearrs[0].trim())
 					return decodeURIComponent(cookiearrs[1]);
 			}
 		}
 	}
 	
 	function addVisitorCookie(){
 		var uid = uuid();
 		var cookieStr = visitor_cookie_key + "=" +uid ;
 		cookieStr += ";path=/";
 		cookieStr += ";domain=."+getDomain();
 		var date=new Date(); 
 		date.setTime(date.getTime()+ 24*60*60*1000); //失效时间为当前时间+1天
 		cookieStr += ";expires="+date.toGMTString();
 		document.cookie = cookieStr;
 		return uid ;
 	}
 	initCookie();
 	return V;
})(window.$);