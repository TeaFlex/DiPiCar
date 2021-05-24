#!/usr/bin/python3

from os import path, makedirs, system, chmod
from shutil import copytree, rmtree
import json, re

print("Building package...")

#Writing mode
mode = 0o775

#Path of the current script
currentPath = path.dirname(path.abspath(__file__))

#Load build infos
with open(path.join(currentPath, './buildInfos.json')) as f:
    infos = json.load(f)

#Load package infos
with open(path.join(currentPath, '../../package.json')) as f:
    package = json.load(f)

#deb package directory
builddir = path.join(currentPath, "../../build/dipicar")
debiandir = path.join(builddir, "DEBIAN")
installdir = path.join(builddir, infos["binPath"])

#creation of directories
makedirs(debiandir, mode, True)
makedirs(installdir, exist_ok=True)

#copy of scripts
copytree(path.join(currentPath, '../../scripts'), path.join(installdir, "scripts"))
rmtree(path.join(installdir, "scripts/building"))

#Writing of control
with open(path.join(debiandir, "control"), 'w') as control:
    script = """
    Package: {}
    Version: {}
    Maintainer: {}
    Architecture: arm
    Description: {} 
    Depends: {}
    """.format(
        package["name"],
        package["version"],
        package["author"],
        package["description"],
        ', '.join(map(str, infos["dependencies"]))
    )
    control.write(re.sub(r"^[\s]+", "", script, flags=re.M))

#Writing of postinst
postinst = path.join(debiandir, "postinst")
with open(postinst, 'w') as control:
    script = """
    ln -s /{0} /usr/local/bin
    /{0}/scritps/installation/services_config.py
    """.format(path.join(infos["binPath"], 'dipicar_srv'))
    control.write(re.sub(r"^[\s]+", "", script, flags=re.M))
chmod(postinst, mode)

#Build deb package
system("dpkg-deb --build {}".format(builddir))

print("Build done !")