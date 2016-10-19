//首页焦点图效果
$(function(){
	var obj = $('.menu-c-banner');
	var objPic = obj.find('.bd');
	var objBtn = obj.find('.hd');
	var objPre = obj.find('.prev');
	var objNext = obj.find('.next');
	var picNumber = objPic.find('li').length;
	var btnHtml = '';
	for(var i = 1; i<=picNumber; i++){//初始化banner图片和按钮隐藏
		i == 1?btnHtml += '<li class="on"></li>':btnHtml += '<li></li>';
		//objPic.find('li').eq(i-1).css('z-index',picNumber+1-i);
		objPic.find('li').hide();
		objBtn.find('li').hide();
	}
	objBtn.find('ul').html(btnHtml);
	var cur = 1; //初始化第一次显示的图片
	var pre = 1; //定义上次显示的图片
	var next; 
	var speed = 500; //运行速度
	var times = 3000; //自动切换间隔时间
	var timer;
	var isPlay = 0; //是否在运行中
	init(cur);
	function init(c){
		//alert(c);
		if(isPlay == 0){
			isPlay = 1;
			clearTimeout(timer);
			objBtn.find('li').show();
			objBtn.find('li').removeClass('on');
			objBtn.find('li').eq(c-1).addClass('on');
			objPic.find('li').eq(pre-1).fadeOut(speed);
			objPic.find('li').eq(c-1).fadeIn(speed,function(){
				pre = c;
				isPlay = 0;
				next = c + 1;
				if(next > picNumber){next = 1;}
				cur = c;
				timer = setTimeout(_init(next),times); 
				function _init(c){return function(){init(c);}}  
			});	
		}
	}
	objBtn.find('li').on('click',function(){
		var indexs = objBtn.find('li').index(this);
		init(indexs+1);
	});
	objPre.on('click',function(){
		var s = cur - 1;
		if(s < 1){s = picNumber;}
		init(s);
	});
	objNext.on('click',function(){
		var s = cur + 1;
		if(s > picNumber){s = 1;}
		init(s);
	});
	
})


/*个人店铺资质证书左上小轮播图*/
jQuery(".shop-t-shuf").slide({mainCell:".bd ul",autoPlay:true});

/*弹窗样式表*/
var dpCss = '';
dpCss+='<style>';
dpCss+='.tc{text-align:center;width:100%;display:block;}';
dpCss+='.dp-img{text-align:center;}';
dpCss+='.dp-img img{max-width:900px; max-height:700px; position:fixed; z-index:9999; top:50%; left:50%;}';
dpCss+='.dp-img a{ display:inline; line-height:30px; font-size:32px; position:fixed; z-index:10000; right:30px; top:30px; height:32px; width:32px; background:#fff; border-radius:32px; color:#333; text-decoration:none;}';
dpCss+='.w-bg{position:fixed; z-index:9998; left:0; top:0; background-color:#000; width:100%; height:100%; opacity:0.5; filter:alpha(opacity=50);}';
dpCss+='</style>';
document.writeln(dpCss);

var dpHtml_1 = '';
dpHtml_1+='<a href="javascript:void(0);" onclick="windows_close();"><div class="w-bg"></div></a>';
dpHtml_1+='<div class="dp-img">';
dpHtml_1+='	<img src="" />';
dpHtml_1+='<a href="javascript:void(0);" onclick="windows_close();">×</a>';
dpHtml_1+='</div>';

//上部企业资质
$('#shop-t-shuf').find("img").click(function(){
	var imgs = $(this).attr("src");
	$("body").append(dpHtml_1);$('.dp-img').show();
	$(".dp-img").find("img").attr('src',imgs);
	var w = parseInt($(".dp-img").find("img").css('width'))/2;
	var h = parseInt($(".dp-img").find("img").css('height'))/2;
	$(".dp-img").find("img").css('margin-left','-'+w+'px');	
	$(".dp-img").find("img").css('margin-top','-'+h+'px');	
});
//左侧企业资质
$('.l-credential-box').find("img").click(function(){
	var imgs = $(this).attr("src");
	$("body").append(dpHtml_1);$('.dp-img').show();
	$(".dp-img").find("img").attr('src',imgs);
	var w = parseInt($(".dp-img").find("img").css('width'))/2;
	var h = parseInt($(".dp-img").find("img").css('height'))/2;
	$(".dp-img").find("img").css('margin-left','-'+w+'px');	
	$(".dp-img").find("img").css('margin-top','-'+h+'px');	
});
	
/*弹窗关闭事件*/
function windows_close(){
	$(".dp-img").hide().remove();
	$(".w-bg").hide().remove();
}
	

jQuery(".r-recommend-box.fl").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000});   //店家推荐
jQuery(".r-recommend-box.fr").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000});    //热卖推荐

/*首页右侧焦点图*/
jQuery(".slideBox").slide({mainCell:".bd ul",autoPlay:true});

// 返回顶部 浮动框
function setCXPos() {
	$('.cx_new').css({
		'right':	function(){
			return ($(window).width() - 1190) / 2 - 55;
		},
		'bottom':	80
	});
}
$(document).ready(function(e) {
	$('.cx_new').find('.but').click(function(){
		$(document.body).animate({
			'scrollTop': 0
		}, 800);
	});
	setCXPos();
});

//JiaThis分享
var jiathis_config={
	url:"http://www.cnhnb.com/",
	summary:"中国惠农网",
	title:"惠农 ##",
	shortUrl:false,
	hideMore:false
}
