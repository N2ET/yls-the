// 店铺相关信息
var shopinfo = (function(){
	return{
		//店铺Code
		shopCode :null,
		//店铺id
		shopId :null,
		//店铺对应的惠农UserId
		shopHnUserId : null ,
		//惠农网各部件访问域名集合
		hnWebUrlContainer : null ,
		hnShopUrl :null ,
		logonUserInfo : null ,
		domain :null ,
		menuContainer :{
		  name :{
			  menu_sy :"首页",
			  menu_gysjj :"供应商简介",
			  menu_cplb :"产品列表",
			  menu_gyxx: "供应信息",
			  menu_gysxc :"供应商相册",
			  menu_lxwm :"联系我们",
			  menu_cpxq :"产品详情"
		  }
		},
		
		setShopCode :function(shopCode){
			this.shopCode = shopCode;
		},
		setShopId : function(shopId){
			this.shopId = shopId ;
		},
		setShopHnUserId :function(shopHnUserId){
			this.shopHnUserId = shopHnUserId ;
		},
		sethnWebUrlContainer :function(container){
			this.hnWebUrlContainer = container;
		},
		setHnShopUrl : function(hnShopUrl){
			this.hnShopUrl = hnShopUrl;
		},
		/**
		 * 因为需要兼容2种地址跳转同一个地址，添加新方法
		 */
		getSpecUrl:function(){
		    var domain = this.domain;  var commonPath = "common";
		    if(domain) commonPath = domain.toLowerCase().indexOf("shop") >= 0 ? "common/" :"shop/common/";
		    return domain + commonPath ;
		}
	};
})();


/**
 * 2015电商评选活动结果图标显示
 */
faithSupplyer = {title:"2015诚信供应商",url:"img/logo/faitherSupplyer.png"},
hotSupplyer = {title:"2015惠农人气电商",url:"img/logo/hotSupplyer.png"},
hnPioneer = {title:"2015惠农电商先锋",url:"img/logo/hnPioneer.png"},
faithImg = "",hotImg = "",poinnerImg = "";
function initActivityResutlLogo(){
	var endTime = "2017-03-04 00:00:00";
	var today = new Date();
	if(Date.parse(endTime) < Date.parse(today.toString())){
		return;
	}
	faithImg = $("<img style='float:left;margin:1px 3px 0 0;' src='" + shopinfo.hnWebUrlContainer.HN_RESOURCE_URL + faithSupplyer.url + "' alt='" + faithSupplyer.title + "' title='" + faithSupplyer.title + "'/>");
	hotImg = $("<img style='float:left;margin:1px 3px 0 0;' src='" + shopinfo.hnWebUrlContainer.HN_RESOURCE_URL + hotSupplyer.url + "' alt='" + hotSupplyer.title + "' title='" + hotSupplyer.title + "'/>");
	poinnerImg = $("<img style='float:left;margin:1px 3px 0 0;' src='" + shopinfo.hnWebUrlContainer.HN_RESOURCE_URL + hnPioneer.url + "' alt='" + hnPioneer.title + "' title='" + hnPioneer.title + "'/>");
	liE = $("<li style='width: 190px;height: 20px;float: left;padding-top: 5px;'></li>");
	divE = $("<div style='width:208px; height:20px;'></div>");
	var id = shopinfo.shopHnUserId;
	switch(parseInt(id))
	{
		case 108:
			if($(".l-info-tit").length != 0){
				divE.prepend(poinnerImg);
				$(".l-info-tit").prepend(divE);
			}else if($(".info .title").length != 0){
				$(".info .title").prepend(poinnerImg);
			}else if($("#supplierName").length != 0){
				$("#supplierName").prepend(poinnerImg);
			}else if($(".side-contact").length != 0){
				liE.prepend(poinnerImg);
				$(".side-contact").prepend(liE);
			}
			break;
		case 277364:
			if($(".l-info-tit").length != 0){
				divE.prepend(faithImg);
				divE.prepend(hotImg);
				$(".l-info-tit").prepend(divE);
			}else if($(".info .title").length != 0){
				$(".info .title").prepend(faithImg);
				$(".info .title").prepend(hotImg);
			}else if($("#supplierName").length != 0){
				$("#supplierName").prepend(faithImg);
				$("#supplierName").prepend(hotImg);
			}else if($(".side-contact").length != 0){
				liE.prepend(faithImg);
				liE.prepend(hotImg);
				$(".side-contact").prepend(liE);
			}
			break;
		case 416673:
			if($(".l-info-tit").length != 0){
				divE.prepend(poinnerImg);
				divE.prepend(faithImg);
				divE.prepend(hotImg);
				$(".l-info-tit").prepend(divE);
			}else if($(".info .title").length != 0){
				$(".info .title").prepend(poinnerImg);
				$(".info .title").prepend(faithImg);
				$(".info .title").prepend(hotImg);
			}else if($("#supplierName").length != 0){
				$("#supplierName").prepend(poinnerImg);
				$("#supplierName").prepend(faithImg);
				$("#supplierName").prepend(hotImg);
			}else if($(".side-contact").length != 0){
				liE.prepend(poinnerImg);
				liE.prepend(faithImg);
				liE.prepend(hotImg);
				$(".side-contact").prepend(liE);
			}
			break;
		
		// 生产环境
		case 400779:
			initFaith();
			break;
		case 348390:
			initFaith();
			break;
		case 308683:
			initFaith();
			break;
		case 419121:
			initPoinnerFaith();
			break;
		case 389621:
			initFaith();
			break;
		case 333630:
			initFaith();
			break;
		case 371921:
			initHotPoinner();
			break;
		case 524448:
			initHot();
			break;
		case 464666:
			initHot();
			break;
		case 410114:
			initHot();
			break;
		case 99287:
			initHot();
			break;
		case 232699:
			initHot();
			break;
		case 536094:
			initHot();
			break;
		case 539129:
			initHot();
			break;
		case 535895:
			initHot();
			break;
		case 234048:
			initHot();
			break;
		case 519343:
			initHot();
			break;
		case 552120:
			initHot();
			break;
		case 415979:
			initHot();
			break;
		case 365636:
			initHot();
			break;
		case 6820:
			initHot();
			break;
		case 396240:
			initHot();
			break;
		case 221033:
			initPoinner();
			break;
		case 508072:
			initPoinner();
			break;
	}
}

function initFaith(){
	if($(".l-info-tit").length != 0){
		divE.prepend(faithImg);
		$(".l-info-tit").prepend(divE);
	}else if($(".info .title").length != 0){
		$(".info .title").prepend(faithImg);
	}else if($("#supplierName").length != 0){
		$("#supplierName").prepend(faithImg);
	}else if($(".side-contact").length != 0){
		liE.prepend(faithImg);
		$(".side-contact").prepend(liE);
	}
}

function initPoinnerFaith(){
	if($(".l-info-tit").length != 0){
		divE.prepend(faithImg);
		divE.prepend(poinnerImg);
		$(".l-info-tit").prepend(divE);
	}else if($(".info .title").length != 0){
		$(".info .title").prepend(faithImg);
		$(".info .title").prepend(poinnerImg);
	}else if($("#supplierName").length != 0){
		$("#supplierName").prepend(faithImg);
		$("#supplierName").prepend(poinnerImg);
	}else if($(".side-contact").length != 0){
		liE.prepend(faithImg);
		liE.prepend(poinnerImg);
		$(".side-contact").prepend(liE);
	}
}
function initHotPoinner(){
	if($(".l-info-tit").length != 0){
		divE.prepend(poinnerImg);
		divE.prepend(hotImg);
		$(".l-info-tit").prepend(divE);
	}else if($(".info .title").length != 0){
		$(".info .title").prepend(poinnerImg);
		$(".info .title").prepend(hotImg);
	}else if($("#supplierName").length != 0){
		$("#supplierName").prepend(poinnerImg);
		$("#supplierName").prepend(hotImg);
	}else if($(".side-contact").length != 0){
		liE.prepend(poinnerImg);
		liE.prepend(hotImg);
		$(".side-contact").prepend(liE);
	}
}

function initHot(){
	if($(".l-info-tit").length != 0){
		divE.prepend(hotImg);
		$(".l-info-tit").prepend(divE);
	}else if($(".info .title").length != 0){
		$(".info .title").prepend(hotImg);
	}else if($("#supplierName").length != 0){
		$("#supplierName").prepend(hotImg);
	}else if($(".side-contact").length != 0){
		liE.prepend(hotImg);
		$(".side-contact").prepend(liE);
	}
}

function initPoinner(){
	if($(".l-info-tit").length != 0){
		divE.prepend(poinnerImg);
		$(".l-info-tit").prepend(divE);
	}else if($(".info .title").length != 0){
		$(".info .title").prepend(poinnerImg);
	}else if($("#supplierName").length != 0){
		$("#supplierName").prepend(poinnerImg);
	}else if($(".side-contact").length != 0){
		liE.prepend(poinnerImg);
		$(".side-contact").prepend(liE);
	}
}
$(document).ready(function(){
	//初始化菜单样式
	var menuOrder = $("#menu_order").val() || 'sy';
	//设置导航菜单的选中样式
	$(".shop_nav ul li").find("a[m='" + menuOrder + "']").attr("class","cur");
    //当前页面位置
	var currrentPostionHtml = shopinfo.menuContainer.name["menu_" + menuOrder] || "";
	$("#hn_current_position").html(currrentPostionHtml.replace("{hnShopUrl}",shopinfo.hnShopUrl));
	// 初始化评选图标
	initActivityResutlLogo();
});
