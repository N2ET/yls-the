<?php
/**
 * Thing to do single template
 *
 * @package WordPress
 */
get_header();

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

while ( have_posts() ) : the_post();

// Load custom variables
$poi = get_post_custom();

// GPS
$detail_gps_latitude = $poi['poi_gps_latitude'][0];
$detail_gps_longtitude = $poi['poi_gps_longtitude'][0];

// Layout
if(get_option('layouts_poi_detail') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_poi_detail') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_poi_detail') == 'no-sidebar'){
    $layout = 'no-sidebar';
} 

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content detail'>
            <!-- Title -->
            <h1>
                <?php
                // Language support
                switch ($lang){
                    case '':
                    case '1':
                        the_title(); 
                        break;
                    case '2':
                        if($poi['poi_title_lang_2'][0] != ''){
                            echo $poi['poi_title_lang_2'][0];
                        } else {
                            the_title();
                        }
                        break;
                }
                ?>
            </h1>

            <!-- Distance -->
            <div class='distance-wrapper'>
                <div class='distance custom-color'>
                    <?php
                    // Distance
                    // GPS hotel
                    $hotel_gps_latitude = get_option('basic_address_latitude');
                    $hotel_gps_longtitude = get_option('basic_address_longtitude');

                    $distance = calculateDistance($hotel_gps_latitude, $hotel_gps_longtitude, $detail_gps_latitude, $detail_gps_longtitude);

                    echo round($distance, 2)."km";
                    ?>
                </div>
            </div>

            <!-- Main image gallery -->
            <div class='img-wrapper content-gallery'>
                <?php
                    $gallery = get_post_gallery_images( $post );
                    foreach (array_reverse($gallery) as $gallery_img_url) {
                        $gallery_img_url = str_replace("-150x150", "", $gallery_img_url);

                        echo $gallery_img_url."<br/>";
                        echo "<a href='".$gallery_img_url."'><img src='".$gallery_img_url."' alt='photo' /><div class='open-gallery-trigger custom-color-btn-back'>Open gallery</div></a>";

                    }
                ?>
                
            </div>

            <!-- Info -->
            <?php 

            // Delete first gallery shortcode from post content
            $content = strip_shortcode_gallery( get_the_content() );
            // Apply filter to achieve the same output that the_content() returns
            $content = str_replace( ']]>', ']]&gt;', apply_filters( 'the_content', $content ) );
            
            // Language support
            switch ($lang){
                case '':
                case '1':
                    echo $content; 
                    break;
                case '2':
                    if($poi['poi_content_lang_2'][0] != ''){
                        echo "<p>".$poi['poi_content_lang_2'][0]."</p>";
                    } else {
                        echo $content;
                    }
                    break;
            }

            ?>

            <!-- Directions -->
            <div class='directions custom-color'>
                <div class='map' id='detail-map'></div>

                <!-- Embed map -->
                <script>
                    function initialize() {
                      var myLatlng = new google.maps.LatLng(<?php echo $detail_gps_latitude.",".$detail_gps_longtitude; ?>);
                      var mapOptions = {
                        zoom: 14,
                        center: myLatlng,
                        scrollwheel: false
                      }
                      var map = new google.maps.Map(document.getElementById('detail-map'), mapOptions);

                      var marker = new google.maps.Marker({
                          position: myLatlng,
                          map: map,
                          title: 'Hello World!'
                      });
                    }

                    google.maps.event.addDomListener(window, 'load', initialize);

                </script>
                <!-- Directions content -->
                <div class='directions-content'>
                    <p>
                        <strong><?php echo $poi['poi_address_street'][0]; ?></strong><br />
                        <?php echo $poi['poi_address_postcode'][0]; ?>, <?php echo $poi['poi_address_city'][0]; ?><br />
                        <?php echo $poi['poi_address_country'][0]; ?>
                    </p>
                    <p>
                        <strong>GPS</strong><br />
                        <?php echo $poi['poi_gps_latitude'][0]; ?><br />
                        <?php echo $poi['poi_gps_longtitude'][0]; ?>
                    </p>
                    <p>
                        <strong>Contact</strong><br />
                        <a href='<?php echo $poi['poi_contact'][0]; ?>'><?php echo $poi['poi_contact'][0]; ?></a>
                    </p>
                </div>
            </div>

            <!-- Comments -->
            <div class='comments'>
            <?php 

                comments_template( '', true );

            ?>
            </div>

            <div class='cleaner'></div>
        </div>

        <!-- Sidebar -->
        <?php 
            // Layout
            if($layout == 'with-sidebar'){
                get_sidebar();
            }
        ?>

    </div>
    <div class='cleaner'></div>
<?php endwhile; ?>

<!-- Footer -->
<?php get_footer(); ?>