import type { AxiosResponse } from 'axios';
export declare type TriggerOptions = {
    userId: string;
    achievementId: string;
};
export declare type TriggerResponse = {
    unlockedAt: Date;
};
export interface IAchievementifyClient {
    trigger(options: TriggerOptions): Promise<AxiosResponse<TriggerResponse>>;
}
