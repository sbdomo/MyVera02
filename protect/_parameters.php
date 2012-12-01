<?php
$config["login"] = "";
$config["pass"] = "";

/////////////////////////////////////////////
// NE PAS EDITER EN DESSOUS DE CETTE LIGNE //

$name= null;
if (isset($_SERVER['PHP_AUTH_USER']))
	$name = $_SERVER['PHP_AUTH_USER'];

$password= null;
if (isset($_SERVER['PHP_AUTH_PW']))
	$password = $_SERVER['PHP_AUTH_PW'];

if ($name != $config['login'] || $password != $config['pass'])
	exit(); // Oui oui, degueu :/

// Si on arrive ici, alors cest cool :)	
	
?>