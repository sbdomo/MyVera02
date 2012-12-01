<?php
//inclog
//header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
header("content-type:application/json");
$success="false";

$profil=$_GET["profil"];
$fichierjson="./config/devices";

if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$fichierjson=$fichierjson.".json";
}

if ($json = @file_get_contents('php://input'))
{
$array_json = json_decode($json, true);
$data=array();
foreach ($array_json['devices'] as $device) {
	$data[]=array (
		'id' => $device["id"],
		'name' => $device["name"],
		'status' => '0',
		'state' => '-3',
		'room' => $device['room'],
		'category' => $device['category'],
		'subcategory' => $device['subcategory'],
		'left' => $device['left'],
		'top' => $device['top'],
		'etage' => $device['etage'],
		'color' => $device['color'],
		'tripped' => '0',
		'icon' => $device['icon'],
		'verif' => $device['verif'],
		'sceneon' => $device['sceneon'],
		'sceneoff' => $device['sceneoff'],
		'camuser' => $device['camuser'],
		'campassword' => $device['campassword'],
		'graphlink' => $device['graphlink']
		);
}
$result_json='{"devices":'.json_encode($data).'}';

$fp = fopen($fichierjson,"w+"); //creation du fichier
fputs($fp, $result_json); // on écrit les données dans le data.json
fclose($fp); //on ferme le data.json
$success="true";
}
//echo "{'success':true}";
echo $success
?>