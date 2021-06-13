import { config } from 'dotenv';
import { join } from 'path';

export const readDotEnv = (file: string) => config({path: join(process.cwd(), file)});