#!/usr/bin/python3

from os import path, makedirs, system, chmod
import json, re

print("Building package...")

#Each services to install
services = ["curl", "hostapd", "dnsmasq", "nodejs", "git", "pigpio"]

#Path of the current script
scriptPath = path.dirname(path.abspath(__file__))

#Writing mode
mode = 0o775

#deb package directory
target = path.join(scriptPath, "../../build/dipicar")

#Load build infos
with open(path.join(scriptPath, './buildInfos.json')) as f:
    infos = json.load(f)

#Load package infos
with open(path.join(scriptPath, '../../package.json')) as f:
    package = json.load(f)

#creation of directories
makedirs(path.join(target, "DEBIAN"), mode, True)
makedirs(path.join(target, infos["binPath"]), exist_ok=True)

#Writing of control
with open(path.join(target, "DEBIAN", "control"), 'w') as control:
    script = """
    Package: {}
    Version: {}
    Maintainer: {}
    Architecture: arm
    Description: {} 
    """.format(
        package["name"],
        package["version"],
        package["author"],
        package["description"],
    )
    control.write(re.sub(r"^[\s]+", "", script, flags=re.M))

#Writing of postinst
postinst = path.join(target, "DEBIAN", "postinst")
with open(postinst, 'w') as control:
    control.write("""
    ln -s {} /usr/local/bin
    """
    .format(path.join(infos["binPath"], 'dipicar_srv'))
    )
chmod(postinst, mode)
#Build deb package
system("dpkg-deb --build {}".format(target))

print("Build done !")