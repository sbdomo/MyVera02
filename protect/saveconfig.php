<?php
//inclog
$ipvera=$_GET["ipvera"];
$fichierjson="../conf";

$fichierjson=$fichierjson.".json";

$config=array();

$config[]= array (
	'ipvera' => $ipvera
	);
$config_encode='{"config":'.json_encode($config).'}';
file_put_contents($fichierjson, $config_encode);
echo 'OK';
?>