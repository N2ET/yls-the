<?php
/**
 * Template Name: Page - Gallery
 * Description: Displays images.
 *
 * @package WordPress
 */
get_header(); 

// Layout
if(get_option('layouts_gallery') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_gallery') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_gallery') == 'no-sidebar'){
    $layout = 'no-sidebar';
}

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content'>
            <!-- Page title -->
            <h1>
                <?php while (have_posts()) : the_post(); ?>
                    <?php the_title();?>

                <?php // reset the loop
                endwhile;
                wp_reset_query(); ?>
            </h1>
            <!-- List -->
            <div class='list gallery content-gallery'>
                <?php
                    $gallery = get_post_gallery_images( $post );
                    foreach (array_reverse($gallery) as $gallery_img_url) {
                        $gallery_img_url = str_replace("-150x150", "", $gallery_img_url);

                        $size = getimagesize($gallery_img_url); 
                        $width = $size[0]; 
                        $height = $size[1]; 
                        $aspect = $height / $width; 
                        if ($aspect >= 1) {
                            echo "<a href='".$gallery_img_url."'><img src='".$gallery_img_url."' alt='gallery' class='width-full' /></a>";
                        } else {
                            echo "<a href='".$gallery_img_url."'><img src='".$gallery_img_url."' alt='gallery' class='height-full' /></a>";
                        }

                    }
                ?>
                <div class='cleaner'></div>
            </div>
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