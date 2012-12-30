<?php
//inclog
$profil=$_GET["profil"];
$fichierjson="./config/tabs";

if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$fichierjson=$fichierjson.".json";
}

$fields=array();

$fields[]= array (
	'id' => 0,
	'name' => "Vues",
	'cls' => "2",
	'ind' => 90
	);
$fieldsencode='{"tabs":'.json_encode($fields).'}';
file_put_contents($fichierjson, $fieldsencode);
echo 'OK';
?>