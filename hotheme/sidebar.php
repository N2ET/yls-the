<?php
/**
 * The Right Sidebar displayed on templates.
 *
 * @package WordPress
 */

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

<div class='sidebar'>
    
    <!-- Widget Accommodation -->
    <?php
    // If widget is on
    if(get_option('widget_accommodation_switch') == 'on'){
    ?>
        <div class='widget'>
            <h2 class='custom-color'>
            <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('widget_accommodation_title');
                        break;
                    case '2':
                        if(get_option('widget_accommodation_title_lang_2') != ''){
                            echo get_option('widget_accommodation_title_lang_2');
                        } else {
                            echo get_option('widget_accommodation_title');
                        }
                        break;
                }
                ?>
            </h2>
            <ul>
                <?php
                $args = array( 'post_type' => 'accommodation', 'posts_per_page' => get_option('widget_accommodation_count') );
                $loop = new WP_Query( $args );
                while ( $loop->have_posts() ) : $loop->the_post();

                // Load custom variables
                $custom = get_post_custom();
                ?>

                <li>
                    <a href='<?php the_permalink(); ?><?php echo $lang_link.$lang; ?>'>
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
                    </a>
                </li>

                <?php endwhile; ?>
            </ul>
        </div>
    <?php
    }
    ?>
    
    <!-- Widget Things to do -->
    <?php
    // If widget is on
    if(get_option('widget_poi_switch') == 'on'){
    ?>
        <div class='widget'>
            <h2 class='custom-color'>
                <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('widget_poi_title');
                        break;
                    case '2':
                        if(get_option('widget_poi_title_lang_2') != ''){
                            echo get_option('widget_poi_title_lang_2');
                        } else {
                            echo get_option('widget_poi_title');
                        }
                        break;
                }
                ?>
            </h2>
            <ul>
                <?php
                $args = array( 'post_type' => 'poi', 'posts_per_page' => get_option('widget_poi_count') );
                $loop = new WP_Query( $args );
                while ( $loop->have_posts() ) : $loop->the_post();
                
                // Load custom variables
                $poi = get_post_custom();
                ?>

                <li>
                    <a href='<?php the_permalink(); ?><?php echo $lang_link.$lang; ?>'>
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
                    </a>
                </li>

                <?php endwhile; ?>
            </ul>
        </div>
    <?php
    }
    ?>
    
    <!-- Widget Gallery -->
    <?php
    // If widget is on
    if(get_option('widget_gallery_switch') == 'on'){
    ?>
        <div class='widget'>
            <h2 class='custom-color'>
                <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('widget_gallery_title');
                        break;
                    case '2':
                        if(get_option('widget_gallery_title_lang_2') != ''){
                            echo get_option('widget_gallery_title_lang_2');
                        } else {
                            echo get_option('widget_gallery_title');
                        }
                        break;
                }
                ?>
            </h2>
            
            <div class='gallery sidebar-gallery'>
                <?php
                    // Load sidebar images
                    $sidebar_gallery = array(get_option('basic_gallery_1'), get_option('basic_gallery_2'), get_option('basic_gallery_3'), get_option('basic_gallery_4'), get_option('basic_gallery_5'), get_option('basic_gallery_6')); 

                    $i = 1;
                    
                    foreach($sidebar_gallery as $image) {
                        if ($image != null) {

                            $size = getimagesize($image); 
                            $width = $size[0]; 
                            $height = $size[1]; 
                            $aspect = $height / $width; 
                            if ($aspect >= 1) {
                                echo "<a href='".$image."' class='img-wrapper'><img src='".$image."' alt='photo' style='width: 100%;' /></a>";
                            } else {
                                echo "<a href='".$image."' class='img-wrapper'><img src='".$image."' alt='photo' style='height: 100%;' /></a>";
                            }
                            
                        }
                        $i++;
                    }
                    ?>
            </div>
        </div>
    <?php
    }
    ?>

    <?php  

    if (is_active_sidebar('sidebar-page')) {
        dynamic_sidebar('sidebar-page');
    } 

    ?>
    <div class='cleaner'></div>
</div>