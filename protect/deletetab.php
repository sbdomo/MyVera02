<?php
//inclog
$success="false";
$result="";
$id=$_GET["id"];

$profil=$_GET["profil"];
$fichierjson="./config/tabs";
if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$fichierjson=$fichierjson.".json";
}

if($id!="" && $json = @file_get_contents($fichierjson)) {
    $json = json_decode($json, true);
    $tabs= $json['tabs'];
    $newtabs =  array();
    
    foreach( $tabs as $tabvalue ) {
	    if($tabvalue['id']!=$id) {
		    $newtabs[] = $tabvalue;
	    } else {
		    $result=$tabvalue['name'];
	    }
    }
    $tabsencode='{"tabs":'.json_encode($newtabs).'}';
    file_put_contents($fichierjson, $tabsencode);
    $success="true";

}

echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>