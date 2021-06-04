#!/usr/bin/python3

import json
from os import path
from subprocess import call

try:
    with open(path.join(path.dirname(__file__), "defaultConf.json")) as c:
        defaultConf = json.load(c)
except Exception as e:
    print("Dafault configuration file not found.")
    exit(1)

try:
    with open("/etc/dipicar/dipicar.conf.json") as c:
        conf = json.load(c)
    conf = {**defaultConf, **conf}
    print("Parameters used: {}".format(conf))
except Exception as e:
    print("Configuration file not found, default values will be used.")
    conf = defaultConf

interfaces = [
    {
        "ifname": "uap0",
        "whitelist": [
            conf["port"],   #Dipicar
            67,             #DHCP (server)
            53,             #DNS
        ]
    }
]

policy = {
    "INPUT": "ACCEPT",
    "OUTPUT": "ACCEPT",
    "FORWARD": "DROP"
}

if(conf["secureInterface"]):
    interfaces.append({
        "ifname": conf["interface"],
        "whitelist": [
            conf["port"],   #Dipicar
            68
        ]+conf["whitelist"]
    })

print("Configuration of iptables.")

#Flushes everything
for param in ["F", "X"]:
    call(["iptables", "-"+param])

for param in ["filter", "nat", "mangle"]:
    call(["iptables", "-t", param, "-F"])

#Sets the policy
for rule in policy:
    call(["iptables", "-P", rule, policy[rule]])

for ifobj in interfaces:
    print("Configuring access for %s..." %ifobj["ifname"])
    #Allows only the port of listening
    for port in ifobj["whitelist"]:
        for type in ["udp", "tcp"]:
            call(["iptables", "-A", "INPUT", "-i", ifobj["ifname"], "-p", type, "--dport", str(port), "-j", "ACCEPT"])

    #Allows ping
    call(["iptables", "-A", "INPUT", "-i", ifobj["ifname"], "-p", "icmp", "-j", "ACCEPT"])

    #Drops everything else
    call(["iptables", "-A", "INPUT", "-i", ifobj["ifname"], "-j", "DROP"])

print("DONE")