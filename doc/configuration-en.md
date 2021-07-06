# Configuration of DiPi Car

  
## dipicar.conf.json
You can access the configuration file at `/etc/dipicar/dipicar.conf.json`.

The following fields can be modified:

| Field | Description | Default value |
|--|--|--|
| interface | Modifies the used interface as an access point. (wip) | "wlan0"  |
| port | Port which DiPi Car listen to. | 8060 |
| secureInterface | Apply security rules on the interface given in the file. | `true` |
| whitelist | List of ports to whitelist (only if "secureInterface" is `true`)  | `[]` |
| rightMotor | Configuration of the pins used for the right motor. |`{"forwards": 19,"backwards": 26, "pwm": 13}` |
| leftMotor | Configuration of the pins used for the left motor. |`{"forwards": 22,"backwards": 27, "pwm": 17}` |

>Note: uap0 security can not be modified trought the configuration file, only the one of the given interface can be.

## creds folder
You can access the credentials folder at `/etc/dipicar/creds`.

This directory has for purpose to contain the credentials used by the DiPi Car server to
offer HTTPS. If it doesn't contain either of `key.pem` and `cert.pem` files (or if any error related to the reading of these files occurs), the server will fallback to HTTP.

To easily create these files, you can run this command:

```
sudo dipicar genSSL
```

## hostapd.conf
You can access this file at `/etc/hostapd/hostapd.conf`.

DiPi Car read the hostapd configuration file to know the right wifi channel to use. If you want to change this channel, modify of add the line `channel=[any number from 1 to 14]`.  The default value used by the app is `7`.

You can also change the ssid and the password of your car by modifying the value of fields `ssid` and
`wpa_passphrase` (the password changement is highly recommanded).

For more details, please consult [the hostapd documentation](https://wireless.wiki.kernel.org/en/users/documentation/hostapd)
