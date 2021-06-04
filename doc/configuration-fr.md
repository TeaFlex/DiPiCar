# Configuration de Dipicar

  
## dipicar.conf.json
Vous pouvez accéder à ce fichier depuis `/etc/dipicar/dipicar.conf.json`.

Les champs suivants peuvent être modifiés:

| Champ | Description | Valeur par défaut |
|--|--|--|
| interface | Modifie l'interface utilisée comme point d'accès (wip) | "wlan0"  |
| port | Port auquel l'application DiPiCar écoute. | 8060 |
| secureInterface | Applique ou non une sécurité sur l'interface précisée dans le fichier. | `true` |
| whitelist | Liste des ports à ne pas bloquer lors de la sécurisation (si "secureInterface" est `true`)  | `[]` |

>Note: La sécurité de l'interface uap0 ne peut être modifée par le fichier de configuration, seulement celle de l'interface donnée dans ce dernier le peut. 

## hostapd.conf
DiPiCar lit le fichier de configuration de hostapd pour connaître le bon canal wifi à utiliser. Si vous voulez changer la valeur de ce canal, modifiez ou ajoutez la ligne `channel=[any number from 1 to 14]`. La valeur par défaut utilisée par l'application est `7`.

Vous pouvez aussi changer le ssid et le mot de passe de votre point d'accès en modifiant la valeur des champs `ssid` et `wpa_passphrase` (le changement de mot de passe est fortement recommandé).

Pour plus de détails, consultez [la documentation de hostapd](https://doc.ubuntu-fr.org/hostapd).