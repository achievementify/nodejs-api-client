import type { AxiosResponse } from 'axios';
import { TriggerOptions, IAchievementifyClient, TriggerResponse } from './types';
export declare class AchievementifyClient implements IAchievementifyClient {
    private clientSecret;
    private api;
    constructor(clientSecret: string, debug?: boolean);
    trigger(options: TriggerOptions): Promise<AxiosResponse<TriggerResponse>>;
}
