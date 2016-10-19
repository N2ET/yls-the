<?php
/**
 * Archive
 * Description: Displays posts as news.
 *
 * @package WordPress
 */
get_header();

// Layout
if(get_option('layouts_news') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_news') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_news') == 'no-sidebar'){
    $layout = 'no-sidebar';
} 

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content archive'>
            <!-- Page title -->
            <h1>
                <?php while (have_posts()) : the_post(); ?>
                <?php the_title();?>

                <?php // reset the loop
                endwhile;
                wp_reset_query(); ?>
            </h1>

            <!-- Items -->
            <?php

            // Posts per page
            if(get_option('posts_per_page') == ''){
                $posts_per_page = 10;
            } else {
                $posts_per_page = get_option('posts_per_page');
            } 

            $args = array( 'post_type' => 'post', 'posts_per_page' => $posts_per_page, 'paged' => get_query_var('paged') );
            $loop = new WP_Query( $args );
            // globalize $wp_query
            global $wp_query;
            // copy $wp_query into a temporary variable
            $temp_wp_query = $wp_query;
            // nullify $wp_query
            $wp_query = null;
            // move $myquery into $wp_query
            $wp_query = $loop;

            while ( $loop->have_posts() ) : $loop->the_post();
            ?>

                <!-- Item -->
                <div class='item' <?php post_class(); get_post_format(); ?>>
                    <?php if (has_post_thumbnail( $post->ID ) ): ?>
                    <!-- Featured image -->
                    <div class='img-wrapper'>
                        <?php
                            $thumb_id = get_post_thumbnail_id();
                            $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail', true);
                            $thumb_url = $thumb_url_array[0];
                            echo "<a href='<?php the_permalink(); ?>'><img src='".$thumb_url."' alt='photo' /></a>";
                        ?>
                    </div>
                    <?php endif; ?>
                    
                    <!-- Item info -->
                    <div class='info'>
                        <a href='<?php the_permalink(); ?>' class='custom-color'><?php the_title(); ?></a>
                        <?php
                            $content = strip_shortcode_gallery( get_the_content() );                                        // Delete first gallery shortcode from post content
                            $content = str_replace( ']]>', ']]&gt;', apply_filters( 'the_content', $content ) );
                            echo excerpt($content, 20);
                        ?>
                    </div>

                    <span><?php the_date(); ?></span>
                </div>
            <?php
            endwhile;
            
            // pagination
            posts_nav_link();

            // restore original $wp_query
            $wp_query = $temp_wp_query;
            ?>


            
            <div class='cleaner'></div>
        </div>

        <!-- Sidebar -->
        <?php 
            // Layout
            if($layout == 'with-sidebar'){
                get_sidebar();
            }
        ?>

    </div> <!-- End: Container -->
    <div class='cleaner'></div>

<!-- Footer -->
<?php get_footer(); ?>