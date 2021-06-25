# Configuration de DiPi Car

  
## dipicar.conf.json
Vous pouvez accéder à ce fichier depuis `/etc/dipicar/dipicar.conf.json`.

Les champs suivants peuvent être modifiés:

| Champ | Description | Valeur par défaut |
|--|--|--|
| interface | Modifie l'interface utilisée comme point d'accès (wip) | "wlan0"  |
| port | Port auquel l'application DiPi Car écoute. | 8060 |
| secureInterface | Applique ou non une sécurité sur l'interface précisée dans le fichier. | `true` |
| whitelist | Liste des ports à ne pas bloquer lors de la sécurisation (si "secureInterface" est `true`)  | `[]` |
| rightMotor | Configuration des pins utilisées par le moteur de droite. |`{"forwards": 19,"backwards": 26, "pwm": 13}` |
| leftMotor | Configuration des pins utilisées par le moteur de gauche. |`{"forwards": 22,"backwards": 27, "pwm": 17}` |

>Note: La sécurité de l'interface uap0 ne peut être modifée par le fichier de configuration, seulement celle de l'interface donnée dans ce dernier le peut. 

## dossier creds
Vous pouvez accéder à ce dossier depuis `/etc/dipicar/creds`.

Ce répertoire a pour but de contenir les fichiers d'identification utilisés par le serveur DiPi Car pour offrir une liaison HTTPS. Si les fichiers `key.pem` et `cert.pem` n'y sont pas présents (ou que le serveur rencontre une erreur lors de la lecture de ces derniers), le serveur se rabattra sur une liaison HTTP.

Pour créer rapidement ces fichiers, vous pouvez utiliser la commande suivante:

```
sudo dipicar genSSL
```

## hostapd.conf
Vous pouvez accéder à ce fichier depuis `/etc/hostapd/hostapd.conf`.

DiPi Car lit le fichier de configuration de hostapd pour connaître le bon canal wifi à utiliser. Si vous voulez changer la valeur de ce canal, modifiez ou ajoutez la ligne `channel=[any number from 1 to 14]`. La valeur par défaut utilisée par l'application est `7`.

Vous pouvez aussi changer le ssid et le mot de passe de votre point d'accès en modifiant la valeur des champs `ssid` et `wpa_passphrase` (le changement de mot de passe est fortement recommandé).

Pour plus de détails, consultez [la documentation de hostapd](https://doc.ubuntu-fr.org/hostapd).
