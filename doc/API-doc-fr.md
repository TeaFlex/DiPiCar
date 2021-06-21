# Documentation de l'API

## REST

Les requêtes REST sont utilisées pour les opérations sur la base de données, la configuration réseau du Raspberry Pi ainsi que l'obtention d'information du système.

Toutes les infos concernant ces requêtes se trouvent [ici](https://documenter.getpostman.com/view/16024598/TzY1gGLM).

## WebSocket

La liaison Websocket a pour but de gérer le flux vidéo et le contrôle des moteurs.

Tous les évènements de contrôle de flux se trouvent [ici](https://github.com/TeaFlex/PiStreamer/blob/HEAD/doc/DOCUMENTATION-fr.md#evènements-websocket)

Afin de contrôler les moteurs, vous devez donner une abcisse (X), une ordonnée (Y) et, optionnellement, une vitesse. Voici quelques infos:
| Champ | Valeurs acceptées | Description |  
|--|--|--|
| `x` | -255 à 255 | Détermine si la voiture doit tourner à droite (positif) ou à gauche (négatif). |
| `y` | -255 à 255 | Détermine si la voiture doit aller en avant (positif) ou en arrière (négatif). |
| `speed` (optionnal) | 0 à 255 | Fixe la vitesse des moteurs. Si elle est omise, la vitesse sera calculée avec `x` et `y`. |

Les champs ci-dessus doivent être envoyés au serveur au fromat JSON, comme tel:
```js
const socket = new WebSocket("ws://dipi.car:8060-ou-une-autre-url");
socket.send(JSON.stringify({
	x: 45,
	y: 45,
	speed: 45
}));
```