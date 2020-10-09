#!/bin/bash

basedir=$(dirname $0)

sudo rm -r $basedir/packages/DigiCar/usr/lib/digicar/*
cp -r $basedir/../../resources/* $basedir/packages/DigiCar/usr/lib/digicar/
cd $basedir/packages/
dpkg-deb --build DigiCar 
mv DigiCar.deb digicar-build.deb
#WIP

#TODO: get rid of the absolute path
