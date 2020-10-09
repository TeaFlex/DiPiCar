#!/bin/bash
user=`whoami`

#Installation path
install_folder="/usr/lib/digicar"

#Everthing is copied from /tmp/resources to the installation folder
#sudo cp -r /tmp/resources/application/ $install_folder
sudo chown -r $user $install_folder && sudo chgrp -r $user $install_folder
echo "$install_folder folder created."

#Installation and configuration of the services
python3 $install_folder/scripts/services_install.py
python3 $install_folder/scripts/services_config.py

#TODO: need to rework the package installation, need to directly install it in /usr/var/lib instead of
#copy files from /tmp
