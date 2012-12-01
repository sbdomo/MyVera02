<?php
//inclog
$success="false";
$result="";
$id=$_GET["id"];

$profil=$_GET["profil"];
$fichierjson="./config/floors";
if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$fichierjson=$fichierjson.".json";
}

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