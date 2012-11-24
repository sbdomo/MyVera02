<?php
$success="false";
$result="";
$id=$_GET["id"];
$fichierjson="./config/floors.json";
$cheminImg="../resources/config/img/";
$floorpath="";
if($id!="" && $json = @file_get_contents($fichierjson)) {
    $json = json_decode($json, true);
    $floors= $json['floors'];
    $newfloors =  array();
    
    foreach( $floors as $floorvalue ) {
	    if($floorvalue['id']!=$id) {
		    $newfloors[] = $floorvalue;
	    } else {
		    $floorpath=$floorvalue['path'];
		    if($floorpath!="") unlink($cheminImg.$floorpath);
		    $result=$floorvalue['name'];
	    }
    }
    $floorsencode='{"floors":'.json_encode($newfloors).'}';
    file_put_contents($fichierjson, $floorsencode);
    $success="true";

}

echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>