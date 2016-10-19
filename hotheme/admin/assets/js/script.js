jQuery(document).ready(function($){

	// Upload favicon
	$("input[id^='theme_favicon_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#theme_favicon").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	// Upload logo
	$("input[id^='theme_logo_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#theme_logo").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	// Upload testimonials images
	$("input[id^='testimonials_1_image_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#testimonials_1_image").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='testimonials_2_image_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#testimonials_2_image").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='testimonials_3_image_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#testimonials_3_image").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='testimonials_4_image_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#testimonials_4_image").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	
	// Background img select
	var template_url = $('#template_url').val();
	$('#basic_background_preset_1').click(function(e) {
		$('#basic_background_image').val(template_url + '/assets/img/background_preset_1.jpg');
		$('#basic_background_preset_1 img').addClass('selected');
		$('#basic_background_preset_2 img').removeClass('selected');
		$('#basic_background_preset_3 img').removeClass('selected');
		$('#basic_background_preset_4 img').removeClass('selected');
	});
	$('#basic_background_preset_2').click(function(e) {
		$('#basic_background_image').val(template_url + '/assets/img/background_preset_2.jpg');
		$('#basic_background_preset_2 img').addClass('selected');
		$('#basic_background_preset_1 img').removeClass('selected');
		$('#basic_background_preset_3 img').removeClass('selected');
		$('#basic_background_preset_4 img').removeClass('selected');
	});
	$('#basic_background_preset_3').click(function(e) {
		$('#basic_background_image').val(template_url + '/assets/img/background_preset_3.jpg');
		$('#basic_background_preset_3 img').addClass('selected');
		$('#basic_background_preset_2 img').removeClass('selected');
		$('#basic_background_preset_1 img').removeClass('selected');
		$('#basic_background_preset_4 img').removeClass('selected');
	});
	$('#basic_background_preset_4').click(function(e) {
		$('#basic_background_image').val(template_url + '/assets/img/background_preset_4.jpg');
		$('#basic_background_preset_4 img').addClass('selected');
		$('#basic_background_preset_2 img').removeClass('selected');
		$('#basic_background_preset_3 img').removeClass('selected');
		$('#basic_background_preset_1 img').removeClass('selected');
	});

	// Layouts
	$('#layouts_accommodation_1').click(function(e) {
		$('#layouts_accommodation').val('list-default');
		$('#layouts_accommodation_1 img').addClass('selected');
		$('#layouts_accommodation_2 img').removeClass('selected');
	});
	$('#layouts_accommodation_2').click(function(e) {
		$('#layouts_accommodation').val('list-square');
		$('#layouts_accommodation_2 img').addClass('selected');
		$('#layouts_accommodation_1 img').removeClass('selected');
	});
	$('#layouts_poi_1').click(function(e) {
		$('#layouts_poi').val('list-default');
		$('#layouts_poi_1 img').addClass('selected');
		$('#layouts_poi_2 img').removeClass('selected');
	});
	$('#layouts_poi_2').click(function(e) {
		$('#layouts_poi').val('list-square');
		$('#layouts_poi_2 img').addClass('selected');
		$('#layouts_poi_1 img').removeClass('selected');
	});
	$('#layouts_room_1').click(function(e) {
		$('#layouts_room').val('no-sidebar');
		$('#layouts_room_1 img').addClass('selected');
		$('#layouts_room_2 img').removeClass('selected');
	});
	$('#layouts_room_2').click(function(e) {
		$('#layouts_room').val('with-sidebar');
		$('#layouts_room_2 img').addClass('selected');
		$('#layouts_room_1 img').removeClass('selected');
	});
	$('#layouts_poi_detail_1').click(function(e) {
		$('#layouts_poi_detail').val('no-sidebar');
		$('#layouts_poi_detail_1 img').addClass('selected');
		$('#layouts_poi_detail_2 img').removeClass('selected');
	});
	$('#layouts_poi_detail_2').click(function(e) {
		$('#layouts_poi_detail').val('with-sidebar');
		$('#layouts_poi_detail_2 img').addClass('selected');
		$('#layouts_poi_detail_1 img').removeClass('selected');
	});
	$('#layouts_gallery_1').click(function(e) {
		$('#layouts_gallery').val('no-sidebar');
		$('#layouts_gallery_1 img').addClass('selected');
		$('#layouts_gallery_2 img').removeClass('selected');
	});
	$('#layouts_gallery_2').click(function(e) {
		$('#layouts_gallery').val('with-sidebar');
		$('#layouts_gallery_2 img').addClass('selected');
		$('#layouts_gallery_1 img').removeClass('selected');
	});
	$('#layouts_contact_1').click(function(e) {
		$('#layouts_contact').val('no-sidebar');
		$('#layouts_contact_1 img').addClass('selected');
		$('#layouts_contact_2 img').removeClass('selected');
	});
	$('#layouts_contact_2').click(function(e) {
		$('#layouts_contact').val('with-sidebar');
		$('#layouts_contact_2 img').addClass('selected');
		$('#layouts_contact_1 img').removeClass('selected');
	});
	$('#layouts_reservation_1').click(function(e) {
		$('#layouts_reservation').val('no-sidebar');
		$('#layouts_reservation_1 img').addClass('selected');
		$('#layouts_reservation_2 img').removeClass('selected');
	});
	$('#layouts_reservation_2').click(function(e) {
		$('#layouts_reservation').val('with-sidebar');
		$('#layouts_reservation_2 img').addClass('selected');
		$('#layouts_reservation_1 img').removeClass('selected');
	});
	$('#layouts_news_1').click(function(e) {
		$('#layouts_news').val('no-sidebar');
		$('#layouts_news_1 img').addClass('selected');
		$('#layouts_news_2 img').removeClass('selected');
	});
	$('#layouts_news_2').click(function(e) {
		$('#layouts_news').val('with-sidebar');
		$('#layouts_news_2 img').addClass('selected');
		$('#layouts_news_1 img').removeClass('selected');
	});
	$('#layouts_post_1').click(function(e) {
		$('#layouts_post').val('no-sidebar');
		$('#layouts_post_1 img').addClass('selected');
		$('#layouts_post_2 img').removeClass('selected');
	});
	$('#layouts_post_2').click(function(e) {
		$('#layouts_post').val('with-sidebar');
		$('#layouts_post_2 img').addClass('selected');
		$('#layouts_post_1 img').removeClass('selected');
	});
	$('#layouts_page_1').click(function(e) {
		$('#layouts_page').val('no-sidebar');
		$('#layouts_page_1 img').addClass('selected');
		$('#layouts_page_2 img').removeClass('selected');
	});
	$('#layouts_page_2').click(function(e) {
		$('#layouts_page').val('with-sidebar');
		$('#layouts_page_2 img').addClass('selected');
		$('#layouts_page_1 img').removeClass('selected');
	});

	$("input[id^='basic_background_image_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_background_image").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	// Basic Slider
	$("input[id^='basic_slider_1_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_1").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_2_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_2").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_3_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_3").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_4_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_4").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_5_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_5").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_video_button_mp4']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_video_mp4").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_video_button_webm']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_video_webm").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_slider_video_button_ogg']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_slider_video_ogg").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	// Basic Gallery Homepage
	$("input[id^='basic_gallery_1_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_1").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_gallery_2_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_2").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_gallery_3_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_3").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_gallery_4_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_4").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_gallery_5_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_5").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	$("input[id^='basic_gallery_6_button']").click(function(e) {
		var send_attachment_bkp = wp.media.editor.send.attachment;
		var button = $(this);
		var id = button.attr('id').replace('_button', '');
		wp.media.editor.send.attachment = function(props, attachment){
			$("#basic_gallery_6").val(attachment.url);
			wp.media.editor.send.attachment = send_attachment_bkp;
		} 
		wp.media.editor.open(button);
		return false;
	});

	// MENU
	$("#menu-option-basic-settings").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-basic-settings').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-homepage-photo-slider").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-homepage-photo-slider').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-homepage-welcome").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-homepage-welcome').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-homepage-facilities").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-homepage-facilities').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-homepage-testimonials").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-homepage-testimonials').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-homepage-gallery").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-homepage-gallery').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-reservation").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-reservation').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-socials").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-socials').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-widgets").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-widgets').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-languages").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-languages').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-translation").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-translation').css('display','block');
		$('.message').html('').css('display','none');
	});
	$("#menu-option-layouts").click(function(e) {
		$('.option-page').css('display','none');
		$('.option-page-layouts').css('display','block');
		$('.message').html('').css('display','none');
	});

});