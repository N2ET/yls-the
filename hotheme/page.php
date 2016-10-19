<?php
/**
 * Page template
 * Description: Page template with a content container and right sidebar.
 *
 * @package WordPress
 */
get_header(); 

while ( have_posts() ) : the_post();

// Layout
if(get_option('layouts_page') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_page') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_page') == 'no-sidebar'){
    $layout = 'no-sidebar';
} 

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content detail'>
            <h1>
                <?php

                the_title();

                ?>
            </h1>


            <?php if (has_post_thumbnail( $post->ID ) ): ?>
            <!-- Main image -->
            <div class='img-wrapper content-gallery'>
                <?php
                    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
                    echo "<img src='".$image[0]."' alt='photo' />";
                ?>
            </div>
            <?php endif; ?>

            <!-- Content -->
            <?php 
                
                echo the_content();

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

    </div>
    <div class='cleaner'></div>
<?php endwhile; ?>

<!-- Footer -->
<?php get_footer(); ?>