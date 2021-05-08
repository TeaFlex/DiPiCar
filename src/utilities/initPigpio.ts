import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export function initPigpio() {
    const getPath = (path: string) => join(process.cwd(), path);
    
    if(!existsSync(getPath("gpio.node")))
        copyFileSync(
            getPath("node_modules/pigpio/build/Release/pigpio.node"), 
            getPath("pigpio.node")
        );
    writeFileSync(getPath("node_modules"), "fake node_modules, don't remove !");
}