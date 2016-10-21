<?php
get_header();
?>

<div class="img-wrapper" id="slider">
    <div class="img-placeholder">
        <img src="<?php echo get_asset_url('assets/img/slider-1.jpg'); ?>">
    </div>
    <img src="<?php echo get_asset_url('assets/img/slider-1.jpg'); ?>" class="active">
    <img src="<?php echo get_asset_url('assets/img/slider-2.jpg'); ?>">
    <img src="<?php echo get_asset_url('assets/img/slider-3.jpg'); ?>">
</div>


<div id="main-content">

    <div class="section about" id="about">
        <div class="section-title">
            <h3>关于我们</h3>
            <p>
                梅州市梅县区桃尧一来顺水果专业合作社<br />
                供应优质正宗梅州沙田柚，货源充足，诚信经营，欢迎大家订购！
            </p>
        </div>
        <div class="section-content">
            <div class="col-left">
                <p class="section-detail-des">
                    诚招全国有实力的微商代理、电商代理。我们是基地，可以提供基地一件代发，会提供详细的产品宣传资料给您。
                    今年的中秋蜜柚我们做的就很成功，发货量全国各地日均800多件，售后服务绝对到位。
                    欢迎微信或者来电详谈，合作共赢，彭老板<a href="tel:13632628218">13632628218</a>，微信同号。
                </p>
                <ul class="section-detail-list">
                    <li>
                        <p>生产基地，货源充足</p>
                    </li>
                    <li>
                        <p>基地代发</p>
                    </li>
                    <li>
                        <p>提供详细资料</p>
                    </li>
                    <li>
                        <p>提供可靠售后服务</p>
                    </li>
                </ul>
            </div><!-- clear space
            --><div class="col-right">
                <div id="about-qq-player">
                    <embed wmode="direct"
                           flashvars="vid=z0319c17jth&amp;tpid=0&amp;showend=1&amp;showcfg=1&amp;searchbar=1&amp;pic=http://shp.qpic.cn/qqvideo_ori/0/z0319c17jth_496_280/0&amp;shownext=1&amp;list=2&amp;autoplay=0"
                           src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&amp;v=20140714"
                           quality="high" name="tenvideo_flash_player_1477038349544"
                           id="tenvideo_flash_player_1477038349544" bgcolor="#000000" width="100%" height="100%"
                           align="middle" allowscriptaccess="always" allowfullscreen="true"
                           type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">
                </div>
            </div>
        </div>

    </div>


    <div class="section" id="product">
        <div class="section-title">
            <h3>来自梅州的鲜果</h3>
            <p>
                沙田柚，果大形美，吃起来清甜爽脆、甜而不酸，耐贮藏，因而获得自然界“天然罐头”之称。
            </p>
        </div>
        <div class="section-content">
                <ul class="section-card-list clear">
                    <li>
                        <img src="<?php echo get_asset_url('assets/img/product-1.jpg'); ?>"/>
                        <div class="img-des"></div>
                    </li><!-- clear space
                    --><li>
                        <img src="<?php echo get_asset_url('assets/img/product-2.jpg'); ?>"/>
                        <div class="img-des"></div>
                    </li><!-- clear space
                    --><li>
                        <img src="<?php echo get_asset_url('assets/img/product-3.jpg'); ?>"/>
                        <div class="img-des"></div>
                    </li><!-- clear space
                    --><li>
                        <img src="<?php echo get_asset_url('assets/img/product-4.jpg'); ?>"/>
                        <div class="img-des"></div>
                    </li>
                </ul>
        </div>
    </div>


    <div class="section" id="concat">
        <div class="section-title">
            <h3>联系方式</h3>
            <p>
                最快找到我们！
            </p>
        </div>
        <div class="section-content">
            <div class="col-left">
                <ul class="section-detail-list">
                    <li>
                        <span class="label">联系人：</span>
                        <span class="content">彭浩</span>
                    </li>
                    <li>
                        <span class="label">联系电话：</span>
                        <span class="content"><a href="tel:13632628218">13632628218</a></span>
                    </li>
                    <li>
                        <span class="label">邮箱：</span>
                        <span class="content">153527299@qq.com</span>
                    </li>
                    <li>
                        <span class="label">地址：</span>
                        <span class="content"> 广东省梅州市梅县区桃尧镇学府路</span>
                    </li>
                    <li>
                        <div class="label">二维码：</div>
                        <div class="content">
                            <div class="qr-code qr-web"></div>
                            <div class="qr-code qr-penghao"></div>
                        </div>
                    </li>
                </ul>
            </div><!-- clear space
            --><div class="col-right">
                <iframe id="concat-map-frame" scrolling="no" src="<?php echo get_template_directory_uri() . '/map.html'; ?>"></iframe>
            </div>
        </div>

    </div>

</div>

<div id="footer">
    <div class="content">

    </div>
</div>

<div id="side-bar">

</div>

<div id="wechat-tool">

</div>

<script type="text/javascript" src="<?php echo get_asset_url('assets/js/jquery-1.7.2.min.js') ?>"></script>
<script type="text/javascript">
    /* slider */
    function swapImages() {
        var $slider = $('#slider');
        var $active = $slider.find('.active');
        var $next = $active.next('img');

        if (!$next.next().size()) {
            $next = $slider.find('>img:first');
        }

        $next.fadeIn().addClass('active');
        $active.fadeOut(function () {
            $active.removeClass('active');
        });
    }

    $(document).ready(function () {
        setInterval('swapImages()', 5000);
    });
</script>
