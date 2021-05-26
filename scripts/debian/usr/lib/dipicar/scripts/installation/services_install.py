#!/usr/bin/python3

import os

#NOTE: This script isn't used anymore in production.
#It's still there for any dev that want to contribute to the project,
#run this script and you'll have all the dependencies for dipicar.

#Each services to install
services = ["curl", "hostapd", "dnsmasq", "nodejs", "git", "pigpio", "debmake"]

#Update and upgrade first
os.system("sudo apt-get update -y && sudo apt-get upgrade -y")

#Just installation, nothing to see here :)
for service in services:
    if(service == "nodejs"):
        os.system("sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -")
    os.system("sudo apt-get install -y {}".format(service))
