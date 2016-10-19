<?php
/**
 * Template Name: Page - Contact
 * Description: Displays contact form, map and directions.
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
if(get_option('layouts_contact') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_contact') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_contact') == 'no-sidebar'){
    $layout = 'no-sidebar';
}

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content contact'>
            <!-- Page title -->
            <h1>
                <?php while (have_posts()) : the_post(); ?>
                    <?php the_title();?>

                <?php // reset the loop
                endwhile;
                wp_reset_query(); ?>
            </h1>

            <?php
            // Language support
            $placeholder_name = 'Name';
            $placeholder_email = 'Email';
            $placeholder_message = 'Message';
            $placeholder_button = 'Send';
            $placeholder_message_top = 'Thanks for your message.';

            switch ($lang){
                case '':
                case '1':
                    if(get_option('lang_core_contact_name') != ''){
                        $placeholder_name = get_option('lang_core_contact_name');    
                    } 
                    if(get_option('lang_core_contact_email') != ''){
                        $placeholder_email = get_option('lang_core_contact_email');    
                    } 
                    if(get_option('lang_core_contact_message') != ''){
                        $placeholder_message = get_option('lang_core_contact_message');    
                    }
                    if(get_option('lang_core_contact_button') != ''){
                        $placeholder_button = get_option('lang_core_contact_button');    
                    }
                    if(get_option('lang_core_contact_message_top') != ''){
                        $placeholder_message_top = get_option('lang_core_contact_message_top');    
                    }
                    break;
                case '2':
                    if(get_option('lang_core_contact_name_lang_2') != ''){
                        $placeholder_name = get_option('lang_core_contact_name_lang_2');    
                    } 
                    if(get_option('lang_core_contact_email_lang_2') != ''){
                        $placeholder_email = get_option('lang_core_contact_email_lang_2');    
                    } 
                    if(get_option('lang_core_contact_message_lang_2') != ''){
                        $placeholder_message = get_option('lang_core_contact_message_lang_2');    
                    }
                    if(get_option('lang_core_contact_button_lang_2') != ''){
                        $placeholder_button = get_option('lang_core_contact_button_lang_2');    
                    }
                    if(get_option('lang_core_contact_message_top_lang_2') != ''){
                        $placeholder_message_top = get_option('lang_core_contact_message_top_lang_2');    
                    }
                    break;
            }
            ?>
            
            <!-- Form -->
            <form action='<?php echo get_template_directory_uri(); ?>/assets/php/contact-form.php' method='post' id='contact-form'>
                <input type='hidden' name='contact-url' value='<?php echo home_url(); ?>' />
                <input type='hidden' name='blog_email' value='<?php bloginfo('admin_email'); ?>' />
                <input type='hidden' name='contact_message' value='<?php echo $placeholder_message_top; ?>'/>

                <div class='input-wrapper'><input type='text' class='contact-name' id='contact-name' name='contact-name' placeholder='<?php echo $placeholder_name; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-name' /></div></div>
                <div class='input-wrapper'><input type='email' class='contact-email' id='contact-email' name='contact-email' placeholder='<?php echo $placeholder_email; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-email' /></div></div>
                <div class='input-wrapper'><textarea class='contact-message' id='contact-message' name='contact-message' placeholder='<?php echo $placeholder_message; ?>'></textarea><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-message' /></div></div>
                <div class='cleaner'></div>
                <input type='submit' class='custom-color-btn-back button' value='<?php echo $placeholder_button; ?>' />
            </form>

            <!-- Directions -->
            <div class='directions custom-color'>
                <div class='map' id='contact-map'></div>

                <?php
                // GPS hotel
                $hotel_gps_latitude = get_option('basic_address_latitude');
                $hotel_gps_longtitude = get_option('basic_address_longtitude');

                ?>

                <!-- Embed map -->
                <script>
                    function initialize() {
                      var myLatlng = new google.maps.LatLng(<?php echo $hotel_gps_latitude.",".$hotel_gps_longtitude; ?>);
                      var mapOptions = {
                        zoom: 14,
                        center: myLatlng,
                        scrollwheel: false
                      }
                      var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);

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
                        <strong><?php echo get_option('basic_address_street'); ?></strong><br />
                        <?php echo get_option('basic_address_postcode'); ?>, <?php echo get_option('basic_address_city'); ?><br />
                        <?php echo get_option('basic_address_country'); ?>
                    </p>
                    <p>
                        <strong>GPS</strong><br />
                        <?php echo get_option('basic_address_latitude'); ?><br />
                        <?php echo get_option('basic_address_longtitude'); ?>
                    </p>
                    <p>
                        <strong>Contact</strong><br />
                        <a href='mailto:<?php echo get_bloginfo('admin_email'); ?>' class='custom-color'><?php echo get_bloginfo('admin_email'); ?></a>
                    </p>
                </div>
            </div>

            <!-- Exact directions -->
            <div class='exact-directions'>
                <p>
                    <?php
                    echo get_option('basic_address_directions'); 

                    // Language support
                    switch ($lang){
                        case '':
                        case '1':
                            echo get_option('basic_address_directions');
                            break;
                        case '2':
                            if(get_option('basic_address_directions_lang_2') != ''){
                                echo get_option('basic_address_directions_lang_2');
                            } else {
                                echo get_option('basic_address_directions');
                            }
                            break;
                    }

                    ?>
                </p>  
            </div>
            <div class='cleaner'></div>
        </div> <!-- End: Content -->

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