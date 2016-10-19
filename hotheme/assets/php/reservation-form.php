<?php

$reservation_message = $_POST['reservation_message'];

// Redirect back
Header('Location: '. $_POST['reservation-url'].'?message='.$reservation_message);
echo "<meta charset='utf-8'>";  

// Loading variables from form
$blog_name = $_POST['blog_name'];
$blog_email = $_POST['blog_email'];
$reservation_email_subject = $_POST['reservation_email_subject'];
$reservation_email = $_POST['reservation_email'];
$reservation_email_switch = $_POST['reservation_email_switch'];

$room = $_POST['reservation-room'];
$checkin = $_POST['reservation-checkin'];
$checkout = $_POST['reservation-checkout'];
$people = $_POST['reservation-people'];

$name = $_POST['reservation-name'];
$email = $_POST['reservation-email'];
$phone = $_POST['reservation-phone'];
$message = $_POST['reservation-message'];

if($reservation_email_switch == 'on'){
	// EMAIL TO CLIENT
	// SET info to email
		// From in format NAME <email>
		$from = $blog_name.'<'.$blog_email.'>';

		// Reply to in format NAME <email>
		$reply = $blog_name.'<'.$blog_email.'>';

		// Subject
		$subject = $reservation_email_subject;

		// Message
		$message = $reservation_email;
	//

	$to = $email;
	$headers = 'From: '. $from . "\r\n" .
	    'Reply-To: '. $reply . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();
	// Send mail
	mail($to,$subject,$message,$headers);
	// END OF EMAIL TO CLIENT
	// ---------------------
}

// EMAIL TO RESERVATION CREW
$message = $_POST['reservation-message'];
$headers = 'From: '. $name . '<' . $email . '>' . "\r\n" .
    'Reply-To: '. $name . '<' . $email . '>' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
$subject = 'Reservation for room #' . $room;
$message = 'Name: ' . $name . '
Room: #' . $room . '

Check in: ' . $checkin . '
Check out: ' . $checkout . '
Number of people: ' . $people . '

Email: ' . $email . '
Phone: ' . $phone . '

' . $message;

$to = $blog_email;

// Send mail
mail($to,$subject,$message,$headers);
// END OF EMAIL TO RESERVATION CREW
// ---------------------

exit();

?>