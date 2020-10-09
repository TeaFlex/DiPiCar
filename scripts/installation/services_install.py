import os

#Each services to install
services = ["hostapd", "dnsmasq", "nodejs", "npm", "git"]

#Update and upgrade first
os.system("sudo apt-get update && sudo apt-get upgrade")

#Just installation, nothing to see here :)
for service in services:
    os.system("sudo apt-get install -y {}".format(service))