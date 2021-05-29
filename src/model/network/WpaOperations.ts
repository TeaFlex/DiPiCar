import { promisifiedExec as exec } from "../../utilities/promisifiedExec";
import { wifiChannels } from "../../enums/wifiChannels";

export class WpaOperations {

    public static readonly channel = 7;
    private static command = `wpa_cli -i ${WpaOperations.getInterface()}`;

    public static async addNetwork(ssid: string, passphrase: string) {        
        if(await this.getNetworkId(ssid))
            throw new Error(`SSID "${ssid}" already exists.`);
        if(passphrase.length < 8)
            throw new Error("Passphrase must contain at least 8 chars.");
            
        const netId = (await exec(`${this.command} add_network`)).trim();
        const steps = [
            `${this.command} set_network ${netId} ssid \\"${ssid}\\"`,
            `${this.command} set_network ${netId} psk \\"${passphrase}\\"`,
            `${this.command} set_network ${netId} frequency ${wifiChannels[this.channel]}`,
            `${this.command} enable_network ${netId}`
        ];
        const results = await Promise.all(steps.map(v=>exec(v)));
        if(results.find(v=>!v.includes("OK")))
            throw new Error(`Adding network "${ssid}" failed.`);
        return exec(`${this.command} save config`);
    }

    public static async removeNetwork(ssid: string) {
        const netId = await this.getNetworkId(ssid);
        if(!netId)
            throw new Error(`Network "${ssid}" does not exist.`);
        const result = await exec(`${this.command} remove_network ${netId}`);
        if(!result.includes("OK"))
            throw new Error(`Deleting network "${ssid}" failed.`);
        return exec(`${this.command} save config`);
    }

    public static async removeNetworkById(id: number) {
        const net = (await this.getNetworkList())
            .find(v=>v.id === id);
        if(!net)
            throw new Error(`Network of id ${id} does not exist.`);
        const result = await exec(`${this.command} remove_network ${net.id}`);
        if(!result.includes("OK"))
            throw new Error(`Deleting network "${net.ssid}" failed.`);
        return exec(`${this.command} save config`);
    }

    public static async getNetworkList() {
        return (await exec(`${this.command} list_network`))
            .replace(/.+\n/, '')
            .split('\n')
            .slice(0, -1)
            .map(v => {
                const temp = v.split('\t');
                return {
                    id: parseInt(temp[0], 10),
                    ssid: temp[1],
                    bssid: temp[2],
                    flags0: temp[3]
                };
            });
    }

    public static async getNetworkId(ssid: string) {
        const result = (await this.getNetworkList())
            .find(v=>v.ssid === ssid);   
        return (result)? result.id : null;
    }

    public static async getAccessPoints() {
        const scan = await exec(`${this.command} scan`);
        if(!scan.includes("OK"))
            throw new Error("Scanning networks access points failed.");
        return (await exec(`${this.command} scan_results`))
            .replace(/.+\n/, '')
            .split('\n')
            .slice(0, -1)
            .map(v => {
                const temp = v.split('\t');
                return {
                    macAddress: temp[0],
                    frequency: temp[1],
                    signalLevel: temp[2],
                    flags: temp[3]
                        .split(/[\[\]]/gm)
                        .filter(v=>v!==''),
                    ssid: temp[4]
                };
            })
            .filter(v => v.ssid !== '');
    }

    public static getInterface(confPath?: string) {
        try {
            const conf = require(confPath ?? "/etc/dipicar/dipicar.conf.json");
            return conf["interface"] as string;
        } catch (error) {
            return "wlan0";
        }
    }
}
