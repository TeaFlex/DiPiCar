#!/bin/bash

sudo mv /var/lib/dpkg/info/$1.* /tmp/
sudo dpkg --remove --force-remove-reinstreq $1
