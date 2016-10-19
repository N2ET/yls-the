// Slider
function swapImages(){
  var active = jQuery('.slider .active');
  var next = (jQuery('.slider .active').next().length > 0) ? jQuery('.slider .active').next() : jQuery('.slider img:first');
  next.fadeIn().addClass('active');
  active.fadeOut(function(){
    active.removeClass('active');
  });
}

jQuery(document).ready(function($){

	// Slider
		// Run our swapImages() function every 5secs
      	setInterval('swapImages()', 5000);

  // Datepicker
  $(".datepicker").datepicker({ dateFormat: 'dd/mm/yy' });

  // Gallery in content
  $('.content-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    }
  });

  // Gallery in sidebar
  $('.sidebar-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    }
  });

  // Reservation form VALIDATION
  $("#reservation-form").submit(function() {
    // Load values from inputs
    var value_checkin = $("#reservation-checkin").val();
    var value_checkout = $("#reservation-checkout").val();
    var value_name = $("#reservation-name").val();
    var value_email = $("#reservation-email").val();

    // Everything is all right
    if (value_checkin != '' && value_checkout != '' && value_name != '' && value_email != '') {
      $('#reservation-checkin').removeClass('ipt-error');
        $('.status-checkin').css('left', '-40px');
      $('#reservation-checkout').removeClass('ipt-error');
        $('.status-checkout').css('left', '-40px'); 
      $('#reservation-name').removeClass('ipt-error');
        $('.status-name').css('left', '-40px');  
      $('#reservation-email').removeClass('ipt-error');
        $('.status-email').css('left', '-40px'); 

      return true;
    
    // If not everything ok
    } else {

      // Empty check in
      if (value_checkin == '') {
         $('#reservation-checkin').addClass('ipt-error');
         $('.status-checkin').css('left', '-60px');
         $('.status-checkin').addClass('ipt-error');
         $('.status-checkin').removeClass('ipt-correct');
      }
        else if (value_checkin != '') {
          $('#reservation-checkin').removeClass('ipt-error');
          $('.status-checkin').css('left', '-40px');
          $('.status-checkin').removeClass('ipt-error'); 
          $('.status-checkin').addClass('ipt-correct'); 
        }

      // Empty check out
      if (value_checkout == '') {
         $('#reservation-checkout').addClass('ipt-error');
         $('.status-checkout').css('left', '-60px');
         $('.status-checkout').addClass('ipt-error');
         $('.status-checkout').removeClass('ipt-correct');
      }
        else if (value_checkout != '') {
          $('#reservation-checkout').removeClass('ipt-error');
          $('.status-checkout').css('left', '-40px');
          $('.status-checkout').removeClass('ipt-error'); 
          $('.status-checkout').addClass('ipt-correct');
        }

      // Empty name
      if (value_name == '') {
         $('#reservation-name').addClass('ipt-error');
         $('.status-name').css('left', '-60px');
      } 
        else if (value_name != '') {
          $('#reservation-name').removeClass('ipt-error');
          $('.status-name').css('left', '-40px');  
        }

      // Empty email
      if (value_email == '') {
         $('#reservation-email').addClass('ipt-error');
         $('.status-email').css('left', '-60px');
      } 
        else if (value_email != '') {
          $('#reservation-email').removeClass('ipt-error');
          $('.status-email').css('left', '-40px');  
        }

       // Rest of the form check right
        $('.status-room').css('left', '-40px'); 
        $('.status-people').css('left', '-40px'); 
        $('.status-phone').css('left', '-40px'); 
        $('.status-message').css('left', '-40px'); 


      return false;

    }
   });

  // Reservation form CONTACT
  $("#contact-form").submit(function() {
    // Load values from inputs
    var value_name = $("#contact-name").val();
    var value_email = $("#contact-email").val();
    var value_message = $("#contact-message").val();

    // Everything is all right
    if (value_name != '' && value_email != '' && value_message != '') {
      $('#contact-name').removeClass('ipt-error');
        $('.status-name').css('left', '-40px');  
      $('#contact-email').removeClass('ipt-error');
        $('.status-email').css('left', '-40px');
      $('#contact-message').removeClass('ipt-error');
        $('.status-message').css('left', '-40px');  

      return true;
    
    // If not everything ok
    } else {

      // Empty name
      if (value_name == '') {
         $('#contact-name').addClass('ipt-error');
         $('.status-name').css('left', '-60px');
      } 
        else if (value_name != '') {
          $('#contact-name').removeClass('ipt-error');
          $('.status-name').css('left', '-40px');  
        }

      // Empty email
      if (value_email == '') {
         $('#contact-email').addClass('ipt-error');
         $('.status-email').css('left', '-60px');
      } 
        else if (value_email != '') {
          $('#contact-email').removeClass('ipt-error');
          $('.status-email').css('left', '-40px');  
        }

      // Empty message
      if (value_message == '') {
         $('#contact-message').addClass('ipt-error');
         $('.status-message').css('left', '-60px');
      } 
        else if (value_message != '') {
          $('#contact-message').removeClass('ipt-error');
          $('.status-message').css('left', '-40px');  
        }

      return false;

    }
   });

    // Language Switch
    $('.language-switch').bind('change', function () {
          var url = $(this).val(); // get selected value
          if (url) { // require a URL
              window.location = url; // redirect
          }
          return false;
      });

});