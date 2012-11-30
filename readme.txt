1. Protéger le répertoire protect par un accès htaccess avec login + mot de passe

.htaccess du type :
AuthName "Title"
AuthType "Basic"
AuthUserFile "chemin du fichier pw"
require valid-user


2. Le fichiers de configurations seront créer dans \protect\config (les images des vues dans resources\config\img).