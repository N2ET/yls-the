<?php
/**
 * Template Name: Page - Reservation
 * Description: Displays reservation form.
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
if(get_option('layouts_reservation') == ''){
    $layout = 'with-sidebar';
} else if(get_option('layouts_reservation') == 'with-sidebar'){
    $layout = 'with-sidebar';
} else if(get_option('layouts_reservation') == 'no-sidebar'){
    $layout = 'no-sidebar';
}

?>

    <!-- Content -->
    <div class='container <?php echo $layout; ?>'>
        <div class='content reservation custom-color-back'>
            <!-- Page title -->
            <h1>
                <?php while (have_posts()) : the_post(); ?>
                <?php the_title();?>

                <?php // reset the loop
                endwhile;
                wp_reset_query(); ?>
            </h1>
            
            <!-- Form -->
            <form action='<?php echo get_template_directory_uri(); ?>/assets/php/reservation-form.php' method='post' id='reservation-form'>
                <input type='hidden' name='reservation-url' value='<?php echo home_url(); ?>' />
                <input type='hidden' name='blog_name' value='<?php bloginfo('name'); ?>' />
                <input type='hidden' name='blog_email' value='<?php bloginfo('admin_email'); ?>' />
                <input type='hidden' name='reservation_email_switch' value='<?php get_option('reservation_email_switch'); ?>' />
                <?php
                    // Language support
                    switch ($lang){
                        case '':
                        case '1':
                            echo "<input type='hidden' name='reservation_message' value='". get_option('reservation_message') ."' />";
                            break;
                        case '2':
                            if(get_option('reservation_message_lang_2') != ''){
                                echo "<input type='hidden' name='reservation_message' value='". get_option('reservation_message_lang_2') ."' />";
                            } else {
                                echo "<input type='hidden' name='reservation_message' value='". get_option('reservation_message') ."' />";
                            }
                            break;
                    }

                    switch ($lang){
                        case '':
                        case '1':
                            echo "<input type='hidden' name='reservation_email_subject' value='". get_option('reservation_email_subject') ."' />";
                            break;
                        case '2':
                            if(get_option('reservation_email_subject_lang_2') != ''){
                                echo "<input type='hidden' name='reservation_email_subject' value='". get_option('reservation_email_subject_lang_2') ."' />";
                            } else {
                                echo "<input type='hidden' name='reservation_email_subject' value='". get_option('reservation_email_subject') ."' />";
                            }
                            break;
                    }

                    switch ($lang){
                        case '':
                        case '1':
                            echo "<input type='hidden' name='reservation_email' value='". get_option('reservation_email') ."' />";
                            break;
                        case '2':
                            if(get_option('reservation_email_lang_2') != ''){
                                echo "<input type='hidden' name='reservation_email' value='". get_option('reservation_email_lang_2') ."' />";
                            } else {
                                echo "<input type='hidden' name='reservation_email' value='". get_option('reservation_email') . "' />";
                            }
                            break;
                    }

                    $placeholder_check_in = 'Check in';
                    $placeholder_check_out = 'Check out';
                    $placeholder_people = 'Number of people (optional)';
                    $placeholder_name = 'Name';
                    $placeholder_email = 'Email';
                    $placeholder_phone = 'Phone (optional)';
                    $placeholder_message = 'Message (optional)';
                    $placeholder_button = 'Ask for reservation';
                    $placeholder_phone_text = 'Or call';

                    switch ($lang){
                        case '':
                        case '1':
                            if(get_option('lang_core_reservation_check_in') != ''){
                                $placeholder_check_in = get_option('lang_core_reservation_check_in');    
                            } 
                            if(get_option('lang_core_reservation_check_out') != ''){
                                $placeholder_check_out = get_option('lang_core_reservation_check_out');    
                            } 
                            if(get_option('lang_core_reservation_people') != ''){
                                $placeholder_people = get_option('lang_core_reservation_people');    
                            } 
                            if(get_option('lang_core_reservation_name') != ''){
                                $placeholder_name = get_option('lang_core_reservation_name');    
                            } 
                            if(get_option('lang_core_reservation_email') != ''){
                                $placeholder_email = get_option('lang_core_reservation_email');    
                            } 
                            if(get_option('lang_core_reservation_phone') != ''){
                                $placeholder_phone = get_option('lang_core_reservation_phone');    
                            } 
                            if(get_option('lang_core_reservation_message') != ''){
                                $placeholder_message = get_option('lang_core_reservation_message');    
                            }
                            if(get_option('lang_core_reservation_button') != ''){
                                $placeholder_button = get_option('lang_core_reservation_button');    
                            }
                            if(get_option('lang_core_reservation_phone_text') != ''){
                                $placeholder_phone_text = get_option('lang_core_reservation_phone_text');    
                            }
                            break;
                        case '2':
                            if(get_option('lang_core_reservation_check_in_lang_2') != ''){
                                $placeholder_check_in = get_option('lang_core_reservation_check_in_lang_2'); 
                            } 
                            if(get_option('lang_core_reservation_check_out_lang_2') != ''){
                                $placeholder_check_out = get_option('lang_core_reservation_check_out_lang_2');    
                            } 
                            if(get_option('lang_core_reservation_people_lang_2') != ''){
                                $placeholder_people = get_option('lang_core_reservation_people_lang_2');    
                            }
                            if(get_option('lang_core_reservation_name_lang_2') != ''){
                                $placeholder_name = get_option('lang_core_reservation_name_lang_2');    
                            }
                            if(get_option('lang_core_reservation_email_lang_2') != ''){
                                $placeholder_email = get_option('lang_core_reservation_email_lang_2');    
                            }
                            if(get_option('lang_core_reservation_phone_lang_2') != ''){
                                $placeholder_phone = get_option('lang_core_reservation_phone_lang_2');    
                            }
                            if(get_option('lang_core_reservation_message_lang_2') != ''){
                                $placeholder_message = get_option('lang_core_reservation_message_lang_2');    
                            }
                            if(get_option('lang_core_reservation_button_lang_2') != ''){
                                $placeholder_button = get_option('lang_core_reservation_button_lang_2');    
                            }
                            if(get_option('lang_core_reservation_phone_text_lang_2') != ''){
                                $placeholder_phone_text = get_option('lang_core_reservation_phone_text_lang_2');    
                            }
                            break;
                    }
                ?>

                <div class='input-wrapper'><select class='reservation-room' id='reservation-room' name='reservation-room'>
                    <?php
                    // Data from booking in item
                    if (isset($_GET['booking-room'])) {
                        echo "<option value='".$_GET['booking-room']."' selected>".$_GET['booking-room']."</option>";
                    }

                    $args = array( 'post_type' => 'accommodation', 'posts_per_page' => 10 );
                    $loop = new WP_Query( $args );
                    while ( $loop->have_posts() ) : $loop->the_post();
                    ?>

                        <option value='<?php the_title(); ?>'><?php the_title(); ?></option>

                    <?php
                    endwhile;
                    wp_reset_query();

                    ?>
                </select><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-room' /></div></div>
                <div class='input-wrapper'><input type='text' class='reservation-checkin datepicker' id='reservation-checkin' name='reservation-checkin' value='<?php if(isset($_GET['booking-checkin'])){ echo $_GET['booking-checkin']; } ?>' placeholder='<?php echo $placeholder_check_in; ?>' /><div class='datepicker-icon'></div><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-checkin' /></div></div>
                <div class='input-wrapper'><input type='text' class='reservation-checkout datepicker' id='reservation-checkout' name='reservation-checkout' value='<?php if(isset($_GET['booking-checkout'])){ echo $_GET['booking-checkout']; } ?>' placeholder='<?php echo $placeholder_check_out; ?>' /><div class='datepicker-icon'></div><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-checkout' /></div></div>
                <div class='input-wrapper'><input type='text' class='reservation-people' id='reservation-people' name='reservation-people' placeholder='<?php echo $placeholder_people; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-people' /></div></div>

                <div class='input-wrapper'><input type='text' class='reservation-name' id='reservation-name' name='reservation-name' placeholder='<?php echo $placeholder_name; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-name' /></div></div>
                <div class='input-wrapper'><input type='email' class='reservation-email' id='reservation-email' name='reservation-email' placeholder='<?php echo $placeholder_email; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-email' /></div></div>
                <div class='input-wrapper'><input type='text' class='reservation-phone' id='reservation-phone' name='reservation-phone' placeholder='<?php echo $placeholder_phone; ?>' /><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-phone' /></div></div>
                <div class='input-wrapper'><textarea class='reservation-message' id='reservation-message' name='reservation-message' placeholder='<?php echo $placeholder_message; ?>'></textarea><div class='status'><img src='<?php echo get_template_directory_uri(); ?>/assets/ico/status.png' alt='status' class='status-message' /></div></div>

                <input type='submit' class='custom-color-btn-back button' value='<?php echo $placeholder_button; ?>' />
                <?php
                    // If phone exists
                    if (get_option('basic_phone')) {
                        echo "<p>".$placeholder_phone_text." ".get_option('basic_phone')."</p>";
                    }
                ?>
                
            </form>
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