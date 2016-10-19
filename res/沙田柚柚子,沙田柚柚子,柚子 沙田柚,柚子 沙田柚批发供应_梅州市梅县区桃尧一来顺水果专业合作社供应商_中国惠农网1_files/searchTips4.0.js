(function(window){
/* 插件开始 */
var autoComplete=function(o){
    var handler=(function(){
        var handler=function(e,o){ return new handler.prototype.init(e,o); };/* 为每个选择的dom都创建一个相对应的对象，这样选择多个dom时可以很方便地使用 */
        handler.prototype={
            e:null, o:null, timer:null, show:0, input:null, popup:null,
            init:function(e,o){/* 设置初始对象 */
                this.e=e, this.o=o,
                this.input=this.e.getElementsByTagName(this.o.input)[0],
                this.popup=this.e.getElementsByTagName(this.o.popup)[0],
                this.initEvent();/* 初始化各种事件 */
            },
            match:function(quickExpr,value,source){/* 生成提示 */
                var li = null;
                this.popup.innerHTML='';
                if(_search.setting.autoType=='search'){//搜索提示
                	var keywords=source.hotKeyWord;
                    var category=source.category;
                    if(category!=null){
                    	for(var i=0;i<category.length;i++){
                            li = document.createElement('li');
                            li.innerHTML = '<a href=javascript:subCategorySearch('+category[i].id+',"'+category[i].pinyin+'"); keyword='+category[i].name+' category='+category[i].id+'>进入 <strong>'+category[i].superCateName+"-"+category[i].name+'</strong> 分类</a>';
                            this.popup.appendChild(li);
                    	}
                    }
                    if(keywords!=null){
                    	for(var i=0;i<keywords.length;i++){
                            li = document.createElement('li');
                            if(i==0){
                            	li.className ='bt_1'; 
                            }
                            li.innerHTML = '<a href=javascript:hotKeyWordSearch("'+keywords[i].keyword+'"); keyword='+keywords[i].keyword+' category="">'+keywords[i].keyword+'</a>';
                            this.popup.appendChild(li);
                       }
                    }
                }else if(_search.setting.autoType=="supply"){//供应提示
                	for(var i=0;i<source.length;i++){
                		li = document.createElement('li');
                		var supplyName=source[i].name.substring(source[i].name.indexOf("-")+1,source[i].name.length);
                		li.innerHTML = '<a href=javascript:subSupplySearch("'+source[i].value+'"); keyword='+supplyName+' value='+source[i].value+'>查看 <strong>'+supplyName+'</strong> 供应</a>';
                        this.popup.appendChild(li);
                	}
                }else{
                	for(var i=0;i<source.length;i++){
                		li = document.createElement('li');
                		var supplyName=source[i].name.substring(source[i].name.indexOf("-")+1,source[i].name.length);
                		li.innerHTML = '<a href=javascript:subSupplySearch("'+source[i].value+'"); keyword='+supplyName+' value='+source[i].value+'>查看 <strong>'+supplyName+'</strong> 采购</a>';
                        this.popup.appendChild(li);
                	}
                }
                if(this.popup.getElementsByTagName('a').length)
                    this.popup.style.display='block';
                else
                    this.popup.style.display='none';
            },
            ajax:function(type,url,quickExpr,search){
            	var that=this;
            	$.ajax({
            		url : getAutoUrl(),
            		dataType:'jsonp',
	            	type : 'GET',
	        		jsonp :"callback",
	            	timeout : 5000,
	            	error : function() {
	            	},
	            	success : function(result) {
	            		that.match(quickExpr,search, eval("(" + result + ")"));
	            	}
            	});
            },
            fetch:function(ajax,search,quickExpr){
                var that=this;
                this.ajax(ajax.type,ajax.url+search,quickExpr,search);
            },
            initEvent:function(){/* 各事件的集合 */
                var that=this;
                this.input.onfocus = function(){
                    if(this.inputValue) this.value = this.inputValue;
                    var value=this.value, quickExpr=RegExp('^'+value,'i'), self=this;
                    var els = that.popup.getElementsByTagName('a');
                    if(els.length>0) that.popup.style.display = 'block';
                    that.timer=setInterval(function(){
                        if(value!=self.value){/* 判断输入内容是否改变，兼容中文 */
                            value=self.value;
                            that.popup.innerHTML='';
                            if(value!=''){
                                quickExpr=RegExp('^'+value);
                                if(that.o.source) that.match(quickExpr,value,that.o.source);
                                else if(that.o.ajax) that.fetch(that.o.ajax,value,quickExpr);
                            }else{
                            	$("#keyword").siblings('ul').hide();//无数据则隐藏
                            }
                        }
                    },200);
                };
                this.input.onblur = function(){/*  输入框添加事件 */
                    if(this.value!=this.defaultValue) this.inputValue = this.value;
                    clearInterval(that.timer);
                    var current=-1;/* 记住当前有焦点的选项 */
                    var els = that.popup.getElementsByTagName('a');
                    var len = els.length-1;
                    var aClick = function(){
                        that.input.inputValue = $(this).attr("keyword");//this.firstChild.nodeValue;
                        $("#category").val($(this).attr("category"));
                        that.popup.innerHTML='';
                        that.popup.style.display='none';
                        that.input.focus();
                    };
                    var aFocus = function(){
                        for(var i=len; i>=0; i--){
                            if(this.parentNode===that.popup.children[i]){
                                current = i;
                                break;
                            }
                        }
                        that.input.value = $(this).attr("keyword");//this.firstChild.nodeValue;
                        $("#category").val($(this).attr("category"));
                        for(var k in that.o.elemCSS.focus){
                            this.style[k] = that.o.elemCSS.focus[k];
                        }
                    };
                    var aBlur= function(){
                        for(var k in that.o.elemCSS.blur)
                            this.style[k] = that.o.elemCSS.blur[k];
                    };
                    var aKeydown = function(event){
                        event = event || window.event;/* 兼容IE */
                        if(current === len && event.keyCode===9){/* tab键时popup隐藏 */
                            that.popup.style.display = 'none';
                        }else if(event.keyCode==40){/* 处理上下方向键事件方便选择提示的选项 */
                            current++;
                            if(current<-1) current=len;
                            if(current>len){
                                current=-1;
                                that.input.focus();
                            }else{
                                that.popup.getElementsByTagName('a')[current].focus();
                            }
                            return false;
                        }else if(event.keyCode==38){
                            current--;
                            if(current==-1){
                                that.input.focus();
                            }else if(current<-1){
                                current = len;
                                that.popup.getElementsByTagName('a')[current].focus();
                            }else{
                                that.popup.getElementsByTagName('a')[current].focus();
                            }
                            return false;
                        }
                    };
                    for(var i=0; i<els.length; i++){/* 为每个选项添加事件 */
                        els[i].onclick = aClick;
                        els[i].onfocus = aFocus;
                        els[i].onblur = aBlur;
                        els[i].onkeydown = aKeydown;
                    }
                };
                this.input.onkeydown = function(event){
                    event = event || window.event;/* 兼容IE */
                    var els = that.popup.getElementsByTagName('a');
                    if(event.keyCode==40){
                        if(els[0]) els[0].focus();
                        return false;
                    }else if(event.keyCode==38){
                        if(els[els.length-1]) els[els.length-1].focus();
                        return false;
                    }else if(event.keyCode==9){
                        if(event.shiftKey==true) that.popup.style.display = 'none';
                    }
                };
                this.e.onmouseover = function(){ that.show=1; };
                this.e.onmouseout = function(){ that.show=0; };
                addEvent.call(document,'click',function(){
                    if(that.show==0){
                        that.popup.style.display='none';
                        $("#keyword").removeClass("org");
                    }
                });/* 处理提示框dom元素不支持onblur的情况 */
            }
        };
        handler.prototype.init.prototype=handler.prototype;/* JQuery style，这样我们在处的时候就不用每个dom元素都用new来创建对象了 */
        return handler;/* 把内部的处理函数传到外部 */
    })();
    if(this.length){/* 处理选择多个dom元素 */
        for(var a=this.length-1; a>=0; a--){/* 调用方法为每个选择的dom生成一个处理对象，使它们不互相影响 */
            handler(this[a],o);
        }
    }else{/* 处理选择一个dom元素 */
        handler(this,o);
    }
    return this;
};
return window.autoComplete = autoComplete;/* 暴露方法给全局对象 */
/* 插件结束 */
})(window);


var getElementsByClassName = function (searchClass, node, tag) {/* 兼容各浏览器的选择class的方法；(写法参考了博客园：http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html，想了解更多请看这个地址) */
    node = node || document, tag = tag ? tag.toUpperCase() : "*";
    if(document.getElementsByClassName){/* 支持getElementsByClassName的浏览器 */
        var temp = node.getElementsByClassName(searchClass);
        if(tag=="*"){
            return temp;
        } else {
            var ret = new Array();
            for(var i=0; i<temp.length; i++)
                if(temp[i].nodeName==tag)
                    ret.push(temp[i]);
            return ret;
        }
    }else{/* 不支持getElementsByClassName的浏览器 */
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
            patterns = [], returnElements = [], current, match;
        var i = classes.length;
        while(--i >= 0)
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        var j = elements.length;
        while(--j >= 0){
            current = elements[j], match = false;
            for(var k=0, kl=patterns.length; k<kl; k++){
                match = patterns[k].test(current.className);
                if(!match) break;
            }
            if(match) returnElements.push(current);
        }
        return returnElements;
    }
};
var addEvent=(function(){/* 用此函数添加事件防止事件覆盖 */
    if(document.addEventListener){
        return function(type, fn){ this.addEventListener(type, fn, false); };
    }else if(document.attachEvent){
        return function(type,fn){
            this.attachEvent('on'+type, function () {
                return fn.call(this, window.event);/* 兼容IE */
            });
        };
    }
})();

//调用
addEvent.call(null,'load',function(){
    autoComplete.call( getElementsByClassName('autoComplete'), {/* 使用call或apply调用此方法 */
    		ajax:{ type:'get',url:getAutoUrl() },/* 如果使用ajax则返回的数据格式要与source相同，如为字符串"[111,222,333,444]"等形式。*/
            elemCSS:{ focus:{'color':'#000000','background':'#d0d0d0'}, blur:{'color':'#000','background':'transparent'} },/* 些对象中的key要js对象中的style属性支持 */
            input:'input',/* 输入框使用input元素 */
            popup:'ul'/* 提示框使用ul元素 */
    });
});


var _search={
    setting:{
    	openType : "_blank",
    	isStatic : false,
    	isReplace: true,
    	searchUrl: null,
    	type:"product",
    	autoType : "search",
    	keyword:null,
    	placeholder:null,
    	autoUrl:null,
    	typeId : 1,
    	sidebar:false
    },
    load:{},
    event:{}
};
_search.load={
    setProperties:function(){
    	this.setSearchType();
    	this.setAction();
    	this.setAutoType();
    	this.setFocus();
    	_search.setting.autoUrl=$("#webBase").val();
    	if(_search.setting.isStatic){
    		initBaseUrl();
    	}
    },
    setAction:function(){
    	$("#searchForm").attr("target",_search.setting.openType);
    	$("#searchForm").attr("action",_search.setting.searchUrl);
    	if(_search.setting.keyword!="" && _search.setting.keyword!=null){
    		$("#keyword").val(_search.setting.keyword);
    	}
    	if(_search.setting.placeholder!="" && _search.setting.placeholder!=null){
    		$("#keyword").attr("placeholder",_search.setting.placeholder);
    	}
    },
    setSearchType:function(){
    	$(".search-top li").each(function(){
    		var currentType=$(this).attr("id");
    		if(_search.setting.type==currentType){
    			_search.setting.searchUrl=$(this).attr("searchurl");
    			_search.setting.placeholder=$(this).attr("msg");
    			_search.setting.typeId=$(this).attr("searchtype");
    			$(this).addClass("current");
    		}else{
    			$(this).removeClass("current");
    		}
    	});
    },
    setFocus:function(){
    	var liHtml="";
    	$("#cate_ul li").each(function(){
    		if($(this).find('a').hasClass('cur') && $(this).attr("id")!="li_cate_clean"){
    			liHtml=$(this);
    		}
    	});
    	if(liHtml!=""){
    		$("#li_cate_clean").after(liHtml); 
    		liHtml="";
    	}
    	$("#city_ul li").each(function(){
    		if($(this).find('a').hasClass('cur') && $(this).attr("id")!="li_city_clean"){
    			liHtml=$(this);
    		}
    	});
    	if(liHtml!=""){
    		$("#li_city_clean").after(liHtml); 
    		liHtml="";
    	}
    },
    setAutoType:function(){
    	if(_search.setting.type=="product" || _search.setting.type=="company" || _search.setting.type=="news"){
    		_search.setting.autoType="search";
    	}else{
    		_search.setting.autoType=_search.setting.type;
    	}
    }
}

_search.event={
    init : function(){
    	$(".search-top li").on("click",this.changeType);
    	$("#keyword").on("focus",this.showOrg);
    	$("#keyword").on("blur",this.hideOrg);
    	$(".sear-btn").on("click",this.checkNull);
    	$("#category_ul li").on("click",this.clickCategory);
    },
    changeType:function(){
    	var obj=$(this);
    	_search.setting.searchUrl=obj.attr("searchurl");
    	_search.load.setAction();
    	_search.setting.type=obj.attr("id");
    	_search.setting.typeId=obj.attr("searchtype");
    	_search.load.setAutoType();
    	$("#keyword").siblings('ul').html("");
		$("#keyword").attr("placeholder",obj.attr("msg"));
    	$(".search-top li").each(function(){
			if($(this).attr("id")==_search.setting.type){
				$(this).addClass("current");
			}else{
				$(this).removeClass("current");
			}
		});
    },
    showOrg:function(){
    	$("#keyword").addClass("org");
    },
    hideOrg:function(){
    	if($("#keyword").siblings('ul').is(":hidden")){
			$("#keyword").removeClass("org");
		}
    },
    checkNull:function(){
    	if($("#keyword").val()=="" && $("#category").val()==""){
			return false;
		}
    },
    clickCategory:function(){
    	var cateId=$(this).attr("cateId");
    	
    }
}

$(document).ready(function(){
	_search.event.init();
	_search.load.setProperties()
	if(_search.setting.sidebar){//侧边栏初始化
		new $.BaseView();
	}
});
/*类别搜索*/
function subCategorySearch(categoryid,pinyin){
	$("#category").val(categoryid);
	$("#searchForm").submit();
}
/*热词搜索*/
function hotKeyWordSearch(hotKeyWord){
	$("#keyword").val(hotKeyWord);
	$("#category").val("");
	$("#searchForm").submit();
}
function getAutoUrl(){
	if(_search.setting.autoType=='search'){
//		return _search.setting.autoUrl+'/p/associative?type='+_search.setting.typeId+'&count=5&keyword='+encodeURI(encodeURI($("#keyword").val()));
		return 'http://search.'+getDomain()+'/company/associative?type='+_search.setting.typeId+'&count=5&keyword='+encodeURI(encodeURI($("#keyword").val()));
	}else{
//		return _search.setting.autoUrl+'/p/supplyAuto?keyword='+encodeURI(encodeURI($("#keyword").val()));
		return 'http://search.'+getDomain()+'/company/supplyAuto?keyword='+encodeURI(encodeURI($("#keyword").val()));
	}
}
function subSupplySearch(value){
	var params=value.split("|");
	if(value.indexOf("breedId")<0){
		if(params[0]=='cate3Id'){
			$("#category").val(params[1]);
		}
	}
	$("#searchForm").submit();
}

function getDomain()
{
  var domain = document.domain ;
  if(domain.indexOf("cnhnkj.cn") > 0)return "cnhnkj.cn";
  if(domain.indexOf("cnhnb.com") > 0)return "cnhnb.com";
  if(domain.indexOf("lvsema.cn") > 0)return "lvsema.cn";
  return "cnhnb.com";
}


