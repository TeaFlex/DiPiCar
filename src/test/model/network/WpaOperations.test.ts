import { WpaOperations } from '../../../model/network';
import { expect, assert } from 'chai';
import { join } from "path";

describe("WPA operations", async function () {
    
    it("Gets the used interface", async () => {
        const pathToMockConf = join(__dirname, "dipicar.mock.json");
        
        const wlan = WpaOperations.getInterface(pathToMockConf);

        assert.strictEqual(wlan, "wlan42");
    });

    it("Gets the default interface", async () => {
        const wlan = WpaOperations.getInterface("/path/that/doesnt/exist");

        assert.strictEqual(wlan, "wlan0");
    });

    it("Scans the access points", async () => {
        const result = await WpaOperations.getAccessPoints();
        
        assert.isArray(result);
    });

    it("Gets the network list", async () => {
        const result = await WpaOperations.getNetworkList();
        
        assert.isArray(result);
    });

    it("Adds an network", async () => {
        const ssid = "Test";
        const passphrase = "IncrediblePassword";

        await WpaOperations.addNetwork(ssid, passphrase);

        const netId = await WpaOperations.getNetworkId(ssid);
        const netObj = (await WpaOperations.getNetworkList())
            .find(n => n.ssid === ssid);
        
        assert.isNotNull(netId);
        assert.isDefined(netObj);
        assert.strictEqual(ssid, netObj?.ssid);
    });

    it("Removes the network from the previous test", async () => {
        const ssid = "Test";

        await WpaOperations.removeNetwork(ssid);

        const netId = await WpaOperations.getNetworkId(ssid);
        const netObj = (await WpaOperations.getNetworkList())
            .find(n => n.ssid === ssid);
        
        assert.isNull(netId);
        assert.isUndefined(netObj);
    });

    it("Adds an network then removes it by id", async () => {
        const ssid = "Test";
        const passphrase = "IncrediblePassword";

        await WpaOperations.addNetwork(ssid, passphrase);

        let netId = await WpaOperations.getNetworkId(ssid);
        let netObj = (await WpaOperations.getNetworkList())
            .find(n => n.ssid === ssid);
        
        assert.isNotNull(netId);
        assert.isDefined(netObj);
        assert.strictEqual(ssid, netObj?.ssid);

        await WpaOperations.removeNetworkById(netId!);

        netId = await WpaOperations.getNetworkId(ssid);
        netObj = (await WpaOperations.getNetworkList())
            .find(n => n.ssid === ssid);
        
        assert.isNull(netId);
        assert.isUndefined(netObj);
    });

    it("Gets the ips of the used interface and uap0", async () => {
        //NOTE: initUap0.py must have been executed before running this test.
        const result = await WpaOperations.getIPs();
        
        assert.isArray(result);
        assert.isDefined(result);
        assert.strictEqual(result.length, 2);
    });
});