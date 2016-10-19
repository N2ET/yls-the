<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>

  <!-- Head -->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
    <?php wp_head(); ?>
    
    <?php if(get_option('theme_favicon') != '') { ?><link href="<?php echo get_option('theme_favicon'); ?>" rel="icon" type="image/ico" /><?php } ?>
    
    <!-- Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:700,400,300' rel='stylesheet' type='text/css' />

    <!-- Javascript -->
        <!-- Maps -->
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

    <!-- CSS -->
    <?php
        require('assets/css/custom_css.php');
    ?>

    <title><?php wp_title('|', true, 'right')." ". bloginfo('name'); ?></title>
  </head>

  <!-- Body -->
  <body <?php body_class('home'); ?>>
    <!-- Message showed when user post a reservation request -->
    <?php 
    if (isset($_GET['message'])) {
        echo "
        <div class='message custom-color-back'>
          <div class='wrapper'>
            <img src='".get_template_directory_uri()."/assets/ico/success.png' alt='success' />
            <p>". $_GET['message'] ."</p>
          </div>
        </div>
        <div class='message-mobile custom-color-back'>
          <div class='wrapper'>
            <img src='".get_template_directory_uri()."/assets/ico/success.png' alt='success' />
            <p>". $_GET['message'] ."</p>
          </div>
        </div>";

    }

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

    <!-- Language switcher -->
    <?php if(get_option('lang_switch') == 'on'){ ?>
    <select class='language-switch custom-color-btn-back'>
        <option value='<?php echo home_url(); ?>?lang=1' <?php if($lang == 1) { echo 'selected'; }?> ><?php echo get_option('lang_default_name'); ?></option>
        <option value='<?php echo home_url(); ?>?lang=2' <?php if($lang == 2) { echo 'selected'; }?> ><?php echo get_option('lang_secondary_name'); ?></option>
    </select>
    <?php } ?>

    <!-- Wrapper -->
    <div class='wrapper'>
        <!-- Header -->
        <div class='header'>
            <!-- Logo -->
            <?php 
            // Empty check
            if(get_option('theme_logo') != '') {
            ?>
                <a href='<?php echo home_url(); ?><?php echo $lang_link.$lang; ?>' class='logo'><img src='<?php echo get_option('theme_logo'); ?>' alt='logo' /></a>
            <?php
            } // end: empty check
            ?>
            <!-- Mobile menu trigger -->
            <a href='#menu-wrapper' class='menu-trigger'>Menu</a>
            <!-- Menu -->
            <div class='menu-wrapper' id='menu-wrapper'>
                <ul class='menu'>
                    <?php
                    // Loading Menu

                    global $wpdb;

                    $tablename = $wpdb->prefix.'terms'; // use always table prefix

                    // language support
                    switch ($lang){
                        case '':
                        case '1':
                            $menu_name = 'default';
                            break;
                        case '2':
                            $menu_name = 'secondary';
                            break;
                    }
                    $menu_id = $wpdb->get_results(
                        "
                        SELECT term_id
                        FROM ".$tablename." 
                        WHERE name= '".$menu_name."'
                        "
                    );

                    // Empty check
                    if($menu_id != null){

                        // results in array 
                        foreach($menu_id as $menu):
                            $menu_id =  $menu->term_id;
                        endforeach; 

                        $items = wp_get_nav_menu_items( $menu_id );
                        $numItems = count($items);
                        $i = 0;

                        foreach($items as $item)
                        {
                            if(++$i === $numItems) {
                                echo "<li class='reservation-btn custom-color-btn-back'><a href='".$item->url.$lang_link.$lang."'>".$item->title."<br /><span class='grey'>".$item->description."</span></a></li>";
                                $_SESSION['reservation_url'] = $item->url;
                            } else {
                            echo "<li><a href='".$item->url.$lang_link.$lang."'>".$item->title."<br /><span class='grey'>".$item->description."</span></a></li>";
                            }
                        }
                    } // end: empty check 
                    
                    ?>
                </ul>
            </div> <!-- End: Menu -->
            <div class='cleaner'></div>
        </div> <!-- End: Header -->