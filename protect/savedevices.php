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
$temparray="";
foreach ($array_json['devices'] as $device) {
	$state=-3;
	if($device['category']=="1000"||$device['category']=="1001") $state=0;
	$temparray=array (
		'id' => $device["id"],
		'name' => $device["name"],
		'status' => '0',
		'state' => $state,
		'room' => $device['room'],
		'category' => $device['category'],
		'subcategory' => $device['subcategory'],
		'etage' => $device['etage'],
		'left' => $device['left'],
		'top' => $device['top'],
		'etage1' => $device['etage1'],
		'left1' => $device['left1'],
		'top1' => $device['top1'],
		'etage2' => $device['etage2'],
		'left2' => $device['left2'],
		'top2' => $device['top2'],
		'color' => $device['color'],
		'fontsize' => $device['fontsize'],
		'tripped' => '0',
		'icon' => $device['icon'],
		'verif' => $device['verif'],
		'sceneon' => $device['sceneon'],
		'sceneoff' => $device['sceneoff'],
		'camuser' => $device['camuser'],
		'campassword' => $device['campassword'],
		'graphlink' => $device['graphlink'],
		'ind' => $device['ind']
		);
	if($device['width']!="50") $temparray['width']=$device['width'];
	if($device['category']=="1001") $temparray['height']=$device['height'];
	
	$data[]=$temparray;
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