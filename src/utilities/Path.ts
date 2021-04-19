import { homedir } from 'os';
import { resolve, join } from 'path';

export class Path {
    public static env = {
        dbPath: resolvePath(process.env.DB_PATH ?? './data'),
        logPath: resolvePath(process.env.LOG_PATH ?? './logs')
    }
}

export function resolvePath(...parts: string[]) {
    const tempPath = Array.from(join(...parts));
    tempPath[0] = (tempPath[0].trim() === '~')? homedir() : tempPath[0];
    return resolve(tempPath.join(''));
}