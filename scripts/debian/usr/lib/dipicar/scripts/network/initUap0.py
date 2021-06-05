#!/usr/bin/python3


from os import path
from subprocess import call
from time import sleep
import json

# Modified verison of pugbot's script (https://www.raspberrypi.org/forums/viewtopic.php?t=211542)

try:
    with open(path.join(path.dirname(__file__), "defaultConf.json")) as c:
        defaultConf = json.load(c)
except Exception as e:
    print("Dafault configuration file not found.")
    exit(1)

try:
    with open("/etc/dipicar/dipicar.conf.json") as c:
        conf = json.load(c)
    conf = {**defaultConf, **conf}
    print("Parameters used: {}".format(conf))
except Exception as e:
    print("Configuration file not found, default values will be used.")
    conf = defaultConf

apifname = "uap0"
services = ["hostapd", "dhcpcd", "dnsmasq"]

print("Reloading daemons...")
call(["systemctl", "daemon-reload"])

for service in services:
    print("Stopping %s..." %service)
    call(["systemctl", "stop", service+".service"])

print("Removing %s interface..." %apifname)
call(["iw", "dev", apifname, "del"])

print("Adding %s interface..." %apifname)
call(["iw", "dev", conf["interface"], "interface", "add", apifname, "type", "__ap"])
call(["ifconfig", apifname, "up"])


for service in services:
    print("Starting %s service..." %service)
    call(["systemctl", "start", service+".service"])
    sleep(10)

print("DONE")