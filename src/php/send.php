<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$service = $_POST['service'];
	$question = $_POST['question'];

	$name = htmlspecialchars($name);
	$email = htmlspecialchars($email);
	$phone = htmlspecialchars($phone);
	$service = htmlspecialchars($service);
	$question = htmlspecialchars($question);

	$name = urldecode($name);
	$email = urldecode($email);
	$phone = urldecode($phone);
	$service = urldecode($service);
	$question = urldecode($question);

	$name = trim($name);
	$email = trim($email);
	$phone = trim($phone);
	$service = trim($service);
	$question = trim($question);

	mail("example@mail.ru",
	"Заявка с сайта 'Мам, купи! - опт'",
	"ФИО:".$name.". E-mail: ".$email.". Выбранная услуга: ".$service.". Контактный телефон: ".$phone.". Комментарий:".$question,
	"From: example2@mail.ru \r\n");
?>
