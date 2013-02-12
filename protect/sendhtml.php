<?php
//inclog
header('Content-Type: text/html; charset=utf-8');
$url=$_POST["url"];
//$success="false";
//$result="";
$html=file_get_contents($url);

echo "ok";

?>