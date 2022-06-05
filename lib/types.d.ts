import type { AxiosResponse } from 'axios';
export declare type SendOptions = {
    userId: string;
    achievementId: string;
};
export declare type SendResponse = {
    unlockedAt: Date;
};
export interface IAchievementifyClient {
    send(options: SendOptions): Promise<AxiosResponse<SendResponse>>;
}
