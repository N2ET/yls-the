<?php

// Load scripts
function posts_scripts(){
  wp_enqueue_style('posts-scripts', get_template_directory_uri() . '/admin/assets/css/posts.css');
}
add_action('admin_init', 'posts_scripts');

// Support
add_theme_support('post-thumbnails');

// Register HOTHEME custom post types
add_action('init', 'accommodation_register');
 
function accommodation_register() {
 
    $labels = array(
        'name' => 'Rooms & Rates',
        'singular_name' => 'Room',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Room',
        'edit_item' => 'Edit Room',
        'new_item' => 'New Room',
        'view_item' => 'View Room',
        'search_items' => 'Search Rooms',
        'not_found' =>  'Nothing found',
        'not_found_in_trash' => 'Nothing found in Trash',
        'parent_item_colon' => ''
    );
 
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'menu_icon' => 'dashicons-exerpt-view',
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title','editor','thumbnail','author','comments')
      ); 
 
    register_post_type( 'accommodation' , $args );
    flush_rewrite_rules();
}

register_taxonomy("Amenities", array("accommodation"), array("hierarchical" => true, "label" => "Amenities", "singular_label" => "Amenity", "rewrite" => true));

add_action("admin_init", "admin_init");
 
function admin_init(){
  add_meta_box("price-meta", "Price", "price", "accommodation", "side", "low");
  add_meta_box("accommodation-beds", "Beds", "accommodation_beds", "accommodation", "side", "low");
  add_meta_box("price-description", "Price description", "price_description", "accommodation", "normal", "low");
  if(get_option('lang_switch') == 'on'){
    add_meta_box("accommodation-translate", "Translate", "accommodation_translate", "accommodation", "normal", "low");
  }
}
 
function price(){
  global $post;
  $custom = get_post_custom($post->ID);
  $price = $custom["price"][0];
  $price_lang_2 = $custom["price_lang_2"][0];
  $price_title = $custom["price_title"][0];
  $price_title_lang_2 = $custom["price_title_lang_2"][0];
  ?>
  <div class='lang_wrapper'><input name="price" value="<?php echo $price; ?>" class='custom-posts-inputs' placeholder='Price including currency' /><span><?php echo get_option('lang_default_name'); ?></span></div>
    <!-- Language support -->
    <?php if(get_option('lang_switch') == 'on'){ ?>
    <div class='lang_wrapper'><input name="price_lang_2" value="<?php echo $price_lang_2; ?>" class='custom-posts-inputs' placeholder='Price including currency' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
    <?php } ?>
  <div class='lang_wrapper'><input name="price_title" value="<?php echo $price_title; ?>" class='custom-posts-inputs' placeholder='eg. per night' /><span><?php echo get_option('lang_default_name'); ?></span></div>
    <!-- Language support -->
    <?php if(get_option('lang_switch') == 'on'){ ?>
    <div class='lang_wrapper'><input name="price_title_lang_2" value="<?php echo $price_title_lang_2; ?>" class='custom-posts-inputs' placeholder='eg. per night' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
    <?php } ?>

<?php
}


function accommodation_beds(){
  global $post;
  $custom = get_post_custom($post->ID);
  $accommodation_beds = $custom["accommodation_beds"][0];
  ?>
  <input name="accommodation_beds" value="<?php echo $accommodation_beds; ?>" placeholder='Room capacity' class='custom-posts-inputs' />
  <?php
}
 
function price_description() {
  global $post;
  $custom = get_post_custom($post->ID);
  $price_description = $custom["price_description"][0];
  $price_description_lang_2 = $custom["price_description_lang_2"][0];
  ?>
  <div class='lang_wrapper'><textarea cols="50" rows="5" name="price_description" class='custom-posts-inputs' placeholder='Price conditions' ><?php echo $price_description; ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
    <!-- Language support -->
    <?php if(get_option('lang_switch') == 'on'){ ?>
    <div class='lang_wrapper'><textarea cols="50" rows="5" name="price_description_lang_2" class='custom-posts-inputs' placeholder='Price conditions' ><?php echo $price_description_lang_2; ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>

  <?php
    }
}

// Language support
if(get_option('lang_switch') == 'on'){
function accommodation_translate() {
  global $post;
  $custom = get_post_custom($post->ID);
  $title_lang_2 = $custom["title_lang_2"][0];
  $content_lang_2 = $custom["content_lang_2"][0];
  ?>

  <div class='lang_wrapper'><input name="title_lang_2" value="<?php echo $title_lang_2; ?>" placeholder='Room title' class='custom-posts-inputs' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
  <div class='lang_wrapper'><textarea cols="50" rows="20" name="content_lang_2" placeholder='Room content without gallery' class='custom-posts-inputs' ><?php echo $content_lang_2; ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>

  <?php
  }
}

add_action('save_post', 'save_details');

function save_details(){
  global $post;
 
  if(isset($_POST["price"])) { update_post_meta($post->ID, "price", $_POST["price"]); }
  if(isset($_POST["price_lang_2"])) { update_post_meta($post->ID, "price_lang_2", $_POST["price_lang_2"]); }

  if(isset($_POST["price_title"])) { update_post_meta($post->ID, "price_title", $_POST["price_title"]); }
  if(isset($_POST["price_title_lang_2"])) { update_post_meta($post->ID, "price_title_lang_2", $_POST["price_title_lang_2"]); }

  if(isset($_POST["accommodation_beds"])) { update_post_meta($post->ID, "accommodation_beds", $_POST["accommodation_beds"]); }

  if(isset($_POST["price_description"])) { update_post_meta($post->ID, "price_description", $_POST["price_description"]); }
  if(isset($_POST["price_description_lang_2"])) { update_post_meta($post->ID, "price_description_lang_2", $_POST["price_description_lang_2"]); }

  if(isset($_POST["title_lang_2"])) { update_post_meta($post->ID, "title_lang_2", $_POST["title_lang_2"]); }
  if(isset($_POST["content_lang_2"])) { update_post_meta($post->ID, "content_lang_2", $_POST["content_lang_2"]); }
}

add_action("manage_posts_custom_column",  "accommodation_custom_columns");
add_filter("manage_edit-accommodation_columns", "accommodation_edit_columns");
 
function accommodation_edit_columns($columns){
  $columns = array(
    "cb" => "<input type='checkbox' />",
    "title" => "Room Title",
    "description" => "Description",
    "price" => "Price",
    "accommodation_beds" => "Beds",
    "amenities" => "Amenities"
  );
 
  return $columns;
}
function accommodation_custom_columns($column){
  global $post;
 
  switch ($column) {
    case "description":
      the_excerpt();
      break;
    case "price":
      $custom = get_post_custom();
      echo $custom["price"][0];
      break;
    case "accommodation_beds":
      $custom = get_post_custom();
      echo $custom["accommodation_beds"][0];
      break;
    case "amenities":
      echo get_the_term_list($post->ID, 'Amenities', '', ', ','');
      break;
  }
}

// Things to do
add_action('init', 'poi_register');
 
function poi_register() {
 
    $labels = array(
        'name' => 'Things to do', 'post type general name',
        'singular_name' => 'Thing to do', 'post type singular name',
        'add_new' => 'Add New', 'poi item',
        'add_new_item' => 'Add New Thing to Do',
        'edit_item' => 'Edit Thing to Do',
        'new_item' => 'New Thing to Do',
        'view_item' => 'View Thing to Do',
        'search_items' => 'Search Things to Do',
        'not_found' =>  'Nothing found',
        'not_found_in_trash' => 'Nothing found in Trash',
        'parent_item_colon' => ''
    );
 
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'menu_icon' => 'dashicons-location',
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title','editor','thumbnail','author','comments')
      ); 
 
    register_post_type( 'poi' , $args );
    flush_rewrite_rules();
}

add_action("admin_init", "poi_admin_init");
 
function poi_admin_init(){
  add_meta_box("poi_directions", "Directions", "poi_directions", "poi", "normal", "low");
  // Language support
  if(get_option('lang_switch') == 'on'){
    add_meta_box("poi_translate", "Translate", "poi_translate", "poi", "normal", "low");
  }
}
 
function poi_directions() {
  global $post;
  $custom = get_post_custom($post->ID);
  $poi_address_street = $custom["poi_address_street"][0];
  $poi_address_postcode = $custom["poi_address_postcode"][0];
  $poi_address_city = $custom["poi_address_city"][0];
  $poi_address_country = $custom["poi_address_country"][0];

  $poi_gps_latitude = $custom["poi_gps_latitude"][0];
  $poi_gps_longtitude = $custom["poi_gps_longtitude"][0];
  
  $poi_contact = $custom["poi_contact"][0];
  ?>
  <input name="poi_address_street" value="<?php echo $poi_address_street; ?>" placeholder='Street' class='custom-posts-inputs' /><br />
  <input name="poi_address_postcode" value="<?php echo $poi_address_postcode; ?>" placeholder='Postcode' class='custom-posts-inputs' /><br />
  <input name="poi_address_city" value="<?php echo $poi_address_city; ?>" placeholder='City' class='custom-posts-inputs' /><br />
  <input name="poi_address_country" value="<?php echo $poi_address_country; ?>" placeholder='Country' class='custom-posts-inputs' /><br /><br />

  <input name="poi_gps_latitude" value="<?php echo $poi_gps_latitude; ?>" placeholder='GPS latitude' class='custom-posts-inputs' /><br />
  <input name="poi_gps_longtitude" value="<?php echo $poi_gps_longtitude; ?>" placeholder='GPS longtitude' class='custom-posts-inputs' /><br /><br />

  <textarea cols="50" rows="5" name="poi_contact" class='custom-posts-inputs' placeholder='Contact'><?php echo $poi_contact; ?></textarea>

  <?php
}

// Language support
if(get_option('lang_switch') == 'on'){
function poi_translate() {
  global $post;
  $custom = get_post_custom($post->ID);
  $poi_title_lang_2 = $custom["poi_title_lang_2"][0];
  $poi_content_lang_2 = $custom["poi_content_lang_2"][0];
  ?>
  <div class='lang_wrapper'><input name="poi_title_lang_2" value="<?php echo $poi_title_lang_2; ?>" placeholder='Title' class='custom-posts-inputs' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
  <div class='lang_wrapper'><textarea cols="50" rows="20" name="poi_content_lang_2" placeholder='Content without gallery' class='custom-posts-inputs' ><?php echo $poi_content_lang_2; ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>

  <?php
  }
}

add_action('save_post', 'poi_save_details');

function poi_save_details(){
  global $post;
 
  if(isset($_POST["poi_address_street"])) { update_post_meta($post->ID, "poi_address_street", $_POST["poi_address_street"]); }
  if(isset($_POST["poi_address_postcode"])) { update_post_meta($post->ID, "poi_address_postcode", $_POST["poi_address_postcode"]); }
  if(isset($_POST["poi_address_city"])) { update_post_meta($post->ID, "poi_address_city", $_POST["poi_address_city"]); }
  if(isset($_POST["poi_address_country"])) { update_post_meta($post->ID, "poi_address_country", $_POST["poi_address_country"]); }

  if(isset($_POST["poi_gps_latitude"])) { update_post_meta($post->ID, "poi_gps_latitude", $_POST["poi_gps_latitude"]); }
  if(isset($_POST["poi_gps_longtitude"])) { update_post_meta($post->ID, "poi_gps_longtitude", $_POST["poi_gps_longtitude"]); }

  if(isset($_POST["poi_contact"])) { update_post_meta($post->ID, "poi_contact", $_POST["poi_contact"]); }

  if(isset($_POST["poi_title_lang_2"])) { update_post_meta($post->ID, "poi_title_lang_2", $_POST["poi_title_lang_2"]); }
  if(isset($_POST["poi_content_lang_2"])) { update_post_meta($post->ID, "poi_content_lang_2", $_POST["poi_content_lang_2"]); }
}

add_action("manage_posts_custom_column",  "poi_custom_columns");
add_filter("manage_edit-poi_columns", "poi_edit_columns");
 
function poi_edit_columns($columns){
  $columns = array(
    "cb" => "<input type='checkbox' />",
    "title" => "Thing to Do",
    "description" => "Description",
    "poi_address" => "Address",
    "poi_gps" => "GPS",
    "poi_contact" => "Contact"
  );
 
  return $columns;
}
function poi_custom_columns($column){
  global $post;
 
  switch ($column) {
    case "description":
      break;
    case "poi_address":
      $custom = get_post_custom();
      echo $custom["poi_address_street"][0].", ".$custom["poi_address_postcode"][0].", ".$custom["poi_address_city"][0].", ".$custom["poi_address_country"][0];
      break;
    case "poi_gps":
      $custom = get_post_custom();
      echo $custom["poi_gps_latitude"][0].", ".$custom["poi_gps_longtitude"][0];
      break;
    case "poi_contact":
      $custom = get_post_custom();
      echo $custom["poi_contact"][0];
      break;
  }
}
