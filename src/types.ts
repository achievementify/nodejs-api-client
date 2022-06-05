import type { AxiosResponse } from 'axios';

export type AchievementifyClientOptions = {
  projectId: number;
  clientSecret: string;
  debug?: boolean;
  redirectPath?: string;
  callbackPath?: string;
};

export type ConnectLinkGenerationOptions = {
  rootUrl: string;
  userId: string;
  state: string;
};

export type ConnectOptions = {
  authorizationCode: string;
  userId: string;
};

export type ConnectResponse = {
  message: string;
};

export type SendOptions = {
  userId: string;
  achievementId: string;
};

export type SendResponse = {
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
