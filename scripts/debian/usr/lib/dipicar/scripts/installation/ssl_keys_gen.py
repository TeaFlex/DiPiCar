#!/usr/bin/python3
from subprocess import call;
from sys import argv
from os import path

outPath = argv[1] if(len(argv)>1) else "/usr/lib/dipicar/creds"
duration = 365
rsaLength = 4096

#Generate ssl keys
call([
    "openssl", 
    "req", 
    "-x509", 
    "-newkey", 
    "rsa:"+str(rsaLength), 
    "-keyout", path.join(outPath,"key.pem"), 
    "-out", path.join(outPath,"cert.pem"), 
    "-days", str(duration), 
    "--batch", 
    "-nodes"
])