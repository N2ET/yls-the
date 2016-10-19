<?php
/**
 * Default Post Template
 *
 * @package WordPress
 */
get_header();

while ( have_posts() ) : the_post();

// Load custom variables
$custom = get_post_custom();

// Layout
if(get_option('layouts_post') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_post') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_post') == 'no-sidebar'){
    $layout = 'no-sidebar';
} 

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content detail' <?php post_class(); ?>>
            <!-- Title -->
            <h1>
                <?php

                the_title();

                ?>
            </h1>

            <!-- Main image -->
            <?php if (has_post_thumbnail( $post->ID ) ): ?>
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
                
                // Previous/next page navigation.
                wp_link_pages();

            ?>

            <!-- Comments -->
            <div class='comments'>
            <?php 

                comments_template();

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