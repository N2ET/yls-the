<?php
/**
 * Hotheme custom functions
 *
 * @author Hipstacowboys <mark@hipstacowboys.com>
 * @package WordPress
 */

// Setup Theme
if (!function_exists('theme_setup')):
    function theme_setup() {

        add_theme_support('automatic-feed-links');
        add_theme_support('post-thumbnails');
        add_theme_support('post-formats', array( 'aside', 'image', 'gallery', 'link', 'quote', 'status', 'video', 'audio', 'chat' ));

        register_nav_menus(
            array(
                'main-menu' => __('Main Menu', 'bootstrapwp'),
            ));
        // load custom walker menu class file
        require 'includes/class-bootstrapwp_walker_nav_menu.php';
    }
endif;
add_action('after_setup_theme', 'theme_setup');

// Setup widgets
function widgets_init() {

    register_sidebar(
        array(
            'name'          => __('Main Sidebar', 'hotheme'),
            'id'            => 'sidebar-page',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => "</div>",
            'before_title'  => '<h4 class="widget-title">',
            'after_title'   => '</h4>',
        )
    );

}
add_action('init', 'widgets_init');

// Default content-width
if ( ! isset( $content_width ) ) { 
    $content_width = 980; 
}

// Old comment reply script
if ( is_singular() ) {
    wp_enqueue_script( "comment-reply" );
}

// Add body class
add_action( 'body_class', 'ilwp_add_my_bodyclass');
function ilwp_add_my_bodyclass( $classes ) {
  $classes[] = 'my-custom-class';
  return $classes;
}

// Comments
function hotheme_comment($comment, $args, $depth)
{
    // Language support
    $placeholder_moderation = 'Your comment is awaiting moderation.';
    $placeholder_reply = 'Reply';

    switch ($_SESSION['lang']){
        case '1':
            if(get_option('lang_core_comments_reply') != ''){
                $placeholder_moderation = get_option('lang_core_comments_reply');    
            } 
            if(get_option('lang_core_comments_moderation') != ''){
                $placeholder_moderation = get_option('lang_core_comments_moderation');    
            } 
            break;
        case '2':
            if(get_option('lang_core_comments_reply_lang_2') != ''){
                $placeholder_reply = get_option('lang_core_comments_reply_lang_2');    
            } 
            if(get_option('lang_core_comments_moderation_lang_2') != ''){
                $placeholder_reply = get_option('lang_core_comments_moderation_lang_2');    
            } 
            break;
    }

    $GLOBALS['comment'] = $comment;
    switch ($comment->comment_type) :
        case 'pingback' :
        case 'trackback' : ?>

            <li class="comment media" id="comment-<?php comment_ID(); ?>">
                <div class="media-body">
                    <p>
                        <?php _e('Pingback:', 'bootstrapwp'); ?> <?php comment_author_link(); ?>
                    </p>
                </div><!--/.media-body -->
            <?php
            break;
        default :
            // Proceed with normal comments.
            global $post; ?>

            <li class="comment media" id="li-comment-<?php comment_ID(); ?>">
                    <div class='comment-header'>
                        <a href="<?php echo $comment->comment_author_url;?>" class="pull-left">
                            <?php echo get_avatar($comment, 64); ?>
                        </a>
                        <div class='meta'>
                            <h4 class="media-heading comment-author vcard custom-color">
                            <?php
                                printf('%1$s %2$s',
                                    get_comment_author_link(),
                                    // If current post author is also comment author, make it known visually.
                                    ($comment->user_id === $post->post_author) ? '<span class="label"> ' . __(
                                        'Post author',
                                        'bootstrapwp'
                                    ) . '</span> ' : ''); ?>
                            </h4>
                            <?php printf('<p><time datetime="%2$s">%3$s</time></p>',
                                        esc_url(get_comment_link($comment->comment_ID)),
                                        get_comment_time('c'),
                                        sprintf(
                                            __('%1$s', 'bootstrapwp'),
                                            get_comment_date()
                                        )
                                    ); ?>
                        </div>
                    </div>

                    <div class="media-body">
                        

                        <?php if ('0' == $comment->comment_approved) : ?>
                            <p class="comment-awaiting-moderation"><?php echo $placeholder_moderation; ?></p>
                        <?php endif; ?>

                        <?php comment_text(); ?>
                        <p class="reply">
                            <?php comment_reply_link( array_merge($args, array(
                                        'reply_text' => $placeholder_reply. ' <span>&darr;</span>',
                                        'depth'      => $depth,
                                        'max_depth'  => $args['max_depth']
                                    )
                                )); ?>
                        </p>
                    </div>
                    <!--/.media-body -->
            <?php
            break;
    endswitch;
}

// Change comments form
function comment_reform ($args) {
    // Language support
    // If language switch is OFF
    if(!isset($_GET['lang'])){
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

    $placeholder_title = 'Leave a Reply';
    $placeholder_subtitle = 'Your email address will not be published.';
    $placeholder_name = 'Name';
    $placeholder_email = 'Email';
    $placeholder_message = 'Comment';
    $placeholder_button = 'Post Comment';
    $placeholder_after = '';

    switch ($lang){
        case '':
        case '1':
            if(get_option('lang_core_comments_title') != ''){
                $placeholder_title = get_option('lang_core_comments_title');    
            } 
            if(get_option('lang_core_comments_subtitle') != ''){
                $placeholder_subtitle = get_option('lang_core_comments_subtitle');    
            } 
            if(get_option('lang_core_comments_reply') != ''){
                $placeholder_reply = get_option('lang_core_comments_reply');    
            } 
            if(get_option('lang_core_comments_name') != ''){
                $placeholder_name = get_option('lang_core_comments_name');    
            }
            if(get_option('lang_core_comments_email') != ''){
                $placeholder_email = get_option('lang_core_comments_email');    
            }
            if(get_option('lang_core_comments_message') != ''){
                $placeholder_mesage = get_option('lang_core_comments_message');    
            }
            if(get_option('lang_core_comments_button') != ''){
                $placeholder_button = get_option('lang_core_comments_button');    
            } 
            break;
        case '2':
            if(get_option('lang_core_comments_title_lang_2') != ''){
                $placeholder_title = get_option('lang_core_comments_title_lang_2');    
            } 
            if(get_option('lang_core_comments_subtitle_lang_2') != ''){
                $placeholder_subtitle = get_option('lang_core_comments_subtitle_lang_2');    
            } 
            if(get_option('lang_core_comments_reply_lang_2') != ''){
                $placeholder_reply = get_option('lang_core_comments_reply_lang_2');    
            } 
            if(get_option('lang_core_comments_name_lang_2') != ''){
                $placeholder_name = get_option('lang_core_comments_name_lang_2');    
            }
            if(get_option('lang_core_comments_email_lang_2') != ''){
                $placeholder_email = get_option('lang_core_comments_email_lang_2');    
            }
            if(get_option('lang_core_comments_message_lang_2') != ''){
                $placeholder_message = get_option('lang_core_comments_message_lang_2');    
            }
            if(get_option('lang_core_comments_button_lang_2') != ''){
                $placeholder_button = get_option('lang_core_comments_button_lang_2');    
            } 
            break;
    }

    $user = wp_get_current_user();
    $req = 1;

    $args = array(
      'id_form'           => 'commentform',
      'id_submit'         => 'submit',
      'title_reply'       => $placeholder_title,
      'title_reply_to'    => 'Leave a Reply to %s',
      'cancel_reply_link' => 'Cancel Reply',
      'label_submit'      => $placeholder_button,

      'comment_field' =>  '<p class="comment-form-comment"><label for="comment">' . $placeholder_message .
        '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true">' .
        '</textarea></p>',

      'must_log_in' => '<p class="must-log-in">' .
        sprintf(
          __( 'You must be <a href="%s">logged in</a> to post a comment.' ),
          wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
        ) . '</p>',

      'logged_in_as' => '<p class="logged-in-as">' .
        sprintf(
        __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ),
          admin_url( 'profile.php' ),
          $user->display_name,
          wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
        ) . '</p>',

      'comment_notes_before' => '<p class="comment-notes">' .
        $placeholder_subtitle .
        '</p>',

      'comment_notes_after' => '<p class="comment-notes">' .
        $placeholder_after .
        '</p>',

      'fields' => apply_filters( 'comment_form_default_fields', array(

        'author' =>
          '<p class="comment-form-author">' .
          '<label for="author">' . $placeholder_name . '</label> ' .
          ( $req ? '<span class="required">*</span>' : '' ) .
          '<input id="author" name="author" type="text" value="' . $user->display_name .
          '" size="30" /></p>',

        'email' =>
          '<p class="comment-form-email"><label for="email">' . $placeholder_email . '</label> ' .
          ( $req ? '<span class="required">*</span>' : '' ) .
          '<input id="email" name="email" type="text" value="' . $user->display_email .
          '" size="30" /></p>',
        )
      ),
    );
        return $args ;
}
add_filter('comment_form_defaults','comment_reform');

// Removing URL field in comments
function remove_comment_url_field( $field ) {
    return '';
}
add_filter( 'comment_form_field_url', 'remove_comment_url_field' );

// Load CSS styles for theme.
function load_custom_styles() {

    wp_enqueue_style('general', get_template_directory_uri() . '/assets/css/general.css', false, '1.0', 'all');
    wp_enqueue_style('category', get_template_directory_uri() . '/assets/css/category.css', false, '1.0', 'all');
    wp_enqueue_style('detail', get_template_directory_uri() . '/assets/css/detail.css', false, '1.0', 'all');
    wp_enqueue_style('contact', get_template_directory_uri() . '/assets/css/contact.css', false, '1.0', 'all');
    wp_enqueue_style('magnific', get_template_directory_uri() . '/assets/css/magnific.css', false, '1.0', 'all');
    wp_enqueue_style('reservation', get_template_directory_uri() . '/assets/css/reservation.css', false, '1.0', 'all');
    wp_enqueue_style('archive', get_template_directory_uri() . '/assets/css/archive.css', false, '1.0', 'all');
    wp_enqueue_style('comments', get_template_directory_uri() . '/assets/css/comments.css', false, '1.0', 'all');
    wp_enqueue_style('video', get_template_directory_uri() . '/assets/css/video.css', false, '1.0', 'all');
    wp_enqueue_style('default', get_stylesheet_uri());

}
add_action('wp_enqueue_scripts', 'load_custom_styles');

// Load JavaScript and jQuery files for theme.
function load_custom_scripts() {

    wp_enqueue_script('jquery-ui', get_template_directory_uri() . '/assets/js/jquery-ui.js', array('jquery'), '1.0', true);
    wp_enqueue_script('jquery-form', get_template_directory_uri() . '/assets/js/jquery-form.js', array('jquery'), '1.0', true);
    wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/script.js', array('jquery'), '1.0', true);
    wp_enqueue_script('magnific', get_template_directory_uri() . '/assets/js/magnific.js', array('jquery'), '1.0', true);
    wp_enqueue_script('video', get_template_directory_uri() . '/assets/js/video.js', array('jquery'), '1.0', true);

}
add_action('wp_enqueue_scripts', 'load_custom_scripts');

// Add editor style to admin
function add_editor_styles() {
    add_editor_style( 'assets/css/custom_editor_style.css' );
}
add_action('init', 'add_editor_styles');


// Content and excerpt limit
function excerpt($content, $limit) {
  $excerpt = explode(' ', $content, $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  } 
  $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
  return $excerpt;
}
 
function content($limit) {
  $content = explode(' ', get_the_content(), $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  } 
  $content = preg_replace('/\[.+\]/','', $content);
  $content = apply_filters('the_content', $content); 
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}

// Return first gallery shortcode
function get_shortcode_gallery ( $post = 0 ) {
    if ( $post = get_post($post) ) {
        $post_gallery = get_post_gallery($post, false);
        if ( ! empty($post_gallery) ) {
            $shortcode = "[gallery";
            foreach ( $post_gallery as $att => $val ) {
                if ( $att !== 'src') {
                    if ( $att === 'size') $val = "full";        // Set custom attribute value
                    $shortcode .= " ". $att .'="'. $val .'"';   // Add attribute name and value ( attribute="value")
                }
            }
            $shortcode .= "]";
            return $shortcode;
        }
    }
}

// Deletes first gallery shortcode and returns content
function  strip_shortcode_gallery( $content ) {
    preg_match_all( '/'. get_shortcode_regex() .'/s', $content, $matches, PREG_SET_ORDER );
    if ( ! empty( $matches ) ) {
        foreach ( $matches as $shortcode ) {
            if ( 'gallery' === $shortcode[2] ) {
                $pos = strpos( $content, $shortcode[0] );
                if ($pos !== false)
                    return substr_replace( $content, '', $pos, strlen($shortcode[0]) );
            }
        }
    }
    return $content;
}

// Gallery output
add_filter('post_gallery', 'my_post_gallery', 10, 2);
function my_post_gallery($output, $attr) {
    global $post;

    if (isset($attr['orderby'])) {
        $attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
        if (!$attr['orderby'])
            unset($attr['orderby']);
    }

    extract(shortcode_atts(array(
        'order' => 'ASC',
        'orderby' => 'menu_order ID',
        'id' => $post->ID,
        'itemtag' => 'dl',
        'icontag' => 'dt',
        'captiontag' => 'dd',
        'columns' => 3,
        'size' => 'thumbnail',
        'include' => '',
        'exclude' => ''
    ), $attr));

    $id = intval($id);
    if ('RAND' == $order) $orderby = 'none';

    if (!empty($include)) {
        $include = preg_replace('/[^0-9,]+/', '', $include);
        $_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));

        $attachments = array();
        foreach ($_attachments as $key => $val) {
            $attachments[$val->ID] = $_attachments[$key];
        }
    }

    if (empty($attachments)) return '';

    // Here's your actual output, you may customize it to your need
    $output = "<div class=\"gallery content-gallery\">\n";

    // Now you loop through each attachment
    foreach ($attachments as $id => $attachment) {
        // Fetch the thumbnail (or full image, it's up to you)
        $img = wp_get_attachment_image_src($id, 'full');

        $output .= "<a href=\"{$img[0]}\"><img src=\"{$img[0]}\" alt=\"\" />\n</a>";
    }

    $output .= "</div>\n";

    return $output;
}

// Calculate distance
function calculateDistance($latitude1, $longitude1, $latitude2, $longitude2) {
    $theta = $longitude1 - $longitude2;
    $distance = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
    $distance = acos($distance);
    $distance = rad2deg($distance);
    $distance = $distance * 60 * 1.1515;
    // Kilometers
    $distance = $distance * 1.609344;
    
    return $distance; 
}

// Admin panel
require_once ('admin/posts.php');
require_once ('admin/admin.php');
require_once ('admin/widgets.php');
