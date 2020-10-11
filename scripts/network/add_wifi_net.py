import os, sys
from colormsg import ColorMsg

path = "/etc/wpa_supplicant/wpa_supplicant.conf" #os.path.dirname(os.path.abspath(__file__))+"/test.conf" 
exist = False
length_args = len(sys.argv)
args_required = 3
m = ColorMsg()

#Check if the correct amount of argument has been input
if(length_args == args_required):
    with open(path, "r") as conf_file:
        for line in conf_file:
            #Check if the input ssid already exists
            if(("ssid" in line) and (sys.argv[1] == line[7:len(line)-2])):
                exist = True
                m.error("\"{}\" already exists within your list.".format(sys.argv[1]))
    #If the entry does not exist, it's written
    if(not exist):
        with open(path, "a") as conf_file:
            for l in ["\n", "network={\n", "\tssid=\"{}\"\n".format(sys.argv[1]), "\tpsk=\"{}\"\n".format(sys.argv[2]), "}\n"]:
                conf_file.write(l)   
            m.success("The new access point \"{}\" has been written in {} !".format(sys.argv[1], path))

#Too much arguments        
else:
    m.error("Please insert firstly the ssid of the access point and then its password.\n{}".format(
        "{} argument(s) missing.".format(args_required-length_args) if length_args < args_required else "{} extra argument(s).".format(length_args-args_required)
    ))