<?php

add_action('admin_menu', 'call_menu'); // we need this action to create the menu
// this  makes the menu
function call_menu()
{
	$page_title = "Theme Settings";
	$menu_title = "Theme Settings";
	$capability = "administrator";
	$menu_slug = "settings";
	$function = "call_theme_menu";

	add_theme_page($page_title,$menu_title,$capability,$menu_slug, $function);

}
// this shows the menu html think of it as the view.
function call_theme_menu() 
{
	$current_user = wp_get_current_user();
    $user_id = $current_user->ID;
	if ( !user_can( $user_id, 'create_users' ) )
		return false;
?>

<?php

wp_enqueue_media();

?>

<div class="menu-wrap">

	<ul class='menu'>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/basic_settings.png' alt='ico' /><a id='menu-option-basic-settings'>Basic Settings</a></li>
		<li class='menu-homepage'><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/homepage.png' alt='ico' /><a>Homepage</a>
			<ul>
				<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/photo_slider.png' alt='ico' /><a id='menu-option-homepage-photo-slider'>Slider</a></li>
				<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/welcome.png' alt='ico' /><a id='menu-option-homepage-welcome'>Welcome</a></li>
				<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/facilities.png' alt='ico' /><a id='menu-option-homepage-facilities'>Facilities</a></li>
				<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/testimonials.png' alt='ico' /><a id='menu-option-homepage-testimonials'>Testimonials</a></li>
				<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/mini_gallery.png' alt='ico' /><a id='menu-option-homepage-gallery'>Mini Gallery</a></li>
			</ul>
		</li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/layouts.png' alt='ico' /><a id='menu-option-layouts'>Layouts</a></li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/reservation.png' alt='ico' /><a id='menu-option-reservation'>Reservation</a></li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/socials.png' alt='ico' /><a id='menu-option-socials'>Socials</a></li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/widgets.png' alt='ico' /><a id='menu-option-widgets'>Widgets</a></li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/languages.png' alt='ico' /><a id='menu-option-languages'>Languages</a></li>
		<li><img src='<?php echo get_template_directory_uri() ?>/admin/assets/ico/translation.png' alt='ico' /><a id='menu-option-translation'>Core translations</a></li>
	</ul>

</div>

<div class='body-wrap'>

	<!-- Basic Settings -->
	<div class='option-page-basic-settings option-page'>
		<div class='title_row'>
			<h1>Basic Settings</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Theme logo -->
					<td class='td_title'>Hotel logo</td>
					<td class='td_options'>
						<input type='text' id='theme_logo' name='theme_logo' value='<?php echo get_option("theme_logo"); ?>' />
						<input type='button' class='button' id='theme_logo_button' value='Upload image' />
					</td>
					<td class='td_description'>Theme logo shows in head.</td>
				</tr>
				<tr> <!-- Address -->
					<td class='td_title'>Address</td>
					<td class='td_options'>
						<input type='text' id='basic_address_street' name='basic_address_street' value='<?php echo get_option('basic_address_street'); ?>' placeholder='Street' />
						<input type='text' id='basic_address_postcode' name='basic_address_postcode' value='<?php echo get_option('basic_address_postcode'); ?>' placeholder='Postcode' />
						<input type='text' id='basic_address_city' name='basic_address_city' value='<?php echo get_option('basic_address_city'); ?>' placeholder='City' />
						<input type='text' id='basic_address_country' name='basic_address_country' value='<?php echo get_option('basic_address_country'); ?>' placeholder='Country' />
					</td>
					<td class='td_description'>
						Showed in footer.
					</td>
				</tr>
				<tr> <!-- Phone -->
					<td class='td_title'>Phone number</td>
					<td class='td_options'>
						<input type='text' id='basic_phone' name='basic_phone' value='<?php echo get_option('basic_phone'); ?>' placeholder='Phone number' />
					</td>
					<td class='td_description'>
						Any format
					</td>
				</tr>
				<tr> <!-- GPS -->
					<td class='td_title'>GPS</td>
					<td class='td_options'>
						<input type='text' id='basic_address_latitude' name='basic_address_latitude' value='<?php echo get_option('basic_address_latitude'); ?>' placeholder='Latitude' />
						<input type='text' id='basic_address_longtitude' name='basic_address_longtitude' value='<?php echo get_option('basic_address_longtitude'); ?>' placeholder='Longtitude' />
					</td>
					<td class='td_description'>
						Example:<br />
						41.014251<br />
						-73.970689<br /><br />
						How to get this number? Go to maps.google.com. Find your hotel and click right mouse button on location. Choose "What's here?" and GPS shows in left top corner below the search box.
					</td>
				</tr>
				<tr> <!-- Detailed directions -->
					<td class='td_title'>Detailed directions</td>
					<td class='td_options'>
						<div class='lang_wrapper'><textarea id='basic_address_directions' name='basic_address_directions' placeholder='Tell your customers how to get there'><?php if(get_option('basic_address_directions') != ''){ echo get_option('basic_address_directions'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
						<!-- Language support -->
						<?php if(get_option('lang_switch') == 'on'){ ?>
						<div class='lang_wrapper'><textarea id='basic_address_directions_lang_2' name='basic_address_directions_lang_2' placeholder='Tell your customers how to get there'><?php if(get_option('basic_address_directions_lang_2') != ''){ echo get_option('basic_address_directions_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
						<?php } ?>
					</td>
					<td class='td_description'>
						Tell your guests how to get there.
					</td>
				</tr>
				<tr> <!-- Color scheme -->
					<td class='td_title'>Color scheme</td>
					<td class='td_options'>
						<form>
							<input type='text' id='basic_color' name='basic_color' value='<?php echo get_option('basic_color'); ?>' style='background-color: <?php echo get_option('basic_color'); ?>;' />
						</form>

						<div id='basic_colorpicker'></div>
					</td>
					<td class='td_description'>
						Why Hotheme doesn't use colorpicker? Nobody use it and it's inaccurate.
					</td>
				</tr>
				<tr> <!-- Background image -->
					<input type='hidden' id='template_url' name='template_url' value='<?php echo get_template_directory_uri(); ?>' />
					<td class='td_title'>Background image</td>
					<td class='td_options'>
						<input type='text' id='basic_background_image' name='basic_background_image' value='<?php echo get_option('basic_background_image'); ?>' />
						<input type='button' class='button' id='basic_background_image_button' value='Upload image' />

						<div class='basic_background_images_list'>
							<a class='img-wrapper' id='basic_background_preset_1'>
								<img src='<?php echo get_template_directory_uri(); ?>/assets/img/background_preset_1.jpg' <?php if(get_option('basic_background_image') == get_template_directory_uri() . '/assets/img/background_preset_1.jpg' ){ echo "class='selected'"; } ?> alt='background' />
							</a>
							<a class='img-wrapper' id='basic_background_preset_2'>
								<img src='<?php echo get_template_directory_uri(); ?>/assets/img/background_preset_2.jpg' <?php if(get_option('basic_background_image') == get_template_directory_uri() . '/assets/img/background_preset_2.jpg' ){ echo "class='selected'"; } ?> alt='background' />
							</a>
							<a class='img-wrapper' id='basic_background_preset_3'>
								<img src='<?php echo get_template_directory_uri(); ?>/assets/img/background_preset_3.jpg' <?php if(get_option('basic_background_image') == get_template_directory_uri() . '/assets/img/background_preset_3.jpg' ){ echo "class='selected'"; } ?> alt='background' />
							</a>
							<a class='img-wrapper' id='basic_background_preset_4'>
								<img src='<?php echo get_template_directory_uri(); ?>/assets/img/background_preset_4.jpg' <?php if(get_option('basic_background_image') == get_template_directory_uri() . '/assets/img/background_preset_4.jpg' ){ echo "class='selected'"; } ?> alt='background' />
							</a>
						</div>			
					</td>
					<td class='td_description'>
						Upload your image or choose one of the presets.
					</td>
				</tr>
				<tr> <!-- Background color -->
					<input type='hidden' id='template_url' name='template_url' value='<?php echo get_template_directory_uri(); ?>' />
					<td class='td_title'>Background color</td>
					<td class='td_options'>
						<form>
							<input type='text' id='basic_background_color' name='basic_background_color' value='<?php echo get_option('basic_background_color'); ?>' style='background-color: <?php echo get_option('basic_background_color'); ?>;' />
						</form>
					</td>
					<td class='td_description'>
						If you don't choose backround image.
					</td>
				</tr>
				<tr> <!-- Theme favicon -->
					<td class='td_title'>Favicon</td>
					<td class='td_options'>
						<input type='text' id='theme_favicon' name='theme_favicon' value='<?php echo get_option('theme_favicon'); ?>' />
						<input type='button' class='button' id='theme_favicon_button' value='Upload image' />
					</td>
					<td class='td_description'>
						Favicon showed in browser tab.
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Homepage Photo Slider -->
	<div class='option-page-homepage-photo-slider option-page'>
		<div class='title_row'>
			<h1>Slider</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Slider -->
					<td class='td_title'>Video</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('basic_slider_video_switch') == 'on') {
							echo "<input type='checkbox' id='basic_slider_video_switch' name='basic_slider_video_switch' class='switch-input' checked/>";
						} else if(get_option('basic_slider_video_switch') == 'off'){
							echo "<input type='checkbox' id='basic_slider_video_switch' name='basic_slider_video_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					    <br /><br />
						<input type='text' id='basic_slider_video_mp4' name='basic_slider_video_mp4' value='<?php echo get_option('basic_slider_video_mp4'); ?>' placeholder='Url to your .mp4 file' />
						<input type='button' class='button' id='basic_slider_video_button_mp4' value='Upload video' />
						<input type='text' id='basic_slider_video_webm' name='basic_slider_video_webm' value='<?php echo get_option('basic_slider_video_webm'); ?>' placeholder='Url to your .webm file' />
						<input type='button' class='button' id='basic_slider_video_button_webm' value='Upload video' />	
						<input type='text' id='basic_slider_video_ogg' name='basic_slider_video_ogg' value='<?php echo get_option('basic_slider_video_ogg'); ?>' placeholder='Url to your .ogg file' />
						<input type='button' class='button' id='basic_slider_video_button_ogg' value='Upload video' />			
					</td>
					<td class='td_description'>
						You can upload just .mp4 which should work almost everytime. Browser automaticaly choose what he need.
					</td>
				</tr>
				<tr> <!-- Slider -->
					<td class='td_title'>Photos</td>
					<td class='td_options'>
						<input type='text' id='basic_slider_1' name='basic_slider_1' value='<?php echo get_option('basic_slider_1'); ?>' />
						<input type='button' class='button' id='basic_slider_1_button' value='Upload image' />	
						<input type='text' id='basic_slider_2' name='basic_slider_2' value='<?php echo get_option('basic_slider_2'); ?>' />
						<input type='button' class='button' id='basic_slider_2_button' value='Upload image' />	
						<input type='text' id='basic_slider_3' name='basic_slider_3' value='<?php echo get_option('basic_slider_3'); ?>' />
						<input type='button' class='button' id='basic_slider_3_button' value='Upload image' />	
						<input type='text' id='basic_slider_4' name='basic_slider_4' value='<?php echo get_option('basic_slider_4'); ?>' />
						<input type='button' class='button' id='basic_slider_4_button' value='Upload image' />	
						<input type='text' id='basic_slider_5' name='basic_slider_5' value='<?php echo get_option('basic_slider_5'); ?>' />
						<input type='button' class='button' id='basic_slider_5_button' value='Upload image' />			
					</td>
					<td class='td_description'>
						Choose up to 5 best photos.
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Homepage Welcome -->
	<div class='option-page-homepage-welcome option-page'>
		<div class='title_row'>
			<h1>Welcome</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Welcome -->
					<td class='td_title'>Welcome</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='home_welcome_title' name='home_welcome_title' value='<?php echo get_option('home_welcome_title'); ?>' placeholder='Title' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='home_welcome_title_lang_2' name='home_welcome_title_lang_2' value='<?php echo get_option('home_welcome_title_lang_2'); ?>' placeholder='Title' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
						<div class='lang_wrapper'><textarea id='home_welcome' name='home_welcome' placeholder='Write something about your place'><?php if(get_option('home_welcome') != ''){ echo get_option('home_welcome'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='home_welcome_lang_2' name='home_welcome_lang_2' placeholder='Write something about your place'><?php if(get_option('home_welcome_lang_2') != ''){ echo get_option('home_welcome_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Write something about your place.
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Homepage Facilities -->
	<div class='option-page-homepage-facilities option-page'>
		<div class='title_row'>
			<h1>Facilities</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Facilities -->
					<td class='td_title'>Facilities</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='home_facilities_title' name='home_facilities_title' value='<?php echo get_option('home_facilities_title'); ?>' placeholder='Title' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='home_facilities_title_lang_2' name='home_facilities_title_lang_2' value='<?php echo get_option('home_facilities_title_lang_2'); ?>' placeholder='Title' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
						<div class='lang_wrapper'><textarea id='home_facilities' name='home_facilities' placeholder='Facilities separated commas.'><?php if(get_option('home_facilities') != ''){ echo get_option('home_facilities'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='home_facilities_lang_2' name='home_facilities_lang_2' placeholder='Facilities separated commas.'><?php if(get_option('home_facilities_lang_2') != ''){ echo get_option('home_facilities_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Write your facilities separated by commas.<br /><br />

						Example:<br />
						Bath, Pool, 2 restaurants
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Homepage Testimonials -->
	<div class='option-page-homepage-testimonials option-page'>
		<div class='title_row'>
			<h1>Testimonials</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Testimonials -->
					<td class='td_title'>Testimonials</td>
					<td class='td_options'>
						<input type='text' id='testimonials_1_image' name='testimonials_1_image' value='<?php echo get_option('testimonials_1_image'); ?>' />
						<input type='button' class='button' id='testimonials_1_image_button' value='Upload image' />
						<input type='text' id='testimonials_1_name' name='testimonials_1_name' value='<?php echo get_option('testimonials_1_name'); ?>' placeholder='Name' />
						<div class='lang_wrapper'><textarea id='testimonials_1_review' name='testimonials_1_review' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_1_review') != ''){ echo get_option('testimonials_1_review'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='testimonials_1_review_lang_2' name='testimonials_1_review_lang_2' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_1_review_lang_2') != ''){ echo get_option('testimonials_1_review_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<input type='text' id='testimonials_2_image' name='testimonials_2_image' value='<?php echo get_option('testimonials_2_image'); ?>' />
						<input type='button' class='button' id='testimonials_2_image_button' value='Upload image' />
						<input type='text' id='testimonials_2_name' name='testimonials_2_name' value='<?php echo get_option('testimonials_2_name'); ?>' placeholder='Name' />
						<div class='lang_wrapper'><textarea id='testimonials_2_review' name='testimonials_2_review' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_2_review') != ''){ echo get_option('testimonials_2_review'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='testimonials_2_review_lang_2' name='testimonials_2_review_lang_2' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_2_review_lang_2') != ''){ echo get_option('testimonials_2_review_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<input type='text' id='testimonials_3_image' name='testimonials_3_image' value='<?php echo get_option('testimonials_3_image'); ?>' />
						<input type='button' class='button' id='testimonials_3_image_button' value='Upload image' />
						<input type='text' id='testimonials_3_name' name='testimonials_3_name' value='<?php echo get_option('testimonials_3_name'); ?>' placeholder='Name' />
						<div class='lang_wrapper'><textarea id='testimonials_3_review' name='testimonials_3_review' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_3_review') != ''){ echo get_option('testimonials_3_review'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='testimonials_3_review_lang_2' name='testimonials_3_review_lang_2' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_3_review_lang_2') != ''){ echo get_option('testimonials_3_review_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<input type='text' id='testimonials_4_image' name='testimonials_4_image' value='<?php echo get_option('testimonials_4_image'); ?>' />
						<input type='button' class='button' id='testimonials_4_image_button' value='Upload image' />
						<input type='text' id='testimonials_4_name' name='testimonials_4_name' value='<?php echo get_option('testimonials_4_name'); ?>' placeholder='Name' />
						<div class='lang_wrapper'><textarea id='testimonials_4_review' name='testimonials_4_review' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_4_review') != ''){ echo get_option('testimonials_4_review'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='testimonials_4_review_lang_2' name='testimonials_4_review_lang_2' placeholder='What is he/she saying about hotel?'><?php if(get_option('testimonials_4_review_lang_2') != ''){ echo get_option('testimonials_4_review_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Write name and what he/she said about your place.
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Homepage Mini Gallery -->
	<div class='option-page-homepage-gallery option-page'>
		<div class='title_row'>
			<h1>Mini Gallery</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Basic gallery -->
					<td class='td_title'>Homepage Gallery</td>
					<td class='td_options'>
						<input type='text' id='basic_gallery_1' name='basic_gallery_1' value='<?php echo get_option('basic_gallery_1'); ?>' />
						<input type='button' class='button' id='basic_gallery_1_button' value='Upload image' />	
						<input type='text' id='basic_gallery_2' name='basic_gallery_2' value='<?php echo get_option('basic_gallery_2'); ?>' />
						<input type='button' class='button' id='basic_gallery_2_button' value='Upload image' />	
						<input type='text' id='basic_gallery_3' name='basic_gallery_3' value='<?php echo get_option('basic_gallery_3'); ?>' />
						<input type='button' class='button' id='basic_gallery_3_button' value='Upload image' />	
						<input type='text' id='basic_gallery_4' name='basic_gallery_4' value='<?php echo get_option('basic_gallery_4'); ?>' />
						<input type='button' class='button' id='basic_gallery_4_button' value='Upload image' />	
						<input type='text' id='basic_gallery_5' name='basic_gallery_5' value='<?php echo get_option('basic_gallery_5'); ?>' />
						<input type='button' class='button' id='basic_gallery_5_button' value='Upload image' />	
						<input type='text' id='basic_gallery_6' name='basic_gallery_6' value='<?php echo get_option('basic_gallery_6'); ?>' />
						<input type='button' class='button' id='basic_gallery_6_button' value='Upload image' />			
					</td>
					<td class='td_description'>
						This gallery will be showed also in sidebar.
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Reservation -->
	<div class='option-page-reservation option-page'>
		<div class='title_row'>
			<h1>Reservation</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Reservation functionality -->
					<td class='td_title'>Reservation functionality</td>
					<td class='td_options'>				
						<label class="switch switch-green">
						<?php
						if (get_option('reservation_switch') == 'on') {
							echo "<input type='checkbox' id='reservation_switch' name='reservation_switch' class='switch-input' checked/>";
						} else if(get_option('reservation_switch') == 'off'){
							echo "<input type='checkbox' id='reservation_switch' name='reservation_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>

					</td>
					<td class='td_description'>
						If it's ON, the reservation form will shows up in room details.
					</td>
				</tr>
				<tr> <!-- Reservation message -->
					<td class='td_title'>Reservation message</td>
					<td class='td_options'>
						<div class='lang_wrapper'><textarea id='reservation_message' name='reservation_message' placeholder='Eg. Thanks for your reservation.'><?php if(get_option('reservation_message') != ''){ echo get_option('reservation_message'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='reservation_message_lang_2' name='reservation_message_lang_2' placeholder='Eg. Thanks for your reservation.'><?php if(get_option('reservation_message_lang_2') != ''){ echo get_option('reservation_message_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						This will shows up in header after client send reservation.
					</td>
				</tr>
				<tr> <!-- Translations switch -->
					<td class='td_title'>Reservation email functionality</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('reservation_email_switch') == 'on') {
							echo "<input type='checkbox' id='reservation_email_switch' name='reservation_email_switch' class='switch-input' checked/>";
						} else if(get_option('reservation_email_switch') == 'off'){
							echo "<input type='checkbox' id='reservation_email_switch' name='reservation_email_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					</td>
					<td class='td_description'>
						If you don't want to send email to client after reservation, keep it switched OFF.
					</td>
				</tr>
				<tr> <!-- Reservation email subject -->
					<td class='td_title'>Reservation email subject</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='reservation_email_subject' name='reservation_email_subject' value='<?php echo get_option('reservation_email_subject'); ?>' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='reservation_email_subject_lang_2' name='reservation_email_subject_lang_2' value='<?php echo get_option('reservation_email_subject_lang_2'); ?>' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Reservation email -->
					<td class='td_title'>Reservation email content</td>
					<td class='td_options'>
						<div class='lang_wrapper'><textarea id='reservation_email' name='reservation_email' placeholder='Email content'><?php if(get_option('reservation_email') != ''){ echo get_option('reservation_email'); } ?></textarea><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><textarea id='reservation_email_lang_2' name='reservation_email_lang_2' placeholder='Email content'><?php if(get_option('reservation_email_lang_2') != ''){ echo get_option('reservation_email_lang_2'); } ?></textarea><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Socials -->
	<div class='option-page-socials option-page'>
		<div class='title_row'>
			<h1>Socials</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Socials -->
					<td class='td_title'>Socials</td>
					<td class='td_options'>
						<input type='text' id='basic_socials_facebook' name='basic_socials_facebook' value='<?php echo get_option('basic_socials_facebook'); ?>' placeholder='Facebook' />
						<input type='text' id='basic_socials_twitter' name='basic_socials_twitter' value='<?php echo get_option('basic_socials_twitter'); ?>' placeholder='Twitter' />
						<input type='text' id='basic_socials_instagram' name='basic_socials_instagram' value='<?php echo get_option('basic_socials_instagram'); ?>' placeholder='Instagram' />
						<input type='text' id='basic_socials_youtube' name='basic_socials_youtube' value='<?php echo get_option('basic_socials_youtube'); ?>' placeholder='Youtube' />		
						<input type='text' id='basic_socials_tripadvisor' name='basic_socials_tripadvisor' value='<?php echo get_option('basic_socials_tripadvisor'); ?>' placeholder='Tripadvisor' />
						<input type='text' id='basic_socials_pinterest' name='basic_socials_pinterest' value='<?php echo get_option('basic_socials_pinterest'); ?>' placeholder='Pinterest' />
						<input type='text' id='basic_socials_foursquare' name='basic_socials_foursquare' value='<?php echo get_option('basic_socials_foursquare'); ?>' placeholder='Foursquare' />
						<input type='text' id='basic_socials_vimeo' name='basic_socials_vimeo' value='<?php echo get_option('basic_socials_vimeo'); ?>' placeholder='Vimeo' />
						<input type='text' id='basic_socials_tumblr' name='basic_socials_tumblr' value='<?php echo get_option('basic_socials_tumblr'); ?>' placeholder='Tumblr' />
						<input type='text' id='basic_socials_skype' name='basic_socials_skype' value='<?php echo get_option('basic_socials_skype'); ?>' placeholder='Skype' />
						<input type='text' id='basic_socials_google' name='basic_socials_google' value='<?php echo get_option('basic_socials_google'); ?>' placeholder='Google+' />
					</td>
					<td class='td_description'>
						Place full url of your social account.<br /><br />
						Example:<br />
						http://www.facebook.com/HipstaCowboys
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Widgets -->
	<div class='option-page-widgets option-page'>
		<div class='title_row'>
			<h1>Widgets</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Widget - Accommodation switch -->
					<td class='td_title'>Accommodation widget</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('widget_accommodation_switch') == 'on') {
							echo "<input type='checkbox' id='widget_accommodation_switch' name='widget_accommodation_switch' class='switch-input' checked/>";
						} else if(get_option('widget_accommodation_switch') == 'off'){
							echo "<input type='checkbox' id='widget_accommodation_switch' name='widget_accommodation_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					</td>
					<td class='td_description'>
						Your rooms are listed in this widget.
					</td>
				</tr>
				<tr> <!-- Widget - Accommodation Title -->
					<td class='td_title'>Accommodation widget title</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='widget_accommodation_title' name='widget_accommodation_title' value='<?php echo get_option('widget_accommodation_title'); ?>' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='widget_accommodation_title_lang_2' name='widget_accommodation_title_lang_2' value='<?php echo get_option('widget_accommodation_title_lang_2'); ?>' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Widget - Accommodation Count -->
					<td class='td_title'>Accommodation widget posts count</td>
					<td class='td_options'>
						<input type='text' id='widget_accommodation_count' name='widget_accommodation_count' value='<?php echo get_option('widget_accommodation_count'); ?>' />
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Widget - Things to do switch -->
					<td class='td_title'>Things to do widget</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('widget_poi_switch') == 'on') {
							echo "<input type='checkbox' id='widget_poi_switch' name='widget_poi_switch' class='switch-input' checked/>";
						} else if(get_option('widget_poi_switch') == 'off'){
							echo "<input type='checkbox' id='widget_poi_switch' name='widget_poi_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					</td>
					<td class='td_description'>
						Things to do are listed in this widget.
					</td>
				</tr>
				<tr> <!-- Widget - Things to do Title -->
					<td class='td_title'>Things to do widget title</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='widget_poi_title' name='widget_poi_title' value='<?php echo get_option('widget_poi_title'); ?>' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='widget_poi_title_lang_2' name='widget_poi_title_lang_2' value='<?php echo get_option('widget_poi_title_lang_2'); ?>' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Widget - Things to do Count -->
					<td class='td_title'>Things to do widget posts count</td>
					<td class='td_options'>
						<input type='text' id='widget_poi_count' name='widget_poi_count' value='<?php echo get_option('widget_poi_count'); ?>' />
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Widget - Gallery switch -->
					<td class='td_title'>Gallery widget</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('widget_gallery_switch') == 'on') {
							echo "<input type='checkbox' id='widget_gallery_switch' name='widget_gallery_switch' class='switch-input' checked/>";
						} else if(get_option('widget_gallery_switch') == 'off'){
							echo "<input type='checkbox' id='widget_gallery_switch' name='widget_gallery_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					</td>
					<td class='td_description'>
						Gallery from homepage is listed in this widget.
					</td>
				</tr>
				<tr> <!-- Widget - Gallery Title -->
					<td class='td_title'>Gallery widget title</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='widget_gallery_title' name='widget_gallery_title' value='<?php echo get_option('widget_gallery_title'); ?>' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='widget_gallery_title_lang_2' name='widget_gallery_title_lang_2' value='<?php echo get_option('widget_gallery_title_lang_2'); ?>' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					</td>
				</tr>

			</table>

		</div>
	</div>

	<!-- Languages -->
	<div class='option-page-languages option-page'>
		<div class='title_row'>
			<h1>Languages</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Translations switch -->
					<td class='td_title'>Translation</td>
					<td class='td_options'>
						<label class="switch switch-green">
						<?php
						if (get_option('lang_switch') == 'on') {
							echo "<input type='checkbox' id='lang_switch' name='lang_switch' class='switch-input' checked/>";
						} else if(get_option('lang_switch') == 'off'){
							echo "<input type='checkbox' id='lang_switch' name='lang_switch' class='switch-input' />";
						}
						?>
					      <span class="switch-label" data-on="On" data-off="Off"></span>
					      <span class="switch-handle"></span>
					    </label>
					</td>
					<td class='td_description'>
						If you want to use languages feature, switch it ON. If you switch it OFF, data remains.
					</td>
				</tr>
				<tr> <!-- Widget - Accommodation Title -->
					<td class='td_title'>Default language</td>
					<td class='td_options'>
						<input type='text' id='lang_default_name' name='lang_default_name' value='<?php echo get_option('lang_default_name'); ?>' placeholder='eg. English' />
					</td>
					<td class='td_description'>
					</td>
				</tr>
				<tr> <!-- Widget - Accommodation Count -->
					<td class='td_title'>Second language</td>
					<td class='td_options'>
						<input type='text' id='lang_secondary_name' name='lang_secondary_name' value='<?php echo get_option('lang_secondary_name'); ?>' placeholder='eg. Spanish' />
					</td>
					<td class='td_description'>
					</td>
				</tr>
			</table>

		</div>
	</div>
	
	<!-- Languages -->
	<div class='option-page-translation option-page'>
		<div class='title_row'>
			<h1>Core translations</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Detail button</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_detail_button' name='lang_core_detail_button' value='<?php echo get_option('lang_core_detail_button'); ?>' placeholder='eg. Details' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_detail_button_lang_2' name='lang_core_detail_button_lang_2' value='<?php echo get_option('lang_core_detail_button_lang_2'); ?>' placeholder='eg. Details' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Text in detail button.
					</td>
				</tr>
				<tr> <!-- Lang core book button -->
					<td class='td_title'>Book button</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_book_button' name='lang_core_book_button' value='<?php echo get_option('lang_core_book_button'); ?>' placeholder='eg. Book now' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_book_button_lang_2' name='lang_core_book_button_lang_2' value='<?php echo get_option('lang_core_book_button_lang_2'); ?>' placeholder='eg. Book now' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Text in book button.
					</td>
				</tr>
				<tr> <!-- Lang core amenities -->
					<td class='td_title'>Amenitites</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_amenities' name='lang_core_amenities' value='<?php echo get_option('lang_core_amenities'); ?>' placeholder='eg. Amenities' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_amenities_lang_2' name='lang_core_amenities_lang_2' value='<?php echo get_option('lang_core_amenities_lang_2'); ?>' placeholder='eg. Amenities' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
					Amenities in room detail.
					</td>
				</tr>
				<tr> <!-- Lang core contact form -->
					<td class='td_title'>Contact form</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_contact_name' name='lang_core_contact_name' value='<?php echo get_option('lang_core_contact_name'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_contact_name_lang_2' name='lang_core_contact_name_lang_2' value='<?php echo get_option('lang_core_contact_name_lang_2'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_contact_email' name='lang_core_contact_email' value='<?php echo get_option('lang_core_contact_email'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_contact_email_lang_2' name='lang_core_contact_email_lang_2' value='<?php echo get_option('lang_core_contact_email_lang_2'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_contact_message' name='lang_core_contact_message' value='<?php echo get_option('lang_core_contact_message'); ?>' placeholder='eg. Message' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_contact_message_lang_2' name='lang_core_contact_message_lang_2' value='<?php echo get_option('lang_core_contact_message_lang_2'); ?>' placeholder='eg. Message' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_contact_message_top' name='lang_core_contact_message_top' value='<?php echo get_option('lang_core_contact_message_top'); ?>' placeholder='eg. Message for header' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_contact_message_top_lang_2' name='lang_core_contact_message_top_lang_2' value='<?php echo get_option('lang_core_contact_message_top_lang_2'); ?>' placeholder='eg. Message for header' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_contact_button' name='lang_core_contact_button' value='<?php echo get_option('lang_core_contact_button'); ?>' placeholder='eg. Send' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_contact_button_lang_2' name='lang_core_contact_button_lang_2' value='<?php echo get_option('lang_core_contact_button_lang_2'); ?>' placeholder='eg. Send' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Contact form in contact template.
					</td>
				</tr>
				<tr> <!-- Lang core reservation form -->
					<td class='td_title'>Reservation form</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_check_in' name='lang_core_reservation_check_in' value='<?php echo get_option('lang_core_reservation_check_in'); ?>' placeholder='eg. Check in' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_check_in_lang_2' name='lang_core_reservation_check_in_lang_2' value='<?php echo get_option('lang_core_reservation_check_in_lang_2'); ?>' placeholder='eg. Check in' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_check_out' name='lang_core_reservation_check_out' value='<?php echo get_option('lang_core_reservation_check_out'); ?>' placeholder='eg. Check out' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_check_out_lang_2' name='lang_core_reservation_check_out_lang_2' value='<?php echo get_option('lang_core_reservation_check_out_lang_2'); ?>' placeholder='eg. Check out' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_people' name='lang_core_reservation_people' value='<?php echo get_option('lang_core_reservation_people'); ?>' placeholder='eg. Number of people (optional)' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_people_lang_2' name='lang_core_reservation_people_lang_2' value='<?php echo get_option('lang_core_reservation_people_lang_2'); ?>' placeholder='eg. Number of people (optional)' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_name' name='lang_core_reservation_name' value='<?php echo get_option('lang_core_reservation_name'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_name_lang_2' name='lang_core_reservation_name_lang_2' value='<?php echo get_option('lang_core_reservation_name_lang_2'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_email' name='lang_core_reservation_email' value='<?php echo get_option('lang_core_reservation_email'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_email_lang_2' name='lang_core_reservation_email_lang_2' value='<?php echo get_option('lang_core_reservation_email_lang_2'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_phone' name='lang_core_reservation_phone' value='<?php echo get_option('lang_core_reservation_phone'); ?>' placeholder='eg. Phone (optional)' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_phone_lang_2' name='lang_core_reservation_phone_lang_2' value='<?php echo get_option('lang_core_reservation_phone_lang_2'); ?>' placeholder='eg. Phone (optional)' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_message' name='lang_core_reservation_message' value='<?php echo get_option('lang_core_reservation_message'); ?>' placeholder='eg. Message (optional)' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_message_lang_2' name='lang_core_reservation_message_lang_2' value='<?php echo get_option('lang_core_reservation_message_lang_2'); ?>' placeholder='eg. Message (optional)' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_phone_text' name='lang_core_reservation_phone_text' value='<?php echo get_option('lang_core_reservation_phone_text'); ?>' placeholder='eg. Or call' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_phone_text_lang_2' name='lang_core_reservation_phone_text_lang_2' value='<?php echo get_option('lang_core_reservation_phone_text_lang_2'); ?>' placeholder='eg. Or call' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_reservation_button' name='lang_core_reservation_button' value='<?php echo get_option('lang_core_reservation_button'); ?>' placeholder='eg. Ask for reservation' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_reservation_button_lang_2' name='lang_core_reservation_button_lang_2' value='<?php echo get_option('lang_core_reservation_button_lang_2'); ?>' placeholder='eg. Ask for reservation' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
					</td>
					<td class='td_description'>
						Reservation form in reservation template.
					</td>
				</tr>
				<tr> <!-- Footer -->
					<td class='td_title'>Footer</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_footer_navigate' name='lang_core_footer_navigate' value='<?php echo get_option('lang_core_footer_navigate'); ?>' placeholder='eg. Navigate' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_footer_navigate_lang_2' name='lang_core_footer_navigate_lang_2' value='<?php echo get_option('lang_core_footer_navigate_lang_2'); ?>' placeholder='eg. Navigate' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_footer_news_title' name='lang_core_footer_news_title' value='<?php echo get_option('lang_core_footer_news_title'); ?>' placeholder='eg. Recent News' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_footer_news_title_lang_2' name='lang_core_footer_news_title_lang_2' value='<?php echo get_option('lang_core_footer_news_title_lang_2'); ?>' placeholder='eg. Check out' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
					</td>
					<td class='td_description'>
						Link navigate and title Recent posts in footer.
					</td>
				</tr>
				<tr> <!-- Lang core comments -->
					<td class='td_title'>Comments</td>
					<td class='td_options'>
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_title' name='lang_core_comments_title' value='<?php echo get_option('lang_core_comments_title'); ?>' placeholder='eg. Leave reply' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_title_lang_2' name='lang_core_comments_title_lang_2' value='<?php echo get_option('lang_core_comments_title_lang_2'); ?>' placeholder='eg. Leave reply' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_reply' name='lang_core_comments_reply' value='<?php echo get_option('lang_core_comments_reply'); ?>' placeholder='eg. Reply' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_reply_lang_2' name='lang_core_comments_reply_lang_2' value='<?php echo get_option('lang_core_comments_reply_lang_2'); ?>' placeholder='eg. Reply' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_subtitle' name='lang_core_comments_subtitle' value='<?php echo get_option('lang_core_comments_subtitle'); ?>' placeholder='eg. Your email address will not be published' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_subtitle_lang_2' name='lang_core_comments_subtitle_lang_2' value='<?php echo get_option('lang_core_comments_subtitle_lang_2'); ?>' placeholder='eg. Your email address will not be published' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_name' name='lang_core_comments_name' value='<?php echo get_option('lang_core_comments_name'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_name_lang_2' name='lang_core_comments_name_lang_2' value='<?php echo get_option('lang_core_comments_name_lang_2'); ?>' placeholder='eg. Name' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_email' name='lang_core_comments_email' value='<?php echo get_option('lang_core_comments_email'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_email_lang_2' name='lang_core_comments_email_lang_2' value='<?php echo get_option('lang_core_comments_email_lang_2'); ?>' placeholder='eg. Email' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_message' name='lang_core_comments_message' value='<?php echo get_option('lang_core_comments_message'); ?>' placeholder='eg. Comment' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_message_lang_2' name='lang_core_comments_message_lang_2' value='<?php echo get_option('lang_core_comments_message_lang_2'); ?>' placeholder='eg. Comment' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_button' name='lang_core_comments_button' value='<?php echo get_option('lang_core_comments_button'); ?>' placeholder='eg. Send Comment' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_button_lang_2' name='lang_core_comments_button_lang_2' value='<?php echo get_option('lang_core_comments_button_lang_2'); ?>' placeholder='eg. Send Comment' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
						<div class='lang_wrapper'><input type='text' id='lang_core_comments_moderation' name='lang_core_comments_moderation' value='<?php echo get_option('lang_core_comments_moderation'); ?>' placeholder='eg. Your comment is awaiting moderation.' /><span><?php echo get_option('lang_default_name'); ?></span></div>
							<!-- Language support -->
							<?php if(get_option('lang_switch') == 'on'){ ?>
							<div class='lang_wrapper'><input type='text' id='lang_core_comments_moderation_lang_2' name='lang_core_comments_moderation_lang_2' value='<?php echo get_option('lang_core_comments_moderation_lang_2'); ?>' placeholder='eg. Your comment is awaiting moderation.' /><span><?php echo get_option('lang_secondary_name'); ?></span></div>
							<?php } ?>
							<br /><br />
					</td>
					<td class='td_description'>
					</td>
				</tr>
			</table>

		</div>
	</div>

	<!-- Layouts -->
	<div class='option-page-layouts option-page'>
		<div class='title_row'>
			<h1>Layouts</h1>
			<div class='message'></div>
			<a id='save_button' class='button button-save'>Save settings</a>
		</div>
		<div class='body'>

			<table>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Accommodation</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_accommodation' id='layouts_accommodation' value='<?php echo get_option('layouts_accommodation'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_accommodation_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_accommodation_1.png' <?php if(get_option('layouts_accommodation') == 'list-default'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_accommodation_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_accommodation_2.png' <?php if(get_option('layouts_accommodation') == 'list-square'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					Full width list / Square list
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Things to do</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_poi' id='layouts_poi' value='<?php echo get_option('layouts_poi'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_poi_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_accommodation_1.png' <?php if(get_option('layouts_poi') == 'list-default'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_poi_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_accommodation_2.png' <?php if(get_option('layouts_poi') == 'list-square'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					Full width list / Square list
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Room detail</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_room' id='layouts_room' value='<?php echo get_option('layouts_room'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_room_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_room') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_room_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_room') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Things to do detail</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_poi_detail' id='layouts_poi_detail' value='<?php echo get_option('layouts_poi_detail'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_poi_detail_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_poi_detail') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_poi_detail_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_poi_detail') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Gallery</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_gallery' id='layouts_gallery' value='<?php echo get_option('layouts_gallery'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_gallery_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_gallery') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_gallery_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_gallery') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Contact</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_contact' id='layouts_contact' value='<?php echo get_option('layouts_contact'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_contact_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_contact') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_contact_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_contact') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Reservation</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_reservation' id='layouts_reservation' value='<?php echo get_option('layouts_reservation'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_reservation_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_reservation') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_reservation_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_reservation') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>News</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_news' id='layouts_news' value='<?php echo get_option('layouts_news'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_news_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_news') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_news_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_news') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>News post</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_post' id='layouts_post' value='<?php echo get_option('layouts_post'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_post_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_post') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_post_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_post') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
				<tr> <!-- Lang core detail button -->
					<td class='td_title'>Page</td>
					<td class='td_options'>
						<input type='hidden' name='layouts_page' id='layouts_page' value='<?php echo get_option('layouts_page'); ?>' />
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_page_1'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_no_sidebar.png' <?php if(get_option('layouts_page') == 'no-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
						<a class='img-wrapper' style='width: 60px; height: 60px; overflow: hidden;' id='layouts_page_2'>
							<img src='<?php echo get_template_directory_uri(); ?>/admin/assets/ico/layouts_sidebar.png' <?php if(get_option('layouts_page') == 'with-sidebar'){ echo "class='selected'"; } ?> alt='layout' />
						</a>
					</td>
					<td class='td_description'>
					No sidebar / With sidebar
					</td>
				</tr>
			</table>

		</div>
	</div>

</div>
<?php
}

// Load scripts
function scripts(){
	wp_enqueue_script('script', get_template_directory_uri() . '/admin/assets/js/script.js');
	wp_enqueue_style('general', get_template_directory_uri() . '/admin/assets/css/general.css');
}
add_action('admin_init', 'scripts');

// Save to javascript
add_action('admin_footer', 'js_init');
function js_init(){
?>

<script type="text/javascript">
	
	jQuery(document).ready(function($){
		$('#save_button').live('click', function(){
			var theme_logo = $('#theme_logo').val();
			var theme_favicon = $('#theme_favicon').val();
			var basic_address_street = $('#basic_address_street').val();
			var basic_address_postcode = $('#basic_address_postcode').val();
			var basic_address_city = $('#basic_address_city').val();
			var basic_address_country = $('#basic_address_country').val();
			var basic_address_latitude = $('#basic_address_latitude').val();
			var basic_address_longtitude = $('#basic_address_longtitude').val();
			var basic_address_directions = $('#basic_address_directions').val();
				var basic_address_directions_lang_2 = $('#basic_address_directions_lang_2').val();
			var basic_phone = $('#basic_phone').val();
			// Facilities
			var home_facilities = $('#home_facilities').val();
				var home_facilities_lang_2 = $('#home_facilities_lang_2').val();
			var home_facilities_title = $('#home_facilities_title').val();
				var home_facilities_title_lang_2 = $('#home_facilities_title_lang_2').val();
			// Welcome
			var home_welcome = $('#home_welcome').val();
				var home_welcome_lang_2 = $('#home_welcome_lang_2').val();
			var home_welcome_title = $('#home_welcome_title').val();
				var home_welcome_title_lang_2 = $('#home_welcome_title_lang_2').val();
			//	Socials
			var basic_socials_facebook = $('#basic_socials_facebook').val();
			var basic_socials_twitter = $('#basic_socials_twitter').val();
			var basic_socials_instagram = $('#basic_socials_instagram').val();
			var basic_socials_youtube = $('#basic_socials_youtube').val();
			var basic_socials_tripadvisor = $('#basic_socials_tripadvisor').val();
			var basic_socials_vimeo = $('#basic_socials_vimeo').val();
			var basic_socials_tumblr = $('#basic_socials_tumblr').val();
			var basic_socials_pinterest = $('#basic_socials_pinterest').val();
			var basic_socials_foursquare = $('#basic_socials_foursquare').val();
			var basic_socials_skype = $('#basic_socials_skype').val();
			var basic_socials_google = $('#basic_socials_google').val();
			// Testimonials
			var testimonials_1_image = $('#testimonials_1_image').val();
			var testimonials_1_name = $('#testimonials_1_name').val();
			var testimonials_1_review = $('#testimonials_1_review').val();
				var testimonials_1_review_lang_2 = $('#testimonials_1_review_lang_2').val();
			var testimonials_2_image = $('#testimonials_2_image').val();
			var testimonials_2_name = $('#testimonials_2_name').val();
			var testimonials_2_review = $('#testimonials_2_review').val();
				var testimonials_2_review_lang_2 = $('#testimonials_2_review_lang_2').val();
			var testimonials_3_image = $('#testimonials_3_image').val();
			var testimonials_3_name = $('#testimonials_3_name').val();
			var testimonials_3_review = $('#testimonials_3_review').val();
				var testimonials_3_review_lang_2 = $('#testimonials_3_review_lang_2').val();
			var testimonials_4_image = $('#testimonials_4_image').val();
			var testimonials_4_name = $('#testimonials_4_name').val();
			var testimonials_4_review = $('#testimonials_4_review').val();
				var testimonials_4_review_lang_2 = $('#testimonials_4_review_lang_2').val();
			// Colorpicker
			var basic_color = $('#basic_color').val();
			// Background
			var basic_background_image = $('#basic_background_image').val();
			var basic_background_color = $('#basic_background_color').val();
			// Slider
			var basic_slider_1 = $('#basic_slider_1').val();
			var basic_slider_2 = $('#basic_slider_2').val();
			var basic_slider_3 = $('#basic_slider_3').val();
			var basic_slider_4 = $('#basic_slider_4').val();
			var basic_slider_5 = $('#basic_slider_5').val();
			if($('#basic_slider_video_switch').prop('checked')) {
			    var basic_slider_video_switch = 'on';
			} else {
			    var basic_slider_video_switch = 'off';
			}
			var basic_slider_video_mp4 = $('#basic_slider_video_mp4').val();
			var basic_slider_video_webm = $('#basic_slider_video_webm').val();
			var basic_slider_video_ogg = $('#basic_slider_video_ogg').val();
			// Homepage Gallery
			var basic_gallery_1 = $('#basic_gallery_1').val();
			var basic_gallery_2 = $('#basic_gallery_2').val();
			var basic_gallery_3 = $('#basic_gallery_3').val();
			var basic_gallery_4 = $('#basic_gallery_4').val();
			var basic_gallery_5 = $('#basic_gallery_5').val();
			var basic_gallery_6 = $('#basic_gallery_6').val();
			// Reservation
			if($('#reservation_switch').prop('checked')) {
			    var reservation_switch = 'on';
			} else {
			    var reservation_switch = 'off';
			}
			var reservation_message = $('#reservation_message').val();
				var reservation_message_lang_2 = $('#reservation_message_lang_2').val();
			if($('#reservation_email_switch').prop('checked')) {
			    var reservation_email_switch = 'on';
			} else {
			    var reservation_email_switch = 'off';
			}
			var reservation_email_subject = $('#reservation_email_subject').val();
				var reservation_email_subject_lang_2 = $('#reservation_email_subject_lang_2').val();
			var reservation_email = $('#reservation_email').val();
				var reservation_email_lang_2 = $('#reservation_email_lang_2').val();
			// Widgets - Accommodation
			if($('#widget_accommodation_switch').prop('checked')) {
			    var widget_accommodation_switch = 'on';
			} else {
			    var widget_accommodation_switch = 'off';
			}
			var widget_accommodation_title = $('#widget_accommodation_title').val();
				var widget_accommodation_title_lang_2 = $('#widget_accommodation_title_lang_2').val();
			var widget_accommodation_count = $('#widget_accommodation_count').val();
			// Widgets - Things to do
			if($('#widget_poi_switch').prop('checked')) {
			    var widget_poi_switch = 'on';
			} else {
			    var widget_poi_switch = 'off';
			}
			var widget_poi_title = $('#widget_poi_title').val();
				var widget_poi_title_lang_2 = $('#widget_poi_title_lang_2').val();
			var widget_poi_count = $('#widget_poi_count').val();
			// Widgets - Gallery
			if($('#widget_gallery_switch').prop('checked')) {
			    var widget_gallery_switch = 'on';
			} else {
			    var widget_gallery_switch = 'off';
			}
			var widget_gallery_title = $('#widget_gallery_title').val();
				var widget_gallery_title_lang_2 = $('#widget_gallery_title_lang_2').val();
			// Languages
			if($('#lang_switch').prop('checked')) {
			    var lang_switch = 'on';
			} else {
			    var lang_switch = 'off';
			}
			var lang_default_name = $('#lang_default_name').val();
			var lang_secondary_name = $('#lang_secondary_name').val();

			// Translation
			var lang_core_detail_button = $('#lang_core_detail_button').val();
				var lang_core_detail_button_lang_2 = $('#lang_core_detail_button_lang_2').val();
			var lang_core_book_button = $('#lang_core_book_button').val();
				var lang_core_book_button_lang_2 = $('#lang_core_book_button_lang_2').val();
			var lang_core_amenities = $('#lang_core_amenities').val();
				var lang_core_amenities_lang_2 = $('#lang_core_amenities_lang_2').val();
			var lang_core_contact_name = $('#lang_core_contact_name').val();
				var lang_core_contact_name_lang_2 = $('#lang_core_contact_name_lang_2').val();
			var lang_core_contact_email = $('#lang_core_contact_email').val();
				var lang_core_contact_email_lang_2 = $('#lang_core_contact_email_lang_2').val();
			var lang_core_contact_message = $('#lang_core_contact_message').val();
				var lang_core_contact_message_lang_2 = $('#lang_core_contact_message_lang_2').val();
			var lang_core_contact_message_top = $('#lang_core_contact_message_top').val();
				var lang_core_contact_message_top_lang_2 = $('#lang_core_contact_message_top_lang_2').val();
			var lang_core_contact_button = $('#lang_core_contact_button').val();
				var lang_core_contact_button_lang_2 = $('#lang_core_contact_button_lang_2').val();
			var lang_core_reservation_check_in = $('#lang_core_reservation_check_in').val();
				var lang_core_reservation_check_in_lang_2 = $('#lang_core_reservation_check_in_lang_2').val();
			var lang_core_reservation_check_out = $('#lang_core_reservation_check_out').val();
				var lang_core_reservation_check_out_lang_2 = $('#lang_core_reservation_check_out_lang_2').val();
			var lang_core_reservation_people = $('#lang_core_reservation_people').val();
				var lang_core_reservation_people_lang_2 = $('#lang_core_reservation_people_lang_2').val();
			var lang_core_reservation_name = $('#lang_core_reservation_name').val();
				var lang_core_reservation_name_lang_2 = $('#lang_core_reservation_name_lang_2').val();
			var lang_core_reservation_email = $('#lang_core_reservation_email').val();
				var lang_core_reservation_email_lang_2 = $('#lang_core_reservation_email_lang_2').val();
			var lang_core_reservation_phone = $('#lang_core_reservation_phone').val();
				var lang_core_reservation_phone_lang_2 = $('#lang_core_reservation_phone_lang_2').val();
			var lang_core_reservation_message = $('#lang_core_reservation_message').val();
				var lang_core_reservation_message_lang_2 = $('#lang_core_reservation_message_lang_2').val();
			var lang_core_reservation_phone_text = $('#lang_core_reservation_phone_text').val();
				var lang_core_reservation_phone_text_lang_2 = $('#lang_core_reservation_phone_text_lang_2').val();
			var lang_core_reservation_button = $('#lang_core_reservation_button').val();
				var lang_core_reservation_button_lang_2 = $('#lang_core_reservation_button_lang_2').val();
			var lang_core_footer_navigate = $('#lang_core_footer_navigate').val();
				var lang_core_footer_navigate_lang_2 = $('#lang_core_footer_navigate_lang_2').val();
			var lang_core_footer_news_title = $('#lang_core_footer_news_title').val();
				var lang_core_footer_news_title_lang_2 = $('#lang_core_footer_news_title_lang_2').val();
			var lang_core_comments_title = $('#lang_core_comments_title').val();
				var lang_core_comments_title_lang_2 = $('#lang_core_comments_title_lang_2').val();
			var lang_core_comments_subtitle = $('#lang_core_comments_subtitle').val();
				var lang_core_comments_subtitle_lang_2 = $('#lang_core_comments_subtitle_lang_2').val();
			var lang_core_comments_reply = $('#lang_core_comments_reply').val();
				var lang_core_comments_reply_lang_2 = $('#lang_core_comments_reply_lang_2').val();
			var lang_core_comments_name = $('#lang_core_comments_name').val();
				var lang_core_comments_name_lang_2 = $('#lang_core_comments_name_lang_2').val();
			var lang_core_comments_email = $('#lang_core_comments_email').val();
				var lang_core_comments_email_lang_2 = $('#lang_core_comments_email_lang_2').val();
			var lang_core_comments_message = $('#lang_core_comments_message').val();
				var lang_core_comments_message_lang_2 = $('#lang_core_comments_message_lang_2').val();
			var lang_core_comments_button = $('#lang_core_comments_button').val();
				var lang_core_comments_button_lang_2 = $('#lang_core_comments_button_lang_2').val();
			var lang_core_comments_moderation = $('#lang_core_comments_moderation').val();
				var lang_core_comments_moderation_lang_2 = $('#lang_core_comments_moderation_lang_2').val();

			// Layouts
			var layouts_accommodation = $('#layouts_accommodation').val();
			var layouts_poi = $('#layouts_poi').val();
			var layouts_room = $('#layouts_room').val();
			var layouts_poi_detail = $('#layouts_poi_detail').val();
			var layouts_gallery = $('#layouts_gallery').val();
			var layouts_contact = $('#layouts_contact').val();
			var layouts_reservation = $('#layouts_reservation').val();
			var layouts_news = $('#layouts_news').val();
			var layouts_post = $('#layouts_post').val();
			var layouts_page = $('#layouts_page').val();

			// Saving to variable
			var data = {
				action: 'general_settings_save',
				theme_logo: theme_logo,
				theme_favicon: theme_favicon,
				basic_address_street: basic_address_street,
				basic_address_postcode: basic_address_postcode,
				basic_address_city: basic_address_city,
				basic_address_country: basic_address_country,
				basic_address_latitude: basic_address_latitude,
				basic_address_longtitude: basic_address_longtitude,
				basic_address_directions: basic_address_directions,
					basic_address_directions_lang_2: basic_address_directions_lang_2,
				basic_phone: basic_phone,
				home_facilities: home_facilities,
					home_facilities_lang_2: home_facilities_lang_2,
				home_facilities_title: home_facilities_title,
					home_facilities_title_lang_2: home_facilities_title_lang_2,
				home_welcome: home_welcome,
					home_welcome_lang_2: home_welcome_lang_2,
				home_welcome_title: home_welcome_title,
					home_welcome_title_lang_2: home_welcome_title_lang_2,
				basic_socials_facebook: basic_socials_facebook,
				basic_socials_twitter: basic_socials_twitter,
				basic_socials_instagram: basic_socials_instagram,
				basic_socials_youtube: basic_socials_youtube,
				basic_socials_tripadvisor: basic_socials_tripadvisor,
				basic_socials_vimeo: basic_socials_vimeo,
				basic_socials_tumblr: basic_socials_tumblr,
				basic_socials_pinterest: basic_socials_pinterest,
				basic_socials_foursquare: basic_socials_foursquare,
				basic_socials_skype: basic_socials_skype,
				basic_socials_google: basic_socials_google,
				testimonials_1_image: testimonials_1_image,
				testimonials_1_name: testimonials_1_name,
				testimonials_1_review: testimonials_1_review,
					testimonials_1_review_lang_2: testimonials_1_review_lang_2,
				testimonials_2_image: testimonials_2_image,
				testimonials_2_name: testimonials_2_name,
				testimonials_2_review: testimonials_2_review,
					testimonials_2_review_lang_2: testimonials_2_review_lang_2,
				testimonials_3_image: testimonials_3_image,
				testimonials_3_name: testimonials_3_name,
				testimonials_3_review: testimonials_3_review,
					testimonials_3_review_lang_2: testimonials_3_review_lang_2,
				testimonials_4_image: testimonials_4_image,
				testimonials_4_name: testimonials_4_name,
				testimonials_4_review: testimonials_4_review,
					testimonials_4_review_lang_2: testimonials_4_review_lang_2,
				basic_color: basic_color,
				basic_background_image: basic_background_image,
				basic_background_color: basic_background_color,
				basic_slider_1: basic_slider_1,
				basic_slider_2: basic_slider_2,
				basic_slider_3: basic_slider_3,
				basic_slider_4: basic_slider_4,
				basic_slider_5: basic_slider_5,
				basic_slider_video_switch: basic_slider_video_switch,
				basic_slider_video_mp4: basic_slider_video_mp4,
				basic_slider_video_webm: basic_slider_video_webm,
				basic_slider_video_ogg: basic_slider_video_ogg,
				basic_gallery_1: basic_gallery_1,
				basic_gallery_2: basic_gallery_2,
				basic_gallery_3: basic_gallery_3,
				basic_gallery_4: basic_gallery_4,
				basic_gallery_5: basic_gallery_5,
				basic_gallery_6: basic_gallery_6,
				reservation_switch: reservation_switch,
				reservation_message: reservation_message,
					reservation_message_lang_2: reservation_message_lang_2,
				reservation_email_switch: reservation_email_switch,
				reservation_email_subject: reservation_email_subject,
					reservation_email_subject_lang_2: reservation_email_subject_lang_2,
				reservation_email: reservation_email,
					reservation_email_lang_2: reservation_email_lang_2,
				widget_accommodation_switch: widget_accommodation_switch,
				widget_accommodation_title: widget_accommodation_title,
					widget_accommodation_title_lang_2: widget_accommodation_title_lang_2,
				widget_accommodation_count: widget_accommodation_count,
				widget_poi_switch: widget_poi_switch,
				widget_poi_title: widget_poi_title,
					widget_poi_title_lang_2: widget_poi_title_lang_2,
				widget_poi_count: widget_poi_count,
				widget_gallery_switch: widget_gallery_switch,
				widget_gallery_title: widget_gallery_title,
					widget_gallery_title_lang_2: widget_gallery_title_lang_2,
				lang_switch: lang_switch,
				lang_default_name: lang_default_name,
				lang_secondary_name: lang_secondary_name,

				lang_core_detail_button: lang_core_detail_button,
					lang_core_detail_button_lang_2: lang_core_detail_button_lang_2,
				lang_core_book_button: lang_core_book_button,
					lang_core_book_button_lang_2: lang_core_book_button_lang_2,
				lang_core_amenities: lang_core_amenities,
					lang_core_amenities_lang_2: lang_core_amenities_lang_2,
				lang_core_contact_name: lang_core_contact_name,
					lang_core_contact_name_lang_2: lang_core_contact_name_lang_2,
				lang_core_contact_email: lang_core_contact_email,
					lang_core_contact_email_lang_2: lang_core_contact_email_lang_2,
				lang_core_contact_message: lang_core_contact_message,
					lang_core_contact_message_lang_2: lang_core_contact_message_lang_2,
				lang_core_contact_message_top: lang_core_contact_message_top,
					lang_core_contact_message_top_lang_2: lang_core_contact_message_top_lang_2,
				lang_core_contact_button: lang_core_contact_button,
					lang_core_contact_button_lang_2: lang_core_contact_button_lang_2,
				lang_core_reservation_check_in: lang_core_reservation_check_in,
					lang_core_reservation_check_in_lang_2: lang_core_reservation_check_in_lang_2,
				lang_core_reservation_check_out: lang_core_reservation_check_out,
					lang_core_reservation_check_out_lang_2: lang_core_reservation_check_out_lang_2,
				lang_core_reservation_people: lang_core_reservation_people,
					lang_core_reservation_people_lang_2: lang_core_reservation_people_lang_2,
				lang_core_reservation_name: lang_core_reservation_name,
					lang_core_reservation_name_lang_2: lang_core_reservation_name_lang_2,
				lang_core_reservation_email: lang_core_reservation_email,
					lang_core_reservation_email_lang_2: lang_core_reservation_email_lang_2,
				lang_core_reservation_phone: lang_core_reservation_phone,
					lang_core_reservation_phone_lang_2: lang_core_reservation_phone_lang_2,
				lang_core_reservation_message: lang_core_reservation_message,
					lang_core_reservation_message_lang_2: lang_core_reservation_message_lang_2,
				lang_core_reservation_phone_text: lang_core_reservation_phone_text,
					lang_core_reservation_phone_text_lang_2: lang_core_reservation_phone_text_lang_2,
				lang_core_reservation_button: lang_core_reservation_button,
					lang_core_reservation_button_lang_2: lang_core_reservation_button_lang_2,
				lang_core_footer_navigate: lang_core_footer_navigate,
					lang_core_footer_navigate_lang_2: lang_core_footer_navigate_lang_2,
				lang_core_footer_news_title: lang_core_footer_news_title,
					lang_core_footer_news_title_lang_2: lang_core_footer_news_title_lang_2,
				lang_core_comments_title: lang_core_comments_title,
					lang_core_comments_title_lang_2: lang_core_comments_title_lang_2,
				lang_core_comments_subtitle: lang_core_comments_subtitle,
					lang_core_comments_subtitle_lang_2: lang_core_comments_subtitle_lang_2,
				lang_core_comments_reply: lang_core_comments_reply,
					lang_core_comments_reply_lang_2: lang_core_comments_reply_lang_2,
				lang_core_comments_name: lang_core_comments_name,
					lang_core_comments_name_lang_2: lang_core_comments_name_lang_2,
				lang_core_comments_email: lang_core_comments_email,
					lang_core_comments_email_lang_2: lang_core_comments_email_lang_2,
				lang_core_comments_message: lang_core_comments_message,
					lang_core_comments_message_lang_2: lang_core_comments_message_lang_2,
				lang_core_comments_button: lang_core_comments_button,
					lang_core_comments_button_lang_2: lang_core_comments_button_lang_2,
				lang_core_comments_moderation: lang_core_comments_moderation,
					lang_core_comments_moderation_lang_2: lang_core_comments_moderation_lang_2,

				layouts_accommodation: layouts_accommodation,
				layouts_poi: layouts_poi,
				layouts_room: layouts_room,
				layouts_poi_detail: layouts_poi_detail,
				layouts_gallery: layouts_gallery,
				layouts_contact: layouts_contact,
				layouts_reservation: layouts_reservation,
				layouts_news: layouts_news,
				layouts_post: layouts_post,
				layouts_page: layouts_page
			};

			// Show message
			$.post(ajaxurl, data, function(response){

			})
			.success(function(){ $('.message').html('Settings Saved.').css('display','block'); })
			.error(function(){ alert('error'); })
			.complete(function() { $('#message').html('Complete!').hide(); });

		});
	});

</script>

<?php
}

// Save all
add_action('wp_ajax_general_settings_save', 'general_settings_save');
function general_settings_save(){

	$theme_logo = $_POST['theme_logo'];
	$theme_favicon = $_POST['theme_favicon'];
	$basic_address_street = $_POST['basic_address_street'];
	$basic_address_postcode = $_POST['basic_address_postcode'];
	$basic_address_city = $_POST['basic_address_city'];
	$basic_address_country = $_POST['basic_address_country'];
	$basic_address_latitude = $_POST['basic_address_latitude'];
	$basic_address_longtitude = $_POST['basic_address_longtitude'];
	$basic_address_directions = $_POST['basic_address_directions'];
		$basic_address_directions_lang_2 = $_POST['basic_address_directions_lang_2'];	
	$basic_phone = $_POST['basic_phone'];
	
	$home_facilities = $_POST['home_facilities'];
		$home_facilities_lang_2 = $_POST['home_facilities_lang_2'];
	$home_facilities_title = $_POST['home_facilities_title'];
		$home_facilities_title_lang_2 = $_POST['home_facilities_title_lang_2'];
	
	$home_welcome = $_POST['home_welcome'];
		$home_welcome_lang_2 = $_POST['home_welcome_lang_2'];
	$home_welcome_title = $_POST['home_welcome_title'];
		$home_welcome_title_lang_2 = $_POST['home_welcome_title_lang_2'];
	
	$basic_socials_facebook = $_POST['basic_socials_facebook'];
	$basic_socials_twitter = $_POST['basic_socials_twitter'];
	$basic_socials_instagram = $_POST['basic_socials_instagram'];
	$basic_socials_youtube = $_POST['basic_socials_youtube'];
	$basic_socials_tripadvisor = $_POST['basic_socials_tripadvisor'];
	$basic_socials_vimeo = $_POST['basic_socials_vimeo'];
	$basic_socials_tumblr = $_POST['basic_socials_tumblr'];
	$basic_socials_pinterest = $_POST['basic_socials_pinterest'];
	$basic_socials_foursquare = $_POST['basic_socials_foursquare'];
	$basic_socials_skype = $_POST['basic_socials_skype'];
	$basic_socials_google = $_POST['basic_socials_google'];

	$testimonials_1_image = $_POST['testimonials_1_image'];
	$testimonials_1_name = $_POST['testimonials_1_name'];
	$testimonials_1_review = $_POST['testimonials_1_review'];
		$testimonials_1_review_lang_2 = $_POST['testimonials_1_review_lang_2'];
	$testimonials_2_image = $_POST['testimonials_2_image'];
	$testimonials_2_name = $_POST['testimonials_2_name'];
	$testimonials_2_review = $_POST['testimonials_2_review'];
		$testimonials_2_review_lang_2 = $_POST['testimonials_2_review_lang_2'];
	$testimonials_3_image = $_POST['testimonials_3_image'];
	$testimonials_3_name = $_POST['testimonials_3_name'];
	$testimonials_3_review = $_POST['testimonials_3_review'];
		$testimonials_3_review_lang_2 = $_POST['testimonials_3_review_lang_2'];
	$testimonials_4_image = $_POST['testimonials_4_image'];
	$testimonials_4_name = $_POST['testimonials_4_name'];
	$testimonials_4_review = $_POST['testimonials_4_review'];
		$testimonials_4_review_lang_2 = $_POST['testimonials_4_review_lang_2'];

	$basic_color = $_POST['basic_color'];

	$basic_background_image = $_POST['basic_background_image'];
	$basic_background_color = $_POST['basic_background_color'];

	$basic_slider_1 = $_POST['basic_slider_1'];
	$basic_slider_2 = $_POST['basic_slider_2'];
	$basic_slider_3 = $_POST['basic_slider_3'];
	$basic_slider_4 = $_POST['basic_slider_4'];
	$basic_slider_5 = $_POST['basic_slider_5'];
	$basic_slider_video_switch = $_POST['basic_slider_video_switch'];
	$basic_slider_video_mp4 = $_POST['basic_slider_video_mp4'];
	$basic_slider_video_webm = $_POST['basic_slider_video_webm'];
	$basic_slider_video_ogg = $_POST['basic_slider_video_ogg'];

	$basic_gallery_1 = $_POST['basic_gallery_1'];
	$basic_gallery_2 = $_POST['basic_gallery_2'];
	$basic_gallery_3 = $_POST['basic_gallery_3'];
	$basic_gallery_4 = $_POST['basic_gallery_4'];
	$basic_gallery_5 = $_POST['basic_gallery_5'];
	$basic_gallery_6 = $_POST['basic_gallery_6'];

	$reservation_switch = $_POST['reservation_switch'];	
	$reservation_message = $_POST['reservation_message'];
		$reservation_message_lang_2 = $_POST['reservation_message_lang_2'];
	$reservation_email_switch = $_POST['reservation_email_switch'];
	$reservation_email_subject = $_POST['reservation_email_subject'];
		$reservation_email_subject_lang_2 = $_POST['reservation_email_subject_lang_2'];
	$reservation_email = $_POST['reservation_email'];
		$reservation_email_lang_2 = $_POST['reservation_email_lang_2'];	

	$widget_accommodation_switch = $_POST['widget_accommodation_switch'];	
	$widget_accommodation_title = $_POST['widget_accommodation_title'];
		$widget_accommodation_title_lang_2 = $_POST['widget_accommodation_title_lang_2'];
	$widget_accommodation_count = $_POST['widget_accommodation_count'];	

	$widget_poi_switch = $_POST['widget_poi_switch'];	
	$widget_poi_title = $_POST['widget_poi_title'];
		$widget_poi_title_lang_2 = $_POST['widget_poi_title_lang_2'];
	$widget_poi_count = $_POST['widget_poi_count'];	

	$widget_gallery_switch = $_POST['widget_gallery_switch'];	
	$widget_gallery_title = $_POST['widget_gallery_title'];
		$widget_gallery_title_lang_2 = $_POST['widget_gallery_title_lang_2'];	

	$lang_switch = $_POST['lang_switch'];
	$lang_default_name = $_POST['lang_default_name'];
	$lang_secondary_name = $_POST['lang_secondary_name'];	

	$lang_core_detail_button = $_POST['lang_core_detail_button'];
		$lang_core_detail_button_lang_2 = $_POST['lang_core_detail_button_lang_2'];
	$lang_core_book_button = $_POST['lang_core_book_button'];
		$lang_core_book_button_lang_2 = $_POST['lang_core_book_button_lang_2'];
	$lang_core_amenities = $_POST['lang_core_amenities'];
		$lang_core_amenities_lang_2 = $_POST['lang_core_amenities_lang_2'];
	$lang_core_contact_name = $_POST['lang_core_contact_name'];
		$lang_core_contact_name_lang_2 = $_POST['lang_core_contact_name_lang_2'];
	$lang_core_contact_email = $_POST['lang_core_contact_email'];
		$lang_core_contact_email_lang_2 = $_POST['lang_core_contact_email_lang_2'];
	$lang_core_contact_message = $_POST['lang_core_contact_message'];
		$lang_core_contact_message_lang_2 = $_POST['lang_core_contact_message_lang_2'];
	$lang_core_contact_message_top = $_POST['lang_core_contact_message_top'];
		$lang_core_contact_message_top_lang_2 = $_POST['lang_core_contact_message_top_lang_2'];
	$lang_core_contact_button = $_POST['lang_core_contact_button'];
		$lang_core_contact_button_lang_2 = $_POST['lang_core_contact_button_lang_2'];
	$lang_core_reservation_check_in = $_POST['lang_core_reservation_check_in'];
		$lang_core_reservation_check_in_lang_2 = $_POST['lang_core_reservation_check_in_lang_2'];
	$lang_core_reservation_check_out = $_POST['lang_core_reservation_check_out'];
		$lang_core_reservation_check_out_lang_2 = $_POST['lang_core_reservation_check_out_lang_2'];
	$lang_core_reservation_people = $_POST['lang_core_reservation_people'];
		$lang_core_reservation_people_lang_2 = $_POST['lang_core_reservation_people_lang_2'];
	$lang_core_reservation_name = $_POST['lang_core_reservation_name'];
		$lang_core_reservation_name_lang_2 = $_POST['lang_core_reservation_name_lang_2'];
	$lang_core_reservation_email = $_POST['lang_core_reservation_email'];
		$lang_core_reservation_email_lang_2 = $_POST['lang_core_reservation_email_lang_2'];
	$lang_core_reservation_phone = $_POST['lang_core_reservation_phone'];
		$lang_core_reservation_phone_lang_2 = $_POST['lang_core_reservation_phone_lang_2'];
	$lang_core_reservation_message = $_POST['lang_core_reservation_message'];
		$lang_core_reservation_message_lang_2 = $_POST['lang_core_reservation_message_lang_2'];
	$lang_core_reservation_phone_text = $_POST['lang_core_reservation_phone_text'];
		$lang_core_reservation_phone_text_lang_2 = $_POST['lang_core_reservation_phone_text_lang_2'];
	$lang_core_reservation_button = $_POST['lang_core_reservation_button'];
		$lang_core_reservation_button_lang_2 = $_POST['lang_core_reservation_button_lang_2'];
	$lang_core_footer_navigate = $_POST['lang_core_footer_navigate'];
		$lang_core_footer_navigate_lang_2 = $_POST['lang_core_footer_navigate_lang_2'];
	$lang_core_footer_news_title = $_POST['lang_core_footer_news_title'];
		$lang_core_footer_news_title_lang_2 = $_POST['lang_core_footer_news_title_lang_2'];
	$lang_core_comments_title = $_POST['lang_core_comments_title'];
		$lang_core_comments_title_lang_2 = $_POST['lang_core_comments_title_lang_2'];
	$lang_core_comments_subtitle = $_POST['lang_core_comments_subtitle'];
		$lang_core_comments_subtitle_lang_2 = $_POST['lang_core_comments_subtitle_lang_2'];
	$lang_core_comments_reply = $_POST['lang_core_comments_reply'];
		$lang_core_comments_reply_lang_2 = $_POST['lang_core_comments_reply_lang_2'];
	$lang_core_comments_name = $_POST['lang_core_comments_name'];
		$lang_core_comments_name_lang_2 = $_POST['lang_core_comments_name_lang_2'];
	$lang_core_comments_email = $_POST['lang_core_comments_email'];
		$lang_core_comments_email_lang_2 = $_POST['lang_core_comments_email_lang_2'];
	$lang_core_comments_message = $_POST['lang_core_comments_message'];
		$lang_core_comments_message_lang_2 = $_POST['lang_core_comments_message_lang_2'];
	$lang_core_comments_button = $_POST['lang_core_comments_button'];
		$lang_core_comments_button_lang_2 = $_POST['lang_core_comments_button_lang_2'];
	$lang_core_comments_moderation = $_POST['lang_core_comments_moderation'];
		$lang_core_comments_moderation_lang_2 = $_POST['lang_core_comments_moderation_lang_2'];

	$layouts_accommodation = $_POST['layouts_accommodation'];
	$layouts_poi = $_POST['layouts_poi'];
	$layouts_room = $_POST['layouts_room'];
	$layouts_poi_detail = $_POST['layouts_poi_detail'];
	$layouts_gallery = $_POST['layouts_gallery'];
	$layouts_contact = $_POST['layouts_contact'];
	$layouts_reservation = $_POST['layouts_reservation'];
	$layouts_news = $_POST['layouts_news'];
	$layouts_post = $_POST['layouts_post'];	
	$layouts_page = $_POST['layouts_page'];		


	update_option('theme_logo', $theme_logo);
	update_option('theme_favicon', $theme_favicon);
	update_option('basic_address_street', $basic_address_street);
	update_option('basic_address_postcode', $basic_address_postcode);
	update_option('basic_address_city', $basic_address_city);
	update_option('basic_address_country', $basic_address_country);
	update_option('basic_address_latitude', $basic_address_latitude);
	update_option('basic_address_longtitude', $basic_address_longtitude);
	update_option('basic_address_directions', $basic_address_directions);
		update_option('basic_address_directions_lang_2', $basic_address_directions_lang_2);
	update_option('basic_phone', $basic_phone);
	
	update_option('home_facilities', $home_facilities);
		update_option('home_facilities_lang_2', $home_facilities_lang_2);
	update_option('home_facilities_title', $home_facilities_title);
		update_option('home_facilities_title_lang_2', $home_facilities_title_lang_2);
	
	update_option('home_welcome', $home_welcome);
		update_option('home_welcome_lang_2', $home_welcome_lang_2);
	update_option('home_welcome_title', $home_welcome_title);
		update_option('home_welcome_title_lang_2', $home_welcome_title_lang_2);
	
	update_option('basic_socials_facebook', $basic_socials_facebook);
	update_option('basic_socials_twitter', $basic_socials_twitter);
	update_option('basic_socials_instagram', $basic_socials_instagram);
	update_option('basic_socials_youtube', $basic_socials_youtube);
	update_option('basic_socials_tripadvisor', $basic_socials_tripadvisor);
	update_option('basic_socials_vimeo', $basic_socials_vimeo);
	update_option('basic_socials_tumblr', $basic_socials_tumblr);
	update_option('basic_socials_pinterest', $basic_socials_pinterest);
	update_option('basic_socials_foursquare', $basic_socials_foursquare);
	update_option('basic_socials_skype', $basic_socials_skype);
	update_option('basic_socials_google', $basic_socials_google);

	update_option('testimonials_1_image', $testimonials_1_image);
	update_option('testimonials_1_name', $testimonials_1_name);
	update_option('testimonials_1_review', $testimonials_1_review);
		update_option('testimonials_1_review_lang_2', $testimonials_1_review_lang_2);
	update_option('testimonials_2_image', $testimonials_2_image);
	update_option('testimonials_2_name', $testimonials_2_name);
	update_option('testimonials_2_review', $testimonials_2_review);
		update_option('testimonials_2_review_lang_2', $testimonials_2_review_lang_2);
	update_option('testimonials_3_image', $testimonials_3_image);
	update_option('testimonials_3_name', $testimonials_3_name);
	update_option('testimonials_3_review', $testimonials_3_review);
		update_option('testimonials_3_review_lang_2', $testimonials_3_review_lang_2);
	update_option('testimonials_4_image', $testimonials_4_image);
	update_option('testimonials_4_name', $testimonials_4_name);
	update_option('testimonials_4_review', $testimonials_4_review);
		update_option('testimonials_4_review_lang_2', $testimonials_4_review_lang_2);

	update_option('basic_color', $basic_color);

	update_option('basic_background_image', $basic_background_image);
	update_option('basic_background_color', $basic_background_color);

	update_option('basic_slider_1', $basic_slider_1);
	update_option('basic_slider_2', $basic_slider_2);
	update_option('basic_slider_3', $basic_slider_3);
	update_option('basic_slider_4', $basic_slider_4);
	update_option('basic_slider_5', $basic_slider_5);
	update_option('basic_slider_video_switch', $basic_slider_video_switch);
	update_option('basic_slider_video_mp4', $basic_slider_video_mp4);
	update_option('basic_slider_video_webm', $basic_slider_video_webm);
	update_option('basic_slider_video_ogg', $basic_slider_video_ogg);

	update_option('basic_gallery_1', $basic_gallery_1);
	update_option('basic_gallery_2', $basic_gallery_2);
	update_option('basic_gallery_3', $basic_gallery_3);
	update_option('basic_gallery_4', $basic_gallery_4);
	update_option('basic_gallery_5', $basic_gallery_5);
	update_option('basic_gallery_6', $basic_gallery_6);

	update_option('reservation_switch', $reservation_switch);
	update_option('reservation_message', $reservation_message);
		update_option('reservation_message_lang_2', $reservation_message_lang_2);
	update_option('reservation_email_switch', $reservation_email_switch);
	update_option('reservation_email_subject', $reservation_email_subject);
		update_option('reservation_email_subject_lang_2', $reservation_email_subject_lang_2);
	update_option('reservation_email', $reservation_email);
		update_option('reservation_email_lang_2', $reservation_email_lang_2);

	update_option('widget_accommodation_switch', $widget_accommodation_switch);
	update_option('widget_accommodation_title', $widget_accommodation_title);
		update_option('widget_accommodation_title_lang_2', $widget_accommodation_title_lang_2);
	update_option('widget_accommodation_count', $widget_accommodation_count);

	update_option('widget_poi_switch', $widget_poi_switch);
	update_option('widget_poi_title', $widget_poi_title);
		update_option('widget_poi_title_lang_2', $widget_poi_title_lang_2);
	update_option('widget_poi_count', $widget_poi_count);

	update_option('widget_gallery_switch', $widget_gallery_switch);
	update_option('widget_gallery_title', $widget_gallery_title);
		update_option('widget_gallery_title_lang_2', $widget_gallery_title_lang_2);

	update_option('lang_switch', $lang_switch);
	update_option('lang_default_name', $lang_default_name);
	update_option('lang_secondary_name', $lang_secondary_name);

	update_option('lang_core_detail_button', $lang_core_detail_button);
		update_option('lang_core_detail_button_lang_2', $lang_core_detail_button_lang_2);
	update_option('lang_core_book_button', $lang_core_book_button);
		update_option('lang_core_book_button_lang_2', $lang_core_book_button_lang_2);
	update_option('lang_core_amenities', $lang_core_amenities);
		update_option('lang_core_amenities_lang_2', $lang_core_amenities_lang_2);
	update_option('lang_core_contact_name', $lang_core_contact_name);
		update_option('lang_core_contact_name_lang_2', $lang_core_contact_name_lang_2);
	update_option('lang_core_contact_email', $lang_core_contact_email);
		update_option('lang_core_contact_email_lang_2', $lang_core_contact_email_lang_2);
	update_option('lang_core_contact_message', $lang_core_contact_message);
		update_option('lang_core_contact_message_lang_2', $lang_core_contact_message_lang_2);
	update_option('lang_core_contact_message_top', $lang_core_contact_message_top);
		update_option('lang_core_contact_message_top_lang_2', $lang_core_contact_message_top_lang_2);
	update_option('lang_core_contact_button', $lang_core_contact_button);
		update_option('lang_core_contact_button_lang_2', $lang_core_contact_button_lang_2);
	update_option('lang_core_reservation_check_in', $lang_core_reservation_check_in);
		update_option('lang_core_reservation_check_in_lang_2', $lang_core_reservation_check_in_lang_2);
	update_option('lang_core_reservation_check_out', $lang_core_reservation_check_out);
		update_option('lang_core_reservation_check_out_lang_2', $lang_core_reservation_check_out_lang_2);
	update_option('lang_core_reservation_people', $lang_core_reservation_people);
		update_option('lang_core_reservation_people_lang_2', $lang_core_reservation_people_lang_2);
	update_option('lang_core_reservation_name', $lang_core_reservation_name);
		update_option('lang_core_reservation_name_lang_2', $lang_core_reservation_name_lang_2);
	update_option('lang_core_reservation_email', $lang_core_reservation_email);
		update_option('lang_core_reservation_email_lang_2', $lang_core_reservation_email_lang_2);
	update_option('lang_core_reservation_phone', $lang_core_reservation_phone);
		update_option('lang_core_reservation_phone_lang_2', $lang_core_reservation_phone_lang_2);
	update_option('lang_core_reservation_message', $lang_core_reservation_message);
		update_option('lang_core_reservation_message_lang_2', $lang_core_reservation_message_lang_2);
	update_option('lang_core_reservation_phone_text', $lang_core_reservation_phone_text);
		update_option('lang_core_reservation_phone_text_lang_2', $lang_core_reservation_phone_text_lang_2);
	update_option('lang_core_reservation_button', $lang_core_reservation_button);
		update_option('lang_core_reservation_button_lang_2', $lang_core_reservation_button_lang_2);
	update_option('lang_core_footer_navigate', $lang_core_footer_navigate);
		update_option('lang_core_footer_navigate_lang_2', $lang_core_footer_navigate_lang_2);
	update_option('lang_core_footer_news_title', $lang_core_footer_news_title);
		update_option('lang_core_footer_news_title_lang_2', $lang_core_footer_news_title_lang_2);
	update_option('lang_core_comments_title', $lang_core_comments_title);
		update_option('lang_core_comments_title_lang_2', $lang_core_comments_title_lang_2);
	update_option('lang_core_comments_subtitle', $lang_core_comments_subtitle);
		update_option('lang_core_comments_subtitle_lang_2', $lang_core_comments_subtitle_lang_2);
	update_option('lang_core_comments_reply', $lang_core_comments_reply);
		update_option('lang_core_comments_reply_lang_2', $lang_core_comments_reply_lang_2);
	update_option('lang_core_comments_name', $lang_core_comments_name);
		update_option('lang_core_comments_name_lang_2', $lang_core_comments_name_lang_2);
	update_option('lang_core_comments_email', $lang_core_comments_email);
		update_option('lang_core_comments_email_lang_2', $lang_core_comments_email_lang_2);
	update_option('lang_core_comments_message', $lang_core_comments_message);
		update_option('lang_core_comments_message_lang_2', $lang_core_comments_message_lang_2);
	update_option('lang_core_comments_button', $lang_core_comments_button);
		update_option('lang_core_comments_button_lang_2', $lang_core_comments_button_lang_2);
	update_option('lang_core_comments_moderation', $lang_core_comments_moderation);
		update_option('lang_core_comments_moderation_lang_2', $lang_core_comments_moderation_lang_2);

	update_option('layouts_accommodation', $layouts_accommodation);
	update_option('layouts_poi', $layouts_poi);
	update_option('layouts_room', $layouts_room);
	update_option('layouts_poi_detail', $layouts_poi_detail);
	update_option('layouts_gallery', $layouts_gallery);
	update_option('layouts_contact', $layouts_contact);
	update_option('layouts_reservation', $layouts_reservation);
	update_option('layouts_news', $layouts_news);
	update_option('layouts_post', $layouts_post);
	update_option('layouts_page', $layouts_page);

	die;
}
?>