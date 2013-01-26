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
$floorpathretina="";
if($id!="" && $json = @file_get_contents($fichierjson)) {
    $json = json_decode($json, true);
    $floors= $json['floors'];
    $newfloors =  array();
    
    foreach( $floors as $floorvalue ) {
	    if($floorvalue['id']!=$id) {
		    $newfloors[] = $floorvalue;
	    } else {
		    $floorpath=$floorvalue['path'];
		    $floorpathretina=$floorvalue['pathretina'];
		    $result=$floorvalue['name'];
	    }
    }
	//suppression de l'image
	if($floorpath!="") {
			//ne supprime l'image que si elle n'est pas utilisée ailleurs
			$deleteimg=true;
			foreach( $newfloors as $key => $floorvalue ) {
			  if($floorvalue['path']==$floorpath) $deleteimg=false;
			}
			if($deleteimg==true) unlink($cheminImg.$floorpath);
	}
	//suppression de l'imagertina
	if($floorpathretina!="") {
			//ne supprime l'image que si elle n'est pas utilisée ailleurs
			$deleteimg=true;
			foreach( $newfloors as $key => $floorvalue ) {
			  if($floorvalue['pathretina']==$floorpathretina) $deleteimg=false;
			}
			if($deleteimg==true) unlink($cheminImg.$floorpathretina);
	}
    
    $floorsencode='{"floors":'.json_encode($newfloors).'}';
    file_put_contents($fichierjson, $floorsencode);
    $success="true";

}

echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>