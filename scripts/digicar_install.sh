#!/bin/bash
user=`whoami`
folder="test" #TODO: change to "resources" in the final build, maybe change path to home directory of current user.

cd / 

if [ ! -e $folder ]
then
    sudo mkdir $folder
    sudo chown $user $folder && sudo chgrp $user $folder
    echo "/$folder folder created."
    cd "/$folder"
    #TODO: 
else
    echo "Something went wrong, please verify that any /$folder directory or file already exists."
fi