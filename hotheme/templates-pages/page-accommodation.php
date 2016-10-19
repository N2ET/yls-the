<?php
/**
 * Template Name: Page - Accommodation
 * Description: Displays rooms in two different layouts.
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
// Loading accommodation layout
if(get_option('layouts_accommodation') == ''){
    $layout = 'list-default';
} else if(get_option('layouts_accommodation') == 'list-default'){
    $layout = 'list-default';
} else if(get_option('layouts_accommodation') == 'list-square'){
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
            <div class='list <?php echo $layout; ?>'>
                
                <!-- Items -->
                <?php

                // Loading rooms
                $args = array( 'post_type' => 'accommodation', 'posts_per_page' => 100 );
                $loop = new WP_Query( $args );
                while ( $loop->have_posts() ) : $loop->the_post();

                // Load custom variables
                $custom = get_post_custom();

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
                            <a href='<?php the_permalink(); ?>'>
                                <h2 class='custom-color'>
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
                                </h2>
                            </a>
                            
                            <!-- Beds capacity -->
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
                                        if($custom['content_lang_2'][0] != ''){
                                            $content = $custom['content_lang_2'][0];
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
                                            }
                                        }
                                        break;
                                }
                            ?>

                            <!-- Amenities -->
                            <span class='tags'>
                                <?php
                                $amenities = wp_get_object_terms( $post->ID, 'Amenities' );

                                foreach( $amenities as $term )
                                    $term_names[] = $term->name;

                                if($term_names != null){
                                    echo implode( ', ', $term_names );
                                }
                                ?>
                            </span>
                        </div>
                        <div class='cleaner'></div>
                    </div>

                <?php endwhile; ?>
                <div class='cleaner'></div>
                
            </div> <!-- End: List -->
        </div> <!-- End: Content -->

        <!-- Footer -->
        <?php get_footer(); ?>