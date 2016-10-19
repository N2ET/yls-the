<?php
// Home page
//
// Include header.php
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
?>
        
    <!-- Slider -->
    <?php
    if (get_option('basic_slider_video_switch') == 'on' && get_option('basic_slider_video') != '') {
    ?>
        <!-- Video slider -->
        <div class='video-slider'>
            <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" 
                  data-setup='{ "controls": false, "loop": "true", "autoplay": true, "preload": "true", "muted": "true" }'>
                <source src="<?php echo get_option('basic_slider_video_mp4'); ?>" type='video/mp4' />
                <source src="<?php echo get_option('basic_slider_video_webm'); ?>" type='video/webm' />
                <source src="<?php echo get_option('basic_slider_video_ogg'); ?>" type='video/ogg' />
            </video>
        </div>
    <?php
    }
    else if(get_option('basic_slider_1') != '' && (get_option('basic_slider_video_switch') == 'off' || get_option('basic_slider_video_switch') == '')){
    ?>
        <!-- Photo slider -->
        <div class='slider img-wrapper'>
            <?php
                // Load images from Slider Directory
                $slider = array(get_option('basic_slider_1'), get_option('basic_slider_2'), get_option('basic_slider_3'), get_option('basic_slider_4'), get_option('basic_slider_5')); 

                $i = 1;
                
                foreach($slider as $image) {
                    if ($image != null) {
                        if ($i == 1) {
                            echo "<img src='".$image."' alt='photo' class='active'/>";
                        }   else {
                            echo "<img src='".$image."' alt='photo' />";
                        }
                    }
                    $i++;
                }
            ?>
        </div>

    <?php
    }
    ?>
    
    <!-- Welcome -->
    <div class='welcome'>
        <div class='welcome-wrapper'>
            <!-- Welcome title -->
            <h1>
            <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('home_welcome_title'); 
                        break;
                    case '2':
                        if(get_option('home_welcome_title_lang_2') != ''){
                            echo get_option('home_welcome_title_lang_2'); 
                        } else {
                            echo get_option('home_welcome_title');
                        }
                        break;
                }
            ?>
            </h1>
            <!-- Welcome content -->
            <p>
            <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('home_welcome'); 
                        break;
                    case '2':
                        if(get_option('home_welcome_lang_2') != ''){
                            echo get_option('home_welcome_lang_2'); 
                        } else {
                            echo get_option('home_welcome');
                        }
                        break;
                }
            ?>
            </p>
        </div>
        
        <!-- Facilities -->
        <div class='facilities'>
            <!-- Facilities title -->
            <h2 class='custom-color'>
                <?php
                switch ($lang){
                    case '':
                    case '1':
                        echo get_option('home_facilities_title'); 
                        break;
                    case '2':
                        if(get_option('home_facilities_title_lang_2') != ''){
                            echo get_option('home_facilities_title_lang_2'); 
                        } else {
                            echo get_option('home_facilities_title');
                        }
                        break;
                }
                ?>
            </h2>
            <!-- Facilities list -->
            <ul>
                <?php
                // Language support and load facilities
                switch ($lang){
                    case '':
                    case '1':
                        $home_facilities = get_option('home_facilities');
                        break;
                    case '2':
                        if(get_option('home_facilities_lang_2') != ''){
                            $home_facilities = get_option('home_facilities_lang_2');
                        } else {
                            $home_facilities = get_option('home_facilities');
                        }
                        break;
                }
                
                // Empty check
                if($home_facilities != ''){
                    
                    $home_facilities = explode(", ", $home_facilities);

                    foreach($home_facilities as $facility){
                        echo "<li><img src='". get_template_directory_uri() ."/assets/ico/check.png' alt='check' />".$facility."</li>";
                    }
                }

                ?>
            </ul>
        </div>
        <div class='cleaner'></div>
    </div>
    
    <!-- Middle part with testimonials and gallery -->
    <div class='middle'>
        <!-- Testimonials -->
        <div class='testemonials'>
            <?php
            // Counting existing testimonials
            // Empty check
            if(get_option('testimonials_1_name') != '' || get_option('testimonials_2_name') != '' || get_option('testimonials_3_name') != '' || get_option('testimonials_4_name') != ''){

                $testimonials_count = 0;
                for ($testi=0; $testi < 5; $testi++) { 
                    if(get_option('testimonials_'.$testi.'_name') != ''){
                        $testimonials_count++;    
                    }
                }

                $random_testimonial_1 = rand(1,$testimonials_count);
                do {
                  $random_testimonial_2 = rand(1,$testimonials_count);
                } while ($random_testimonial_1 == $random_testimonial_2);



            ?>

            <!-- Testimonial -->
            <div class='testemonial'>
                <div class='img-wrapper'>
                    <?php if(get_option('testimonials_'.$random_testimonial_1.'_image') != '') { ?>
                        <img src='<?php echo get_option('testimonials_'.$random_testimonial_1.'_image'); ?>' alt='testimonial' />
                    <?php } ?>    
                </div>
                <span class='custom-color'><?php echo get_option('testimonials_'.$random_testimonial_1.'_name'); ?></span>
                <p>
                <?php
                    switch ($lang){
                        case '':
                        case '1':
                            echo get_option('testimonials_'.$random_testimonial_1.'_review'); 
                            break;
                        case '2':
                            if(get_option('testimonials_'.$random_testimonial_1.'_review_lang_2') != ''){
                                echo get_option('testimonials_'.$random_testimonial_1.'_review_lang_2');
                            } else {
                                echo get_option('testimonials_'.$random_testimonial_1.'_review');
                            }
                            break;
                    }
                ?>
            </div>

            <?php
            // More than 1 testimonial
            if($testimonials_count > 1){
            ?>

            <!-- Testimonial -->    
            <div class='testemonial'>
                <div class='img-wrapper'>
                    <?php if(get_option('testimonials_'.$random_testimonial_2.'_image') != '') { ?>
                        <img src='<?php echo get_option('testimonials_'.$random_testimonial_2.'_image'); ?>' alt='testimonial' />
                    <?php } ?>   
                </div>
                <span class='custom-color'><?php echo get_option('testimonials_'.$random_testimonial_2.'_name'); ?></span>
                <p>
                <?php
                    switch ($lang){
                        case '':
                        case '1':
                            echo get_option('testimonials_'.$random_testimonial_2.'_review'); 
                            break;
                        case '2':
                            if(get_option('testimonials_'.$random_testimonial_2.'_review_lang_2') != ''){
                                echo get_option('testimonials_'.$random_testimonial_2.'_review_lang_2');
                            } else {
                                echo get_option('testimonials_'.$random_testimonial_2.'_review');
                            }
                            break;
                    }
                ?>
                </p>
            </div>

            <?php
                } // end: testimonial count more than 1
            } // end: empty check
            ?>

        </div>
        
        <!-- Home gallery -->
        <div class='gallery content-gallery'>
            <?php
            // Load images from Slider Directory
            $homepage_gallery = array(get_option('basic_gallery_1'), get_option('basic_gallery_2'), get_option('basic_gallery_3'), get_option('basic_gallery_4'), get_option('basic_gallery_5'), get_option('basic_gallery_6')); 

            $i = 1;
            
            foreach($homepage_gallery as $image) {
                if ($image != null) {
                    
                    $size = getimagesize($image); 
                    $width = $size[0]; 
                    $height = $size[1]; 
                    $aspect = $height / $width; 
                    if ($aspect >= 1) {
                        echo "<a href='".$image."'><img src='".$image."' alt='gallery' class='width-full' /></a>";
                    } else {
                        echo "<a href='".$image."'><img src='".$image."' alt='gallery' class='height-full' /></a>";
                    }
                }
                $i++;
            }
            ?> 
        </div>
        <div class='cleaner'></div>
    </div> <!-- End: middle -->

<!-- Footer -->
<?php get_footer(); ?>