var passportUrl = "";
var addressCookieKeyPrefix="addr_coo_key_prefix_";
var addressCookieExdays=2;
$(document).ready(function(){
	var userId=null;
	var username=null;
	var local = document.location.href ;
	var domain = getDomain();//'cnhnb.com';
	var homeUrl = getDomain()=='cnhnkj.cn'?'http://test.'+getDomain()+'/':'http://www.'+getDomain()+'/';
	passportUrl = "https://passport."+getDomain();
	
	function getDomain(){
 	  var domain = window.document.domain;
 	  var domainchars = domain.split(".");
 	  domain = "";
 	  for(var i = 1 ; i < domainchars.length ; i ++){
 		 domain += (i == 1 ? "" : ".") + domainchars[i] ;
 	  }
 	  return domain ;
 	}

	
	//请登录链接
	if($(".p-login")){
		var loginObj = $(".p-login a");
		loginObj.each(function(){
			var loginUrl =  $(this).attr("href");
			if(typeof(logoutUrl) != undefined && loginUrl.indexOf("returnUrl")>=0){
				$(this).attr("href",loginUrl.replace(loginUrl.split("returnUrl=")[1],local));
			}
		});
	}
	
	get(passportUrl);
	//加载购物车信息
	getCartInfo(homeUrl);
	//退出登录链接
	if($(".o-login")){
		var operObj = $(".o-login a");
		operObj.each(function(index){
			var logoutUrl = $(this).attr("href");
			if(typeof(logoutUrl) != undefined && logoutUrl.indexOf("returnUrl")>=0){
				 $(this).attr("href",logoutUrl.replace(logoutUrl.split("returnUrl=")[1],local));
			}
		});
	}
	
	$('.dropdown', '.topbar').hover(function(){
        $(this).addClass('hover');
    }, function(){
        $(this).removeClass('hover');
    });
	
	//初始化头部地址选中
	initAddress();
});

function get(passportUrl){
		$.ajax({    
        url: passportUrl + "/loginInfo",  // 跨域URL   
        type: 'POST',    
        dataType: 'jsonp',  
        jsonp : "callback",
		jsonpCallback: "setLogonUserInfo",
        success: function (data) {
        	if(data){
    	    	userId = data.userId;
    	    	username = data.username;
    	    	if(userId!=null&&userId!=""){
    	    		$("#userLoginInfo").show();//账号显示
    	    		$("#userName a").html("您好，"+username);
    	    		$("#userNoLoginInfo").hide();//请登录
    	    		//系统未读消息
    	    		$.getJSON(passportUrl + "/loginInfo/getusermsg?userid='"+userId+"'&callback=?", function(data) {			
    	    			if (data.success) {
    	    				if(parseInt(data.msgcount)>99){
    	    					$("#userLoginInfo .msg-mark").append("<em>99</em>");
    	    					$("#userLoginInfo .msg-mark").append("<sup>+</sup>");
    	    				}else{
    	    					$("#userLoginInfo .msg-mark").append("<em>"+data.msgcount+"</em>");
    	    				}
    	    			} else {
    	    				$("#userLoginInfo .msg-mark").append("<em>0</em>");
    	    			}
    	    		});
    	    	}else{
    	    		$("#userLoginInfo").hide();//账号显示
    	    		$("#userNoLoginInfo").show();//请登录
    	    		clearLoginInfoCookie();
    	    	}
    	    }else{
    	    	$("#userLoginInfo").hide();
    	    	clearLoginInfoCookie();
    	    }
        } 
		});
	}; 

function setLogonUserInfo(data){
	if(typeof loginCallback === 'function'){
		loginCallback.apply(window, [data]);
	}
};

function clearLoginInfoCookie(){
	var userid_key = "HNUSERID";
	var useraccount_key = "HNACCOUNT";
	var ticket_key = "hn_sso_ticket_cookie_key";
	if((getCookie(userid_key) && getCookie(userid_key)!="") || (getCookie(ticket_key) && getCookie(ticket_key)!="")){
		delCookie(userid_key);
		delCookie(useraccount_key);
		delCookie(ticket_key);
	}
}

function getDomain(){
  var domain = window.document.domain;
  var domainchars = domain.split(".");
  domain = "";
  for(var i = 1 ; i < domainchars.length ; i ++){
	 domain += (i == 1 ? "" : ".") + domainchars[i] ;
  }
  return domain ;
}


/** 公共购物车 **/
function getCartInfo(url){	
	   if($("#myCartId").length == 0 && $("#myCarRightId").length ==0){
		   return false;
	   }
	   var _url = url+'getCart';
	   var _data = {};
	   $.ajax({    
	        url:_url,  // 跨域URL   
	        type: 'get',    
	        data:_data,
	        dataType: 'jsonp',  
	        jsonp : "jsonpCallback",
	        contentType: "application/json;utf-8",
	        success: function (_data) {
	        	var data = $.parseJSON(_data);
	        	var cartCount = data.productCateNum || 0 ;
	        	if($("#myCarRightId").length == 1 && cartCount> 0){
	        		$("#myCarRightId").show();
	        		$("#myCarRightId").html(cartCount);
	        	}
	        	if($("#myCartId").length == 1 && cartCount> 0){
	        		$("#myCartId").addClass("msg-mark");
	        		if(cartCount>99){
		        		var _html = "<em>"+cartCount+"</em><sup>+</sup>";
		        		$("#myCartId").html(_html);
		        	}else{
		        		var _html = "<em>"+cartCount+"</em>";
		        		$("#myCartId").html(_html);
		        	}
	        	}
	        },
	        error : function(data)
	        {
	        }
	   });
}
//加载右侧导航
document.write('<scri'+'pt src="http://im.'+getDomain()+'/index.js" type="text/javascript"></s'+'cript>');
/** 初始化选中地址 **/
function initAddress(){
	if($(".topbar .dropdown-layer .list a").length == 0){
		   return false;
	}
	//绑定事件
	$(".topbar .dd-city-list a").bind("click",function(){
		var sel_addr_id = $(".topbar .dropdown-layer .list .selected").attr("data-id");
		$(".topbar .dropdown-layer .list .selected").removeClass('selected');
		$(this).addClass('selected');
		$("#topbar_address").html($(this).text());
		//删除cookie
		 clearCookieAll();
		//添加新cookie
		setCookie(addressCookieKeyPrefix+$(this).attr("data-id"),$(this).attr("data-id"),addressCookieExdays);
		$(this).parents('.dropdown').removeClass("hover");
	});
	//从cookie里面获取选中的地址
	var flag = false;
	$.each($(".topbar .dropdown-layer .list a"),function(i,obj){
		var  addr_data_id = $(obj).attr("data-id");
		var  cookieVal = getCookie(addressCookieKeyPrefix+addr_data_id);
		if(cookieVal && cookieVal!=""){
			$(".topbar .dropdown-layer .list .selected").removeClass('selected');
			$(obj).addClass('selected');
			$("#topbar_address").html($(obj).text());
			flag = true;
		}
	});
	if(flag){
		return false;
	}
	//根据浏览器ip获取选中地址
	try{
		$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result){  
			if (remote_ip_info.ret == '1'){  
				$.each($(".topbar .dropdown-layer .list a"),function(i,obj){
					var  province = $(obj).text();
					if(remote_ip_info.province.indexOf(province)!=-1){
						$(".topbar .dropdown-layer .list .selected").removeClass('selected');
						$(obj).addClass('selected');
						$("#topbar_address").html(province);
					}
				});
			} 
		});  
		
	}catch(e){
		 console.error('根据ip地址获取省份信息异常'+e);
	}
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + '' + ";expires=" + exp.toGMTString() + ";path=/;domain=."+getDomain()+"";
    }
}

function clearCookieAll(){
	$.each($(".topbar .dropdown-layer .list a"),function(i,obj){
		var  addr_data_id = $(obj).attr("data-id");
		clearCookie(addressCookieKeyPrefix+addr_data_id);
	});
}