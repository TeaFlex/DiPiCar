# Contribuer au projet

Si vous voulez nous aider dans le développement de DiPiCar, vous pouvez suivre les étapes ci-dessous afin d'obtenir un projet paré pour la contribution.

> Note: Ce projet doit être développé sur un Raspberry Pi de n'importe quel modèle.

1. **Cloner le projet**

Avec la commande:
```
git clone https://github.com/teaflex/dipicar
```
Ensuite allez sur la branche wip:
```
git checkout wip
```

2. **Installer les dépendances**

Dans le dossier dipicar, exécutez ce script:
```
sudo ./scripts/devInstall.py
```
Ce dernier installera les dépendances aptitude ainsi que celles npm.

3. **Lancer les tests**

Ce n'est pas nécéssaire mais si toutes les précédentes étapes ont correctement été suivies, les tests devraient se lancer sans soucis.
```
npm run test
```
> Note: Le script créant le point d'accès est lancé avant les tests.

4. **Commencer à contribuer**

Maintenant il vous suffit just d'apporter vos fonctionnalités à DiPiCar ! Vous pouvez lancer le projet avec `npm start` et nodemon s'occupera de tout lorsque vous ferez des changements dans le code.
Si vous voulez construire le package debian, vous pouvez utiliser `npm run build` et un fichier .deb appparaîtra à l'intérieur d'un dossier "build".

5. **Travailler avec HTTPS**

Afin de générer facilement des certificats, utilisez la commande suivante:
```
npm run genssl
```
Vous pourrez alors, au prochain `npm start`, profiter d'une connexion HTTPS.
> Note: les certificats générés peuvent être remplacés par n'importe quel autre certificat.