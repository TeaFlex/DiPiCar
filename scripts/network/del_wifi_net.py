import os, sys
from colormsg import ColorMsg

path = "/etc/wpa_supplicant/wpa_supplicant.conf"
exist = False
length_args = len(sys.argv)
args_required = 2
m = ColorMsg()

#Check if the correct amount of argument has been input
if(length_args == args_required):
    with open(path, "r") as conf_file:
        content = conf_file.readlines()
        for line in content: 
            #Check if the input ssid already exists
            if(("ssid" in line) and (sys.argv[1] == line[7:len(line)-2])):
                for x in range(content.index(line)-2, content.index(line)+3):
                        content[x] = ""
                exist = True
    #If the entry exists, it's deleted
    if(exist):
        with open(path, "w") as conf_file:
            for l in content:
                conf_file.write(l)   
            m.success("The access point \"{}\" has been deleted in {} !".format(sys.argv[1], path))     
    else:
        m.error("\"{}\" does not exist within your list.".format(sys.argv[1]))

#Too much arguments        
else:
    m.error("Please just insert the ssid of the access point to delete.\n{}".format(
        "{} argument(s) missing.".format(args_required-length_args) if length_args < args_required else "{} extra argument(s).".format(length_args-args_required)
    ))