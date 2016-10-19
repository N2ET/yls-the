//搜本店
function searchLocal(){
	  var keyword = hnUtil.trim($("#keyword").val() || "");
	  if(keyword == "" || keyword == "请输入产品名称"){
			hnUtil.message.alert("请输入搜索内容!");
			  return false;
	  }
	  var searchWebUrl =  shopinfo.hnShopUrl + "supply";
	  $("#category").val("");
	  $("#breed").val("");
	  $("#keyword").attr("name","k");;
	  $("#searchForm").attr("action",searchWebUrl); 
	  $("#searchForm").submit();
	}
 
			
//搜全站
function searchNet(){
	var keyword = hnUtil.trim($("#keyword").val() || "");
	if(keyword == "" || keyword =="请输入产品名称"){
		hnUtil.message.alert("请输入搜索内容!");
		  return false;
	}
	$("#keyword").attr("name","keyword");
	var searchWebUrl = shopinfo.hnWebUrlContainer.WEB_HOME_URL+"k/s";
	$("#searchForm").attr("action",searchWebUrl); 
	$("#searchForm").submit();
}

function clearText(field) {
	if (field.defaultValue == field.value){
		field.value = '';
	}
	else if (field.value == ''){
		field.value = field.defaultValue;
	}
}

$(function(){
	$("#searchNet").bind("click",function(){
		searchNet();
	});
	
	$("#searchLocal").bind("click",function(){
		searchLocal();
	});
	
	$("#keyword").keydown(function(event){
		var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
		 if (lKeyCode == 13) {
			 searchNet();
		}
	});
});