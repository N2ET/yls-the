<?php
/**
 * Accommodation single template
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
$custom = get_post_custom();

// Layout
if(get_option('layouts_room') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_room') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_room') == 'no-sidebar'){
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
                        if($custom['title_lang_2'][0] != ''){
                            echo $custom['title_lang_2'][0];
                        } else {
                            the_title();
                        }
                        break;
                }

                ?>
            </h1>
            
            <!-- Beds -->
            <div class='beds-wrapper'>
                <div class='beds'>
                    <?php
                        // Beds capacity
                        $beds = $custom['accommodation_beds'][0];

                        //Language support
                        $placeholder_occupancy_title = 'Occupancy';
                        switch ($lang){
                            case '':
                            case '1':
                                if(get_option('lang_core_occupancy_title') != ''){
                                    $placeholder_occupancy_title = get_option('lang_core_occupancy_title');    
                                } 
                                break;
                            case '2':
                                if(get_option('lang_core_occupancy_title_lang_2') != ''){
                                    $placeholder_occupancy_title = get_option('lang_core_occupancy_title_lang_2'); 
                                } 
                                break;
                        }

                        if($beds <= 10){
                            for ($i=0; $i < $beds; $i++) { 
                                echo "<div class='bed custom-color-back' title='".$placeholder_occupancy_title."'></div>";
                            }
                        } else {
                            echo "<div class='bed exceeted custom-color-back' title='".$placeholder_occupancy_title."'>".$beds."</div>";
                        }
                    ?>
                </div>
            </div>

            <!-- Main image with gallery -->
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

            <!-- Amenities -->
            <div class='amenities'>
                <p>
                    <?php 
                    $amenities = wp_get_object_terms( $post->ID, 'Amenities' );

                    //Language support
                    $placeholder_amenities = 'Amenities';
                    switch ($lang){
                        case '':
                        case '1':
                            if(get_option('lang_core_amenities') != ''){
                                $placeholder_amenities = get_option('lang_core_amenities');    
                            } 
                            break;
                        case '2':
                            if(get_option('lang_core_amenities_lang_2') != ''){
                                $placeholder_amenities = get_option('lang_core_amenities_lang_2'); 
                            } 
                            break;
                    }

                    foreach( $amenities as $term )
                        $term_names[] = $term->name;

                    if($term_names != null){
                        echo "<span class='custom-color'>".$placeholder_amenities.": </span>" . implode( ', ', $term_names );
                    }
                    ?>
                </p>
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
                    if($custom['content_lang_2'][0] != ''){
                        echo $custom['content_lang_2'][0];
                    } else {
                        echo $content;
                    }
                    break;
            }

            if(get_option('reservation_switch') == 'on'){
            ?>

            <!-- Booking -->
            <div class='booking'>
                <div class='price custom-color'>
                    <?php
                    // Language support
                    switch ($lang){
                        case '':
                        case '1':
                            echo $custom['price'][0];
                            break;
                        case '2':
                            if($custom['price_lang_2'][0] != ''){
                                echo $custom['price_lang_2'][0];
                            } else {
                                echo $custom['price'][0];
                            }
                            break;
                    }
                    ?>
                <br />
                <span>
                    <?php
                    // Language support
                    switch ($lang){
                        case '':
                        case '1':
                            echo $custom['price_title'][0];
                            break;
                        case '2':
                            if($custom['price_title_lang_2'][0] != ''){
                                echo $custom['price_title_lang_2'][0];
                            } else {
                                echo $custom['price_title'][0];
                            }
                            break;
                    }
                    ?>
                </span>
                </div>
                <?php
                // Language support
                $placeholder_book_button = 'Book now';

                switch ($lang){
                    case '':
                    case '1':
                        if(get_option('lang_core_book_button') != ''){
                            $placeholder_book_button = get_option('lang_core_book_button');    
                        } 
                        break;
                    case '2':
                        if(get_option('lang_core_book_button_lang_2') != ''){
                            $placeholder_book_button = get_option('lang_core_book_button_lang_2'); 
                        } 
                        break;
                }
                ?>

                <form action='<?php echo $_SESSION['reservation_url']; ?><?php echo $lang_link.$lang; ?>' method='get'>
                    <input type='hidden' id='booking-room' name='booking-room' value='<?php the_title(); ?>' />
                    <div class='input-wrapper'><input type='text' class='booking-checkin datepicker' id='booking-checkin' name='booking-checkin' placeholder='14.06.2014' /><div class='datepicker-icon'></div></div>
                    <div class='input-wrapper'><input type='text' class='booking-checkout datepicker' id='booking-checkout' name='booking-checkout' placeholder='14.06.2014' /><div class='datepicker-icon'></div></div>
                    <input type='submit' class='booking-checkout custom-color-btn-back button' value='<?php echo $placeholder_book_button; ?>' />

                </form>
            </div>

            <?php
            }
            ?>

            <!-- Extended price info -->
            <p class='extended-info'>
                <?php
                // Language support
                switch ($lang){
                    case '':
                    case '1':
                        echo $custom['price_description'][0]; 
                        break;
                    case '2':
                        if($custom['price_description_lang_2'][0] != ''){
                            echo $custom['price_description_lang_2'][0];
                        } else {
                            echo $custom['price_description'][0]; 
                        }
                        break;
                }
                ?>
            </p>

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