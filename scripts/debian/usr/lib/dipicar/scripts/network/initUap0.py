#!/usr/bin/python3


from subprocess import call
from time import sleep
import json

# Modified verison of pugbot's script (https://www.raspberrypi.org/forums/viewtopic.php?t=211542)

defaultConf = {
    "interface": "wlan0"
}

conf = None

apifname = "uap0"

try:
    with open("/etc/dipicar/dipicar.conf.json") as c:
        conf = json.load(c)
    conf = {**defaultConf, **conf}
    print("Parameters used: {}".format(conf))
except Exception as e:
    print(e)
    print("Configuration file not found, default values will be used.")
    conf = defaultConf

services = ["hostapd", "dhcpcd", "dnsmasq"]

print("Reloading daemons...")
call(["systemctl", "daemon-reload"])

for service in services:
    print("Stopping %s..." %service)
    call(["systemctl", "stop", service+".service"])

print("Removing %s interface..." %apifname)
deluap = call(["iw", "dev", apifname, "del"])
if(deluap == -19):
    print("%s does not exist, skipping." %apifname)

print("Adding %s interface..." %apifname)
call(["iw", "dev", conf["interface"], "interface", "add", apifname, "type", "__ap"])
call(["ifconfig", apifname, "up"])


for service in services:
    print("Starting %s service..." %service)
    call(["systemctl", "start", service+".service"])
    sleep(10)

print("DONE")