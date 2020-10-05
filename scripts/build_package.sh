#!/bin/bash

cp -r /car_project/resources/ /car_project/packages/DigiCar/tmp/
cd /car_project/packages/
dpkg-deb --build DigiCar 
mv DigiCar.deb digicar-build.deb