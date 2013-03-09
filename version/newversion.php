<?php
header('Content-Type: text/html; charset=utf-8');
$result='{"result":"false", "msg":"Erreur !"}';
$url="./version.json";
$urlbuild="http://sb.domo.free.fr/myverabuild/";
$json = file_get_contents($url);
$json = json_decode($json, true);

$url=$urlbuild.'version.json';
$newver=file_get_contents($url);
$newver=json_decode($newver, true);
if($json["version"]=="") {
	$result='{"result":"false", "msg":"errorversion"}';
} else if($newver["version"]=="") {
	$result='{"result":"false", "msg":"nonewversion"}';
} else if($json["version"]!=$newver["version"]) {
	$result='{"result":"true", "msg":"newversion", "url":"'.$urlbuild.$newver["build"].'"}';
} else if($newver["nightlybuild"]>$json["nightlybuild"]){
	$result='{"result":"true", "msg":"newbetaversion", "url":"'.$urlbuild.$newver["beta"].'"}';
} else {
	$result='{"result":"false", "msg":"versionuptodate"}';
}

echo $result;
?>