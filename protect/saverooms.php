<?php
header('Content-Type: text/html; charset=utf-8');
$success="false";
$fichierjson="./config/rooms.json";

if ($json = @file_get_contents('php://input'))
{
    $json = json_decode($json, true);
    $RoomsResult= $json['rooms'];
    if(sizeof($RoomsResult) >0) {
	$Rooms=array();
	foreach ($RoomsResult as $room) {
		$Rooms[]= array (
			'id' => $room['id'],
			'name' => $room['name'],
			'section' => $room['section']
			);
	}
	$result_json='{"rooms":'.json_encode($Rooms).'}';
	file_put_contents($fichierjson, $result_json);
	
	$success="true";
    }
}
echo $success;
?>