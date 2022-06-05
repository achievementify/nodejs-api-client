import type { AxiosResponse } from 'axios';

export type SendOptions = {
  userId: string;
  achievementId: string;
};

export type SendResponse = {
  unlockedAt: Date;
};

export interface IAchievementifyClient {
  send(options: SendOptions): Promise<AxiosResponse<SendResponse>>;
}
