<?php
//inclog
$success="false";
$result="";

$profil=$_GET["profil"];
$fichierjson="./config/tabs";
//echo $profil;
if($profil!=""&&$profil!="0") {
	$fichierjson=$fichierjson.$profil.".json";
} else {
	$profil="0";
	$fichierjson=$fichierjson.".json";
}

if ($json = @file_get_contents('php://input'))
{
    $json = json_decode($json, true);
    $tab= $json['tab'];
    if(sizeof($tab) >0) {
	    $id=$tab['id'];
	    $new=true;
	    if("new".$id!="new") $new=false;
	    
	    $json = file_get_contents($fichierjson);
	    $json = json_decode($json, true);
	    $tabs= $json['tabs'];
	    if($new==false) {
		  $tabkey="-1";
		  foreach( $tabs as $key => $tabvalue ) {
			  if($tabvalue['id']==$id) $tabkey=$key;
		  }
		  if($tabkey!="-1") {
			  $tabs[$tabkey]['name']=$tab['name'];
			  $tabs[$tabkey]['cls']=$tab['cls'];
			  $tabsencode='{"tabs":'.json_encode($tabs).'}';
			  file_put_contents($fichierjson, $tabsencode);
			  $success="true";
			  $result=$tabs[$tabkey]['name'];
		  }
	    } else {
		  //cherche nouvelle id
		  $newid=1;
		  $fid="";
		  foreach( $tabs as $tabvalue ) {
			  $fid=intval($tabvalue['id']);
			  if($newid<=$fid) $newid=$fid + 1;
		  }
		  
		  $tabs[]= array (
			  'id' => $newid,
			  'name' => $tab['name'],
			  'cls' => $tab['cls']
			  );
		  $tabsencode='{"tabs":'.json_encode($tabs).'}';
		  file_put_contents($fichierjson, $tabsencode);
		  //$result=$newid;
		  $result=$tab['name'];
		  $success="true";
	    }
	    
    } else {
	    $result="Pas d'onglet ?";
    }
}
else
{
	$result="erreur";
}
echo '{"success":"'.$success.'", "result":"'.$result.'"}';
?>