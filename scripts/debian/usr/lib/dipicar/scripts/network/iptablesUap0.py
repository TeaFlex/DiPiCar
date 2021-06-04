#!/usr/bin/python3

import json
from subprocess import call

try:
    with open("/etc/dipicar/dipicar.conf.json") as c:
        conf = json.load(c)
    print("Parameters used: {}".format(conf))
except Exception as e:
    print("Configuration file not found.")
    exit(1)
    
ifname = "uap0"

policy = {
    "INPUT": "ACCEPT",
    "OUTPUT": "ACCEPT",
    "FORWARD": "ACCEPT"
}

#Flush everything
for param in ["F", "X"]:
    call(["iptables", "-"+param])

for param in ["filter", "nat", "mangle"]:
    call(["iptables", "-t", param, "-F"])

#Set policy
for rule in policy:
    call(["iptables", "-P", rule, policy[rule]])

#Allow only the port of listening
for type in ["udp", "tcp"]:
    call(["iptables", "-A", "INPUT", "-i", ifname, "-p", type, "--dport", conf["port"], "-j", "ACCEPT"])

#Drop everything else
call(["iptables", "-A", "INPUT", "-i", ifname, "-j", "DROP"])