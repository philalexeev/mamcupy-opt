<?php
	$phone = $_POST['phone'];

	$phone = htmlspecialchars($phone);

	$phone = urldecode($phone);

	$phone = trim($phone);

	mail("example@mail.ru",
	"Заявка на перезвонить с сайта 'Мам, купи! - опт'",
	"Контактный телефон: ".$phone,
	"From: example2@mail.ru \r\n");
?>
