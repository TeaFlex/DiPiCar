#!/usr/bin/python3

from subprocess import call
from os import geteuid, path, mkdir
from json import load

#NOTE: Run this scripts to get all the dependencies

if(geteuid() != 0):
    print("You must run this script as root.")
    exit(0)

#URL of node repo
nodeURL = "https://deb.nodesource.com/setup_14.x"

#Loads dependencies infos
with open(path.join(path.dirname(__file__), './buildInfos.json')) as f:
    infos = load(f)

#Each services to install plus the dependencies
services = ["curl",  "nodejs", "git"] + infos["dependencies"]

#Update and upgrade first
call(["apt-get", "update"])
call(["apt-get", "upgrade", "-y"])

#Just installation, nothing special to see here :)
for service in services:
    if(service == "nodejs"):
        call(["curl", "-sL", nodeURL, "|", "bash", "-"])
    call(["apt-get", "install", "-y", service])

mkdir("creds")
call(["scripts/debian/usr/lib/dipicar/scripts/installation/ssl_keys_gen.py", "./creds"])