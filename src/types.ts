import type { AxiosResponse } from 'axios';

export type TriggerOptions = {
  userId: string;
  achievementId: string;
};

export type TriggerResponse = {
  unlockedAt: Date;
};

export interface IAchievementifyClient {
  trigger(options: TriggerOptions): Promise<AxiosResponse<TriggerResponse>>;
}
