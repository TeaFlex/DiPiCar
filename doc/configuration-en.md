# Configuration of Dipicar

  
## dipicar.conf.json
You can access the configuration file at `/etc/dipicar/dipicar.conf.json`.

The following fields can be modified:

| Field | Description | Default value |
|--|--|--|
| interface | Modifies the used interface as an access point. (wip) | "wlan0"  |
| port | Port which DiPiCar listen to. | 8060 |

## hostapd.conf
DiPiCar read the hostapd configuration file to know the right wifi channel to use. If you want to change this channel, modify of add the line `channel=[any number from 1 to 14]`.  The default value used by the app is `7`.

You can also change the ssid and the password of your car by modifying the value of fields `ssid` and
`wpa_passphrase` (the password changement is highly recommanded).