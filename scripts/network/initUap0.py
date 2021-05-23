#!/usr/bin/python3

from os import system
from time import sleep

# Modified verison of pugbot's script (https://www.raspberrypi.org/forums/viewtopic.php?t=211542)

services = ["hostapd", "dhcpcd", "dnsmasq"]

print("Stopping network services")
system("systemctl daemon-reload")
for service in services:
    system("systemctl stop {}.service".format(service))

print("Removing uap0 interface...")
system("iw dev uap0 del")

print("Adding uap0 interface...")
system("""
iw dev wlan0 interface add uap0 type __ap
ifconfig uap0 up
""")

for service in services:
    print("Starting {} service...".format(service))
    system("systemctl start {}.service".format(service))
    sleep(10)

print("DONE")