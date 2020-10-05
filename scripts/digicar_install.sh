#!/bin/bash
user=`whoami`
install_folder="/usr/lib/digicar"

sudo cp -r /tmp/resources/application/ $install_folder
#sudo chown -r $user $install_folder && sudo chgrp -r $user $install_folder
echo "$install_folder folder created."
python3 /tmp/resources/scripts/services_install.py
echo "Services installed."
#TODO: link services configuration script