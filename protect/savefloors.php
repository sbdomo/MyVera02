<?php
//inclog
$success="false";
$result="";
$formatimg1="";
$formatimg2="";

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
$floorpathold2="";
if ($json = @file_get_contents('php://input'))
{
    $json = json_decode($json, true);
    $floor= $json['floor'];
    if(sizeof($floor) >0) {
	    $id=$floor['id'];
	    $new=true;
	    if("new".$id!="new") $new=false;
	    
	    $success="true";
	    //Taille image retina
	    $widthretina="";
	    if($floor['linkimage2']!='') {
		    if ($dataimage = @getimagesize($floor['linkimage2'])) {
			   //Format jpg = type 2, png = type 3
			   if ($dataimage[2] == 2||$dataimage[2] == 3) {
				   $widthretina=(int)($dataimage[0]/2);
				   if($dataimage[2] == 2) $formatimg2=".jpg";
				   else $formatimg2=".png";
				   //$success="true";
			   } else {
				   $success="false";
				   $result="format image 2 incorrect";
			   }
		    } else {
			   $success="false";
			   $result="url 2 incorrecte";
		    }
	    }
	    
	    //Vérifie linkimage
	    if($floor['linkimage']!=''&&$success=="true") {
		    if ($dataimage = @getimagesize($floor['linkimage'])) {
			   //Format jpg = type 2
			   if ($dataimage[2] == 2||$dataimage[2] == 3) {
				   if($dataimage[2] == 2) $formatimg1=".jpg";
				   else $formatimg1=".png";
				   //$widthretina=(int)($dataimage[0]/2);
				   //$success="true";
			   } else {
				   $success="false";
				   $result="format image 1 incorrect";
			   }
		    } else {
			   $success="false";
			   $result="url 1 incorrecte";
		    }
	    }
	    //$result=$success;
	    //Arrête s'il y a un problème avec l'URL
	    if($success=="true") {
		    $success="false";
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
					    $floor['path']='vue'.$profil.$id.time().$formatimg1;
					    $floors[$floorkey]['path']=$floor['path'];
				    } elseif($floors[$floorkey]['path']!=$floor['path']) {
					    $floorpathold=$floors[$floorkey]['path'];
					    $floors[$floorkey]['path'] = $floor['path'];
				    }
				    
				    if($floor['linkimage2']!='') {
					    $floorpathold2=$floors[$floorkey]['pathretina'];
					    $floor['pathretina']='vue'.$profil.$id.time().'2x'.$formatimg2;
					    $floors[$floorkey]['pathretina']=$floor['pathretina'];
					    $floors[$floorkey]['widthretina']=$widthretina;
				    } elseif($floors[$floorkey]['pathretina']!=$floor['pathretina']) {
					    $floorpathold=$floors[$floorkey]['pathretina'];
					    $floors[$floorkey]['pathretina'] = $floor['pathretina'];
					    $floors[$floorkey]['widthretina'] = $floor['widthretina'];
				    }
				    
				    $floors[$floorkey]['name']=$floor['name'];
				    $floors[$floorkey]['tab']=$floor['tab'];
				    $floors[$floorkey]['ind']=$floor['ind'];
				    $floorsencode='{"floors":'.json_encode($floors).'}';
				    //file_put_contents($fichierjson, $floorsencode);
				    $success="true";
				    $result=$floors[$floorkey]['name'];
				    //$result="OK";
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
				    $floor['path']='vue'.$profil.$newid.time().$formatimg1;
			    }
			    
			    if($floor['linkimage2']!='') {
				    $floor['pathretina']='vue'.$profil.$newid.time().'2x'.$formatimg2;
				    $floor['widthretina']=$widthretina;
			    }
			    
			    $floors[]= array (
				    'id' => $newid,
				    'name' => $floor['name'],
				    'path' => $floor['path'],
				    'pathretina' => $floor['pathretina'],
				    'widthretina' => $floor['widthretina'],
				    'tab' => $floor['tab'],
				    'ind' => $floor['ind']
				    );
			    $floorsencode='{"floors":'.json_encode($floors).'}';
			    //file_put_contents($fichierjson, $floorsencode);
			    //$result=$newid;
			    $result=$floor['name'];
			    //$result="OK";
			    $success="true";
		    }
		    
		    //suppression de l'image
		    if($floorpathold!=""&&$success=="true") {
			    //ne supprime l'image que si elle n'est pas utilisée ailleurs
			    $deleteimg=true;
			    foreach( $floors as $key => $floorvalue ) {
				    if($floorvalue['path']==$floorpathold) $deleteimg=false;
			    }
			    if($deleteimg==true) unlink($cheminImg.$floorpathold);
		    }
		    
		    //suppression de l'image retina
		    if($floorpathold2!=""&&$success=="true") {
			    //ne supprime l'image que si elle n'est pas utilisée ailleurs
			    $deleteimg=true;
			    foreach( $floors as $key => $floorvalue ) {
				    if($floorvalue['pathretina']==$floorpathold2) $deleteimg=false;
			    }
			    if($deleteimg==true) unlink($cheminImg.$floorpathold2);
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
				$result="image non ajoutée";
			    }
			    fclose($fp);
		    }
		    
		    // vérifie success avant ajout de l'image retina
		    if($floor['linkimage2']!=''&&$floor['pathretina']!=""&&$success=="true") {
			    $contents = file_get_contents($floor['linkimage2']);
			    $name = $cheminImg.$floor['pathretina'];
			    $fp = fopen($name, 'w');
			    if(fwrite($fp, $contents)) {
				//$success="true";
				
			    } else {
				$success="false";
				$result="image retina non ajoutée";
			    }
			    fclose($fp);
		    }
		    
		    if($success=="true") {
			    file_put_contents($fichierjson, $floorsencode);
		    }
	    }
    } else {
	    $result="Pas de vue ?";
    }
}
else
{
	$result="commande incorrecte";
}
echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>
