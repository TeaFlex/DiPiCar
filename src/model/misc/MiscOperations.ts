import { stat, truncate , appendFile} from 'fs/promises';
import { promisifiedExec as exec } from "../../utilities";

export class MiscOperations {
    static getProcessInfos() {
        let s = Math.floor(process.uptime());
        const d = Math.floor(s/(24*3600));
        s %= (24*3600);
        const h = Math.floor(s/3600);
        s %= 3600;
        const m = Math.floor(s/60);
        s %= 60;
        return {
            pid: process.pid,
            uptime: `${d} days, ${h} hours, ${m} minutes and ${s} seconds`
        };
    }

    static async getHostname() {
        return (await exec("hostname")).replace('\n', '');
    }

    static async changeHostname(newName: string) {
        const hostsPath = "/etc/hosts";
        await exec(`hostnamectl set-hostname ${newName}`);
        if((await this.getHostname()) !== newName)
            throw new Error("Something went wrong, hostname hasn't been changed.");

        const toChange = (await exec(`tail -n 1 ${hostsPath}`)).replace('\n', '').length+1;
        const fSize = (await stat(hostsPath)).size;
        await truncate(hostsPath, fSize - toChange);
        await appendFile(hostsPath, `127.0.1.1\t${newName}\n`);
    }

    static getServerTimestamp() {
        return new Date();
    }
}