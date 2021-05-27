#!/usr/bin/python3

#from subprocess import run
from os import path, makedirs, system, chmod
from posixpath import basename
from shutil import copytree, rmtree
import json, re

print("Building package...")

def filterScript(input: str):
    return re.sub(r"^[\s]+", "", input, flags=re.M)

#Path of the current script
currentPath = path.dirname(path.abspath(__file__))

#Load build infos
with open(path.join(currentPath, './buildInfos.json')) as f:
    infos = json.load(f)

#Load package infos
with open(path.join(currentPath, '../package.json')) as f:
    package = json.load(f)

#deb package directory
basedir = path.join(currentPath, "../")
builddir = path.join(basedir, "build/{}-{}".format(package["name"], package["version"]))
debiandir = path.join(builddir, "DEBIAN")
installdir = path.join(builddir, infos["binPath"])

#copy of scripts
system("cp -r {}/debian/* {}".format(currentPath, builddir))

#Writing of control
with open(path.join(debiandir, "control"), 'a') as control:
    script = "\nDescription: {}\nVersion: {}\n".format(package["description"], package["version"])
    control.write(filterScript(script))

#Wrinting configuration file
# with open(path.join(installdir, "dipicar.conf.json"), 'w') as config:
#     config.write(json.dumps({
#         "interface": "wlan0"
#     }))

#Build deb package
system("dpkg-deb --build {}".format(builddir))

print("Package build done !")


