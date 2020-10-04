#!/bin/bash
user=`whoami`
folder="test"

cd / 

if [ ! -e $folder ]
then
    sudo mkdir $folder
    sudo chown $user $folder && sudo chgrp $user $folder
    echo "/$folder folder created."
else
    echo "Something went wrong, please verify that any /$folder directory or file already exists."
fi