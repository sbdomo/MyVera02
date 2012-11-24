<?php
$success="false";
$result="";
$fichierjson="./config/floors.json";
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
		  $floorkey="";
		  //print_r($floors);
		  foreach( $floors as $key => $floorvalue ) {
			  if($floorvalue['id']==$id) $floorkey=$key;
		  }
		  if($floorkey!="") {
			  
			  if($floor['linkimage']!='') {
				$floorpathold=$floors[$floorkey]['path'];
				$floor['path']='vue'.$id.time().'.jpg';
				$floors[$floorkey]['path']=$floor['path'];
			  }
			  
			  $floors[$floorkey]['name']=$floor['name'];
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
			  $floor['path']='vue'.$newid.time().'.jpg';
		  }
		  
		  
		  $floors[]= array (
			  'id' => $newid,
			  'name' => $floor['name'],
			  'path' => $floor['path']
			  );
		  $floorsencode='{"floors":'.json_encode($floors).'}';
		  file_put_contents($fichierjson, $floorsencode);
		  //$result=$newid;
		  $result=$floor['name'];
		  $success="true";
	    }
	    
	    
	    if($floor['linkimage']!=''&&$floor['path']!='') {
			if($floorpathold!="") {
				unlink($cheminImg.$floorpathold);
			}
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