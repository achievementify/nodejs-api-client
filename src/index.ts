import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import {
  API_SERVER,
  API_SERVER_DEBUG,
  CLIENT_URL,
  CLIENT_URL_DEBUG,
} from './constants';
import {
  SendOptions,
  IAchievementifyClient,
  SendResponse,
  AchievementifyClientOptions,
  ConnectLinkGenerationOptions,
  ConnectOptions,
  ConnectResponse,
} from './types';

export class AchievementifyClient implements IAchievementifyClient {
  private projectId: number;

  private clientSecret: string;

  private clientUrl: string;

  private api: AxiosInstance;

  private redirectPath = '/auth/redirect/achievementify';

  private callbackPath = '/auth/callback/achievementify';

  constructor(options: AchievementifyClientOptions) {
    if (!options.projectId) {
      throw new Error('Project ID is not set');
    }

    this.projectId = options.projectId;

    if (!options.clientSecret) {
      throw new Error('Client secret is not set');
    }

    this.clientSecret = options.clientSecret;

    this.clientUrl = options.debug ? CLIENT_URL_DEBUG : CLIENT_URL;

    this.api = axios.create({
      baseURL: options.debug ? API_SERVER_DEBUG : API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (options.redirectPath) {
      this.redirectPath = options.redirectPath;
    }

    if (options.callbackPath) {
      this.callbackPath = options.callbackPath;
    }
  }

  public getRedirectPath(): string {
    return this.redirectPath;
  }

  public getCallbackPath(): string {
    return this.callbackPath;
  }

  public generateState(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 32; i > 0; i -= 1) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  public generateConnectLink(options: ConnectLinkGenerationOptions): string {
    return `${this.clientUrl}/oauth?project_id=${this.projectId}&user_id=${options.userId}&redirect_uri=${options.rootUrl}${this.callbackPath}&state=${options.state}`;
  }

  public connect(options: ConnectOptions): Promise<AxiosResponse<ConnectResponse>> {
    const { authorizationCode, userId } = options;

    return this.api.post<ConnectResponse>('/oauth', {
      client_secret: this.clientSecret,
      authorization_code: authorizationCode,
      project_id: this.projectId,
      user_id: userId,
    });
  }

  public send(options: SendOptions): Promise<AxiosResponse<SendResponse>> {
    const { userId, achievementId } = options;

    return this.api.post<SendResponse>(`/achievements/${achievementId}`, {
      user_id: userId,
      client_secret: this.clientSecret,
    });
  }
}
