import { readFileSync } from "fs";
import { defaultConf } from "../enums";


export function dipicarConfReader(path?: string): typeof defaultConf {
    try {
        return {
            ...defaultConf, 
            ...require(path ?? "/etc/dipicar/dipicar.conf.json")
        };
    } catch (error) {
        return defaultConf;
    }
}

export function confReader(path: string): any {
    let result: any = {};
    const content = readFileSync(path)
        .toString("utf-8")
        .split('\n')
        .filter(v=>(v !== '' && !v.includes("wpa_passphrase")))
        .map(v=>v.split('='));
    for (const line of content) {
        result[line[0]] = parseInt(line[1], 10);
        if(isNaN(result[line[0]]))
            result[line[0]] = line[1];
    }
    return result;
}
