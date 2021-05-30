import { MiscOperations } from '../../../model/misc';
import { expect, assert } from 'chai';

describe("Miscellaneous operations", async function() {

    it("Gets the hostname of the computer", async () => {
        const hostname = await MiscOperations.getHostname();

        assert.isString(hostname);
        assert.isNotEmpty(hostname);
    });

    it("Sets the hostname of the computer", async () => {
        const newName = "Henry";
        const oldName = await MiscOperations.getHostname();
        await MiscOperations.changeHostname(newName);
        const result = await MiscOperations.getHostname();
        await MiscOperations.changeHostname(oldName);
        
        assert.isString(result);
        assert.isNotEmpty(result);
        assert.notStrictEqual(result, oldName);
        assert.strictEqual(result, newName);
    });

    it("Gets the process infos", async () => {
        const result = MiscOperations.getProcessInfos();

        assert.isDefined(result);
        assert.isNumber(result.pid);
        assert.isString(result.uptime);
        assert.isNotEmpty(result.uptime);
    });
});