import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export function initPigpio() {
    if(process.env.NODE_ENV !== 'development') {
        const getPath = (path: string) => join(process.cwd(), path);
        
        if(!existsSync(getPath("Release")))
            mkdirSync(getPath("Release"));
        if(!existsSync(getPath("Release/gpio.node")))
            copyFileSync(
                getPath("node_modules/pigpio/build/Release/pigpio.node"), 
                getPath("Release/pigpio.node")
            );
        writeFileSync(getPath("node_modules"), "fake node_modules, don't remove !");
    }
}