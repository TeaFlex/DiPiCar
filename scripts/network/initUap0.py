#!/usr/bin/python3

from os import system
from time import sleep
import json

# Modified verison of pugbot's script (https://www.raspberrypi.org/forums/viewtopic.php?t=211542)

try:
    with open("../dipicar.conf.json") as c:
        conf = json.load(c)
    interface = conf["interface"]
except Exception:
    interface = "wlan0"

services = ["hostapd", "dhcpcd", "dnsmasq"]

print("Stopping network services")
system("systemctl daemon-reload")
for service in services:
    system("systemctl stop {}.service".format(service))

print("Removing uap0 interface...")
system("iw dev uap0 del")

print("Adding uap0 interface...")
system("""
iw dev {} interface add uap0 type __ap
ifconfig uap0 up
""".format(interface))

for service in services:
    print("Starting {} service...".format(service))
    system("systemctl start {}.service".format(service))
    sleep(10)

print("DONE")