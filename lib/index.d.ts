import type { AxiosResponse } from 'axios';
import { SendOptions, IAchievementifyClient, SendResponse, AchievementifyClientOptions, ConnectLinkGenerationOptions, ConnectOptions, ConnectResponse } from './types';
export declare class AchievementifyClient implements IAchievementifyClient {
    private projectId;
    private clientSecret;
    private clientUrl;
    private api;
    private redirectPath;
    private callbackPath;
    constructor(options: AchievementifyClientOptions);
    getRedirectPath(): string;
    getCallbackPath(): string;
    generateState(): string;
    generateConnectLink(options: ConnectLinkGenerationOptions): string;
    connect(options: ConnectOptions): Promise<AxiosResponse<ConnectResponse>>;
    send(options: SendOptions): Promise<AxiosResponse<SendResponse>>;
}
