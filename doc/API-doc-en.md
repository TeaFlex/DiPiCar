# API documentation

## REST

The REST interactions with the API are used for database operations, network configuration of the Raspberry Pi and getting software infos.

All the infos for the REST operations can be found [here](https://documenter.getpostman.com/view/16024598/TzY1gGLM).

## WebSocket

The WebSocket link is for controlling the video stream and the motors of the car.

All the requests to control the video stream are [here](https://github.com/TeaFlex/PiStreamer/blob/HEAD/doc/DOCUMENTATION-en.md#websocket-events)

In order to control the motors, you must give an abscissa (X), an ordinate (Y) and, optionally, a speed. There are some infos:
| Field | Range | Purpose |  
|--|--|--|
| `x` | -255 to 255 | Determines if the car must go to the right (positive) or the left (negative). |
| `y` | -255 to 255 | Determines if the car must go forwards (positive) or backwards (negative). |
| `speed` (optional) | 0 to 255 | Sets the speed of the motors. If it is omitted, the speed will be calculated with `x` and `y`. |

The above fields must be given to the server in a JSON format, as such:
```js
const socket = new WebSocket("ws://dipi.car:8060-or-anoter-url");
socket.send(JSON.stringify({
	x: 45,
	y: 45,
	speed: 45
}));
```
