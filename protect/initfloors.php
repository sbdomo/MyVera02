<?php
//inclog
$profil=$_GET["profil"];
$fichierjson="./config/floors";

if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$fichierjson=$fichierjson.".json";
}

$floors=array();

$floors[]= array (
	'id' => -1,
	'name' => "Aucune vue",
	'path' => "",
	'ind' => 99
	);
$floorsencode='{"floors":'.json_encode($floors).'}';
file_put_contents($fichierjson, $floorsencode);
echo 'OK';
?>