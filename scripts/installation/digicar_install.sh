#!/bin/bash
user=`whoami`

#Installation path
install_folder="/usr/lib/digicar"

#Everthing is copied from /tmp/resources to the installation folder
sudo chown -R $user $install_folder && sudo chgrp -R $user $install_folder
echo "$install_folder folder created."

#Installation and configuration of the services
python3 $install_folder/scripts/installation/services_install.py
python3 $install_folder/scripts/installation/services_config.py

