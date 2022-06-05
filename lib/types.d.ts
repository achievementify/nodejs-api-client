import type { AxiosResponse } from 'axios';
export declare type AchievementifyClientOptions = {
    projectId: number;
    clientSecret: string;
    debug?: boolean;
    redirectPath?: string;
    callbackPath?: string;
};
export declare type ConnectLinkGenerationOptions = {
    rootUrl: string;
    userId: string;
    state: string;
};
export declare type ConnectOptions = {
    authorizationCode: string;
    userId: string;
};
export declare type ConnectResponse = {
    message: string;
};
export declare type SendOptions = {
    userId: string;
    achievementId: string;
};
export declare type SendResponse = {
    message: string;
    unlockedAt?: Date;
};
export interface IAchievementifyClient {
    getRedirectPath(): string;
    getCallbackPath(): string;
    generateState(): string;
    generateConnectLink(options: ConnectLinkGenerationOptions): string;
    connect(options: ConnectOptions): Promise<AxiosResponse<ConnectResponse>>;
    send(options: SendOptions): Promise<AxiosResponse<SendResponse>>;
}
