#!/bin/bash
user=`whoami`

#Installation path
install_folder="/usr/lib/digicar"

#Everthing is copied from /tmp/resources to the installation folder
sudo cp -r /tmp/resources/application/ $install_folder
echo "$install_folder folder created."

#Installation and configuration of the services
python3 /tmp/resources/scripts/services_install.py
python3 /tmp/resources/scripts/services_config.py
echo "Services installed."