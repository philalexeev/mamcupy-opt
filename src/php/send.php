<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$question = $_POST['question'];

	$name = htmlspecialchars($name);
	$email = htmlspecialchars($email);
	$phone = htmlspecialchars($phone);
	$question = htmlspecialchars($question);

	$name = urldecode($name);
	$email = urldecode($email);
	$phone = urldecode($phone);
	$question = urldecode($question);

	$name = trim($name);
	$email = trim($email);
	$phone = trim($phone);
	$question = trim($question);

	mail("example@mail.ru",
	"Заявка с сайта 'Мам, купи! - опт'",
	"ФИО:".$name.". E-mail: ".$email.". Комментарий:".$question,
	"From: example2@mail.ru \r\n");
?>
