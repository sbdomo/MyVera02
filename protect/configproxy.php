<?php
$listefichier = array(
	'createrooms.php',
	'deletefloor.php',
	'deletetab.php',
	'initfloors.php',
	'inittabs.php',
	'readrooms.php',
	'saveconfig.php',
	'savedevices.php',
	'savefloors.php',
	'saverooms.php',
	'savetabs.php',
	'syncvera.php'
	);
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>MyVera - Gestion du login</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<h1>MyVera - Configuration du login</h1>
<?php
$login= null;
if (isset($_POST["username"]))
	$login=$_POST["username"];

$pass= null;
if (isset($_POST["pass"]))
	$pass=$_POST["pass"];

if($login!=null&&$pass!=null) {
	$fichierphp = "_parameters.php";
	$contenu=file_get_contents($fichierphp);
	
	$poslogin= strpos($contenu, '$config["login"] = "";');
	$pospass= strpos($contenu, '$config["pass"] = "";');
	
	if($poslogin>0&&$pospass>0) {
		$contenu = str_replace ( '$config["login"] = "";', '$config["login"] = "'.$login.'";', $contenu);
		$contenu = str_replace ( '$config["pass"] = "";', '$config["pass"] = "'.$pass.'";', $contenu);
		
		file_put_contents($fichierphp, $contenu);
		
		foreach( $listefichier as $fichierphp ) {
			$contenu=file_get_contents($fichierphp);
			$contenu = str_replace ( '//inclog', 'include("_parameters.php");', $contenu);
			file_put_contents($fichierphp, $contenu);
		}
		
		
		echo "Protection en place.";
		
		
	} else {
		echo "Modification refusée.";
	}
	
} else {
	echo "Login ou mot de passe non défini !";
}
?>
</body>
</html>