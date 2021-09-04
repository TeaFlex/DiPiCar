# Installation de DiPi Car

<p align="center"><img src="assets/icons/car.png" width="150"/></p>
 
### Prérequis

Vous devez avoir assemblé votre voiture avant d'installer le logiciel !

#### (Mode local)
Si vous souhaitez bénéficier du mode local, il est recommandé de suivre les étapes ci-dessous dans un premier temps. Vous pouvez essayer de les effectuer après l'installation complète du service mais nous ne garantissons pas le bon fonctionnement de ce dernier.

Il est aussi possible de paramétrer un réseau depuis notre client DiPi Link (lire plus [ici](https://dipihub.netlify.app/fr/#/docs/lknetwork)).

Tout d'abord, vous devez connecter le Raspberry Pi au réseau sur lequel vous voulez que le voiture soit connectée.

1. Utilisez la commande `sudo raspi-config`.
2. Aller dans *System Options > Wireless LAN*.
3. Sélectionnez votre pays (si cela n'avait déjà pas été fait).
4. Entrez le SSID de votre réseau.
5. Entrez le mot de passe de votre point d'accès.
6. Enfin, redémarrez votre Raspberry Pi en éxecutant `sudo reboot`.

### Télécharger DiPi Car
Vous devez tout d'abord télécharger le paquet via GitHub. Vous pouvez accéder à toutes les releases [ici](https://github.com/TeaFlex/DiPiCar/releases).
Nous vous suggérons d'utiliser wget pour télécharger DiPi Car directement sur votre Raspberry Pi, comme tel:
> Remplacez tous les [version] par le numéro de version qui vous intéresse.

```
wget https://github.com/TeaFlex/DiPiCar/releases/download/[version]/dipicar-[version].deb
```

### Activer le module caméra
Après le téléchargement, vous devez activer le module caméra afin de pouvoir partager le flux vidéo. Executez `sudo raspi-config` et ensuite allez dans *Interface Options > Camera > "Yes"* et enfin redémarrez avec `sudo reboot`.

### Installer le paquet
Lorsque votre Raspberry Pi a redémarré, vous pouvez alors procéder à l'installation du paquet précédement téléchargé. Dans le même dossier que le paquet, éxecutez ceci:
>Remplacez [version] par la version que vous avez téléchargée.

```
sudo apt install ./dipicar-[version].deb
```

**IMPORTANT**: Nous vous conseillons fortement de modifier le mot de passe du point d'accès après
l'installation de dipicar. Ne pas le modifier ne changera rien au bon fonctionnement de l'application
mais il est recommandé de le faire par mesure de sécurité. Pour ce faire, faites `sudo nano /etc/hostapd/hostapd.conf` et modifiez le champ `wpa_passphrase`.

Après ça, tous les scripts de configuration seront executés automatiquement. Vous pourrez alors redémarrer votre Rasberry pi.

```
sudo reboot
```

> Note: Par défaut, le service dipicar est lancé automatiquement au démarrage de la machine.

Ou alors démarrer le server directement:

```
sudo dipicar fullStart
```

> Note: Vous pouvez aussi remplacer `fullStart` par `start` pour ne lancer que le serveur de l'API. Plus d'infos [ici](https://github.com/TeaFlex/DiPiCar/blob/master/doc/CLI-doc-fr.md).

Préparez-vous à prendre la route ! 🚗
