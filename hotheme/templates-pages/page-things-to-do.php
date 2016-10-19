<?php
/**
 * Template Name: Page - Things to do
 * Description: Displays POIs in two different layouts
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

// Layout
if(get_option('layouts_poi') == ''){
    $layout = 'list-default';
} else if(get_option('layouts_poi') == 'list-default'){
    $layout = 'list-default';
} else if(get_option('layouts_poi') == 'list-square'){
    $layout = 'list-square';
} 

?>

    <!-- Content -->
    <div class='content no-sidebar'>
        <!-- Page title -->
        <h1>
            <?php while (have_posts()) : the_post(); ?>
                <?php the_title();?>

            <?php // reset the loop
            endwhile;
            wp_reset_query(); ?>
        </h1>
        
        <!-- List -->
        <div class='list <?php echo $layout; ?>'>
            <!-- Items -->
            <?php

            $args = array( 'post_type' => 'poi', 'posts_per_page' => 10 );
            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post();

            // Load custom variables
            $poi = get_post_custom();

            ?>

            <!-- Item -->   
            <div class='item'>
                <!-- Featured image -->
                <div class='img-wrapper'>
                    <a href='<?php the_permalink(); ?><?php echo $lang_link.$lang; ?>'><?php the_post_thumbnail(array(420,300)); ?></a>

                </div>
                <!-- Item info -->
                <div class='info'>
                    <!-- Item title -->
                    <a href='<?php the_permalink(); ?><?php echo $lang_link.$lang; ?>'>
                        <h2 class='custom-color'>
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
                        </h2>
                    </a>

                    <!-- Distance  -->
                    <div class='distance-wrapper'>
                        <div class='distance custom-color'>
                            <?php
                            // Distance
                            // GPS
                            $detail_gps_latitude = $poi['poi_gps_latitude'][0];
                            $detail_gps_longtitude = $poi['poi_gps_longtitude'][0];

                            // GPS hotel
                            $hotel_gps_latitude = get_option('basic_address_latitude');
                            $hotel_gps_longtitude = get_option('basic_address_longtitude');
                            
                            $distance = calculateDistance($hotel_gps_latitude, $hotel_gps_longtitude, $detail_gps_latitude, $detail_gps_longtitude);

                            echo round($distance, 2)."km";
                            ?>
                        </div>
                    </div>

                    <!-- Content short -->
                    <div class='item-content'>
                        <?php
                        // Language support
                        switch ($lang){
                            case '':
                            case '1':
                                $content = strip_shortcode_gallery( get_the_content() );                                        // Delete first gallery shortcode from post content
                                $content = str_replace( ']]>', ']]&gt;', apply_filters( 'the_content', $content ) );
                                echo excerpt($content, 22);
                                break;
                            case '2':
                                if($poi['poi_content_lang_2'][0] != ''){
                                    $content = $poi['poi_content_lang_2'][0];
                                    echo "<p>" . excerpt($content, 22) . "</p>";
                                } else {
                                    $content = strip_shortcode_gallery( get_the_content() );                                        // Delete first gallery shortcode from post content
                                    $content = str_replace( ']]>', ']]&gt;', apply_filters( 'the_content', $content ) );
                                    echo excerpt($content, 22);
                                }
                                break;
                        }
                        ?>
                    </div>

                    <!-- Button -->
                    <?php
                        // Language support
                        switch ($lang){
                            case '':
                            case '1':
                                if(get_option('lang_core_detail_button') != ''){
                                    echo "<a href='".get_permalink().$lang_link.$lang."' class='button custom-color-btn-back'>".get_option('lang_core_detail_button')."</a>";    
                                } else {
                                    echo "<a href='".get_permalink().$lang_link.$lang."' class='button custom-color-btn-back'>Details</a>";                                        
                                }
                                break;
                            case '2':
                                if(get_option('lang_core_detail_button_lang_2') != ''){
                                    echo "<a href='".get_permalink().$lang_link.$lang."' class='button custom-color-btn-back'>".get_option('lang_core_detail_button_lang_2')."</a>";    

                                } else {
                                    if(get_option('lang_core_detail_button') != ''){
                                        echo "<a href='".get_permalink().$lang_link.$lang."' class='button custom-color-btn-back'>".get_option('lang_core_detail_button')."</a>";    
                                    } else {
                                        echo "<a href='".get_permalink().$lang_link.$lang."' class='button custom-color-btn-back'>Details</a>";                                        
                                    }                                }
                                break;
                        }
                    ?>
                </div>
            </div> <!-- End: Item -->

            <?php endwhile; ?>
            <div class='cleaner'></div>
            
        </div> <!-- End: List -->
    </div> <!-- End: Content -->

<!-- Footer -->
<?php get_footer(); ?>