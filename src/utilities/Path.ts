import { homedir } from 'os';
import { resolve, join } from 'path';

export function appPath() {
    return {
        dbPath: process.env.DB_PATH ?? './data',
        logPath: process.env.LOG_PATH ?? './logs'
    };
}
