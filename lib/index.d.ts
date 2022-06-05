import type { AxiosResponse } from 'axios';
import { SendOptions, IAchievementifyClient, SendResponse } from './types';
export declare class AchievementifyClient implements IAchievementifyClient {
    private clientSecret;
    private api;
    constructor(clientSecret: string, debug?: boolean);
    send(options: SendOptions): Promise<AxiosResponse<SendResponse>>;
}
