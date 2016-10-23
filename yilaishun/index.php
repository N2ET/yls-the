<?php
get_header();
?>

<div class="img-wrapper" id="slider">
    <div class="img-placeholder">
        <img src="<?php echo get_asset_url('assets/img/slider-1.jpg'); ?>">
    </div>
    <img src="<?php echo get_asset_url('assets/img/slider-1.jpg'); ?>" alt="梅州金柚" class="active">
    <img src="<?php echo get_asset_url('assets/img/slider-2.jpg'); ?>" alt="梅州金柚">
    <img src="<?php echo get_asset_url('assets/img/slider-3.jpg'); ?>" alt="梅州金柚">
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
                    今年的中秋蜜柚我们做的就很成功，发货量全国各地日均800多件，售后服务绝对到位。<br />
                    欢迎微信或者来电详谈，合作共赢，彭老板<a class="phone" href="tel:13632628218">13632628218</a>，微信同号。
                </p>
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
            <h3>最新供应</h3>
            <p>
                供应正宗梅州沙田柚（梅州金柚），皮薄果肉饱满多汁，富含维生素又美味！
            </p>
        </div>
        <div class="section-content">
                <ul class="section-card-list clear">
                    <li>
                        <div class="img-wrap">
                            <img src="<?php echo get_asset_url('assets/img/product-1.jpg'); ?>"/>
                            <div class="img-des">沙田柚 3.50元/斤</div>
                        </div>
                    </li><!-- clear space
                    --><li>
                        <div class="img-wrap">
                            <img src="<?php echo get_asset_url('assets/img/product-2.jpg'); ?>"/>
                            <div class="img-des">沙田柚 3.20元/斤</div>
                        </div>
                    </li><!-- clear space
                    --><li>
                        <div class="img-wrap">
                            <img src="<?php echo get_asset_url('assets/img/product-3.jpg'); ?>"/>
                            <div class="img-des">梅州金柚 3.50元/斤</div>
                        </div>
                    </li><!-- clear space
                    --><li>
                        <div class="img-wrap">
                            <img src="<?php echo get_asset_url('assets/img/product-4.jpg'); ?>"/>
                            <div class="img-des">柚子 沙田柚 3.50元/斤</div>
                        </div>
                    </li>
                </ul>
        </div>
    </div>


    <div class="section" id="concat">
        <div class="section-title">
            <h3>联系我们</h3>
            <p>
                真诚合作，欢迎联系！
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
                        <span class="content"><a class="phone" href="tel:13632628218">13632628218</a></span>
                    </li>
                    <li>
                        <span class="label">邮箱：</span>
                        <span class="content"><a href="mailto:153527299@qq.com">153527299@qq.com</a></span>
                    </li>
                    <li>
                        <span class="label">地址：</span>
                        <span class="content"> 广东省梅州市梅县区桃尧镇学府路</span>
                    </li>
                    <li class="qr-row">
                        <div class="label">二维码：</div>
                        <div class="content">
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
        Copyright © 2016 一来顺水果专业合作社 <?php echo site_url(); ?>
    </div>
</div>

<div id="side-bar">

</div>

<div id="opr-tool" class="hide">
    <a class="to-top" href="#home">返回顶部</a><!-- clear space
    --><a class="phone" href="tel:13632628218">拨打电话</a>
</div>

<script type="text/javascript" src="<?php echo get_asset_url('assets/js/jquery-1.7.2.min.js') ?>"></script>
<script type="text/javascript">
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


    function initPath() {

        $(window).on('hashchange', function(e) {

            var $menu = $('#menu-wrapper');
            var $active = $menu.find('.active');
            var $menuItem = $menu.find('[href="' + location.hash + '"]');
            var defaultHash = '#home';

            $active.removeClass('active');

            if(!$menuItem.size()) {
                $menuItem = $menu.find('[href="' + defaultHash + '"]');
            }

            $menuItem.addClass('active');
        });
    }


    initPath();
    $(document).ready(function () {
        setInterval('swapImages()', 5000);

        $('#opr-tool .to-top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
    });

</script>
