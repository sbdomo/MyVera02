<?php
//inclog
$success="false";
$result="";

$profil=$_GET["profil"];
$fichierjson="./config/floors";
//echo $profil;
if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$profil="0";
	$fichierjson=$fichierjson.".json";
}

$cheminImg="../resources/config/img/";
$floorpathold="";
if ($json = @file_get_contents('php://input'))
{
    $json = json_decode($json, true);
    $floor= $json['floor'];
    if(sizeof($floor) >0) {
	    $id=$floor['id'];
	    $new=true;
	    if("new".$id!="new") $new=false;
	    
	    
	    $json = file_get_contents($fichierjson);
	    $json = json_decode($json, true);
	    $floors= $json['floors'];
	    if($new==false) {
		  //cherche la vue dans la liste $floorkey
		  $floorkey="-1";
		  foreach( $floors as $key => $floorvalue ) {
			  if($floorvalue['id']==$id) $floorkey=$key;
		  }
		  if($floorkey!="-1") {
			  
			  if($floor['linkimage']!='') {
				$floorpathold=$floors[$floorkey]['path'];
				$floor['path']='vue'.$profil.$id.time().'.jpg';
				$floors[$floorkey]['path']=$floor['path'];
			  } elseif($floors[$floorkey]['path']!=$floor['path']) {
				$floorpathold=$floors[$floorkey]['path'];
				$floors[$floorkey]['path'] = $floor['path'];
			  }
			  
			  $floors[$floorkey]['name']=$floor['name'];
			  $floors[$floorkey]['tab']=$floor['tab'];
			  $floors[$floorkey]['ind']=$floor['ind'];
			  $floorsencode='{"floors":'.json_encode($floors).'}';
			  file_put_contents($fichierjson, $floorsencode);
			  $success="true";
			  $result=$floors[$floorkey]['name'];
		  }
	    } else {
		  //cherche nouvelle id
		  $newid=0;
		  $fid="";
		  foreach( $floors as $floorvalue ) {
			  $fid=intval($floorvalue['id']);
			  if($newid<=$fid) $newid=$fid + 1;
		  }
		  if($floor['linkimage']!='') {
			  $floor['path']='vue'.$profil.$newid.time().'.jpg';
		  }
		  
		  
		  $floors[]= array (
			  'id' => $newid,
			  'name' => $floor['name'],
			  'path' => $floor['path'],
			  'tab' => $floor['tab'],
			  'ind' => $floor['ind']
			  );
		  $floorsencode='{"floors":'.json_encode($floors).'}';
		  file_put_contents($fichierjson, $floorsencode);
		  //$result=$newid;
		  $result=$floor['name'];
		  $success="true";
	    }
	    
	    //suppression de l'image
	    if($floorpathold!="") {
			//ne supprime l'image que si elle n'est pas utilisée ailleurs
			$deleteimg=true;
			foreach( $floors as $key => $floorvalue ) {
			  if($floorvalue['path']==$floorpathold) $deleteimg=false;
			}
			if($deleteimg==true) unlink($cheminImg.$floorpathold);
	    }
	    // vérifie success avant ajout de l'image
	    if($floor['linkimage']!=''&&$floor['path']!=""&&$success=="true") {
			$contents = file_get_contents($floor['linkimage']);
			$name = $cheminImg.$floor['path'];
			$fp = fopen($name, 'w');
			if(fwrite($fp, $contents)) {
				//$success="true";
			
			} else {
				$success="false";
				$result="Erreur image";
			}
			fclose($fp);
	    }
	    
    } else {
	    $result="Pas de vue ?";
    }
}
else
{
	$result="erreur";
}
echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>
