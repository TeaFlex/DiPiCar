# CLI documentation

Vous pouvez lancer les différents composants de DiPiCar séparéments à l'aide du CLI.
La commande de base a besoin d'un argument, ou sinon elle affichera par défaut la version installée du service.

```sh
#Commande de base
sudo dipicar [commande]
```

Voici une liste des différentes commandes possibles:

| Command | Description |
|--|--|
| `fullStart` | Configure et sécurise les interfaces sans fil et ensuite démarre le serveur de l'API. |
| `start` | Démarre seulement le serveur de l'API. |
| `configure` | Effectue seulement la configuration et sécurisation des interfaces sans fil. |
| `version` (par défaut) | Affiche la version installée du service. |
| `genSSL` | Génère un certificat basique dans `/etc/dipicar/creds/`. |
