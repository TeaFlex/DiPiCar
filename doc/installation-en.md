# Installation of DiPi Car
 
### Prerequisites 

You must have built your car before installing the software !

#### (LAN mode)

If you want to benefit of the LAN mode, it's highly recommanded to follow the steps below first. You can also perform them after the full installation but we can not guarantee that it will work correctly.

Fristly, you have to connect the Raspberry pi to the network that you want the car to be connected to. 

1. Use the command `sudo raspi-config`.
2. Go to *System Options > Wireless LAN*.
3. Select your country (if it wasn't already done).
4. Enter the SSID of your network.
5. Enter the password of the access point.
6. Finally, reboot your Raspberry pi by running `sudo reboot`.

### Download DiPi Car
You must first download the package trougth GitHub. You can access all the releases [here](https://github.com/TeaFlex/DiPiCar/releases).
We suggest you to use wget to download DiPi Car directly to your Raspberry pi, as such:
> Replace all [version] by the release that you're interested in.

```
wget https://github.com/TeaFlex/DiPiCar/releases/download/[version]/dipicar-[version].deb
```

### Enable the camera module
After downloading it, you have to enable your camera module in order to be able to stream video. Execute `sudo raspi-config` and then go to *Interface Options > Camera > "Yes"* and then reboot with `sudo reboot`.

### Install the package
When your Raspberry pi has reboot, you can then proceed to the installation of the previously downloaded package. In the same folder as the package, run this:
>Replace [version] by the version that you downloaded.

```
sudo apt install ./dipicar-[version].deb
```

**IMPORTANT**: We strongly advise you to change the access point password after the DiPi Car installation. Not modifying it will not break the application but it's recommended to do so for security purpose. To do this, run `sudo nano /etc/hostapd/hostapd.conf` and modify the `wpa_passphrase` field.

After that, all the configuration scripts will run automatically. You'll then be able to reboot your Rasberry pi.

```
sudo reboot
```

> Note: By default, the dipicar service is automatically launched when starting the Raspberry Pi.

Or you can directly start the server:

```
sudo dipicar fullStart
```

> Note: You can also replace `fullStart` by `start` to only launch the API server. More infos [here](https://github.com/TeaFlex/DiPiCar/blob/master/doc/CLI-doc-en.md).

Prepare for the ride ! 🚗
