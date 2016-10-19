<?php
// This page loading colors from admin panel.

// Bright or dark color
function adjustBrightness($hex, $steps) {
    // Steps should be between -255 and 255. Negative = darker, positive = lighter
    $steps = max(-255, min(255, $steps));

    // Format the hex color string
    $hex = str_replace('#', '', $hex);
    if (strlen($hex) == 3) {
        $hex = str_repeat(substr($hex,0,1), 2).str_repeat(substr($hex,1,1), 2).str_repeat(substr($hex,2,1), 2);
    }

    // Get decimal values
    $r = hexdec(substr($hex,0,2));
    $g = hexdec(substr($hex,2,2));
    $b = hexdec(substr($hex,4,2));

    // Adjust number of steps and keep it inside 0 to 255
    $r = max(0,min(255,$r + $steps));
    $g = max(0,min(255,$g + $steps));  
    $b = max(0,min(255,$b + $steps));

    $r_hex = str_pad(dechex($r), 2, '0', STR_PAD_LEFT);
    $g_hex = str_pad(dechex($g), 2, '0', STR_PAD_LEFT);
    $b_hex = str_pad(dechex($b), 2, '0', STR_PAD_LEFT);

    return '#'.$r_hex.$g_hex.$b_hex;
}

if(get_option('basic_color') == ''){
    $color = '#888888';
} else {
    $color = get_option('basic_color');
}
$custom_color_back = adjustBrightness($color,-15);
$custom_color_btn_back_hover = adjustBrightness($color,-30);

// Empty check
if(get_option('basic_background_color') == ''){
    $background_color = '#ccc';
} else {
    $background_color = get_option('basic_background_color');
}

// Empty check
if(get_option('basic_background_image') == ''){
    $background_img = '';
} else {
    $background_img = 'background: url(' . get_option('basic_background_image') . ') no-repeat center center fixed;';
}

?>

<style type="text/css">
	body {
		background-color: <?php echo $background_color; ?>;
		<?php echo $background_img; ?>
		-webkit-background-size: cover;
	    -moz-background-size: cover;
	    -o-background-size: cover;
	    background-size: cover;
	}
    
    .custom-color, .widget-title { color: <?php echo get_option('basic_color'); ?>; }

    .custom-color-back { background-color: <?php echo $custom_color_back; ?> !important; }
    .custom-color-btn-back, .comments #submit, #searchsubmit { background-color: <?php echo $color; ?> !important; 
              -webkit-transition: background-color 0.3s ease-out;
              -moz-transition: background-color 0.3s ease-out;
              -o-transition: background-color 0.3s ease-out;
              transition: background-color 0.3s ease-out; 
        }
      .custom-color-btn-back:hover, .comments #submit:hover, #searchsubmit:hover { background-color: <?php echo $custom_color_btn_back_hover; ?> !important; }

    .detail a {
      color: <?php echo $color; ?> !important;
    }
    a:hover {
      color: <?php echo $color; ?> !important;
    }

</style>