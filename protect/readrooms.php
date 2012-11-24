<?php
header('Content-Type: text/html; charset=utf-8');
$success="false";
$result="";

$ipvera=$_GET["ipvera"];
$vera = 'http://'.$ipvera.':3480';
$url=$vera.'/data_request?id=sdata';

$json=file_get_contents($url);
$json = json_decode($json, true);
$rooms= $json['rooms'];
$rooms[]= array (
	'name' => "Aucune pièce",
	'id' => "0",
	'section' => 1
	);
$rooms=json_encode($rooms);
//print_r($rooms);
//echo $rooms;
$success="true";
echo '{"success":"'.$success.'", "rooms":'.$rooms.'}';
?>