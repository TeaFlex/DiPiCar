#!/usr/bin/python3

#from subprocess import run
from os import path
import json, re
from subprocess import call
from distutils.dir_util import copy_tree, remove_tree

print("Building package...")

#Path of the current script
currentPath = path.dirname(path.abspath(__file__))

#Load build infos
with open(path.join(currentPath, './buildInfos.json')) as f:
    infos = json.load(f)

#Load package infos
with open(path.join(currentPath, '../package.json')) as f:
    package = json.load(f)

controlFile = {
    "Package": package["name"],
    "Source": package["name"],
    "Maintainer": package["author"],
    "Description": package["description"],
    "Version": package["version"],
    "Depends": ', '.join(infos["dependencies"]),
    "Architecture": infos["architecture"]
}

#Important dirs
basedir = path.join(currentPath, "../")
builddir = path.join(basedir, "build/{}-{}".format(package["name"], package["version"]))
debiandir = path.join(builddir, "DEBIAN")

#Copy of debian package content
copy_tree(path.join(currentPath, "debian"), builddir)

#Writing of control
with open(path.join(debiandir, "control"), 'a') as control:
    script = ""
    for field in controlFile:
        script += "{}: {}\n".format(field, controlFile[field])
    control.write(re.sub(r"^[\s]+", "", script, flags=re.M))

#Build deb package
call(["dpkg-deb", "--build", builddir])

#Cleaning up...
remove_tree(builddir)

print("Package build done !")


