$(function(){
	$("#topmenu1 li").hover(function(){
		$(this).addClass("hover").find("div.tp-cont").show();
	},function(){
		$(this).removeClass("hover").find("div.tp-cont").hide();
	});
	
});

$(document).ready(function() {
	
	$("#topmenu li, #topmenu_wel li").hover(function(){
	$(this).addClass("hover").find("div.tp-cont").show();
},function(){
	$(this).removeClass("hover").find("div.tp-cont").hide();
});

	$(".select").each(function(){
		var s=$(this);
		var z=parseInt(s.css("z-index"));
		var dt=$(this).children("dt");
		var dd=$(this).children("dd");
		var _show=function(){dd.slideDown(200);dt.addClass("cur");s.css("z-index",z+1);};   //灞曞紑鏁堟灉
		var _hide=function(){dd.slideUp(200);dt.removeClass("cur");s.css("z-index",z);};    //鍏抽棴鏁堟灉
		dt.click(function(){dd.is(":hidden")?_show():_hide();});
		dd.find("a").click(function(){dt.html($(this).html());_hide();});     //	"value"鍊�锛�
		$("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
	})
	
	$curtainopen = false;
	
	$(".rope").click(function(){
		$(this).blur();
		if ($curtainopen == false){ 
			$(this).stop().animate({top: '0px' }, {queue:false, duration:350, easing:'easeOutBounce'}); 
			$(".leftcurtain").stop().animate({width:'60px'}, 2000);
			$(".rightcurtain").stop().animate({width:'60px'},2000,function(){
				$(".leftcurtain").fadeOut(1000);
				$(".rightcurtain").fadeOut(1000);
				});
			$("#mask").fadeOut(2500);  
			$("body").css("overflow","auto");
			$(".rope").fadeOut(300);
			
			$curtainopen = true;
		}else{
			$(this).stop().animate({top: '-40px' }, {queue:false, duration:350, easing:'easeOutBounce'}); 
			$(".leftcurtain").stop().animate({width:'50%'}, 2000 );
			$(".rightcurtain").stop().animate({width:'51%'}, 2000 );
			$curtainopen = false;
		}
		return false;
	});
	
});


/* 店铺页面页头 店铺管理js */
$(".head-shop-manage").hover(
	function () {
		$(".head-shop-manage ul").show();
		$(".head-shop-manage-top").css("background-position-y","10px");
	},
	function () {
		$(".head-shop-manage ul").hide();
		$(".head-shop-manage-top").css("background-position-y","-40px");
	}
);
/* 页头二维码 */
$(".home-ewm").hover(
	function () {
		$(".home-ewm-big").show();
	},
	function () {
		$(".home-ewm-big").hide();
	}
);

/*左侧栏-产品分类*/
$('.l-classify-box dt').toggle(function() {
	$(this).nextAll('dd').show();
	$(this).css("background-position-y","-39px");
}, function() {
	$(this).nextAll('dd').hide();
	$(this).css("background-position-y","10px");
});
$('.l-classify-box dt a').click(function(e){
	e.stopPropagation();
});

/*-- 左侧浮动点击洽谈 --*/
$(".shop-l-discuss").click(function() {
	$('.l-discuss-box').show();
});
$(".l-d-box-tit").click(function() {
	$('.l-discuss-box').hide();
});


/*-- 二维码分享 --*/
$(function(){
	$('.shop-con-l-ewm .s-dot').hover(
		function () {
			$(".s-dot-box").show();
		},
		function () {
			$(".s-dot-box").hide();
		}
	);
});
/*4.0处理分享
window._bd_share_config = {
		common : {
			bdText : '',	
			bdDesc : '',	
			bdUrl : '', 	
			bdPic : ''
		},
		share : [{
			"bdSize" : 32
		}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
*/