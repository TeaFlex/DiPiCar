#!/usr/bin/python3

from os import path
from subprocess import call
from shutil import copyfile

#Configuration files path and their name
conf_files = {
    'dhcpcd':'/etc/dhcpcd.conf',
    'dnsmasq':'/etc/dnsmasq.conf', 
    'hostapd':'/etc/hostapd/hostapd.conf'
}

#Path where the script is
basePath = path.dirname(path.abspath(__file__))

#Copy of the content of each configured files to the correct location
for service in conf_files:
    #Copy of conf files
    print("Configuration of %s in %s..." %(service, conf_files[service]))
    copyfile(path.join(basePath, "confs", service+".conf"), conf_files[service])

    #Special configuration(s)
    #HOSTAPD
    if(service == "hostapd"):
        with open('/etc/default/hostapd', "w") as f:
            f.write("#CONF\nDAEMON_CONF=\"/etc/hostapd/hostapd.conf\"\n")
        call(["systemctl", "unmask", service])

    #Reload and enabling
    print("Start of service \"%s\"..." %service)
    call(["systemctl", "enable", service])

print("Enabling dipicar...")
call(["systemctl", "enable", "dipicar"])

#Enjoy !
print("Configuration done !")
