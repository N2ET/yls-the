<?php

$contact_message = $_POST['contact_message'];

// Redirect back
Header('Location: '. $_POST['contact-url'].'?message='.$contact_message);
echo "<meta charset='utf-8'>";  

// Loading variables from form
$blog_email = $_POST['blog_email'];
$name = $_POST['contact-name'];
$email = $_POST['contact-email'];
$message = $_POST['contact-message'];

// EMAIL TO HOTEL CREW
$headers = 'From: '. $name . '<' . $email . '>' . "\r\n" .
    'Reply-To: '. $name . '<' . $email . '>' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
$subject = 'Message';
$message = 'Name: ' . $name . '
Email: ' . $email . '

' . $message;

$to = $blog_email;

// Send mail
mail($to,$subject,$message,$headers);
// END OF EMAIL TO HOTEL CREW
// ---------------------

exit();

?>