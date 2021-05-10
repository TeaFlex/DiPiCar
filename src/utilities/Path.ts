import { homedir } from 'os';
import { resolve, join } from 'path';

export class Path {
    static get env() {
        return {
            dbPath: resolvePath(process.env.DB_PATH ?? './data'),
            logPath: resolvePath(process.env.LOG_PATH ?? './logs')
        }
    }
}

export function resolvePath(...parts: string[]) {
    const tempPath = Array.from(join(...parts));
    if(tempPath[0].trim() === '~') tempPath[0] = homedir();
    return resolve(tempPath.join(''));
}