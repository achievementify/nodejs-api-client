import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_SERVER, API_SERVER_DEBUG } from './constants';
import {
  TriggerOptions,
  IAchievementifyClient,
  TriggerResponse,
} from './types';

export class AchievementifyClient implements IAchievementifyClient {
  private clientSecret: string;

  private api: AxiosInstance;

  constructor(clientSecret: string, debug?: boolean) {
    if (!clientSecret) {
      throw new Error('Client secret is not set');
    }

    this.clientSecret = clientSecret;

    this.api = axios.create({
      baseURL: debug ? API_SERVER_DEBUG : API_SERVER,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public trigger(options: TriggerOptions): Promise<AxiosResponse<TriggerResponse>> {
    const { userId, achievementId } = options;

    return this.api.post<TriggerResponse>(`/achievements/${achievementId}`, {
      userId,
      clientSecret: this.clientSecret,
    });
  }
}
