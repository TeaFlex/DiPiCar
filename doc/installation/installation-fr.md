# Installation of DiPiCar
 
### Prérequis

Vous devez avoir assemblé votre voiture avant d'installer le logiciel !

#### (mode local)
Si vous souhaitez bénéficier du mode local, il est fortement recommandé de suivre les étapes ci-dessous dans un premier temps. Vous pouvez essayer de les effectuer après l'installation complète du service mais nous ne garantissons en rien le bon fonctionnement de ce dernier.

Tout d'abord, vous devez connecter le Raspberry pi au réseau sur lequel vous voulez que le voiture soit connectée.

1. Utilisez la commande `sudo raspi-config`.
2. Aller dans *System Options > Wireless LAN*.
3. Sélectionnez votre pays (si cela n'avait déjà pas été fait).
4. Entrez le SSID de votre réseau.
5. Entrez le mot de passe de votre point d'accès.
6. Enfin, redémarrez votre Raspberry pi en éxecutant `sudo reboot`.

### Télécharger DiPiCar
Vous devez tout d'abord télécharger le paquet via GitHub. Vous pouvez accéder à toutes les releases [ici](https://github.com/TeaFlex/DiPiCar/releases).
Nous vous suggérons d'utiliser wget pour télécharger DiPiCar directement sur votre Raspberry Pi, comme tel:
> Remplacez tous les [version] par le numéro de version qui vous intéresse.

```
wget https://github.com/TeaFlex/DiPiCar/releases/download/[version]/dipicar-[version].deb
```

### Activer le module caméra
Après le téléchargement, vous devez activer le module caméra afin de pouvoir partager le flux vidéo. Executez `sudo raspi-config` et ensuite allez dans *Interface Options > Camera > "Yes"* et enfin redémarrez avec `sudo reboot`.

### Installer le paquet
Lorsque votre Raspberry pi a redémarré, vous pouvez alors procéder à l'installation du paquet précédement téléchargé. Dans le même dossier que le paquet, éxecutez ceci:
>Remplacez [version] par la version que vous avez téléchargée.

```
sudo apt install ./dipicar-[version].deb
```

Après ça, tous les scripts de configuration seront executés automatiquement. Vous aurez alors la capacité d'activer le service dipicar comme ceci:

```
sudo systemctl enable dipicar.service
```

et ainsi redémarrer Rasberry pi.

```
sudo reboot
```

Bonne conduite ! 🚗
