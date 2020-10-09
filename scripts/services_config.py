import os

#Configuration files path and their name
conf_files = {
    'dhcpcd':'/etc/dhcpcd.conf',
    'dnsmasq':'/etc/dnsmasq.conf', 
    'hostapd':'/etc/hostapd/hostapd.conf'
}

#Path where the script is
path = os.path.dirname(os.path.abspath(__file__))

#Copy of the content of each configured files to the correct location
for service in conf_files:
    print("Configuration of {} in {}...".format(service, conf_files[service]))
    os.system("sudo bash -c 'cat {}/../configuration_files/{}.conf > {}'".format(path, service, conf_files[service]))
    print("Reload of service \"{}\"...".format(service))
    os.system("sudo service {} reload".format(service))

#Enjoy !
print("Configuration done !")