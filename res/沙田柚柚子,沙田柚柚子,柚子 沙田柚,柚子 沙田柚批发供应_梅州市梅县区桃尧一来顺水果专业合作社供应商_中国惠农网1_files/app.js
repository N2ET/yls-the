
define('utility',[],function () {
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    String.prototype.httpHtml = function () {
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        var regHttp = /(https?:\/\/)?(\w+\.?)+(\/[a-zA-Z0-9\?%=_\-\+\/]+)?/gi;
        var result = this.replace(regHttp, function (match, capture) {
            if (capture) {
                return match
            }
            else {
                if (match.indexOf('www.') != -1) {
                    return 'http://' + match;
                } else {
                    return match;
                }
            }

        });
        return result.replace(reg, '<a href="$1$2" target="_blank" >$1$2</a>');
        //var reg = /(http:\/\/|https:\/\/|www.)((\w|=|\?|\.|\/|&|-)+)/g;

        //return this.replace(reg, '<a href="$1$1$2" target="_blank" >$1$2</a>');;

    };
    var ui = {
        getMessageType: function (msgtype, content) {
            var msgcontent = "";
            if (msgtype == 4) {
                msgcontent = "[名片]";
            } else if (msgtype == 3) {
                msgcontent = "[文件]";
            } else if (msgtype == 1) {
                msgcontent = "[图片]";
            } else if (msgtype == 0) {
                msgcontent = ui.substr(content);
            }
            return msgcontent;
        },
        substr: function (str) {
            return str.substr(0, 25);
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        newId: function guidGenerator() {
            return parseInt(100000000 * Math.random());
        },
        hnajax: function (url, imparam, datat, callback, errorback, beforeSend, complete) {
            im_static_baseUrl = im_static_baseUrl || '';
            url = url.indexOf('http') != -1 ? url : im_static_baseUrl + url;
            if (ui.getbrowser())//<= ie9 and >= ie6
            {
                $.ajax({
                    type: "post",
                    url: url,
                    jspnp: 'callback',
                    data: imparam,
                    dataType: 'jsonp',
                    jsonpCallback: complete,
                    success: callback,
                    error: function (e) { if (typeof (errorback) == 'function') { errorback(e) } },
                    beforeSend: beforeSend,
                    complete: complete
                });
            }
            else {
                $.ajax({
                    type: "post",
                    url: url,
                    async: true,
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                    data: imparam,
                    dataType: datat,
                    success: callback,
                    error: function (e) { if (typeof (errorback) == 'function') { errorback(e) } },
                    beforeSend: beforeSend,
                    complete: complete
                });
            }
        },
        buildAuthContent: function (certData) {
            var out = "";
            if (certData && certData.isCertCompany) {
                out += "<i class='icon1'></i>";
            }
            if (certData && certData.isCertCompany || certData.isCertPersonal) {
                out += "<i class='icon2'></i>";
            }
            if (certData && certData.isCertMobile) {
                out += "<i class='icon3'></i>";
            }
            if (certData && certData.isCertMail) {
                out += "<i class='icon4'></i>";
            }
            if (certData && certData.isCertAuth) {
                out += "<i class='icon5'></i>";
            }
            return out;
        },
        getbrowser: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion <= 9.0 && fIEVersion >= 6.0) {
                    return true;
                }
                return false;
            }
            return false;
        },
        bindWindowEvent: function () {

            $('#banner').unbind('mousedown').mousedown(
                  function (event) {
                      var isMove = true;
                      var abs_x = event.pageX - $('div.moveBar').offset().left;
                      var abs_y = event.pageY - $('div.moveBar').offset().top;
                      var max_x = $(document).width() - $(".moveBar").width() - 2;

                      $(document).mousemove(function (event) {
                          if (isMove) {
                              var obj = $('div.moveBar');
                              if ((event.pageY - abs_y) > 0) {
                                  if ((event.pageX - abs_x) > max_x) {
                                      obj.css({ 'left': max_x, 'top': event.pageY - abs_y - $(document).scrollTop() });
                                  } else {
                                      obj.css({ 'left': event.pageX - abs_x, 'top': event.pageY - abs_y - $(document).scrollTop() });
                                  }

                              } else {
                                  if ((event.pageX - abs_x) > max_x) {
                                      obj.css({ 'left': max_x, 'top': 0 });
                                  } else {
                                      obj.css({ 'left': event.pageX - abs_x, 'top': 0 });
                                  }

                              }

                          }
                      }
                      ).mouseup(
                          function () {
                              isMove = false;
                          }
                      );
                  }
              );
            //$(".title_tab li").click(function () {
            //    $(this).addClass("on").siblings().removeClass("on");
            //    $(".info").eq($(this).index()).show().siblings().hide();
            //});
            $(".toggtle").unbind('click').click(function () {
                if ($(".rft").length > 0) {
                    $(this).removeClass("rft");
                    $(".box_right").css("width", "224px")
                    $(".moveBar").css("width", "660px");
                    $(".title_tab,.ment").show();
                } else {
                    $(this).addClass("rft");
                    $(".box_right").css("width", "0px");
                    $(".title_tab,.ment").hide();
                    $(".moveBar").css("width", "436px");
                }
            });

            $(".box_right").unbind('hover').hover(function () {
                $(".toggtle").show();
            }, function () {
                $(".toggtle").hide();
            });
            $(".message-box").hover(function () {
                $(".toggtle").show();
            }, function () {
                $(".toggtle").hide();
            })
        }, //绑定事件
        showMessage: function (msg, timer, callback) {
            timer = timer || 2;
            if ($.dialog == undefined) {

                //require(['lib/dialog/lhgdialog.min'], function (dialog) {

                //    $.dialog.tips(msg, timer, '', function () {

                //        // $('.ko_chatWindow').attr();
                //    }).lock();//.zindex();
                //});

                return false;
            }
           
            $.dialog.tips(msg, timer);//.zindex();
            // alert(msg);
        },
        fileCheck: function (e, type) {
            type = type || 'img';
            var isImg = type == 'img',
                value = $(e).val() || '';
            if (value == '') {
                return false;
            }
            var regexp;
            if (isImg) {
                regexp = new RegExp("(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$", "g");
            } else {
                regexp = new RegExp("(.doc|.docx|.ppt|.pptx|.xls|.xlsx|.pdf)$", "g");
            }

            if (!regexp.test(value)) {
                ui.showMessage("上传" + (isImg ? '图片' : '文件') + "格式错误,请选择正确的格式.", 2000);
                return false;
            }
            if (!e.files) {
                return true;
            }
            var file = e.files[0];
            var size = file.size / 1024;
            if ((size > 10000 && (!isImg)) || (size > 5000 && isImg)) {
                ui.showMessage("附件不能大于" + (isImg ? '5' : '10') + "M.", 2000);
                return false;
            }
            return true;
        },
        IsNullOrWhiteSpace: function (value) {

            if (value && value.length > 0) {
                return true;
            }
            return false;
        },
        auth: function () {
            ui.hnajax("auth", { appkey: "54564564" }, "json", function (result) {
                window.signData = result;
            }, function (e) {

                console.log("获取签名信息失败.");
            });
        },
        audioEvent: function () {
            var pushhtml = [];
            pushhtml.push('<audio id="notificationSound" hidden="hidden" aria-hidden="true">');
            pushhtml.push('<source src="' + window.im_static_baseUrl + '/Content/sounds/Sent.wav" type="audio/wave"/>');
            pushhtml.push(' <source src="' + window.im_static_baseUrl + '/Content/sounds/notification.mp3" type="audio/mpeg"/>');
            pushhtml.push('</audio>');
            $("body").append(pushhtml.join(""));
        },
        notify: function (force) {
            var $obj = $("#notificationSound");
            if ($obj.length > 0 && (!ui.getbrowser())) {
                $("#notificationSound")[0].play();
            }
        },
        sendMessage: function (message) {
            //发送消息的模板
            chat.server.sendMessage(JSON.stringify(message))
            .done(function () { })
            .fail(function (e) {
                 
                console.log("消息发送失败");
            });
        },
        changeIcon: function (number) {


            if (number > 0) {
                $(".hn-tbar-tab-im .tab-text").text("有新消息");
                $(".hn-tbar-tab-im .tab-ico").css("background", "url(" + im_static_baseUrl + "/images/3.0/mes_icon.gif) 0px  center no-repeat");
            } else {
                $(".hn-tbar-tab-im .tab-text").text("在线咨询");
                $(".hn-tbar-tab-im .tab-ico").css("background", "#666 url(" + im_static_baseUrl + "/images/3.0/mes_icon.png) 7px  center no-repeat");
            }
        },
        getIsLogin: function () {
            var isLogin = true;
            setting.currentId = ui.getCookie('HNUSERID') || '';

            if ((!ui.getCookie("hn_sso_ticket_cookie_key")) || setting.currentId == "" && setting.currentId == 0) {
                isLogin = false;
                setting.currentPic = '';
            }
            return isLogin;
        }
        //,
        //createCORSRequest: function (method, url) {

        //    var xhr = new XMLHttpRequest();
        //    if ("withCredentials" in xhr) {
        //        // XHR for Chrome/Firefox/Opera/Safari.
        //        xhr.open(method, url, true);
        //    } else if (typeof XDomainRequest != "undefined") {
        //        // XDomainRequest for IE.
        //        xhr = new XDomainRequest();
        //        xhr.open(method, url);
        //    } else {
        //        // CORS not supported.
        //        xhr = null;
        //    }
        //    return xhr;
        //},
        //// Make the actual CORS request.
        //makeCorsRequest: function (url, callback) {

        //    url = require.toUrl(url);
        //    var xhr = ui.createCORSRequest('GET', url);

        //    if (!xhr) {
        //        alert('CORS not supported');
        //        return;
        //    }

        //    // Response handlers.
        //    xhr.onload = function () {
        //        var text = xhr.responseText;
        //        if (typeof (callback) == 'function') {
        //            callback(text);
        //        } else { alert(text); }


        //    };

        //    xhr.onerror = function () {
        //        alert('Woops, there was an error making the request.');
        //    };

        //    xhr.send();
        //}
    }
    return ui;
});

/*!
 * Knockout JavaScript library v3.4.0
 * (c) Steven Sanderson - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function() {(function(n){var x=this||(0,eval)("this"),u=x.document,M=x.navigator,v=x.jQuery,F=x.JSON;(function(n){"function"===typeof define&&define.amd?define('lib/knockout-3.4',["exports","require"],n):"object"===typeof exports&&"object"===typeof module?n(module.exports||exports):n(x.ko={})})(function(N,O){function J(a,c){return null===a||typeof a in T?a===c:!1}function U(b,c){var d;return function(){d||(d=a.a.setTimeout(function(){d=n;b()},c))}}function V(b,c){var d;return function(){clearTimeout(d);d=a.a.setTimeout(b,c)}}function W(a,
c){c&&c!==I?"beforeChange"===c?this.Kb(a):this.Ha(a,c):this.Lb(a)}function X(a,c){null!==c&&c.k&&c.k()}function Y(a,c){var d=this.Hc,e=d[s];e.R||(this.lb&&this.Ma[c]?(d.Pb(c,a,this.Ma[c]),this.Ma[c]=null,--this.lb):e.r[c]||d.Pb(c,a,e.s?{ia:a}:d.uc(a)))}function K(b,c,d,e){a.d[b]={init:function(b,g,k,l,m){var h,r;a.m(function(){var q=a.a.c(g()),p=!d!==!q,A=!r;if(A||c||p!==h)A&&a.va.Aa()&&(r=a.a.ua(a.f.childNodes(b),!0)),p?(A||a.f.da(b,a.a.ua(r)),a.eb(e?e(m,q):m,b)):a.f.xa(b),h=p},null,{i:b});return{controlsDescendantBindings:!0}}};
a.h.ta[b]=!1;a.f.Z[b]=!0}var a="undefined"!==typeof N?N:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.G=function(a,c,d){a[c]=d};a.version="3.4.0";a.b("version",a.version);a.options={deferUpdates:!1,useOnlyNativeEvents:!1};a.a=function(){function b(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}function e(b,c,d,e){var h=b[c].match(r)||
[];a.a.q(d.match(r),function(b){a.a.pa(h,b,e)});b[c]=h.join(" ")}var f={__proto__:[]}instanceof Array,g="function"===typeof Symbol,k={},l={};k[M&&/Firefox\/2/i.test(M.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];k.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(k,function(a,b){if(b.length)for(var c=0,d=b.length;c<d;c++)l[b[c]]=a});var m={propertychange:!0},h=u&&function(){for(var a=3,b=u.createElement("div"),c=
b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:n}(),r=/\S+/g;return{cc:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],q:function(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c],c)},o:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},Sb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d))return a[d];
return null},La:function(b,c){var d=a.a.o(b,c);0<d?b.splice(d,1):0===d&&b.shift()},Tb:function(b){b=b||[];for(var c=[],d=0,e=b.length;d<e;d++)0>a.a.o(c,b[d])&&c.push(b[d]);return c},fb:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)c.push(b(a[d],d));return c},Ka:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c},ra:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},pa:function(b,c,d){var e=
a.a.o(a.a.zb(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},ka:f,extend:c,Xa:d,Ya:f?d:c,D:b,Ca:function(a,b){if(!a)return a;var c={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d,a));return c},ob:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},jc:function(b){b=a.a.V(b);for(var c=(b[0]&&b[0].ownerDocument||u).createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.$(b[d]));return c},ua:function(b,c){for(var d=0,e=b.length,h=[];d<e;d++){var m=b[d].cloneNode(!0);h.push(c?a.$(m):m)}return h},
da:function(b,c){a.a.ob(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},qc:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],h=e.parentNode,m=0,l=c.length;m<l;m++)h.insertBefore(c[m],e);m=0;for(l=d.length;m<l;m++)a.removeNode(d[m])}},za:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);for(;1<a.length&&a[a.length-1].parentNode!==b;)a.length--;if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)a.push(c),
c=c.nextSibling;a.push(d)}}return a},sc:function(a,b){7>h?a.setAttribute("selected",b):a.selected=b},$a:function(a){return null===a||a===n?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},nd:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},Mc:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=
b;)a=a.parentNode;return!!a},nb:function(b){return a.a.Mc(b,b.ownerDocument.documentElement)},Qb:function(b){return!!a.a.Sb(b,a.a.nb)},A:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},Wb:function(b){return a.onError?function(){try{return b.apply(this,arguments)}catch(c){throw a.onError&&a.onError(c),c;}}:b},setTimeout:function(b,c){return setTimeout(a.a.Wb(b),c)},$b:function(b){setTimeout(function(){a.onError&&a.onError(b);throw b;},0)},p:function(b,c,d){var e=a.a.Wb(d);d=h&&m[c];if(a.options.useOnlyNativeEvents||
d||!v)if(d||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var l=function(a){e.call(b,a)},f="on"+c;b.attachEvent(f,l);a.a.F.oa(b,function(){b.detachEvent(f,l)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,e,!1);else v(b).bind(c,e)},Da:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.A(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==
d||"radio"==d):d=!1;if(a.options.useOnlyNativeEvents||!v||d)if("function"==typeof u.createEvent)if("function"==typeof b.dispatchEvent)d=u.createEvent(l[c]||"HTMLEvents"),d.initEvent(c,!0,!0,x,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");else v(b).trigger(c)},c:function(b){return a.H(b)?
b():b},zb:function(b){return a.H(b)?b.t():b},bb:function(b,c,d){var h;c&&("object"===typeof b.classList?(h=b.classList[d?"add":"remove"],a.a.q(c.match(r),function(a){h.call(b.classList,a)})):"string"===typeof b.className.baseVal?e(b.className,"baseVal",c,d):e(b,"className",c,d))},Za:function(b,c){var d=a.a.c(c);if(null===d||d===n)d="";var e=a.f.firstChild(b);!e||3!=e.nodeType||a.f.nextSibling(e)?a.f.da(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.Rc(b)},rc:function(a,b){a.name=b;if(7>=h)try{a.mergeAttributes(u.createElement("<input name='"+
a.name+"'/>"),!1)}catch(c){}},Rc:function(a){9<=h&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},Nc:function(a){if(h){var b=a.style.width;a.style.width=0;a.style.width=b}},hd:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var d=[],e=b;e<=c;e++)d.push(e);return d},V:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},Yb:function(a){return g?Symbol(a):a},rd:6===h,sd:7===h,C:h,ec:function(b,c){for(var d=a.a.V(b.getElementsByTagName("input")).concat(a.a.V(b.getElementsByTagName("textarea"))),
e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},h=[],m=d.length-1;0<=m;m--)e(d[m])&&h.push(d[m]);return h},ed:function(b){return"string"==typeof b&&(b=a.a.$a(b))?F&&F.parse?F.parse(b):(new Function("return "+b))():null},Eb:function(b,c,d){if(!F||!F.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return F.stringify(a.a.c(b),c,d)},fd:function(c,d,e){e=e||{};var h=e.params||{},m=e.includeFields||this.cc,l=c;if("object"==typeof c&&"form"===a.a.A(c))for(var l=c.action,f=m.length-1;0<=f;f--)for(var g=a.a.ec(c,m[f]),k=g.length-1;0<=k;k--)h[g[k].name]=g[k].value;d=a.a.c(d);var r=u.createElement("form");r.style.display="none";r.action=l;r.method="post";for(var n in d)c=u.createElement("input"),c.type="hidden",c.name=n,c.value=a.a.Eb(a.a.c(d[n])),r.appendChild(c);b(h,function(a,b){var c=u.createElement("input");
c.type="hidden";c.name=a;c.value=b;r.appendChild(c)});u.body.appendChild(r);e.submitter?e.submitter(r):r.submit();setTimeout(function(){r.parentNode.removeChild(r)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.q);a.b("utils.arrayFirst",a.a.Sb);a.b("utils.arrayFilter",a.a.Ka);a.b("utils.arrayGetDistinctValues",a.a.Tb);a.b("utils.arrayIndexOf",a.a.o);a.b("utils.arrayMap",a.a.fb);a.b("utils.arrayPushAll",a.a.ra);a.b("utils.arrayRemoveItem",a.a.La);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",
a.a.cc);a.b("utils.getFormFields",a.a.ec);a.b("utils.peekObservable",a.a.zb);a.b("utils.postJson",a.a.fd);a.b("utils.parseJson",a.a.ed);a.b("utils.registerEventHandler",a.a.p);a.b("utils.stringifyJson",a.a.Eb);a.b("utils.range",a.a.hd);a.b("utils.toggleDomNodeCssClass",a.a.bb);a.b("utils.triggerEvent",a.a.Da);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.D);a.b("utils.addOrRemoveItem",a.a.pa);a.b("utils.setTextContent",a.a.Za);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=
function(a){var c=this;if(1===arguments.length)return function(){return c.apply(a,arguments)};var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice(0);e.push.apply(e,arguments);return c.apply(a,e)}});a.a.e=new function(){function a(b,g){var k=b[d];if(!k||"null"===k||!e[k]){if(!g)return n;k=b[d]="ko"+c++;e[k]={}}return e[k]}var c=0,d="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===n?n:e[d]},set:function(c,d,e){if(e!==n||a(c,!1)!==n)a(c,!0)[d]=
e},clear:function(a){var b=a[d];return b?(delete e[b],a[d]=null,!0):!1},I:function(){return c++ +d}}};a.b("utils.domData",a.a.e);a.b("utils.domData.clear",a.a.e.clear);a.a.F=new function(){function b(b,c){var e=a.a.e.get(b,d);e===n&&c&&(e=[],a.a.e.set(b,d,e));return e}function c(d){var e=b(d,!1);if(e)for(var e=e.slice(0),l=0;l<e.length;l++)e[l](d);a.a.e.clear(d);a.a.F.cleanExternalData(d);if(f[d.nodeType])for(e=d.firstChild;d=e;)e=d.nextSibling,8===d.nodeType&&c(d)}var d=a.a.e.I(),e={1:!0,8:!0,9:!0},
f={1:!0,9:!0};return{oa:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},pc:function(c,e){var l=b(c,!1);l&&(a.a.La(l,e),0==l.length&&a.a.e.set(c,d,n))},$:function(b){if(e[b.nodeType]&&(c(b),f[b.nodeType])){var d=[];a.a.ra(d,b.getElementsByTagName("*"));for(var l=0,m=d.length;l<m;l++)c(d[l])}return b},removeNode:function(b){a.$(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){v&&"function"==typeof v.cleanData&&v.cleanData([a])}}};
a.$=a.a.F.$;a.removeNode=a.a.F.removeNode;a.b("cleanNode",a.$);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.F);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.F.oa);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.F.pc);(function(){var b=[0,"",""],c=[1,"<table>","</table>"],d=[3,"<table><tbody><tr>","</tr></tbody></table>"],e=[1,"<select multiple='multiple'>","</select>"],f={thead:c,tbody:c,tfoot:c,tr:[2,"<table><tbody>","</tbody></table>"],td:d,th:d,option:e,optgroup:e},
g=8>=a.a.C;a.a.ma=function(c,d){var e;if(v)if(v.parseHTML)e=v.parseHTML(c,d)||[];else{if((e=v.clean([c],d))&&e[0]){for(var h=e[0];h.parentNode&&11!==h.parentNode.nodeType;)h=h.parentNode;h.parentNode&&h.parentNode.removeChild(h)}}else{(e=d)||(e=u);var h=e.parentWindow||e.defaultView||x,r=a.a.$a(c).toLowerCase(),q=e.createElement("div"),p;p=(r=r.match(/^<([a-z]+)[ >]/))&&f[r[1]]||b;r=p[0];p="ignored<div>"+p[1]+c+p[2]+"</div>";"function"==typeof h.innerShiv?q.appendChild(h.innerShiv(p)):(g&&e.appendChild(q),
q.innerHTML=p,g&&q.parentNode.removeChild(q));for(;r--;)q=q.lastChild;e=a.a.V(q.lastChild.childNodes)}return e};a.a.Cb=function(b,c){a.a.ob(b);c=a.a.c(c);if(null!==c&&c!==n)if("string"!=typeof c&&(c=c.toString()),v)v(b).html(c);else for(var d=a.a.ma(c,b.ownerDocument),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.ma);a.b("utils.setHtml",a.a.Cb);a.M=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.M.lc(c.nodeValue);null!=f&&e.push({Lc:c,cd:f})}else if(1==c.nodeType)for(var f=
0,g=c.childNodes,k=g.length;f<k;f++)b(g[f],e)}var c={};return{wb:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},xc:function(a,b){var f=c[a];if(f===n)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),
!0}finally{delete c[a]}},yc:function(c,e){var f=[];b(c,f);for(var g=0,k=f.length;g<k;g++){var l=f[g].Lc,m=[l];e&&a.a.ra(m,e);a.M.xc(f[g].cd,m);l.nodeValue="";l.parentNode&&l.parentNode.removeChild(l)}},lc:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.M);a.b("memoization.memoize",a.M.wb);a.b("memoization.unmemoize",a.M.xc);a.b("memoization.parseMemoText",a.M.lc);a.b("memoization.unmemoizeDomNodeAndDescendants",a.M.yc);a.Y=function(){function b(){if(e)for(var b=
e,c=0,m;g<e;)if(m=d[g++]){if(g>b){if(5E3<=++c){g=e;a.a.$b(Error("'Too much recursion' after processing "+c+" task groups."));break}b=e}try{m()}catch(h){a.a.$b(h)}}}function c(){b();g=e=d.length=0}var d=[],e=0,f=1,g=0;return{scheduler:x.MutationObserver?function(a){var b=u.createElement("div");(new MutationObserver(a)).observe(b,{attributes:!0});return function(){b.classList.toggle("foo")}}(c):u&&"onreadystatechange"in u.createElement("script")?function(a){var b=u.createElement("script");b.onreadystatechange=
function(){b.onreadystatechange=null;u.documentElement.removeChild(b);b=null;a()};u.documentElement.appendChild(b)}:function(a){setTimeout(a,0)},Wa:function(b){e||a.Y.scheduler(c);d[e++]=b;return f++},cancel:function(a){a-=f-e;a>=g&&a<e&&(d[a]=null)},resetForTesting:function(){var a=e-g;g=e=d.length=0;return a},md:b}}();a.b("tasks",a.Y);a.b("tasks.schedule",a.Y.Wa);a.b("tasks.runEarly",a.Y.md);a.ya={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.B({read:b,write:function(e){clearTimeout(d);
d=a.a.setTimeout(function(){b(e)},c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);a.cb=!1;f="notifyWhenChangesStop"==e?V:U;a.Ta(function(a){return f(a,d)})},deferred:function(b,c){if(!0!==c)throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");b.cb||(b.cb=!0,b.Ta(function(c){var e;return function(){a.Y.cancel(e);e=a.Y.Wa(c);b.notifySubscribers(n,"dirty")}}))},notify:function(a,c){a.equalityComparer=
"always"==c?null:J}};var T={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.ya);a.vc=function(b,c,d){this.ia=b;this.gb=c;this.Kc=d;this.R=!1;a.G(this,"dispose",this.k)};a.vc.prototype.k=function(){this.R=!0;this.Kc()};a.J=function(){a.a.Ya(this,D);D.rb(this)};var I="change",D={rb:function(a){a.K={};a.Nb=1},X:function(b,c,d){var e=this;d=d||I;var f=new a.vc(e,c?b.bind(c):b,function(){a.a.La(e.K[d],f);e.Ia&&e.Ia(d)});e.sa&&e.sa(d);e.K[d]||(e.K[d]=[]);e.K[d].push(f);return f},notifySubscribers:function(b,
c){c=c||I;c===I&&this.zc();if(this.Pa(c))try{a.l.Ub();for(var d=this.K[c].slice(0),e=0,f;f=d[e];++e)f.R||f.gb(b)}finally{a.l.end()}},Na:function(){return this.Nb},Uc:function(a){return this.Na()!==a},zc:function(){++this.Nb},Ta:function(b){var c=this,d=a.H(c),e,f,g;c.Ha||(c.Ha=c.notifySubscribers,c.notifySubscribers=W);var k=b(function(){c.Mb=!1;d&&g===c&&(g=c());e=!1;c.tb(f,g)&&c.Ha(f=g)});c.Lb=function(a){c.Mb=e=!0;g=a;k()};c.Kb=function(a){e||(f=a,c.Ha(a,"beforeChange"))}},Pa:function(a){return this.K[a]&&
this.K[a].length},Sc:function(b){if(b)return this.K[b]&&this.K[b].length||0;var c=0;a.a.D(this.K,function(a,b){"dirty"!==a&&(c+=b.length)});return c},tb:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},extend:function(b){var c=this;b&&a.a.D(b,function(b,e){var f=a.ya[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.G(D,"subscribe",D.X);a.G(D,"extend",D.extend);a.G(D,"getSubscriptionsCount",D.Sc);a.a.ka&&a.a.Xa(D,Function.prototype);a.J.fn=D;a.hc=function(a){return null!=
a&&"function"==typeof a.X&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.J);a.b("isSubscribable",a.hc);a.va=a.l=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{Ub:b,end:c,oc:function(b){if(e){if(!a.hc(b))throw Error("Only subscribable things can act as dependencies");e.gb.call(e.Gc,b,b.Cc||(b.Cc=++f))}},w:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},Aa:function(){if(e)return e.m.Aa()},Sa:function(){if(e)return e.Sa}}}();a.b("computedContext",
a.va);a.b("computedContext.getDependenciesCount",a.va.Aa);a.b("computedContext.isInitial",a.va.Sa);a.b("ignoreDependencies",a.qd=a.l.w);var E=a.a.Yb("_latestValue");a.N=function(b){function c(){if(0<arguments.length)return c.tb(c[E],arguments[0])&&(c.ga(),c[E]=arguments[0],c.fa()),this;a.l.oc(c);return c[E]}c[E]=b;a.a.ka||a.a.extend(c,a.J.fn);a.J.fn.rb(c);a.a.Ya(c,B);a.options.deferUpdates&&a.ya.deferred(c,!0);return c};var B={equalityComparer:J,t:function(){return this[E]},fa:function(){this.notifySubscribers(this[E])},
ga:function(){this.notifySubscribers(this[E],"beforeChange")}};a.a.ka&&a.a.Xa(B,a.J.fn);var H=a.N.gd="__ko_proto__";B[H]=a.N;a.Oa=function(b,c){return null===b||b===n||b[H]===n?!1:b[H]===c?!0:a.Oa(b[H],c)};a.H=function(b){return a.Oa(b,a.N)};a.Ba=function(b){return"function"==typeof b&&b[H]===a.N||"function"==typeof b&&b[H]===a.B&&b.Vc?!0:!1};a.b("observable",a.N);a.b("isObservable",a.H);a.b("isWriteableObservable",a.Ba);a.b("isWritableObservable",a.Ba);a.b("observable.fn",B);a.G(B,"peek",B.t);a.G(B,
"valueHasMutated",B.fa);a.G(B,"valueWillMutate",B.ga);a.la=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.N(b);a.a.Ya(b,a.la.fn);return b.extend({trackArrayChanges:!0})};a.la.fn={remove:function(b){for(var c=this.t(),d=[],e="function"!=typeof b||a.H(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var g=c[f];e(g)&&(0===d.length&&this.ga(),d.push(g),c.splice(f,1),f--)}d.length&&
this.fa();return d},removeAll:function(b){if(b===n){var c=this.t(),d=c.slice(0);this.ga();c.splice(0,c.length);this.fa();return d}return b?this.remove(function(c){return 0<=a.a.o(b,c)}):[]},destroy:function(b){var c=this.t(),d="function"!=typeof b||a.H(b)?function(a){return a===b}:b;this.ga();for(var e=c.length-1;0<=e;e--)d(c[e])&&(c[e]._destroy=!0);this.fa()},destroyAll:function(b){return b===n?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.o(b,c)}):[]},indexOf:function(b){var c=
this();return a.a.o(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.ga(),this.t()[d]=c,this.fa())}};a.a.ka&&a.a.Xa(a.la.fn,a.N.fn);a.a.q("pop push reverse shift sort splice unshift".split(" "),function(b){a.la.fn[b]=function(){var a=this.t();this.ga();this.Vb(a,b,arguments);var d=a[b].apply(a,arguments);this.fa();return d===a?this:d}});a.a.q(["slice"],function(b){a.la.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.b("observableArray",a.la);a.ya.trackArrayChanges=function(b,
c){function d(){if(!e){e=!0;var c=b.notifySubscribers;b.notifySubscribers=function(a,b){b&&b!==I||++k;return c.apply(this,arguments)};var d=[].concat(b.t()||[]);f=null;g=b.X(function(c){c=[].concat(c||[]);if(b.Pa("arrayChange")){var e;if(!f||1<k)f=a.a.ib(d,c,b.hb);e=f}d=c;f=null;k=0;e&&e.length&&b.notifySubscribers(e,"arrayChange")})}}b.hb={};c&&"object"==typeof c&&a.a.extend(b.hb,c);b.hb.sparse=!0;if(!b.Vb){var e=!1,f=null,g,k=0,l=b.sa,m=b.Ia;b.sa=function(a){l&&l.call(b,a);"arrayChange"===a&&d()};
b.Ia=function(a){m&&m.call(b,a);"arrayChange"!==a||b.Pa("arrayChange")||(g.k(),e=!1)};b.Vb=function(b,c,d){function m(a,b,c){return l[l.length]={status:a,value:b,index:c}}if(e&&!k){var l=[],g=b.length,t=d.length,G=0;switch(c){case "push":G=g;case "unshift":for(c=0;c<t;c++)m("added",d[c],G+c);break;case "pop":G=g-1;case "shift":g&&m("deleted",b[G],G);break;case "splice":c=Math.min(Math.max(0,0>d[0]?g+d[0]:d[0]),g);for(var g=1===t?g:Math.min(c+(d[1]||0),g),t=c+t-2,G=Math.max(g,t),P=[],n=[],Q=2;c<G;++c,
++Q)c<g&&n.push(m("deleted",b[c],c)),c<t&&P.push(m("added",d[Q],c));a.a.dc(n,P);break;default:return}f=l}}}};var s=a.a.Yb("_state");a.m=a.B=function(b,c,d){function e(){if(0<arguments.length){if("function"===typeof f)f.apply(g.pb,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");return this}a.l.oc(e);(g.S||g.s&&e.Qa())&&e.aa();return g.T}"object"===typeof b?d=b:(d=d||{},b&&(d.read=
b));if("function"!=typeof d.read)throw Error("Pass a function that returns the value of the ko.computed");var f=d.write,g={T:n,S:!0,Ra:!1,Fb:!1,R:!1,Va:!1,s:!1,jd:d.read,pb:c||d.owner,i:d.disposeWhenNodeIsRemoved||d.i||null,wa:d.disposeWhen||d.wa,mb:null,r:{},L:0,bc:null};e[s]=g;e.Vc="function"===typeof f;a.a.ka||a.a.extend(e,a.J.fn);a.J.fn.rb(e);a.a.Ya(e,z);d.pure?(g.Va=!0,g.s=!0,a.a.extend(e,$)):d.deferEvaluation&&a.a.extend(e,aa);a.options.deferUpdates&&a.ya.deferred(e,!0);g.i&&(g.Fb=!0,g.i.nodeType||
(g.i=null));g.s||d.deferEvaluation||e.aa();g.i&&e.ba()&&a.a.F.oa(g.i,g.mb=function(){e.k()});return e};var z={equalityComparer:J,Aa:function(){return this[s].L},Pb:function(a,c,d){if(this[s].Va&&c===this)throw Error("A 'pure' computed must not be called recursively");this[s].r[a]=d;d.Ga=this[s].L++;d.na=c.Na()},Qa:function(){var a,c,d=this[s].r;for(a in d)if(d.hasOwnProperty(a)&&(c=d[a],c.ia.Uc(c.na)))return!0},bd:function(){this.Fa&&!this[s].Ra&&this.Fa()},ba:function(){return this[s].S||0<this[s].L},
ld:function(){this.Mb||this.ac()},uc:function(a){if(a.cb&&!this[s].i){var c=a.X(this.bd,this,"dirty"),d=a.X(this.ld,this);return{ia:a,k:function(){c.k();d.k()}}}return a.X(this.ac,this)},ac:function(){var b=this,c=b.throttleEvaluation;c&&0<=c?(clearTimeout(this[s].bc),this[s].bc=a.a.setTimeout(function(){b.aa(!0)},c)):b.Fa?b.Fa():b.aa(!0)},aa:function(b){var c=this[s],d=c.wa;if(!c.Ra&&!c.R){if(c.i&&!a.a.nb(c.i)||d&&d()){if(!c.Fb){this.k();return}}else c.Fb=!1;c.Ra=!0;try{this.Qc(b)}finally{c.Ra=!1}c.L||
this.k()}},Qc:function(b){var c=this[s],d=c.Va?n:!c.L,e={Hc:this,Ma:c.r,lb:c.L};a.l.Ub({Gc:e,gb:Y,m:this,Sa:d});c.r={};c.L=0;e=this.Pc(c,e);this.tb(c.T,e)&&(c.s||this.notifySubscribers(c.T,"beforeChange"),c.T=e,c.s?this.zc():b&&this.notifySubscribers(c.T));d&&this.notifySubscribers(c.T,"awake")},Pc:function(b,c){try{var d=b.jd;return b.pb?d.call(b.pb):d()}finally{a.l.end(),c.lb&&!b.s&&a.a.D(c.Ma,X),b.S=!1}},t:function(){var a=this[s];(a.S&&!a.L||a.s&&this.Qa())&&this.aa();return a.T},Ta:function(b){a.J.fn.Ta.call(this,
b);this.Fa=function(){this.Kb(this[s].T);this[s].S=!0;this.Lb(this)}},k:function(){var b=this[s];!b.s&&b.r&&a.a.D(b.r,function(a,b){b.k&&b.k()});b.i&&b.mb&&a.a.F.pc(b.i,b.mb);b.r=null;b.L=0;b.R=!0;b.S=!1;b.s=!1;b.i=null}},$={sa:function(b){var c=this,d=c[s];if(!d.R&&d.s&&"change"==b){d.s=!1;if(d.S||c.Qa())d.r=null,d.L=0,d.S=!0,c.aa();else{var e=[];a.a.D(d.r,function(a,b){e[b.Ga]=a});a.a.q(e,function(a,b){var e=d.r[a],l=c.uc(e.ia);l.Ga=b;l.na=e.na;d.r[a]=l})}d.R||c.notifySubscribers(d.T,"awake")}},
Ia:function(b){var c=this[s];c.R||"change"!=b||this.Pa("change")||(a.a.D(c.r,function(a,b){b.k&&(c.r[a]={ia:b.ia,Ga:b.Ga,na:b.na},b.k())}),c.s=!0,this.notifySubscribers(n,"asleep"))},Na:function(){var b=this[s];b.s&&(b.S||this.Qa())&&this.aa();return a.J.fn.Na.call(this)}},aa={sa:function(a){"change"!=a&&"beforeChange"!=a||this.t()}};a.a.ka&&a.a.Xa(z,a.J.fn);var R=a.N.gd;a.m[R]=a.N;z[R]=a.m;a.Xc=function(b){return a.Oa(b,a.m)};a.Yc=function(b){return a.Oa(b,a.m)&&b[s]&&b[s].Va};a.b("computed",a.m);
a.b("dependentObservable",a.m);a.b("isComputed",a.Xc);a.b("isPureComputed",a.Yc);a.b("computed.fn",z);a.G(z,"peek",z.t);a.G(z,"dispose",z.k);a.G(z,"isActive",z.ba);a.G(z,"getDependenciesCount",z.Aa);a.nc=function(b,c){if("function"===typeof b)return a.m(b,c,{pure:!0});b=a.a.extend({},b);b.pure=!0;return a.m(b,c)};a.b("pureComputed",a.nc);(function(){function b(a,f,g){g=g||new d;a=f(a);if("object"!=typeof a||null===a||a===n||a instanceof RegExp||a instanceof Date||a instanceof String||a instanceof
Number||a instanceof Boolean)return a;var k=a instanceof Array?[]:{};g.save(a,k);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":k[c]=d;break;case "object":case "undefined":var h=g.get(d);k[c]=h!==n?h:b(d,f,g)}});return k}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.Ib=[]}a.wc=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");
return b(c,function(b){for(var c=0;a.H(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.wc(b);return a.a.Eb(b,c,d)};d.prototype={save:function(b,c){var d=a.a.o(this.keys,b);0<=d?this.Ib[d]=c:(this.keys.push(b),this.Ib.push(c))},get:function(b){b=a.a.o(this.keys,b);return 0<=b?this.Ib[b]:n}}})();a.b("toJS",a.wc);a.b("toJSON",a.toJSON);(function(){a.j={u:function(b){switch(a.a.A(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?a.a.e.get(b,a.d.options.xb):7>=a.a.C?b.getAttributeNode("value")&&
b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.j.u(b.options[b.selectedIndex]):n;default:return b.value}},ha:function(b,c,d){switch(a.a.A(b)){case "option":switch(typeof c){case "string":a.a.e.set(b,a.d.options.xb,n);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.e.set(b,a.d.options.xb,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===typeof c?c:""}break;case "select":if(""===c||
null===c)c=n;for(var e=-1,f=0,g=b.options.length,k;f<g;++f)if(k=a.j.u(b.options[f]),k==c||""==k&&c===n){e=f;break}if(d||0<=e||c===n&&1<b.size)b.selectedIndex=e;break;default:if(null===c||c===n)c="";b.value=c}}}})();a.b("selectExtensions",a.j);a.b("selectExtensions.readValue",a.j.u);a.b("selectExtensions.writeValue",a.j.ha);a.h=function(){function b(b){b=a.a.$a(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=[],d=b.match(e),r,k=[],p=0;if(d){d.push(",");for(var A=0,y;y=d[A];++A){var t=y.charCodeAt(0);
if(44===t){if(0>=p){c.push(r&&k.length?{key:r,value:k.join("")}:{unknown:r||k.join("")});r=p=0;k=[];continue}}else if(58===t){if(!p&&!r&&1===k.length){r=k.pop();continue}}else 47===t&&A&&1<y.length?(t=d[A-1].match(f))&&!g[t[0]]&&(b=b.substr(b.indexOf(y)+1),d=b.match(e),d.push(","),A=-1,y="/"):40===t||123===t||91===t?++p:41===t||125===t||93===t?--p:r||k.length||34!==t&&39!==t||(y=y.slice(1,-1));k.push(y)}}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,g={"in":1,"return":1,"typeof":1},k={};return{ta:[],ea:k,yb:b,Ua:function(e,m){function h(b,e){var m;if(!A){var l=a.getBindingHandler(b);if(l&&l.preprocess&&!(e=l.preprocess(e,b,h)))return;if(l=k[b])m=e,0<=a.a.o(c,m)?m=!1:(l=m.match(d),m=null===l?!1:l[1]?"Object("+l[1]+")"+l[2]:m),l=m;l&&g.push("'"+b+"':function(_z){"+m+"=_z}")}p&&(e=
"function(){return "+e+" }");f.push("'"+b+"':"+e)}m=m||{};var f=[],g=[],p=m.valueAccessors,A=m.bindingParams,y="string"===typeof e?b(e):e;a.a.q(y,function(a){h(a.key||a.unknown,a.value)});g.length&&h("_ko_property_writers","{"+g.join(",")+" }");return f.join(",")},ad:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},Ea:function(b,c,d,e,f){if(b&&a.H(b))!a.Ba(b)||f&&b.t()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.h);a.b("expressionRewriting.bindingRewriteValidators",
a.h.ta);a.b("expressionRewriting.parseObjectLiteral",a.h.yb);a.b("expressionRewriting.preProcessBindings",a.h.Ua);a.b("expressionRewriting._twoWayBindings",a.h.ea);a.b("jsonExpressionRewriting",a.h);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.h.Ua);(function(){function b(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&k.test(f?a.text:a.nodeValue)}function d(a,d){for(var e=a,f=1,l=[];e=e.nextSibling;){if(c(e)&&(f--,0===f))return l;l.push(e);
b(e)&&f++}if(!d)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=u&&"\x3c!--test--\x3e"===u.createComment("test").text,g=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,k=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,l={ul:!0,ol:!0};a.f={Z:{},childNodes:function(a){return b(a)?d(a):a.childNodes},xa:function(c){if(b(c)){c=a.f.childNodes(c);for(var d=
0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.ob(c)},da:function(c,d){if(b(c)){a.f.xa(c);for(var e=c.nextSibling,f=0,l=d.length;f<l;f++)e.parentNode.insertBefore(d[f],e)}else a.a.da(c,d)},mc:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},gc:function(c,d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):c.appendChild(d):a.f.mc(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||
c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},Tc:b,pd:function(a){return(a=(f?a.text:a.nodeValue).match(g))?a[1]:null},kc:function(d){if(l[a.a.A(d)]){var h=d.firstChild;if(h){do if(1===h.nodeType){var f;f=h.firstChild;var g=null;if(f){do if(g)g.push(f);else if(b(f)){var k=e(f,!0);k?f=k:g=[f]}else c(f)&&(g=[f]);while(f=f.nextSibling)}if(f=g)for(g=h.nextSibling,k=0;k<f.length;k++)g?d.insertBefore(f[k],
g):d.appendChild(f[k])}while(h=h.nextSibling)}}}}})();a.b("virtualElements",a.f);a.b("virtualElements.allowedBindings",a.f.Z);a.b("virtualElements.emptyNode",a.f.xa);a.b("virtualElements.insertAfter",a.f.gc);a.b("virtualElements.prepend",a.f.mc);a.b("virtualElements.setDomNodeChildren",a.f.da);(function(){a.Q=function(){this.Fc={}};a.a.extend(a.Q.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=b.getAttribute("data-bind")||a.g.getComponentNameForNode(b);case 8:return a.f.Tc(b);
default:return!1}},getBindings:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b):null;return a.g.Ob(d,b,c,!1)},getBindingAccessors:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b,{valueAccessors:!0}):null;return a.g.Ob(d,b,c,!0)},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.f.pd(b);default:return null}},parseBindingsString:function(b,c,d,e){try{var f=this.Fc,g=b+(e&&e.valueAccessors||
""),k;if(!(k=f[g])){var l,m="with($context){with($data||{}){return{"+a.h.Ua(b,e)+"}}}";l=new Function("$context","$element",m);k=f[g]=l}return k(c,d)}catch(h){throw h.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+h.message,h;}}});a.Q.instance=new a.Q})();a.b("bindingProvider",a.Q);(function(){function b(a){return function(){return a}}function c(a){return a()}function d(b){return a.a.Ca(a.l.w(b),function(a,c){return function(){return b()[c]}})}function e(c,e,h){return"function"===
typeof c?d(c.bind(null,e,h)):a.a.Ca(c,b)}function f(a,b){return d(this.getBindings.bind(this,a,b))}function g(b,c,d){var e,h=a.f.firstChild(c),f=a.Q.instance,m=f.preprocessNode;if(m){for(;e=h;)h=a.f.nextSibling(e),m.call(f,e);h=a.f.firstChild(c)}for(;e=h;)h=a.f.nextSibling(e),k(b,e,d)}function k(b,c,d){var e=!0,h=1===c.nodeType;h&&a.f.kc(c);if(h&&d||a.Q.instance.nodeHasBindings(c))e=m(c,null,b,d).shouldBindDescendants;e&&!r[a.a.A(c)]&&g(b,c,!h)}function l(b){var c=[],d={},e=[];a.a.D(b,function Z(h){if(!d[h]){var f=
a.getBindingHandler(h);f&&(f.after&&(e.push(h),a.a.q(f.after,function(c){if(b[c]){if(-1!==a.a.o(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));Z(c)}}),e.length--),c.push({key:h,fc:f}));d[h]=!0}});return c}function m(b,d,e,h){var m=a.a.e.get(b,q);if(!d){if(m)throw Error("You cannot apply bindings multiple times to the same element.");a.a.e.set(b,q,!0)}!m&&h&&a.tc(b,e);var g;if(d&&"function"!==typeof d)g=d;else{var k=a.Q.instance,r=k.getBindingAccessors||
f,p=a.B(function(){(g=d?d(e,b):r.call(k,b,e))&&e.P&&e.P();return g},null,{i:b});g&&p.ba()||(p=null)}var u;if(g){var v=p?function(a){return function(){return c(p()[a])}}:function(a){return g[a]},s=function(){return a.a.Ca(p?p():g,c)};s.get=function(a){return g[a]&&c(v(a))};s.has=function(a){return a in g};h=l(g);a.a.q(h,function(c){var d=c.fc.init,h=c.fc.update,f=c.key;if(8===b.nodeType&&!a.f.Z[f])throw Error("The binding '"+f+"' cannot be used with virtual elements");try{"function"==typeof d&&a.l.w(function(){var a=
d(b,v(f),s,e.$data,e);if(a&&a.controlsDescendantBindings){if(u!==n)throw Error("Multiple bindings ("+u+" and "+f+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=f}}),"function"==typeof h&&a.B(function(){h(b,v(f),s,e.$data,e)},null,{i:b})}catch(m){throw m.message='Unable to process binding "'+f+": "+g[f]+'"\nMessage: '+m.message,m;}})}return{shouldBindDescendants:u===n}}function h(b){return b&&b instanceof a.U?b:new a.U(b)}
a.d={};var r={script:!0,textarea:!0,template:!0};a.getBindingHandler=function(b){return a.d[b]};a.U=function(b,c,d,e){var h=this,f="function"==typeof b&&!a.H(b),m,g=a.B(function(){var m=f?b():b,l=a.a.c(m);c?(c.P&&c.P(),a.a.extend(h,c),g&&(h.P=g)):(h.$parents=[],h.$root=l,h.ko=a);h.$rawData=m;h.$data=l;d&&(h[d]=l);e&&e(h,c,l);return h.$data},null,{wa:function(){return m&&!a.a.Qb(m)},i:!0});g.ba()&&(h.P=g,g.equalityComparer=null,m=[],g.Ac=function(b){m.push(b);a.a.F.oa(b,function(b){a.a.La(m,b);m.length||
(g.k(),h.P=g=n)})})};a.U.prototype.createChildContext=function(b,c,d){return new a.U(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.U.prototype.extend=function(b){return new a.U(this.P||this.$data,this,null,function(c,d){c.$rawData=d.$rawData;a.a.extend(c,"function"==typeof b?b():b)})};var q=a.a.e.I(),p=a.a.e.I();a.tc=function(b,c){if(2==arguments.length)a.a.e.set(b,p,c),c.P&&c.P.Ac(b);else return a.a.e.get(b,
p)};a.Ja=function(b,c,d){1===b.nodeType&&a.f.kc(b);return m(b,c,h(d),!0)};a.Dc=function(b,c,d){d=h(d);return a.Ja(b,e(c,d,b),d)};a.eb=function(a,b){1!==b.nodeType&&8!==b.nodeType||g(h(a),b,!0)};a.Rb=function(a,b){!v&&x.jQuery&&(v=x.jQuery);if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||x.document.body;k(h(a),b,!0)};a.kb=function(b){switch(b.nodeType){case 1:case 8:var c=a.tc(b);if(c)return c;
if(b.parentNode)return a.kb(b.parentNode)}return n};a.Jc=function(b){return(b=a.kb(b))?b.$data:n};a.b("bindingHandlers",a.d);a.b("applyBindings",a.Rb);a.b("applyBindingsToDescendants",a.eb);a.b("applyBindingAccessorsToNode",a.Ja);a.b("applyBindingsToNode",a.Dc);a.b("contextFor",a.kb);a.b("dataFor",a.Jc)})();(function(b){function c(c,e){var m=f.hasOwnProperty(c)?f[c]:b,h;m?m.X(e):(m=f[c]=new a.J,m.X(e),d(c,function(b,d){var e=!(!d||!d.synchronous);g[c]={definition:b,Zc:e};delete f[c];h||e?m.notifySubscribers(b):
a.Y.Wa(function(){m.notifySubscribers(b)})}),h=!0)}function d(a,b){e("getConfig",[a],function(c){c?e("loadComponent",[a,c],function(a){b(a,c)}):b(null,null)})}function e(c,d,f,h){h||(h=a.g.loaders.slice(0));var g=h.shift();if(g){var q=g[c];if(q){var p=!1;if(q.apply(g,d.concat(function(a){p?f(null):null!==a?f(a):e(c,d,f,h)}))!==b&&(p=!0,!g.suppressLoaderExceptions))throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");}else e(c,d,f,h)}else f(null)}
var f={},g={};a.g={get:function(d,e){var f=g.hasOwnProperty(d)?g[d]:b;f?f.Zc?a.l.w(function(){e(f.definition)}):a.Y.Wa(function(){e(f.definition)}):c(d,e)},Xb:function(a){delete g[a]},Jb:e};a.g.loaders=[];a.b("components",a.g);a.b("components.get",a.g.get);a.b("components.clearCachedDefinition",a.g.Xb)})();(function(){function b(b,c,d,e){function g(){0===--y&&e(k)}var k={},y=2,t=d.template;d=d.viewModel;t?f(c,t,function(c){a.g.Jb("loadTemplate",[b,c],function(a){k.template=a;g()})}):g();d?f(c,d,function(c){a.g.Jb("loadViewModel",
[b,c],function(a){k[l]=a;g()})}):g()}function c(a,b,d){if("function"===typeof b)d(function(a){return new b(a)});else if("function"===typeof b[l])d(b[l]);else if("instance"in b){var e=b.instance;d(function(){return e})}else"viewModel"in b?c(a,b.viewModel,d):a("Unknown viewModel value: "+b)}function d(b){switch(a.a.A(b)){case "script":return a.a.ma(b.text);case "textarea":return a.a.ma(b.value);case "template":if(e(b.content))return a.a.ua(b.content.childNodes)}return a.a.ua(b.childNodes)}function e(a){return x.DocumentFragment?
a instanceof DocumentFragment:a&&11===a.nodeType}function f(a,b,c){"string"===typeof b.require?O||x.require?(O||x.require)([b.require],c):a("Uses require, but no AMD loader is present"):c(b)}function g(a){return function(b){throw Error("Component '"+a+"': "+b);}}var k={};a.g.register=function(b,c){if(!c)throw Error("Invalid configuration for "+b);if(a.g.ub(b))throw Error("Component "+b+" is already registered");k[b]=c};a.g.ub=function(a){return k.hasOwnProperty(a)};a.g.od=function(b){delete k[b];
a.g.Xb(b)};a.g.Zb={getConfig:function(a,b){b(k.hasOwnProperty(a)?k[a]:null)},loadComponent:function(a,c,d){var e=g(a);f(e,c,function(c){b(a,e,c,d)})},loadTemplate:function(b,c,f){b=g(b);if("string"===typeof c)f(a.a.ma(c));else if(c instanceof Array)f(c);else if(e(c))f(a.a.V(c.childNodes));else if(c.element)if(c=c.element,x.HTMLElement?c instanceof HTMLElement:c&&c.tagName&&1===c.nodeType)f(d(c));else if("string"===typeof c){var l=u.getElementById(c);l?f(d(l)):b("Cannot find element with ID "+c)}else b("Unknown element type: "+
c);else b("Unknown template value: "+c)},loadViewModel:function(a,b,d){c(g(a),b,d)}};var l="createViewModel";a.b("components.register",a.g.register);a.b("components.isRegistered",a.g.ub);a.b("components.unregister",a.g.od);a.b("components.defaultLoader",a.g.Zb);a.g.loaders.push(a.g.Zb);a.g.Bc=k})();(function(){function b(b,e){var f=b.getAttribute("params");if(f){var f=c.parseBindingsString(f,e,b,{valueAccessors:!0,bindingParams:!0}),f=a.a.Ca(f,function(c){return a.m(c,null,{i:b})}),g=a.a.Ca(f,function(c){var e=
c.t();return c.ba()?a.m({read:function(){return a.a.c(c())},write:a.Ba(e)&&function(a){c()(a)},i:b}):e});g.hasOwnProperty("$raw")||(g.$raw=f);return g}return{$raw:{}}}a.g.getComponentNameForNode=function(b){var c=a.a.A(b);if(a.g.ub(c)&&(-1!=c.indexOf("-")||"[object HTMLUnknownElement]"==""+b||8>=a.a.C&&b.tagName===c))return c};a.g.Ob=function(c,e,f,g){if(1===e.nodeType){var k=a.g.getComponentNameForNode(e);if(k){c=c||{};if(c.component)throw Error('Cannot use the "component" binding on a custom element matching a component');
var l={name:k,params:b(e,f)};c.component=g?function(){return l}:l}}return c};var c=new a.Q;9>a.a.C&&(a.g.register=function(a){return function(b){u.createElement(b);return a.apply(this,arguments)}}(a.g.register),u.createDocumentFragment=function(b){return function(){var c=b(),f=a.g.Bc,g;for(g in f)f.hasOwnProperty(g)&&c.createElement(g);return c}}(u.createDocumentFragment))})();(function(b){function c(b,c,d){c=c.template;if(!c)throw Error("Component '"+b+"' has no template");b=a.a.ua(c);a.f.da(d,b)}
function d(a,b,c,d){var e=a.createViewModel;return e?e.call(a,d,{element:b,templateNodes:c}):d}var e=0;a.d.component={init:function(f,g,k,l,m){function h(){var a=r&&r.dispose;"function"===typeof a&&a.call(r);q=r=null}var r,q,p=a.a.V(a.f.childNodes(f));a.a.F.oa(f,h);a.m(function(){var l=a.a.c(g()),k,t;"string"===typeof l?k=l:(k=a.a.c(l.name),t=a.a.c(l.params));if(!k)throw Error("No component name specified");var n=q=++e;a.g.get(k,function(e){if(q===n){h();if(!e)throw Error("Unknown component '"+k+
"'");c(k,e,f);var g=d(e,f,p,t);e=m.createChildContext(g,b,function(a){a.$component=g;a.$componentTemplateNodes=p});r=g;a.eb(e,f)}})},null,{i:f});return{controlsDescendantBindings:!0}}};a.f.Z.component=!0})();var S={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.D(d,function(c,d){d=a.a.c(d);var g=!1===d||null===d||d===n;g&&b.removeAttribute(c);8>=a.a.C&&c in S?(c=S[c],g?b.removeAttribute(c):b[c]=d):g||b.setAttribute(c,d.toString());"name"===c&&a.a.rc(b,
g?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,c,d){function e(){var e=b.checked,f=p?g():e;if(!a.va.Sa()&&(!l||e)){var m=a.l.w(c);if(h){var k=r?m.t():m;q!==f?(e&&(a.a.pa(k,f,!0),a.a.pa(k,q,!1)),q=f):a.a.pa(k,f,e);r&&a.Ba(m)&&m(k)}else a.h.Ea(m,d,"checked",f,!0)}}function f(){var d=a.a.c(c());b.checked=h?0<=a.a.o(d,g()):k?d:g()===d}var g=a.nc(function(){return d.has("checkedValue")?a.a.c(d.get("checkedValue")):d.has("value")?a.a.c(d.get("value")):b.value}),k=
"checkbox"==b.type,l="radio"==b.type;if(k||l){var m=c(),h=k&&a.a.c(m)instanceof Array,r=!(h&&m.push&&m.splice),q=h?g():n,p=l||h;l&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.m(e,null,{i:b});a.a.p(b,"click",e);a.m(f,null,{i:b});m=n}}};a.h.ea.checked=!0;a.d.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.d.css={update:function(b,c){var d=a.a.c(c());null!==d&&"object"==typeof d?a.a.D(d,function(c,d){d=a.a.c(d);a.a.bb(b,c,d)}):(d=a.a.$a(String(d||"")),a.a.bb(b,b.__ko__cssValue,
!1),b.__ko__cssValue=d,a.a.bb(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,e,f){var g=c()||{};a.a.D(g,function(g){"string"==typeof g&&a.a.p(b,g,function(b){var m,h=c()[g];if(h){try{var r=a.a.V(arguments);e=f.$data;r.unshift(e);m=h.apply(e,r)}finally{!0!==m&&(b.preventDefault?b.preventDefault():
b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={ic:function(b){return function(){var c=b(),d=a.a.zb(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.W.sb};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.W.sb}}},init:function(b,c){return a.d.template.init(b,
a.d.foreach.ic(c))},update:function(b,c,d,e,f){return a.d.template.update(b,a.d.foreach.ic(c),d,e,f)}};a.h.ta.foreach=!1;a.f.Z.foreach=!0;a.d.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(h){g=f.body}e=g===b}f=c();a.h.Ea(f,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),g=e.bind(null,!1);a.a.p(b,"focus",f);a.a.p(b,"focusin",f);a.a.p(b,"blur",g);a.a.p(b,
"focusout",g)},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),!d&&b.__ko_hasfocusLastValue&&b.ownerDocument.body.focus(),a.l.w(a.a.Da,null,[b,d?"focusin":"focusout"]))}};a.h.ea.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.h.ea.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Cb(b,c())}};K("if");K("ifnot",!1,!0);K("with",!0,!1,function(a,c){return a.createChildContext(c)});var L={};
a.d.options={init:function(b){if("select"!==a.a.A(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.Ka(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function g(c,e){if(A&&h)a.j.ha(b,a.a.c(d.get("value")),!0);else if(p.length){var f=0<=a.a.o(p,a.j.u(e[0]));a.a.sc(e[0],f);A&&!f&&a.l.w(a.a.Da,null,[b,
"change"])}}var k=b.multiple,l=0!=b.length&&k?b.scrollTop:null,m=a.a.c(c()),h=d.get("valueAllowUnset")&&d.has("value"),r=d.get("optionsIncludeDestroyed");c={};var q,p=[];h||(k?p=a.a.fb(e(),a.j.u):0<=b.selectedIndex&&p.push(a.j.u(b.options[b.selectedIndex])));m&&("undefined"==typeof m.length&&(m=[m]),q=a.a.Ka(m,function(b){return r||b===n||null===b||!a.a.c(b._destroy)}),d.has("optionsCaption")&&(m=a.a.c(d.get("optionsCaption")),null!==m&&m!==n&&q.unshift(L)));var A=!1;c.beforeRemove=function(a){b.removeChild(a)};
m=g;d.has("optionsAfterRender")&&"function"==typeof d.get("optionsAfterRender")&&(m=function(b,c){g(0,c);a.l.w(d.get("optionsAfterRender"),null,[c[0],b!==L?b:n])});a.a.Bb(b,q,function(c,e,g){g.length&&(p=!h&&g[0].selected?[a.j.u(g[0])]:[],A=!0);e=b.ownerDocument.createElement("option");c===L?(a.a.Za(e,d.get("optionsCaption")),a.j.ha(e,n)):(g=f(c,d.get("optionsValue"),c),a.j.ha(e,a.a.c(g)),c=f(c,d.get("optionsText"),g),a.a.Za(e,c));return[e]},c,m);a.l.w(function(){h?a.j.ha(b,a.a.c(d.get("value")),
!0):(k?p.length&&e().length<p.length:p.length&&0<=b.selectedIndex?a.j.u(b.options[b.selectedIndex])!==p[0]:p.length||0<=b.selectedIndex)&&a.a.Da(b,"change")});a.a.Nc(b);l&&20<Math.abs(l-b.scrollTop)&&(b.scrollTop=l)}};a.d.options.xb=a.a.e.I();a.d.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.p(b,"change",function(){var e=c(),f=[];a.a.q(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.j.u(b))});a.h.Ea(e,d,"selectedOptions",f)})},update:function(b,c){if("select"!=
a.a.A(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c()),e=b.scrollTop;d&&"number"==typeof d.length&&a.a.q(b.getElementsByTagName("option"),function(b){var c=0<=a.a.o(d,a.j.u(b));b.selected!=c&&a.a.sc(b,c)});b.scrollTop=e}};a.h.ea.selectedOptions=!0;a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.D(d,function(c,d){d=a.a.c(d);if(null===d||d===n||!1===d)d="";b.style[c]=d})}};a.d.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");
a.a.p(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Za(b,c())}};a.f.Z.text=!0;(function(){if(x&&x.navigator)var b=function(a){if(a)return parseFloat(a[1])},c=x.opera&&x.opera.version&&parseInt(x.opera.version()),d=x.navigator.userAgent,e=b(d.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),f=b(d.match(/Firefox\/([^ ]*)/));
if(10>a.a.C)var g=a.a.e.I(),k=a.a.e.I(),l=function(b){var c=this.activeElement;(c=c&&a.a.e.get(c,k))&&c(b)},m=function(b,c){var d=b.ownerDocument;a.a.e.get(d,g)||(a.a.e.set(d,g,!0),a.a.p(d,"selectionchange",l));a.a.e.set(b,k,c)};a.d.textInput={init:function(b,d,g){function l(c,d){a.a.p(b,c,d)}function k(){var c=a.a.c(d());if(null===c||c===n)c="";v!==n&&c===v?a.a.setTimeout(k,4):b.value!==c&&(u=c,b.value=c)}function y(){s||(v=b.value,s=a.a.setTimeout(t,4))}function t(){clearTimeout(s);v=s=n;var c=
b.value;u!==c&&(u=c,a.h.Ea(d(),g,"textInput",c))}var u=b.value,s,v,x=9==a.a.C?y:t;10>a.a.C?(l("propertychange",function(a){"value"===a.propertyName&&x(a)}),8==a.a.C&&(l("keyup",t),l("keydown",t)),8<=a.a.C&&(m(b,x),l("dragend",y))):(l("input",t),5>e&&"textarea"===a.a.A(b)?(l("keydown",y),l("paste",y),l("cut",y)):11>c?l("keydown",y):4>f&&(l("DOMAutoComplete",t),l("dragdrop",t),l("drop",t)));l("change",t);a.m(k,null,{i:b})}};a.h.ea.textInput=!0;a.d.textinput={preprocess:function(a,b,c){c("textInput",
a)}}})();a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.Ic;a.a.rc(b,d)}}};a.d.uniqueName.Ic=0;a.d.value={after:["options","foreach"],init:function(b,c,d){if("input"!=b.tagName.toLowerCase()||"checkbox"!=b.type&&"radio"!=b.type){var e=["change"],f=d.get("valueUpdate"),g=!1,k=null;f&&("string"==typeof f&&(f=[f]),a.a.ra(e,f),e=a.a.Tb(e));var l=function(){k=null;g=!1;var e=c(),f=a.j.u(b);a.h.Ea(e,d,"value",f)};!a.a.C||"input"!=b.tagName.toLowerCase()||"text"!=b.type||
"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.o(e,"propertychange")||(a.a.p(b,"propertychange",function(){g=!0}),a.a.p(b,"focus",function(){g=!1}),a.a.p(b,"blur",function(){g&&l()}));a.a.q(e,function(c){var d=l;a.a.nd(c,"after")&&(d=function(){k=a.j.u(b);a.a.setTimeout(l,0)},c=c.substring(5));a.a.p(b,c,d)});var m=function(){var e=a.a.c(c()),f=a.j.u(b);if(null!==k&&e===k)a.a.setTimeout(m,0);else if(e!==f)if("select"===a.a.A(b)){var g=d.get("valueAllowUnset"),f=function(){a.j.ha(b,
e,g)};f();g||e===a.j.u(b)?a.a.setTimeout(f,0):a.l.w(a.a.Da,null,[b,"change"])}else a.j.ha(b,e)};a.m(m,null,{i:b})}else a.Ja(b,{checkedValue:c})},update:function(){}};a.h.ea.value=!0;a.d.visible={update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(c,d,e,f,g){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,f,g)}}})("click");a.O=function(){};a.O.prototype.renderTemplateSource=
function(){throw Error("Override renderTemplateSource");};a.O.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.O.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||u;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.v.n(d)}if(1==b.nodeType||8==b.nodeType)return new a.v.qa(b);throw Error("Unknown template type: "+b);};a.O.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,
e);return this.renderTemplateSource(a,c,d,e)};a.O.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.O.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.O);a.Gb=function(){function b(b,c,d,k){b=a.h.yb(b);for(var l=a.h.ta,m=0;m<b.length;m++){var h=b[m].key;if(l.hasOwnProperty(h)){var r=l[h];if("function"===typeof r){if(h=
r(b[m].value))throw Error(h);}else if(!r)throw Error("This template engine does not support the '"+h+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.h.Ua(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return k.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Oc:function(b,
c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Gb.dd(b,c)},d)},dd:function(a,f){return a.replace(c,function(a,c,d,e,h){return b(h,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",f)})},Ec:function(b,c){return a.M.wb(function(d,k){var l=d.nextSibling;l&&l.nodeName.toLowerCase()===c&&a.Ja(l,b,k)})}}}();a.b("__tr_ambtns",a.Gb.Ec);(function(){a.v={};a.v.n=function(b){if(this.n=b){var c=a.a.A(b);this.ab="script"===c?1:"textarea"===c?2:"template"==c&&
b.content&&11===b.content.nodeType?3:4}};a.v.n.prototype.text=function(){var b=1===this.ab?"text":2===this.ab?"value":"innerHTML";if(0==arguments.length)return this.n[b];var c=arguments[0];"innerHTML"===b?a.a.Cb(this.n,c):this.n[b]=c};var b=a.a.e.I()+"_";a.v.n.prototype.data=function(c){if(1===arguments.length)return a.a.e.get(this.n,b+c);a.a.e.set(this.n,b+c,arguments[1])};var c=a.a.e.I();a.v.n.prototype.nodes=function(){var b=this.n;if(0==arguments.length)return(a.a.e.get(b,c)||{}).jb||(3===this.ab?
b.content:4===this.ab?b:n);a.a.e.set(b,c,{jb:arguments[0]})};a.v.qa=function(a){this.n=a};a.v.qa.prototype=new a.v.n;a.v.qa.prototype.text=function(){if(0==arguments.length){var b=a.a.e.get(this.n,c)||{};b.Hb===n&&b.jb&&(b.Hb=b.jb.innerHTML);return b.Hb}a.a.e.set(this.n,c,{Hb:arguments[0]})};a.b("templateSources",a.v);a.b("templateSources.domElement",a.v.n);a.b("templateSources.anonymousTemplate",a.v.qa)})();(function(){function b(b,c,d){var e;for(c=a.f.nextSibling(c);b&&(e=b)!==c;)b=a.f.nextSibling(e),
d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],g=e.parentNode,k=a.Q.instance,n=k.preprocessNode;if(n){b(e,f,function(a,b){var c=a.previousSibling,d=n.call(k,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):(c.push(e,f),a.a.za(c,g))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.Rb(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.M.yc(b,[d])});a.a.za(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,
e,f,k,q){q=q||{};var p=(b&&d(b)||f||{}).ownerDocument,n=q.templateEngine||g;a.Gb.Oc(f,n,p);f=n.renderTemplate(f,k,q,p);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");p=!1;switch(e){case "replaceChildren":a.f.da(b,f);p=!0;break;case "replaceNode":a.a.qc(b,f);p=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}p&&(c(f,k),q.afterRender&&a.l.w(q.afterRender,null,[f,k.$data]));
return f}function f(b,c,d){return a.H(b)?b():"function"===typeof b?b(c,d):b}var g;a.Db=function(b){if(b!=n&&!(b instanceof a.O))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.Ab=function(b,c,h,k,q){h=h||{};if((h.templateEngine||g)==n)throw Error("Set a template engine before calling renderTemplate");q=q||"replaceChildren";if(k){var p=d(k);return a.B(function(){var g=c&&c instanceof a.U?c:new a.U(a.a.c(c)),n=f(b,g.$data,g),g=e(k,q,n,g,h);"replaceNode"==q&&(k=g,p=d(k))},null,
{wa:function(){return!p||!a.a.nb(p)},i:p&&"replaceNode"==q?p.parentNode:p})}return a.M.wb(function(d){a.Ab(b,c,h,d,"replaceNode")})};a.kd=function(b,d,g,k,q){function p(a,b){c(b,s);g.afterRender&&g.afterRender(b,a);s=null}function u(a,c){s=q.createChildContext(a,g.as,function(a){a.$index=c});var d=f(b,a,s);return e(null,"ignoreTargetNode",d,s,g)}var s;return a.B(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.Ka(b,function(b){return g.includeDestroyed||b===n||null===b||!a.a.c(b._destroy)});
a.l.w(a.a.Bb,null,[k,b,u,g,p])},null,{i:k})};var k=a.a.e.I();a.d.template={init:function(b,c){var d=a.a.c(c());if("string"==typeof d||d.name)a.f.xa(b);else{if("nodes"in d){if(d=d.nodes||[],a.H(d))throw Error('The "nodes" option must be a plain, non-observable array.');}else d=a.f.childNodes(b);d=a.a.jc(d);(new a.v.qa(b)).nodes(d)}return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var g=c(),s;c=a.a.c(g);d=!0;e=null;"string"==typeof c?c={}:(g=c.name,"if"in c&&(d=a.a.c(c["if"])),d&&"ifnot"in
c&&(d=!a.a.c(c.ifnot)),s=a.a.c(c.data));"foreach"in c?e=a.kd(g||b,d&&c.foreach||[],c,b,f):d?(f="data"in c?f.createChildContext(s,c.as):f,e=a.Ab(g||b,f,c,b)):a.f.xa(b);f=e;(s=a.a.e.get(b,k))&&"function"==typeof s.k&&s.k();a.a.e.set(b,k,f&&f.ba()?f:n)}};a.h.ta.template=function(b){b=a.h.yb(b);return 1==b.length&&b[0].unknown||a.h.ad(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.f.Z.template=!0})();a.b("setTemplateEngine",a.Db);a.b("renderTemplate",
a.Ab);a.a.dc=function(a,c,d){if(a.length&&c.length){var e,f,g,k,l;for(e=f=0;(!d||e<d)&&(k=a[f]);++f){for(g=0;l=c[g];++g)if(k.value===l.value){k.moved=l.index;l.moved=k.index;c.splice(g,1);e=g=0;break}e+=g}}};a.a.ib=function(){function b(b,d,e,f,g){var k=Math.min,l=Math.max,m=[],h,n=b.length,q,p=d.length,s=p-n||1,u=n+p+1,t,v,x;for(h=0;h<=n;h++)for(v=t,m.push(t=[]),x=k(p,h+s),q=l(0,h-1);q<=x;q++)t[q]=q?h?b[h-1]===d[q-1]?v[q-1]:k(v[q]||u,t[q-1]||u)+1:q+1:h+1;k=[];l=[];s=[];h=n;for(q=p;h||q;)p=m[h][q]-
1,q&&p===m[h][q-1]?l.push(k[k.length]={status:e,value:d[--q],index:q}):h&&p===m[h-1][q]?s.push(k[k.length]={status:f,value:b[--h],index:h}):(--q,--h,g.sparse||k.push({status:"retained",value:d[q]}));a.a.dc(s,l,!g.dontLimitMoves&&10*n);return k.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.ib);(function(){function b(b,c,d,k,l){var m=[],
h=a.B(function(){var h=c(d,l,a.a.za(m,b))||[];0<m.length&&(a.a.qc(m,h),k&&a.l.w(k,null,[d,h,l]));m.length=0;a.a.ra(m,h)},null,{i:b,wa:function(){return!a.a.Qb(m)}});return{ca:m,B:h.ba()?h:n}}var c=a.a.e.I(),d=a.a.e.I();a.a.Bb=function(e,f,g,k,l){function m(b,c){w=q[c];v!==c&&(D[b]=w);w.qb(v++);a.a.za(w.ca,e);u.push(w);z.push(w)}function h(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.q(c[d].ca,function(a){b(a,d,c[d].ja)})}f=f||[];k=k||{};var r=a.a.e.get(e,c)===n,q=a.a.e.get(e,c)||[],p=a.a.fb(q,
function(a){return a.ja}),s=a.a.ib(p,f,k.dontLimitMoves),u=[],t=0,v=0,x=[],z=[];f=[];for(var D=[],p=[],w,C=0,B,E;B=s[C];C++)switch(E=B.moved,B.status){case "deleted":E===n&&(w=q[t],w.B&&(w.B.k(),w.B=n),a.a.za(w.ca,e).length&&(k.beforeRemove&&(u.push(w),z.push(w),w.ja===d?w=null:f[C]=w),w&&x.push.apply(x,w.ca)));t++;break;case "retained":m(C,t++);break;case "added":E!==n?m(C,E):(w={ja:B.value,qb:a.N(v++)},u.push(w),z.push(w),r||(p[C]=w))}a.a.e.set(e,c,u);h(k.beforeMove,D);a.a.q(x,k.beforeRemove?a.$:
a.removeNode);for(var C=0,r=a.f.firstChild(e),F;w=z[C];C++){w.ca||a.a.extend(w,b(e,g,w.ja,l,w.qb));for(t=0;s=w.ca[t];r=s.nextSibling,F=s,t++)s!==r&&a.f.gc(e,s,F);!w.Wc&&l&&(l(w.ja,w.ca,w.qb),w.Wc=!0)}h(k.beforeRemove,f);for(C=0;C<f.length;++C)f[C]&&(f[C].ja=d);h(k.afterMove,D);h(k.afterAdd,p)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Bb);a.W=function(){this.allowTemplateRewriting=!1};a.W.prototype=new a.O;a.W.prototype.renderTemplateSource=function(b,c,d,e){if(c=(9>a.a.C?0:b.nodes)?
b.nodes():null)return a.a.V(c.cloneNode(!0).childNodes);b=b.text();return a.a.ma(b,e)};a.W.sb=new a.W;a.Db(a.W.sb);a.b("nativeTemplateEngine",a.W);(function(){a.vb=function(){var a=this.$c=function(){if(!v||!v.tmpl)return 0;try{if(0<=v.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,f,g){g=g||u;f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var k=b.data("precompiled");
k||(k=b.text()||"",k=v.template(null,"{{ko_with $item.koBindingContext}}"+k+"{{/ko_with}}"),b.data("precompiled",k));b=[e.$data];e=v.extend({koBindingContext:e},f.templateOptions);e=v.tmpl(k,b,e);e.appendTo(g.createElement("div"));v.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){u.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(v.tmpl.tag.ko_code={open:"__.push($1 || '');"},
v.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.vb.prototype=new a.O;var b=new a.vb;0<b.$c&&a.Db(b);a.b("jqueryTmplTemplateEngine",a.vb)})()})})();})();

define('baseVM',[],function () {

    var BaseVM= function () {
        var self = this;
        self.GetStaticImg = function (src) {
            if (src.length > 40 && src.indexOf("http://") == -1) {
                return src.indexOf("http://") != -1 ? src : window.im_static + src;
            }
            return src.indexOf("http://") != -1 ? src : window.im_static_baseUrl + src;
        }
        self.GetsmallImg = function (pic) {
            if (pic.indexOf("group") >= 1 && pic.indexOf(".gif") == -1) {
                pic = pic.substring(0, pic.lastIndexOf('.')) + "!60x60" + pic.substring(pic.lastIndexOf('.'));
            }
            return self.GetStaticImg(pic);
        }
        self.GetImg = function (data) {
            var pic = '/images/headpic.png';
            if (data.userPic && data.userPic != "/images/headpic.png") {
                pic = data.userPic;
                if (pic.indexOf("group") >= 1 && pic.indexOf(".gif") == -1) {
                    pic = pic.substring(0, pic.lastIndexOf('.')) + "!60x60" + pic.substring(pic.lastIndexOf('.'));
                }
            }
            return self.GetStaticImg(pic);
        }   //获取用户图片
        return self;
    }

    return BaseVM;
    
});
/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {
    

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }

    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
        if (port1 === port2) {
            return true;
        } else if (protocol1 === protocol2) {
            if (protocol1 === 'http') {
                return useDefault(port1, '80') === useDefault(port2, '80');
            } else if (protocol1 === 'https') {
                return useDefault(port1, '443') === useDefault(port2, '443');
            }
        }
        return false;
    }

    text = {
        version: '2.0.15',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.lastIndexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || isSamePort(uProtocol, uPort, protocol, port));
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'] &&
            !process.versions['atom-shell'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file[0] === '\uFEFF') {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            try {
                xhr.open('GET', url, true);
            }
            catch (e) {
                try {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP')
                    xhr.open('Post', url, false);
                }
                catch (e1) {
                  
                    if (typeof XDomainRequest != "undefined") {
                        // XDomainRequest for IE.
                        xhr = new XDomainRequest();
                        xhr.open('GET', url);
                    } else { 
                        throw new Error("Exception during GET request: " + e1 + url);
                    }
                }
            }
           // xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});

define('text!templates/chatWindow.html',[],function () { return '<div class="moveBar ko_chatWindow" id="ko_moveBar">\r\n    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>\r\n    <div id="banner" class="bannerWindow"><b>惠农大麦</b><i><span data-bind="text:CurrContact()?CurrContact().LinkMain:\'\'"></span> </i><a href="#" data-bind="click:ChatClose" class="closeBox"><img data-bind="attr:{src:GetStaticImg(\'/images/3.0/close.jpg\')}"></a> </div>\r\n    <div class="content clearfix">\r\n        <div class="box_left">\r\n            <div class="message-box " id="ko_message-box" data-bind="css:IsInitMsg()?\'\':\'im_loading\'">\r\n                <div class="scroll-pane mes">\r\n                    <!--ko if:TotalCount() > MsgList().length -->\r\n                    <h1><a data-bind="click: InitMoreMsg" id="ko_lod" class="more">查看更多消息</a></h1>\r\n                    <!--/ko-->\r\n                    <!--ko foreach:MsgList-->\r\n                    <div class="send_time" data-bind="text:$parent.GetTimer($data,$index())">\r\n                    </div>\r\n\r\n                    <div class="clearfix" data-bind="css:$parent.IsCurrUserId($data)?\'right_box\':\'left_box\'">\r\n\r\n                        <div class="bgbox  " data-bind="css:Head.SendStatus()==0?\'loading\':\'\',attr:{id:Head.SendStatus()!=1&&Head.MessageNo?Head.MessageNo:\'\'}">\r\n                            <!--ko if:$data.Head.MsgType==1||$data.Head.MsgType==3-->\r\n                            <div data-bind="with:JSON.parse( $data.Body.Content)">\r\n                                <div class="send-file " data-bind="css:$parent.Head.MsgType==1?($parent.Head.SendStatus()==-1?\'send-img-fail\':\'send-img-success\'):($parent.Head.SendStatus()==-1?\'send-file-fail\':\'send-file-success\')">\r\n                                    <p class="file-name"><strong data-bind="text:filename"></strong><!--<span data-bind="visible:size()>0" >（<span data-bind="text:size"></span> KB）</span>--></p>\r\n                                    <p class="file-link">\r\n                                        <a data-bind="visible: $parent.isCurrId(),css:$parent.Head.SendStatus()==-1?\'red\':\'orange\', text:$parent.Head.SendStatus()==0?\'正在发送中\':$parent.Head.SendStatus()==1?\'发送成功\':\'发送失败\'"></a>\r\n                                        <a data-bind="visible: $parent.Head.SendStatus()!=-1&&(!$parent.isCurrId()),attr:{href:(($parent.Head.MsgType == 1)? (fileurl || \'\'): dlurl) }" target="_blank">下载</a>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                            <!--<filemessage params="data:$data,ResendClick:$parent.ResendFile"></filemessage>-->\r\n                            <!--/ko-->\r\n                            <!--ko if:$data.Head.MsgType==0-->\r\n                            <div class="msg" data-bind="html:$data.Body.Content.httpHtml()"></div>\r\n                            <!--/ko-->\r\n                            <!--ko if:$data.Head.MsgType==4-->\r\n\r\n                            <div class="card" data-bind="css:$parent.BindCardInfo($data),visible:$data.user">\r\n                                <!--ko if:$data.user--> \r\n                                 <div class="infomation clearfix">\r\n                                    <img data-bind="attr:{src:$root.GetStaticImg(user().ImgUrl)}">\r\n                                    <p data-bind="visible:user().shopName, attr:{title:user().shopName}">店铺名称： <span data-bind="text:user().shopName"></span></p>\r\n                                    <p data-bind="visible:user().LinkMain,attr:{title:user().LinkMain}">联系人： <span data-bind="text:user().LinkMain"></span></p>\r\n                                    <p data-bind="visible:user().Telephone,attr:{title:user().Telephone}">电话： <span data-bind="text:user().Telephone"></span></p>\r\n                                    <p data-bind="visible:user().Address,attr:{title:user().Address}">地址： <span data-bind="text:user().Address"></span></p>\r\n                                </div>\r\n                                <p data-bind="visible:user().userCert,html:$parent.GetUserCert(user().userCert)"></p>\r\n                                <div class="card_a">\r\n                                    <a data-bind="visible:user().shopUrl,attr:{href:user().shopUrl}" target="_blank">查看店铺</a>\r\n                                    <a data-bind="visible:user().Type!=1&&user().VipLevel > 0,attr:{href:user().shopUrl+\'/intro\'}" target="_blank">查看供应商简介</a>\r\n                                </div>\r\n                                <!--/ko-->\r\n                                <!--ko ifnot:$data.user--> \r\n                                <div class="msg" data-bind="html:\'空白名片\'"></div>\r\n                                <!--/ko-->\r\n                            </div>\r\n                            <!--/ko-->\r\n                            <!--ko if:$parent.IsCurrUserId($data)-->\r\n\r\n                            <a data-bind="click:$parent.ResendMsg,visible:Head.SendStatus()==-1" style="display:none;" class="call_again">重发</a>\r\n                            <!--/ko-->\r\n                        </div>\r\n\r\n                        <img data-bind="attr:{ src:$parent.GetStaticImg($parent.IsCurrUserId($data)?\'/images/IM/r.jpg\':\'/images/IM/l.jpg\') },css:$parent.IsCurrUserId($data)?\'ro\':\'lo\'">\r\n                        <img data-bind="attr:{ src:$parent.GetUserImgSrc($data) },css:$parent.IsCurrUserId($data)?\'rt\':\'lt\'">\r\n                    </div>\r\n\r\n                    <!--/ko-->\r\n                </div>\r\n            </div>\r\n            <div id="ko_SendTool">\r\n            </div>\r\n        </div>\r\n        <div class="box_right " data-bind="css:IsInitCustom()?\'\':\'im_loading\'">\r\n\r\n            <ul class="title_tab clearfix" data-bind="foreach:TabArray">\r\n\r\n                <li data-bind="text:$data,css:$index()==$parent.IsShowNumber()?\'on\':\'\',click:function(){$parent.tabClick($index()) }"></li>\r\n            </ul>\r\n            <div class="ment">\r\n\r\n                <div class="info infos" data-bind="visible:IsShowNumber()==0,css:IsShowNumber()!=0?\'hide\':\'on\'">\r\n\r\n                    <!--ko with:CurrContact()-->\r\n                    <!--ko if:ImgUrl --><h1 class="" data-bind="css:VipLevel==1?\'t_img\':VipLevel==2?\'p_img\':VipLevel==3?\'o_img\':\'d_img\'">\r\n                        <!--ko if:Type==2 --><a target="_blank" data-bind="attr:{href:shopUrl}"><img weight="64" height="64" data-bind="attr:{src:$root.GetsmallImg(ImgUrl)}"></a><!--/ko-->\r\n                        <!--ko if:Type!=2 --><img weight="64" height="64" data-bind="attr:{src:$root.GetsmallImg(ImgUrl)}"><!--/ko-->\r\n                    </h1> <!--/ko-->\r\n                    <!--ko if:shopName--> <p class="od_name" data-bind="text: shopName"></p> <!--/ko-->\r\n                    <p class="c_icon" data-bind="html:$root.GetUserCert(userCert)">\r\n\r\n                    </p>\r\n                    <!--ko if:LinkMain--> <p class="c_name">联系人：<span data-bind="text:LinkMain"></span></p><!--/ko-->\r\n                    <!--ko if:Telephone--> <p class="c_tel">手机：<span data-bind="text:Telephone"></span></p><!--/ko-->\r\n                    <!--ko if:Address--> <p class="c_address">地址：<span data-bind="text:Address"></span></p><!--/ko-->\r\n                    <!--ko if:shopUrl &&Type==2-->  <a data-bind="attr:{href:shopUrl}" target="_blank" class="go_shop">进入店铺</a><!--/ko-->\r\n                    <!--/ko-->\r\n                </div>\r\n\r\n                <div class="info infos " data-bind="visible:IsShowNumber()==1,css:(IsShowNumber()!=1)?\'hide\':\'\'">\r\n                    <!--ko with:QuestionList()-->\r\n                    <h1 class="ask">常见问题</h1>\r\n                    <div data-bind="html:AdTopContent"></div>\r\n                    <h1 class="ask">防骗提醒</h1>\r\n                    <div data-bind="html:AdBottomContent"></div>\r\n                    <!--/ko-->\r\n                </div>\r\n\r\n            </div>\r\n            <a href="http://app.cnhnb.com/appApk/huinongwang" target="_blank"><img data-bind="attr:{src:$root.GetStaticImg(\'/images/im/down.jpg\')}" class="down"></a>\r\n            <a href="#" class="toggtle"></a>\r\n        </div>\r\n    </div>\r\n\r\n</div>';});

define('text!templates/sendTool.html',[],function () { return '<div class="ko_edit">\r\n  \r\n    <a class="ed1" title="发送图片">\r\n\r\n        <img   data-bind="click: function(){showFileUpload(0)},attr:{src:GetStaticImg(\'/images/im/IM1.jpg\')}" />\r\n        <input type="file" id="hidden-file" data-bind="event:{ change:function(){SendFile($element)}}" class="hide" name="data" accept="image/*" />\r\n\r\n    </a>\r\n    <a class="ed1" title="发送文件">\r\n        <img data-bind="click:  function(){showFileUpload(1)},attr:{src:GetStaticImg(\'/images/3.0/IM2.jpg\')}" />\r\n\r\n        <input type="file" name="data" class="hide" data-bind="event:{ change:  function(){SendFile($element,1)}}" id="hidden-files" accept=".pptx,.doc,.docx,.ppt,.execl,.xlsx,.pdf" />\r\n    </a>\r\n \r\n    <a href="#" title="发送名片" class="ed1" data-bind="click:SendCard"><img data-bind="attr:{src:GetStaticImg(\'/images/im/IM3.jpg\')}"></a>\r\n    <a href="#" title="快捷回复" class="ed1"><img data-bind="click:OpenQuick, attr:{src:GetStaticImg(\'/images/im/IM4.jpg\')}"></a>\r\n</div>\r\n<div class="write">\r\n\r\n    <div class="scroll-pane jst im_textarea">\r\n\r\n        <textarea class="tscoll"></textarea>\r\n    </div>\r\n</div>\r\n<div class="submit" data-bind="click:SendMsg"><a>发 送</a><div class="ko_sub_waring" style="display:none;"><label class="error">发送内容不能为空</label></div></div>';});

define('text!templates/quickmsg.html',[],function () { return '<div class="quick-reply" id="ko_quickList">\r\n\r\n    <div class="quick-title"><strong>快捷回复用语</strong><a data-bind="click:Close" class="close"><img data-bind="attr:{src:$root.GetStaticImg(\'/images/3.0/close.png\')}" class="pngfix" /></a> </div>\r\n    <div class="quick-list">\r\n        <ul data-bind="foreach:QuickReplyList">\r\n            <li>\r\n                <div class="quick-view">\r\n                    <p data-bind="text:msgContent,visible:!Editing(),click:$root.QuickClick"></p>\r\n                    <!--ko if:state!=2 -->\r\n                    <span class="del-btn" data-bind="click:$parent.Delete">\r\n\r\n                        <img data-bind="visible:!Editing(),attr:{src:$root.GetStaticImg(\'/images/IM/txt-del.gif\')}" />\r\n                    </span>\r\n                    <span class="edit-btn" data-bind="click:$parent.EditMsg"><img data-bind="visible:!Editing(), attr:{src:$root.GetStaticImg(\'/images/3.0/txt-edit.gif\')}" /></span>\r\n                    <!--/ko-->\r\n                </div>\r\n                <!--ko if:state!=2-->\r\n                <div data-bind="visible:Editing()" class="quick-edit"><input type="text" data-bind="value:msgContent"><a data-bind="click:$parent.Submit" class="edit-confirm">确定修改</a></div>\r\n                <!--/ko-->\r\n            </li>\r\n        </ul>\r\n        <div class="quick-add">\r\n            <input type="text" data-bind="value:NewContent">\r\n            <a data-bind="click:Add " class="add-confirm">确定新增</a>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>';});

define('quickmsg',['lib/knockout-3.4', 'baseVM', 'utility', 'contacts'], function (ko, BaseVM, ui, contacts) {
   
    //快捷回复
    var QuickReplyVM = function (ChatWindow)
    {
        var self = new BaseVM();
        self.QuickReplyList = ko.observableArray();
        self.InitQuickReplyMsg = function (isTrue) {
          
            if (self.QuickReplyList().length > 0 && !isTrue) {
                $('.quick-reply').show();
                setTimeout(function () {

                    $('.quick-list li').not('.cur').unbind('hover').hover(function () {
                        $(this).addClass('hover');
                        $(this).find('.quick-view span').show();
                    }, function () {
                        $(this).removeClass('hover');
                        $(this).find('.quick-view span').hide();
                    });
                }, 200);
                return false;
            }
            console.log('加载快捷回复..');
            ui.hnajax("/quick/quickmessage", null, "json", function (result) {
                if (result) {
                    $.each(result.Data, function (i, item) {
                        item.msgContent = ko.observable(item.msgContent);
                        item.Editing = ko.observable(false);
                    });
                    self.QuickReplyList(result.Data);
                    $('.quick-reply').show();
                    setTimeout(function () {
                        $('.quick-list li').not('.cur').unbind('hover').hover(function () {
                            $(this).addClass('hover');
                            $(this).find('.quick-view span').show();
                        }, function () {
                            $(this).removeClass('hover');
                            $(this).find('.quick-view span').hide();
                        });
                    }, 200);
                }
            }, function (e) {
                console.log(e);
            });
        }   // 加载快捷回复

        self.NewContent = ko.observable('');
        self.Close = function () {
            $('.quick-reply').remove();
            self.NewContent('');
        }
        self.Delete = function (data) {
            quickajax("/quick/delete", { "id": data.id });
        }
        self.QuickClick = function (data) {
            if (ChatWindow) {
                ChatWindow.QucikMsg(data.msgContent(), 0);
                self.Close();
            }
        } //发送消息
        function quickajax(url, data) {
            ui.hnajax(url, data, "json", function (result) {
                if (result.Message != "success") {
                    ui.showMessage(result.Message);
                    return false;
                }
                self.InitQuickReplyMsg(true);
            }, function () {
                ui.showMessage("添加失败");
            });
        }
        self.EditMsg = function (data) {

            data.Editing(true);
        }
        self.Submit = function (data) {
            var content = data.msgContent().trim();
            if (content.length == 0) {
                ui.showMessage('快捷回复语不能为空或空白字符..');
                return false;
            }
            quickajax("/quick/update", { "id": data.id, "msgContent": data.msgContent() });
            data.Editing(false);
        }
        self.Add = function () {
           var content= self.NewContent().trim();
           if (content.length == 0) {
               ui.showMessage('快捷回复语不能为空或空白字符..');
                return false;
           }
           if (content.length>20) {
               ui.showMessage('快捷回复语不能超过20个字符..');
               return false;
           }
            quickajax("/quick/add",
                { "msgContent": content });
            self.NewContent('');
            self.Close();
        }
        return self;
    }

    var quick = {
       
        quickVM: QuickReplyVM
    };
    return quick;
});




define('sendTool',['lib/knockout-3.4', 'utility', 'baseVM', 'text!templates/sendTool.html', 'text!templates/quickmsg.html', 'quickmsg'], function (ko, ui, BaseVM, sendToolHtml, quickmsgHtml, q) {

    //发送消息的vm  msglist为 ko 数组 
    function SendVM(ChatWindow) {
        var self = ChatWindow;
        self.IsIE = ko.observable(ui.getbrowser());

        //发送消息模板（本地展示）
        function GetChatMsg(msg, msgType) {
            msgType = msgType || 0;

            return {
                "Body": { "Content": msg },
                "Head": {
                    "UserId": parseInt(setting.currentId),
                    "UserAvatar": setting.currentPic,
                    "MsgType": msgType,
                    "Time": new Date().Format("yyyy-MM-dd hh:mm:ss"),
                    "SendStatus": ko.observable(0) // 0：发送中,1:已发送 -1:发送失败
                }
            }
        };

        //发送消息模板 (发送至服务器)
        function GetSendBody(message, tarid, msgType) {
            msgType = msgType || 0;
            var p = {
                "body": {
                    "content": message
                },
                "head": {
                    "userid": setting.currentId,
                    "messageno": ui.newId(),
                    "targetid": tarid,
                    "platform": 0,
                    "msgtype": msgType
                }
            };
            return p;
        }

        function msgStatusChange(elementId, id) {

            var element = $(elementId + ' #' + id);

            if (!element) {
                return false;
            }
            $(elementId + ' #' + id + ' .call_again').show();
            $(element).removeClass('loading');

        }
        //发送消息
        function send(msg, msgType, isResend) {
            try {
                var currMsg = GetChatMsg(msg, msgType);
                var sendMsg = GetSendBody(msg, self.CurrContact().UserId, msgType);
                currMsg.Head.MessageNo = sendMsg.head.messageno;



                ui.sendMessage(sendMsg);
                self.MsgList.push(currMsg);
            } catch (e) {

                var msg = '发送消息失败,请刷新页面后重试.';
                // error  "SignalR: Connection must be started before data can be sent. Call .start() before .send()"
                if (e.message.indexOf('SignalR: Connection must be started before data can be sent.') != -1) {
                    msg = "您处于离线状态,请检查网络是否正常或刷新页面后重试.";
                }

                if (isResend) {
                    self.MsgList.push(currMsg);
                }
                ui.showMessage(msg);
                console.log(msg);
                return false;
            }


            $(self.jqueryElementId() + " .im_textarea textarea").val('');
            self.UpdateMsgScroll();

            window.setTimeout(function () {
                msgStatusChange(self.jqueryElementId(), sendMsg.head.messageno);
            }, 60000);
        }

        window.TestSend = function (count) {

            for (var i = 0; i < count; i++) {
                send(new Date().Format("yyyy-MM-dd hh:mm:ss") + '__我是消息内容' + i);
            }

        }
        window.ko_sub_waringEvent;
        self.SendMsg = function () {
            var text = $(self.jqueryElementId() + " .im_textarea textarea").val().replace(/(^\s*)|(\s*$)/g, "");
            if (text.length == 0) {
                $('.ko_sub_waring').show();

                if (window.ko_sub_waringEvent) {
                    clearTimeout(ko_sub_waringEvent);

                }
                window.ko_sub_waringEvent = setTimeout(function () { $('.ko_sub_waring').hide(); }, 1500);
                //ui.showMessage('发送内容不能为空..');
                return false;
            }
            send(text);
        }
        self.QucikMsg = function (msg, msgtype) {
            send(msg, msgtype);
        }
        //使滚动条显示在最下面
        self.UpdateMsgScroll = function (isMore) {
            setTimeout(function () {

                var e = $(self.jqueryElementId() + " #ko_message-box")[0];
                var height = isMore ? (e.scrollHeight - self.LastHeight()) : e.scrollHeight;
                e.scrollTop = height;
            }, 2);
        }
        self.SendCard = function ()//发送名片
        {

            var user = setting.currUser;

            var data = {
                ImgUrl: user.ImgUrl,
                shopName: user.shopName,
                LinkMain: user.LinkMain,
                Telephone: user.Telephone,
                Address: user.Address,
                userCert: user.userCert,
                Type: user.Type,
                shopUrl: user.shopUrl,
                VipLevel: user.VipLevel
            };
           
            //send(user, 4);
            var message = JSON.stringify(data);
            send(message, 4);
        }

        function uploadFile(url, file, toUserId) {
            var jsonFile = {
                filename: file.name,
                dlurl: '',
                fileurl: '',
                msgType: file.msgType,
                size: (file.size / 1024).toFixed(2),
                url: url,
                file: file,
                toUserId: toUserId
            };
            var p = {
                "Body": {
                    "Content": JSON.stringify(jsonFile)
                },
                "Extend": {
                    "Version": "1.0",
                    "ExProduct": self.DataKey()
                },
                "Head": {
                    "MsgType": file.msgType,
                    "UserId": setting.currentId,
                    "MessageNo": ui.newId(),
                    "TargetId": toUserId,
                    "Platform": 0,
                    "Time": new Date().Format("yyyy-MM-dd hh:mm:ss"),
                    "SendStatus": ko.observable(0) // 0：发送中,1:已发送 -1:发送失败
                }
            };
            self.MsgList.push(p);
            self.UpdateMsgScroll();
            $.ajax({
                url: url,
                xhrFields: { withCredentials: true },
                crossDomain: true,
                type: "POST",
                xhr: function () {
                    var h = $.ajaxSettings.xhr();
                    return h;
                },
                data: {
                    file: file.data,
                    connectionId: chat.connectionId,
                    targetId: toUserId,
                    filename: file.name,
                    size: file.size,
                    type: file.type
                },
                success: function (result) {

                    var re = JSON.parse(result);
                    if (re.uploadStatus) {
                        p.Head.SendStatus(1);

                    } else {
                        p.Head.SendStatus(-1);
                    }

                },
                error: function (e) {

                    var msg = "您处于离线状态,无法发送消息,请刷新页面后重试.";

                    ui.showMessage(msg);
                    self.MsgList.remove(p);
                    return false;
                    //ui.showMessage('服务端请求错误..');
                    p.Head.SendStatus(-1);
                    console.log(e);
                }
            });
        }

        self.SendFile = function (element, type) {

            if (!element.value) {
                return false;
            }
            if (!element.files) {
                ui.showMessage('当前浏览器版本太低，不支持发送文件或图片，请升级浏览器。');
                $(element).val('');
                return false;
            }
            if (!ui.fileCheck(element, type)) {
                $(element).val('');
                return false;
            }


            var file = element.files[0];
            file.msgType = type == undefined ? 1 : 3; //图片或者文件
            var reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    file.data = e.target.result;
                    uploadFile(im_static_baseUrl + 'upload-file', file, self.CurrContact().UserId);
                    $(element).val('');
                };
            })(file);
            reader.readAsDataURL(file);

        }
        self.showFileUpload = function (type) {

            var elementId = type == 0 ? 'hidden-file' : 'hidden-files';

            $(self.jqueryElementId() + " #" + elementId).click();

        }

        self.showFileUpload = function (type) {
            var elementId = type == 0 ? 'hidden-file' : 'hidden-files';

            $(self.jqueryElementId() + " #" + elementId).click();
            return false;
        }

        self.OpenQuick = function () {
            require(["quickmsg"], function (quick) {
                if (!ChatWindow.quickVM) {
                    ChatWindow.quickVM = new quick.quickVM(ChatWindow);
                }

                if ($(self.jqueryElementId() + ' .quick-reply').length == 0) {
                    $(self.jqueryElementId() + " .ko_edit").append(quickmsgHtml);
                    ko.applyBindings(ChatWindow.quickVM, $(self.jqueryElementId() + " #ko_quickList")[0]);
                }
                ChatWindow.quickVM.InitQuickReplyMsg();
            });
        }

        //重发
        self.ResendMsg = function (data) {

            var sendData = '';
            try {
                sendData = JSON.parse(data.Body.Content);
            } catch (e) {
                sendData = data.Body.Content;
            }

            if (data.Head.MsgType == 1 || data.Head.MsgType == 3) {
                console.log(sendData);
                uploadFile(sendData.url, sendData.file, sendData.toUserId);
                return;
            }
            send(data.Body.Content, data.Head.MsgType, true);

            self.MsgList.remove(data);
        }
        return self;
    }

    function InitSendTool(ChatWindow) {

        $(ChatWindow.jqueryElementId() + " #ko_SendTool").append(sendToolHtml);
        SendVM(ChatWindow);
    }
    return {
        InitSendTool: InitSendTool
    };

});
define('text!templates/fileMessage.html',[],function () { return '\r\n<div class="send-file " data-bind="css:fileType()==1?(sendStatus()==-1?\'send-img-fail\':\'send-img-success\'):(sendStatus()==-1?\'send-file-fail\':\'send-file-success\')" >\r\n    <p class="file-name"><strong data-bind="text:fileName" ></strong><!--<span data-bind="visible:size()>0" >（<span data-bind="text:size"></span> KB）</span>--></p>\r\n    <p class="file-link">\r\n        <a data-bind="visible: isCurrId(),css:sendStatus()==-1?\'red\':\'orange\', text:sendStatus()==0?\'正在发送中\':sendStatus()==1?\'发送成功\':\'发送失败\'" ></a>\r\n        <a data-bind="visible: sendStatus()!=-1&&(!isCurrId()),attr:{href:dlurl }" target="_blank" >下载</a>\r\n    </p>\r\n</div>\r\n';});

// file文件消息（发送之后）
define('fileMessage',['lib/knockout-3.4', 'text!templates/fileMessage.html'], function (ko, html) {
    function ViewModel(params) {
        var self = this;
        var data = params.data;
        var file = JSON.parse(data.Body.Content);
       
        var fileName = file.filename,
            dlurl = data.Head.MsgType == 1 ? (file.fileurl || '') : file.dlurl;
        size = file.size || 0;
        // 0：发送中,1:已发送 -1:发送失败
        self.sendStatus = data.Head.SendStatus || ko.observable(1);
        //是否是当前用户
        self.isCurrId = ko.observable(setting.currentId == data.Head.UserId);
        //文件地址
        self.dlurl = ko.observable(dlurl);
        self.fileName = ko.observable(fileName);
        self.fileType = ko.observable(data.Head.MsgType);
        self.size = ko.observable(size);

        self.ResendClick = params.ResendClick;
        return self;
    }
    return { viewModel: ViewModel, template: html };

});
define('text!templates/cardInfo.html',[],function () { return '<div class="card">\r\n    <div class="infomation clearfix">\r\n        <img   data-bind="attr:{src:GetStaticImg(user().ImgUrl)}"  >\r\n        <p data-bind="visible:user().shopName, attr:{title:user().shopName}">店铺名称： <span data-bind="text:user().shopName"></span></p>\r\n        <p data-bind="visible:user().LinkMain,attr:{title:user().LinkMain}">联系人： <span data-bind="text:user().LinkMain"></span></p>\r\n        <p data-bind="visible:user().Telephone,attr:{title:user().Telephone}">电话： <span data-bind="text:user().Telephone"></span></p>\r\n        <p data-bind="visible:user().Address,attr:{title:user().Address}" >地址： <span data-bind="text:user().Address"></span></p>\r\n    </div>\r\n    <p data-bind="visible:user().userCert,html:GetUserCert(user().userCert)"></p>\r\n    <div class="card_a">\r\n        <a data-bind="visible:user().shopUrl,attr:{href:user().shopUrl}" target="_blank">查看店铺</a>\r\n        <a data-bind="visible:user().Type!=1&&user().VipLevel > 0,attr:{href:user().shopUrl+\'/intro\'}" target="_blank">查看供应商简介</a>\r\n    </div>\r\n</div>';});

define('cardInfo',['lib/knockout-3.4', 'text!templates/cardInfo.html'], function (ko, html) {

    function ViewModel(params) {
      
        var self = this;
        var data = params.data;

        var user = JSON.parse(data.Body.Content);
        self.user = ko.observable(user);
        self.GetStaticImg = params.GetStaticImg;
        //获取商家图标
        self.GetUserCert = params.GetUserCert;

        return self;
    }
    return { viewModel: ViewModel, template: html };

});
//消息列表
define('message',['lib/knockout-3.4', 'utility', 'fileMessage', 'cardInfo'], function (ko, ui) {

    //ko.components.register('filemessage', {
    //    require: 'fileMessage'
    //});
    //ko.components.register('cardinfo', {
    //    require: 'cardInfo'
    //});


    function InitMsg(userId, ChatWindow) {

        var self = ChatWindow;
        self.CurrContact = ko.observable();
        self.MsgList = ko.observableArray([]);
        self.TotalCount = ko.observable(0);
        self.CurrPageIndex = ko.observable(1);
        self.CurrPageSize = ko.observable(3);
        self.LastHeight = ko.observable(0);
        self.IsInitMsg = ko.observable(false);


        //加载聊天记录
        self.InitMsg = function (isMore) {
            var params = { 'targetId': userId, 'pageIndex': self.CurrPageIndex(), 'pageSize': self.CurrPageSize() };
            ui.hnajax("chat/historys", params, "json", function (result) {
                $("#ko_lod").removeClass("ko_lod");
                if (result.IsError) {
                    ui.showMessage("加载聊天记录失败...")
                    return false;
                }
                if (self.CurrPageIndex() == 1 && isMore) {

                    self.MsgList.removeAll();
                }
                self.TotalCount(result.Data.total);

                var currList = self.MsgList();

                self.LastHeight($(self.jqueryElementId() + " #ko_message-box")[0].scrollHeight);
                currList = result.Data.msgList.reverse().concat(currList);


                self.MsgList(currList);
                if (self.TotalCount() == self.MsgList().length) {
                    $(self.jqueryElementId() + " #ko_lod").text('没有更多..').unbind('click');
                }
                self.IsInitMsg(true);
                self.UpdateMsgScroll(isMore);

            }, function (e) {
                console.log(e);
            });
        }
        //加载更多聊天记录
        self.InitMoreMsg = function () {
            if (self.CurrPageSize() == 3) {
                self.CurrPageSize(20);
                self.CurrPageIndex(0);
            }
            var currIndex = self.CurrPageIndex() + 1;
            console.log('加载更多');
            $(self.jqueryElementId() + " #ko_lod").addClass("ko_lod");
            self.CurrPageIndex(currIndex);
            self.InitMsg(1);
        }
        self.IsCurrUserId = function (data) {

            if (!data.isCurrId) {
                data.isCurrId = ko.observable(false);
                data.isCurrId(data.Head.UserId == setting.currentId);

            }
            //消息发送状态
            if (!data.Head.SendStatus) {
                data.Head.SendStatus = ko.observable(1);
            }
            return data.isCurrId();

        }
        //用户头像
        self.GetUserImgSrc = function (data) {
          
            setting.currentPic = setting.currentPic || "/images/headpic.png";
            data.Head.UserAvatar = data.Head.UserAvatar || "/images/headpic.png";

            if (data.Head.UserAvatar.indexOf('ActivityTime:') != -1) {
                data.Head.UserAvatar = self.CurrContact().ImgUrl;
            }

            return data.Head.UserId == setting.currentId ? self.GetStaticImg(setting.currentPic) : self.GetStaticImg(data.Head.UserAvatar);
        }

        //获取商家图标
        self.GetUserCert = function (userCert) {

            return ui.buildAuthContent(userCert);
        }

        self.GetTimer = function (data, index) {
            //console.log(data.Head.Time);
            if (!data.Head.Time) {
                return "";
            }

            if (index != 0) {
                var prevData = self.MsgList()[index - 1];
                var timestamp = Date.parse(data.Head.Time.replace(new RegExp(/(-)/g), '/')) - Date.parse(prevData.Head.Time.replace(new RegExp(/(-)/g), '/'));
                var min = timestamp / 1000 / 60;
                if (min < 5) {
                    return "";
                }
            };

            return data.Head.Time.replace(new RegExp(/(\/)/g), '-').replace('+0000', '');
        }

        //绑定名片
        self.BindCardInfo = function (data) {
            try {
                 
                var user = JSON.parse(data.Body.Content);
                data.user = ko.observable(user);
                if (data.user().ShopName) {
                    data.user().shopName = data.user().ShopName;
                }
            } catch (e) {

            }
            return '';
        };

        self.BindFileMessage = function (data) { }
    }

    return {
        InitMsg: InitMsg

    };
});
define('chatWindow',['lib/knockout-3.4', 'baseVM', 'utility', 'contacts', 'text!templates/chatWindow.html', 'sendTool', 'message'],
    function (ko, BaseVM, ui, contacts, html, sendTool, message) {
       

        function QuickMessage(userId, dataKey, dataType) {
            return chatwindow = new ChatWindowVM(userId, dataKey, dataType);
        }

        function BindWindow(userId, dataKey, dataType) {
             
            $(document).unbind("keydown");
            if (!ui.getIsLogin()) {
                window.location.href = window.im_login_url + '/myinfo/goLogin?returnUrl=' + window.location.href;
                // alert("您尚未登录,请先登录.");

                return false;
            }

            var chatwindow = new ChatWindowVM(userId, dataKey, dataType);

            $("body").append('<div id="' + chatwindow.elementId() + '">' + html + '</div>');
            //加载发送的按钮组件
            sendTool.InitSendTool(chatwindow);
            ko.applyBindings(chatwindow, document.getElementById(chatwindow.elementId()));

            chatwindow.InitMsg();

            //绑定回车按键事件，发送消息
            $(chatwindow.jqueryElementId()).on("keydown", function (event) {
                if (event.keyCode == 13) {
                    chatwindow.SendMsg();//这里添加要处理的逻辑
                    return false;
                }
            });
            ui.hnajax("user/userinfo", { uid: userId }, 'json', function (result) {
                if (result.IsError) {
                    chatwindow.ChatClose();
                    ui.showMessage("获取商家信息失败.请稍后重试.")
                    return false;
                }

                if (result.Data.alertMsg) {
                    ui.showMessage(result.Data.alertMsg);
                }
                chatwindow.CurrContact(result.Data);
                chatwindow.IsInitCustom(true);
            }, function (e) {
                console.log(e);
            });

            require(['contacts'], function (contacts) {
                if (!window.contactsVM) {
                    window.contactsVM = new contacts.ContactsVM();
                }
                window.contactsVM.ChatWindowList.push(chatwindow);
                window.contactsVM.ChatWindow = chatwindow;


            });


            setTimeout(function () { ui.bindWindowEvent(); }, 1000);

        }

        //聊天窗口viewModel
        function ChatWindowVM(userId, dataKey, dataType) {
            dataType = dataType || "";
            dataKey = dataKey || "";
            //console.log("当前商家id:", userId);
            var self = new BaseVM();
            self.IsInitCustom = ko.observable(false);
            self.ChatClose = function () {
                var length = $('.ko_chatWindow').length - 1;
                var element = document.getElementById("ko_chatWindow_" + length);

                if (element) {
                    if (window.contactsVM) {

                        window.contactsVM.ChatWindowList.remove(window.contactsVM.ChatWindow);
                        window.contactsVM.ChatWindow = undefined;
                    }
                    $(element).remove();
                }
            }  //关掉窗口

            self.ChatClose(); //关闭之前的窗口
            function getElementId() {
                var length = $('.ko_chatWindow').length;
                return "ko_chatWindow_" + length;
            }
            self.elementId = ko.observable(getElementId());
            self.jqueryElementId = ko.observable('#' + self.elementId());


            //消息列表
            message.InitMsg(userId, self);
            self.TabArray = ko.observableArray(["对方信息", "常见问题"]);
            self.DataKey = ko.observable(dataKey); //
            //常见问题
            self.QuestionList = ko.observable();
            //显示的选项卡
            self.IsShowNumber = ko.observable(0);
            //选项卡单击事件
            self.tabClick = function (index) {
                self.IsShowNumber(index);
                if (index != 1) {
                    return;
                };

                if (self.QuestionList()) {
                    return false;
                }
                ui.hnajax("resource/index", null, "json", function (result) {
                    if (result.IsError) {
                        ui.showMessage("加载常见问题失败...")
                        return false;
                    }
                    self.QuestionList(result.Data);

                }, function (e) {
                    console.log(e);
                });
            }
            return self;
        }

        //按钮事件
        function btnClick() {

            var element = $(this);

            var dataKey = element.attr("data-key");
            var dataObject = element.attr("data-object");
            var dataType = element.attr("data-type");
            if (dataKey == setting.currentId) {
                ui.showMessage("请勿对自己发起咨询");
                return false;
            }
            setting.dataKey = dataKey;
            setting.dataObject = dataObject;
            setting.dataType = dataType;

            BindWindow(dataKey, dataObject, dataType);

            var postData = {
                SendId: setting.currentId,
                ReceiveId: dataKey,
                ProductId: dataObject,
                DataType: dataType,
                PageUrl: window.location.href,
                Source: 4
            };
            if (document.referrer && document.referrer.length > 0) {
                postData.SourceUrl = document.referrer;
            }
            ui.hnajax('/user/openrecord', { jsonData: JSON.stringify(postData) }, 'json');

            return false;
        }
        var result = {
            BindWindow: BindWindow,
            QuickMessage: QuickMessage,
            BtnClick: btnClick
        };
        return result;
    });
define('text!templates/contacts.html',[],function () { return '\r\n<div class="d_box" id="ko_ContactsList">\r\n    <!--ko if:IsShow()&&IsLogin() -->\r\n    <h1 class="top_nav">最近联系人  <a href="#" class="close" data-bind="click: ClosePage"><img data-bind="attr:{src:GetStaticImg(\'/images/3.0/close.jpg\')}" /></a> </h1>\r\n    <div class="tlist scroll-pane">\r\n        <ul class="ul_list" data-bind="foreach: Contacts">\r\n            <li>\r\n                <a data-bind="click:$parent.ItemClick">\r\n                    <img data-bind="attr:{src:$parent.GetImg($data) }" />\r\n                    <h3 class="g" data-bind="text:userName"></h3>\r\n                    <p data-bind="text:$parent.GetMsg(msgType,lastMsg)"></p>\r\n                    <b data-bind="text:msgTime"></b>\r\n                    <!--ko if: unReadNum()>0  --> <i data-bind="text:unReadNum()>99?\'99+\':unReadNum"></i> <!--/ko-->\r\n                </a>\r\n                <a data-bind="click:$parent.Remove" class="off"></a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!--/ko-->\r\n    <!--ko if:  !IsShow() --><div class="dia"></div>\r\n    <!--/ko-->\r\n    <!--ko if:!IsLogin() -->\r\n    <div class="im_login">\r\n\r\n        <a data-bind="click: ClosePage" class="close_b"><img data-bind="attr:{src:im_static_baseUrl + \'/images/IM/cl.jpg\'}" /></a>\r\n        <p class="t-icon"><img data-bind="attr:{src:im_static_baseUrl + \'/images/IM/imt.jpg\'}" /></p>\r\n        <form id="loginssoform" method="post">\r\n            <p class="t-n">您还没有登录，请先登录！</p>\r\n            <p class="t-n"><input name="userAccount" id="userAccount" type="text" placeholder="用户名" /></p>\r\n            <p class="t-n tright" id="userAccountv"></p>\r\n            <p class="t-n"><input name="password" id="userPwd" type="password" placeholder="密码" /></p>\r\n            <p class="t-n tright" id="userpwdb"></p>\r\n            <p class="t-s"><label><input type="checkbox" id="isRemember" /> 下次自动登录</label></p>\r\n            <a class="go_login" id="J_SubmitStatic_IM">登 录</a>\r\n        </form>\r\n        <script>\r\n            $(function () {\r\n\r\n                // 登录提交\r\n                $(".im_login #J_SubmitStatic_IM").click(function () {\r\n                    var userName = $(".im_login #userAccount").val();\r\n                    var userPwd = $(".im_login #userPwd").val();\r\n                    var isRememberPwd = "";\r\n                    if ($(".im_login #isRemember").attr("checked")) {\r\n                        isRememberPwd = \'y\';\r\n                    }\r\n                    if (userName == "请输入登录名") {\r\n                        $(".im_login #userAccount").attr("value", "");\r\n                    }\r\n                    if (!userName || userName.length == 0) {\r\n                        $(".im_login #userAccountv").text(\'用户名不能为空\');\r\n                        return false;\r\n                    }\r\n                    if (!userPwd || userPwd.length == 0) {\r\n                        $(".im_login #userpwdb").text(\'密码不能为空\');\r\n                        return false;\r\n                    }\r\n                    var postData = {\r\n                        isRememberPwd: isRememberPwd,\r\n                        userAccount: userName,\r\n                        password: userPwd\r\n                    };\r\n\r\n                    login(postData);\r\n                    //$("#loginssoform").submit();\r\n                });\r\n\r\n                // 键盘事件提交\r\n                $(".im_login #userPwd").keydown(function (event) {\r\n                   \r\n                    if (event.keyCode == 13) login();\r\n                });\r\n\r\n                $(function () {\r\n\r\n                    $(".im_login #userAccount,.im_login #userPwd").keyup(function () {\r\n                        $(".im_login #userpwdb").html(\'\');\r\n                        $(".im_login #userAccountv").text(\'\');\r\n                    });\r\n                });\r\n\r\n                // 登录\r\n                function login(postData) {\r\n\r\n                    $.ajax({\r\n                        type: "POST",\r\n                        url: im_login_url + "myinfo/loginajax",\r\n                        data: postData,\r\n                        dataType: "jsonp",//数据类型为jsonp\r\n                        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数\r\n                        success: function (result) {\r\n\r\n                            if (result != null) {\r\n                                if (result.errorAccount == "1") {\r\n                                } else if (result.errorAccount == "2") {\r\n                                    $(\'.im_login #userpwdb\').html(\'错误登录5次，10分钟内禁止登录!\');\r\n                                } else if (result.errorAccount == "3") {\r\n                                    $(\'.im_login #userpwdb\').html(\'密码错误!\');\r\n                                } else if (result.errorAccount == \'4\') {\r\n                                    $(\'.im_login #userpwdb\').html(\'用户名不存在!\');\r\n                                } else if (result.errorAccount == \'5\') {\r\n                                    $(\'.im_login #userpwdb\').html(\'系统异常!\');\r\n                                } else if (result.errorAccount == "6") {\r\n                                    $(\'.im_login #userpwdb\').html(\'对不起，您的账号已经被禁用，请联系客服!\');\r\n                                } else {\r\n                                    //<!--  暂时只有一个sso域 -->\r\n                                    setCookie(result.ssoUrls[0]);\r\n                                }\r\n                            }\r\n                        }\r\n                    });\r\n                }\r\n\r\n                var returnUrl = document.location.href;\r\n\r\n                // 设置Cookie\r\n                function setCookie(ssoUrl) {\r\n                    $.ajax({\r\n                        type: "get",\r\n                        async: false,\r\n                        url: ssoUrl,\r\n                        dataType: "jsonp",//数据类型为jsonp\r\n                        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数\r\n                        success: function (result) {\r\n                            window.location.href = returnUrl;\r\n\r\n                        }\r\n                    });\r\n                }\r\n\r\n\r\n            });\r\n\r\n        </script>\r\n    </div>\r\n    <!--/ko-->\r\n</div>\r\n\r\n';});

define('contacts',['lib/knockout-3.4', 'baseVM', 'utility', 'chatWindow', 'text!templates/contacts.html'], function (ko, BaseVM, ui, ChatWindow, html) {


    //联系人列表viewModel
    var ContactsVM = function () {
        var self = new BaseVM();
        self.IsShow = ko.observable(false);//是否显示
        self.IsInit = ko.observable(false); //是否加载用户
        self.IsLogin = ko.observable(false);
        self.ClosePage = function () {
            $(".hn-tbar-tab-im").click();
        }
        self.Contacts = ko.observableArray([]);
        // 单击事件
        self.ItemClick = function (data) {

            if (!ChatWindow) {
                require(['chatWindow'], function (ChatWindow) {
                    ChatWindow.BindWindow(data.userId);
                });
            } else {
                ChatWindow.BindWindow(data.userId);
            }
            self.UpdateMsgCount(data.userId);
            data.unReadNum(0);
            var postData = {
                SendId: setting.currentId,
                ReceiveId: data.userId,
                PageUrl: window.location.href,
                Source: 4,
                type:1
            };
            if (document.referrer && document.referrer.length > 0) {
                postData.SourceUrl = document.referrer;
            }
            ui.hnajax('/user/openrecord', { jsonData: JSON.stringify(postData) }, 'json');


        }

        self.UpdateMsgCount = function (receivId) {
            if (setting.currentId == "") {
                return false;
            }

            var param = { "mid": setting.currentId, "uid": receivId };
            ui.hnajax('chat/updateunread', param, 'json');
        }
        //窗口列表
        self.ChatWindowList = ko.observableArray([]);

        self.TotalUnReadNum = ko.computed(function () {
            var number = 0;

            $.each(self.Contacts(), function (i, item) {
                number += item.unReadNum();

            });
         
            ui.changeIcon(number);
            return number;
        });
        self.Init = function () {
            ui.hnajax("user/contacts", null, "json",
                function (data) {

                    if (data.IsError) {
                        ui.showMessage("获取联系人信息失败.请刷新页面重试.")
                        return false;
                    }
                    var result = data.Data;
                    for (var i = 0; i < result.length; i++) {
                        var item = result[i];
                        item.unReadNum = ko.observable(item.unReadNum);
                        item.lastMsg = ko.observable(item.lastMsg);
                        item.msgType = ko.observable(item.msgType);
                        item.msgTime = ko.observable(item.msgTime);
                    }

                    self.Contacts(result);

                    setTimeout(function () { self.IsShow(true); }, 500);
                    ui.bindWindowEvent();
                }, function (e) {
                    console.log(e);
                });
        } //加载用户数据
        self.Remove = function (data) {
            if (confirm("确定删除此联系人吗?")) {

                var id = data.id;
                self.Contacts.remove(data);
                ui.hnajax('chat/deletepeplo?' + Math.random(), { "id": id, 'sid': data.userId }, 'json');
            }
            return false;
        }
        self.GetMsg = function (msgType, lastMsg) {
            return ui.getMessageType(msgType(), lastMsg())
        } //获取最后聊天记录
        return self;
    }

    var btnClick = function () {

        if (!window.contactsVM) {
            window.contactsVM = ContactsVM();
        }
        window.contactsVM.IsLogin(ui.getIsLogin());
        //如果已显示列表 
        if (window.contactsVM.IsShow()) {
            $(".hn-toolbar").animate({ "right": contactsVM.IsShow() ? 0 : 270 }, 100);
            var isShow = !contactsVM.IsShow();
            setTimeout(function () { contactsVM.IsShow(isShow); }, 500)
            return;
        }
        if (contactsVM.IsLogin()) {
            //加载联系人列表
            contactsVM.Init();
        } else {
            contactsVM.IsShow(true);
        }
        if (!document.getElementById("ko_ContactsList")) {

            $('.hn-toolbar').append(html);
            ko.applyBindings(window.contactsVM, document.getElementById("ko_ContactsList"));

        };


        $(".hn-toolbar").animate({ "right": 270 }, 100);

    }
    var result = {
        ContactsVM: ContactsVM,
        BtnClick: btnClick
    };
    return result;
});
window.contactsVM;
window.quickVM;
window.windowVM;
window.setting = {};
var initialized = false;
var chat;

require.config({

    baseUrl: im_static_baseUrl + "/Scripts/apps/im1.1/",

    paths: {
        ko: im_static_baseUrl + '/Scripts/konckout/knockout-3.4',
        text: 'text',
        signalrManage: "signalR/signalrManage",
        imcore: 'signalR/imcore'
    },

    shim: {
        'imcore': {
            deps: ['signalR/jquery.signalR-2.2.0'],
            exports: '$.signalR'
        }

    }
    ,
    config: {
        "textremote": {
            remoteUrl: im_static_baseUrl + "/Scripts/apps/im1.1/"
        },
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
        //,
        //text: {
        //    createXhr: function () {
        //        
        //        return $.ajaxSettings.xhr();
        //    }
        //}
    },
    waitSeconds: 10
  , urlArgs: "v=" + (new Date()).getTime(),
    optimize: "none"
});
requirejs.onError = function (err) {
    console.log(err);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};
window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();
$(function () {


    require(['utility'], function (ui) {

        //加载右侧侧边栏
        if ($('.hn-toolbar-tabs').length == 0) {
            function getDomain() {
                var domain = window.document.domain;
                var domainchars = domain.split(".");
                domain = "";
                for (var i = 1 ; i < domainchars.length ; i++) {
                    domain += (i == 1 ? "" : ".") + domainchars[i];
                }
                return domain;
            }
            function getRightHtml() {
                var html = '<div id="J-global-toolbar">\
                         <div class="hn-toolbar-wrap">\
                           <div class="hn-toolbar">\
                             <div class="hn-toolbar-tabs">\
                               <div class="hn-toolbar-tab hn-tbar-tab-cart"><a target="_blank" href="http://order.cnhnb.com/cart/index" rel="nofollow"><div class="tab-ico">\
                               </div><em class="tab-text"> 购物车</em><span id="myCarRightId" class="tab-sub hidden"></span></a></div>\
                               <div class="hn-toolbar-tab hn-tbar-tab-mine"><a target="_blank" href="http://hnuser.cnhnb.com/myhn/index" rel="nofollow">\
                               <div class="tab-ico"></div><em class="tab-text"> 我的惠农</em></a></div>\
                               <div class="hn-toolbar-tab hn-tbar-tab-supply"><a target="_blank" href="http://product.cnhnb.com/supply/release" rel="nofollow">\
                               <div class="tab-ico"></div><em class="tab-text"> 发供应</em></a></div>\
                               <div class="hn-toolbar-tab hn-tbar-tab-purchase"><a target="_blank" href="http://buy.cnhnb.com/purchase/release" rel="nofollow">\
                               <div class="tab-ico"></div><em class="tab-text"> 发采购</em></a></div>\
                              <div class="hn-toolbar-tab hn-tbar-tab-service">\
                              <a target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAxNDQxNl80NDEzNTBfNDAwMDA4ODY4OF8yXw" rel="nofollow">\
                                  <div class="tab-ico"></div><em class="tab-text"> 在线客服</em></a></div>\
                   <div class="hn-toolbar-tab hn-tbar-tab-im"><div class="tab-ico"></div><em class="tab-text"> 谈生意</em></div>\
                             </div>\
                             <div class="hn-toolbar-footer">\
                               <div class="hn-toolbar-tab hn-tbar-tab-qrcode"><a href="#" target="_blank"><div class="tab-ico"></div>\
                                   <div class="tab-text tab-expand pt10">\
                                     <div class="qrcode mb5"><img src="http://static.cnhnb.com/4.0/images/common/topbar-hn-app.gif" alt="手机惠农网">\
                                       <p><span>扫一扫下载</span><span>手机惠农网</span></p>\
                                     </div>\
                                     <div class="qrcode"><img src="http://static.cnhnb.com/4.0/images/common/topbar-qrcode.gif" alt="惠农官方微信">\
                                       <p><span>扫码关注</span><span>惠农官方微信</span></p>\
                                     </div>\
                                   </div></a></div>\
                               <div class="hn-toolbar-tab hn-tbar-tab-top"><a href="#"><div class="tab-ico"></div><em class="tab-text">顶部</em></a></div>\
                             </div>\
                           </div>\
                         </div>\
                       </div>'.replace(/cnhnb.com/g, getDomain());

                return html;
            }
            setTimeout(function () {
                $('body').append(getRightHtml());
                var $toolbar = $('#J-global-toolbar');
                var $wrap = $toolbar.find('.hn-toolbar-wrap');
                var $tabs = $toolbar.find('.hn-toolbar-tab');
                var setWrapH = function () {
                    $wrap.height($(window).height());
                };
                $tabs.hover(function () {
                    $(this).addClass('hn-tbar-tab-hover');
                }, function () {
                    $(this).removeClass('hn-tbar-tab-hover');
                });
                var $tab2top = $toolbar.find('.hn-tbar-tab-top a');
                $tab2top.click(function () {
                    $('html, body').stop(true).animate({ scrollTop: 0 }, 300);
                    return false;
                });
            }, 100);
          
            //ui.hnajax("resource/GetRightTool", null, 'json', function (result) {
            //    if (result.IsError) {
            //        return false;
            //    }
            //    $('body').append(result.Message);
           

            //}, function (e) {
            //    console.log(e);
            //});
        }


    });
    require(["utility", "contacts", 'chatWindow'], function (ui, Contacts, ChatWindow) {
        ui.auth();

        setTimeout(function () {
            if (typeof ($('body').live) == 'function') {

                $(".hn-tbar-tab-im").live("click", Contacts.BtnClick);
                $(".order-service,.im_btn,#chat").live("click", ChatWindow.BtnClick);
            } else {
                $(".hn-tbar-tab-im").on("click", Contacts.BtnClick);
                $(".order-service,.im_btn,#chat").on("click", ChatWindow.BtnClick);
            }

        }, 300);

        if (!ui.getIsLogin()) {
            return false;
        }

        //注册 signalr事件
        require(['signalrManage'], function () { });
        ui.audioEvent();
    });
});

define("main", function(){});
