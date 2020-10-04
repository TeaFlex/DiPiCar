import os

services = ["hostapd", "dnsmasq", "nodejs", "npm", "git"]

os.system("sudo apt-get update && sudo apt-get upgrade")

for service in services:
    os.system("sudo apt-get install -y {}".format(service))