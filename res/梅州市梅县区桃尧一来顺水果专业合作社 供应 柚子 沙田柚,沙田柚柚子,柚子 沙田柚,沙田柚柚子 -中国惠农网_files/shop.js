M.define("productList",
function (b) {
    var a = function (c) {
        this.init(c)

    };
    M.object.merge(a.prototype, {
        init: function (d) {
            this.shopCode = d.productlist.shopCode;
            this.baseId = "productList";
            this.renderId = "productList";
            this.listUlId = this.renderId;
            this.loadDataId = M.genId(this.baseId);
            this.notFoundId = M.genId(this.baseId);
            this.pagenumId = M.genId(this.baseId);
            this.runtopId = M.genId(this.baseId);
            this.geToIndex = M.genId(this.baseId);
            this.goToTop = M.genId(this.baseId);
            this.page = 1;
            this.allapge = 0;
            this.hasData = true;
            this.baseParams = d.baseParams;
            this.canload = true;
            this.scrollEffective = true;
            this.resurl = d.productlist.imgurl;
            if (d.scrollEffective == false) {
                this.scrollEffective = false
            } else {
                this.scrollEffective = true
            }
            this.buriedPointVal = d.buriedPointVal;
            this.listUrl = d.listUrl ? d.listUrl : "/shop/products/" + this.shopCode;
            this.searchParams = "";
            this.searchParamsObj = {};
            this.imgLazyLad = new (M.exports("Imglazyload").clazz)();
            var c = 0;
            c = $("header").height();
            c = c + $("footer").height();
            $("#" + this.renderId).css("min-height", ($(window).height() - c));
            if (!d.productlist.data || !d.productlist.data.wareList || d.productlist.data.wareList.length == 0) {
                $("#" + this.renderId).html(this.notFoundHtml());
                $("#" + this.notFoundId).show();
                this.hasData = false
            } else {
                $("body").addClass("loading");

                this.allapge = (d.productlist.data.wareCount % 4) > 0 ? parseInt(d.productlist.data.wareCount / 4) + 1 : d.productlist.data.wareCount / 4;
               // this.allapge = (d.productlist.data.wareCount % 4) > 0 ? (this.allapge + 1) : this.allapge;
                $("#" + this.renderId).html(this.showDataHtml(d.productlist.data.wareList));
                $("#" + this.renderId).append(this.notFoundHtml());
                $("#" + this.renderId).append(this.loadPageDataHtml());
                $("#" + this.renderId).append(this.runTopHtml());
                $("#" + this.pagenumId).text(this.page + "/" + this.allapge);
                this.page++;
                $("body").removeClass("loading");
                this.imgLazyLad.lazyLad()
            }
        },
        runTopHtml: function () {
            var d = this;
            var c = [];
            c.push('<div style="display : none;" id="' + d.runtopId + '" class="right-opera J_ping">');
            c.push("<ul>");
            c.push('<li id="' + d.goToTop + '"></li>'); 
            c.push('<li id="' + d.geToIndex + '"></li>');
            c.push("</ul>");
            c.push("</div>");
            return c.join("")
        },
        notFoundHtml: function () {
            var d = this;
            var c = [];
            c.push('   <div class="balancea" id="' + d.notFoundId + '" style="display : none;">');
            c.push(' <section class="mode complex">');
            c.push('<div class="inner">');
            c.push('<div class="status-titled">');
            c.push(' <img src="../images/icon/order_error.png" alt="订单提交成功">  <p>抱歉，此店铺暂无产品！</p>  </div>   </div>  </section> </div>');

            //c.push('<div style="display : none;" id="' + d.notFoundId + '" class="not-found">');
            //c.push('<div class="notice">抱歉，该店铺暂无产品信息.</div>');
            //c.push("</div>");
            return c.join("")
        },
        loadPageDataHtml: function () {
            var d = this;
            var c = [];
            c.push('<div style="display : none;" id="' + d.loadDataId + '" class="swipe-up">');
            c.push('<div class="swipe-up-wrapper">');
            c.push('<div class="loading-con">');
            c.push('<span id="' + d.pagenumId + '" class="pagenum"></span>');
            c.push('<span class="loading"><i>加载中...</i></span>');
            c.push('<div class="clear"></div>');
            c.push("</div>");
            c.push("</div>");
            c.push("</div>");
            return c.join("")
        },
        showDataHtml: function (m) {
            var d = this;
            var k = [];
            var n = d.searchParamsObj.region ? d.searchParamsObj.region : "";
            n = n ? ("?provinceId=" + n + "&cityId=0") : "";
            if (m.length > 0) {
                for (var h = 0, f = m.length; h < f; h++) {
                    var e = "/product/" + m[h].id
                    var c = d.buriedPointHtml(m[h], h);
                    k.push('<div class="pro_layout">');
                    k.push('<div class="pro">');
                    k.push('<ol>');
                    if (m[h].picture) {
                        k.push('<li><a href="' + e + '"><div><img src="' + d.resurl + m[h].picture + '" alt="' + m[h].name + '" /></div></a></li>');
                    } else {
                        k.push('<li><a href="' + e + '"><div><img src="http://static.cnhnb.com/4.0/images/supply/supply_web_pic_400.jpg" alt="' + m[h].title + '" /></div></a></li>');
                    }
                    k.push('<li>' + m[h].name + '</li>');
                    k.push('<li>');
                    k.push('<span style="color:#ff0000">');
                    
                    if (m[h].price != 0) {
                        k.push( m[h].price.toFixed(2) + "元/" + m[h].unit);
                    }
                    else {
                        k.push('面议');
                    }
                    k.push('</span>');
                    k.push('</li>');
                    k.push('</ol>');
                    k.push('</div>');
                    k.push('</div>');
                }
            }
            return k.join("")
        },
        buriedPointHtml: function (f, c) {
            var e = this;
            var d = "";
            if (e.buriedPointVal == "search") {
                if (f.international) {
                    d = ' class="J_ping" report-eventparam="international" '
                } else {
                    d = ' class="J_ping" report-eventparam="' + f.wareId + '" '
                }
            } else {
                if (e.buriedPointVal == "lookSimilar") {
                    d = ' class="J_ping" report-eventparam="' + c + "_" + f.wareId + '_1" '
                }
            }
            return d
        },
        showDataUlHtml: function () {
            var d = this;
            var c = [];
            c.push('<ul id="' + d.listUlId + '" class="list_body"></ul>');
            return c.join("")
        },
        load: function () {
            var c = this;
            $("#" + c.loadDataId).show();
            $("#" + c.notFoundId).hide();
            if (c.listUrl) {
                M.http.ajax({
                    url: c.listUrl,
                    data: "_format_=json&" + c.searchParams + "&page=" + c.page + "&" + c.baseParams,
                    success: function (d) {
                        var e = null;
                        if (d) {
                            e = d.Data;
                            c.allapge = (e.rowCount % 4) > 0 ? parseInt(e.rowCount / 4) + 1 : e.rowCount / 4;
                            if (d.Data && d.Data.productList.length > 0) {
                                $("#" + c.listUlId).append(c.showDataHtml(d.Data.productList));
                                $("#" + c.listUlId).css({
                                    display: "block;"
                                });
                                $("#" + c.notFoundId).hide();
                                $("#" + c.pagenumId).text(c.page + "/" + c.allapge);
                                c.imgLazyLad.lazyLad();
                            }
                            c.page++
                        }
                        $("#" + c.loadDataId).hide();
                        c.canload = true
                    },
                    error: function () {
                        $("#" + c.loadDataId).hide();
                        c.canload = true
                    }
                })
            }
        },
        reload: function (e) {
            var d = this;
            d.searchParamsObj = e;
            var f = d.createSearchParams(e);
            if (d.searchParams != f) {
                d.searchParams = f;
                $("body").addClass("loading");
                var c = d.baseParams.split("=");
                if (c.length < 2 || c[1] == "") {
                    $("body").removeClass("loading")
                } else {
                    if (d.listUrl) {
                        M.http.ajax({
                            url: d.listUrl,
                            data: "_format_=json&" + d.searchParams + "&page=1&" + d.baseParams,
                            success: function (g) {
                                var h = null;
                                $("#" + d.runtopId).hide();
                                if (g && g.value) {
                                    //h = $.parseJSON(g.value);
                                    h = g.value;
                                    d.allapge = parseInt(h.wareCount / 4, 4);
                                    d.allapge = (h.wareCount % 4) > 0 ? d.allapge + 1 : d.allapge;
                                    d.page = 1;
                                    if (h.wareList && h.wareList.length > 0) {
                                        $("#" + d.listUlId).html(d.showDataHtml(h.wareList));
                                        $("#" + d.listUlId).css({
                                            display: "block;"
                                        });
                                        $("#" + d.notFoundId).hide();
                                        $("#" + d.pagenumId).text(d.page + "/" + h.wareCount);
                                        d.page++;
                                        d.imgLazyLad.lazyLad();
                                        d.hasData = true
                                    } else {
                                        $("#" + d.listUlId).css({
                                            display: "none"
                                        });
                                        $("#" + d.notFoundId).show();
                                        d.hasData = false
                                    }
                                }
                                $("body").removeClass("loading")
                            },
                            error: function () {
                                $("body").removeClass("loading");
                                $("#" + d.runtopId).hide();
                                $("#" + d.notFoundId).show();
                                d.hasData = false;
                                d.canload = true
                            }
                        })
                    }
                }
            }
        },
        createSearchParams: function (d) {
            var c = [];
            M.object.each(d,
            function (l, h) {
                c.push(h);
                if (M.object.isArray(l)) {
                    c.push("=[");
                    for (var f = 0,
                    e = l.length,
                    k = e - 1; f < e; f++) {
                        c.push(l[f]);
                        if (f < k) {
                            c.push(",")
                        }
                    }
                    c.push("]&")
                } else {
                    c.push("=");
                    c.push(l);
                    c.push("&")
                }
            });
            return c.join("")
        },
        isReloadHasData: function () {
            var c = this;
            return c.hasData
        },
        closeLoad: function () {
            var c = this;
            c.scrollEffective = false
        },
        opendLoad: function () {
            var c = this;
            c.scrollEffective = true
        },
        listScrollBind: function () {
            var c = this;
            $(window).scroll(function () {
                c.imgLazyLad.lazyLad();
                if ((c.page - 1) < c.allapge && $(window).scrollTop() > ($("#" + c.renderId).height() - 400) && c.canload && c.scrollEffective) {
                    $("#" + c.loadDataId).show();
                    c.canload = false;
                    c.load()
                }
                if ($(window).scrollTop() >= $(window).height()) {
                    if (c.canload) {
                        $("#" + c.runtopId).show()
                    }
                } else {
                    $("#" + c.runtopId).hide()
                }
            });
            $(window).resize(function () {
                c.imgLazyLad.lazyLad()
            })
        },
        bind: function () {
            var c = this;
            c.listScrollBind();
            $("#" + c.geToIndex).on("click",
            function () {
                window.location.href = "/index.html"
            });
            $("#" + c.goToTop).on("click",
            function () {
                window.scrollTo(0, 1)
            })
        },
        render: function (d) {
            var c = this;
            c.bind()
        },
        run: function () {
            var c = this;
            c.bind()
        }
    });
    b.clazz = a
});
M.define("Imglazyload",
function (a) {
    var b = function (c) { };
    M.object.merge(b.prototype, {
        lazyLad: function () {
            var h = $(window).height();
            var g = $("img[imgsrc]");
            var f = $(window).scrollTop();
            for (var d = 0,
            c = g.size() ; d < c; d++) {
                currentObj = $(g[d]);
                var e = currentObj.offset().top - h - 200;
                if (parseInt(f) >= parseInt(e)) {
                    currentObj.attr("src", currentObj.attr("imgsrc"));
                    currentObj.removeAttr("imgsrc")
                }
            }
        }
    });
    a.clazz = b
});

$(function () {
    var pid = $("#currentShopCode").val();
    var cid = $("#currentUserId").val();
    var sid = $("#sid").val();
    var shopid = $("#currentShopId").val();
    var mobile = $("#mobile").val();
    if (sid != 0) {
        if ($("#onlineService").val() == "true") {
            var curl = chaturl + "/ichat/index?v=6&type=shop&sid=" + $("#sid").val() + "&uid=" + cid;
            var url;
            if (cid == "" || cid == undefined || cid == "0") {
                url = loginurl;
                $("#im").attr("href", url + "?url=" + siteurl + "/d/" + shopid);
                $("#phone").attr("href", url + "?url=" + siteurl + "/d/" + shopid);
            }
            else {
                if (cid != sid) {
                    $("#im").attr("href", curl);
                }
                else {
                    $("#im").attr("href", "#");
                }
               
            }
        }
    }
});

