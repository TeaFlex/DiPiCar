import {Base} from './Base';

export interface User extends Base {
    name: string;
    stats?: UserStats;
}

export interface UserStats {
    gameTime: number;
    firstConnection?: Date;
    lastConnection: Date;
}