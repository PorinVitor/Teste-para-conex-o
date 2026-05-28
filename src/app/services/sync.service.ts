import { http } from "./http";
import type { Dependent } from "./dependents.service";
import type { DiaryRecord } from "./diary.service";

export interface SyncCheckpoint {
  lastSyncAt?: string;
}

export interface MobileSyncPayload {
  checkpoint?: SyncCheckpoint;
}

export interface MobileSyncResponse {
  serverTime: string;
  checkpoint: SyncCheckpoint;
  dependents: Dependent[];
  diaryRecords: DiaryRecord[];
}

export const syncService = {
  pullFromMobile(token: string, payload: MobileSyncPayload = {}) {
    return http<MobileSyncResponse>("/sync/mobile/pull", {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    });
  },
};
