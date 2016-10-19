<?php
/**
 * Default Footer
 *
 * @package WordPress
 */

// Language support
    // If language switch is OFF
    if(!isset($_GET['lang'])){
      $lang_link = '';
      $lang = '';  
    }
    // Chosen language
    if(isset($_GET['lang'])){
        $lang_link = '?lang=';
        if ($_GET['lang'] == 1){
            $lang = 1;
        } else if($_GET['lang'] == 2) {
            $lang = 2;
        }
    }
?>

        <div class='footer custom-color-back'>
            <!-- Directions -->
            <div class='directions'>
                <div class='map' id='footer-map'></div>

                <?php
                
                // GPS hotel
                $hotel_gps_latitude = get_option('basic_address_latitude');
                $hotel_gps_longtitude = get_option('basic_address_longtitude');

                ?>

                <!-- Embed map -->
                <script type="text/javascript">
                    function initialize() {
                      var myLatlng = new google.maps.LatLng(<?php echo $hotel_gps_latitude.",".$hotel_gps_longtitude; ?>);
                      var mapOptions = {
                        zoom: 10,
                        center: myLatlng,
                        scrollwheel: false
                      }
                      var map = new google.maps.Map(document.getElementById('footer-map'), mapOptions);

                      var marker = new google.maps.Marker({
                          position: myLatlng,
                          map: map,
                          title: 'Hello World!'
                      });
                    }

                    google.maps.event.addDomListener(window, 'load', initialize);

                </script>

                <!-- Address -->
                <p><strong><?php echo get_option('basic_address_street'); ?></strong><br />
                <?php echo get_option('basic_address_postcode'); ?><?php if(get_option('basic_address_city') != '') { echo ", " . get_option('basic_address_city'); } ?><br />
                <?php echo get_option('basic_address_country'); ?>
                <br />
                
                <?php
                // Navigate

                // Language support
                $placeholder_navigate = 'Navigate';

                switch ($lang){
                    case '':
                    case '1':
                        if(get_option('lang_core_footer_navigate') != ''){
                            $placeholder_navigate = get_option('lang_core_footer_navigate');    
                        } 
                        break;
                    case '2':
                        if(get_option('lang_core_footer_navigate_lang_2') != ''){
                            $placeholder_navigate = get_option('lang_core_footer_navigate_lang_2'); 
                        } 
                        break;
                }


                if($hotel_gps_latitude != '' && $hotel_gps_longtitude != ''){
                    echo "<a href='https://maps.google.com?daddr=".$hotel_gps_latitude.",".$hotel_gps_longtitude."' target='_blank'>".$placeholder_navigate."</a>";
                }
                ?>

                </p>
            </div>
            
            <!-- News -->
            <?php
            // If there is news
            $args = array( 'post_type' => 'post' );
            $loop = new WP_Query( $args );
            if ( $loop->have_posts() ) :
            ?>
                <div class='news'>
                    <?php
                    // Language support
                    $placeholder_news_title = 'Recent News';

                    switch ($lang){
                        case '':
                        case '1':
                            if(get_option('lang_core_footer_news_title') != ''){
                                $placeholder_news_title = get_option('lang_core_footer_news_title');    
                            } 
                            break;
                        case '2':
                            if(get_option('lang_core_footer_news_title_lang_2') != ''){
                                $placeholder_news_title = get_option('lang_core_footer_news_title_lang_2'); 
                            } 
                            break;
                    }

                    ?>

                    <p><strong><?php echo $placeholder_news_title; ?></strong></p>
                    
                    <ul>
                        <?php 
                        $args = array( 'post_type' => 'post', 'posts_per_page' => 3 );
                        $loop = new WP_Query( $args );
                        while ( $loop->have_posts() ) : $loop->the_post(); 
                        ?>
                        <li><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></li>
                        <?php endwhile; ?>
                    </ul>
                </div>
            <?php
            endif;
            ?>

            <div class='cleaner'></div>
            
            <!-- Copyright -->
            <p class='copyright'><?php echo date('Y')." "; bloginfo('name'); ?><br />Made with <a href='http://www.hotheme.co' target='_blank'>Hotheme</a></p>
            
            <!-- Socials -->
            <div class='socials-wrapper'>
                <ul class='socials'>
                    <?php

                    if (get_option('basic_socials_facebook') != '') {
                        echo "<li><a href='". get_option('basic_socials_facebook') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/facebook.png' alt='social' /></a></li>";
                    } 

                    if (get_option('basic_socials_twitter') != '') {
                        echo "<li><a href='". get_option('basic_socials_twitter') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/twitter.png' alt='social' /></a></li>";
                    } 

                    if (get_option('basic_socials_instagram') != '') {
                        echo "<li><a href='". get_option('basic_socials_instagram') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/instagram.png' alt='social' /></a></li>";
                    } 

                    if (get_option('basic_socials_youtube') != '') {
                        echo "<li><a href='". get_option('basic_socials_youtube') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/youtube.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_tripadvisor') != '') {
                        echo "<li><a href='". get_option('basic_socials_tripadvisor') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/tripadvisor.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_pinterest') != '') {
                        echo "<li><a href='". get_option('basic_socials_pinterest') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/pinterest.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_foursquare') != '') {
                        echo "<li><a href='". get_option('basic_socials_foursquare') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/foursquare.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_vimeo') != '') {
                        echo "<li><a href='". get_option('basic_socials_vimeo') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/vimeo.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_tumblr') != '') {
                        echo "<li><a href='". get_option('basic_socials_tumblr') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/tumblr.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_skype') != '') {
                        echo "<li><a href='". get_option('basic_socials_skype') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/skype.png' alt='social' /></a></li>";
                    }

                    if (get_option('basic_socials_google') != '') {
                        echo "<li><a href='". get_option('basic_socials_google') ."' target='_blank'><img src='".get_template_directory_uri()."/assets/ico/socials/google.png' alt='social' /></a></li>";
                    }

                    ?>
                </ul>
            </div>
            <div class='cleaner'></div>
            
        </div> <!-- End: Footer -->
    </div> <!-- End: WRAPPER -->
    <?php wp_footer(); ?>

    </body>
</html>