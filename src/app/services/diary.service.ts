import { http } from "./http";
import { isLocalMockEnabled, localDbService } from "./local-db.service";

export type DiaryRecordType = "school" | "meal" | "activity" | "alert";
export type DiaryMood = "Feliz" | "Calmo" | "Ansioso" | "Irritado";

export interface DiaryAttachment {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface DiaryRecord {
  id: string;
  dependentId: string;
  title: string;
  time: string;
  location: string;
  content: string;
  mood: DiaryMood;
  learning?: string;
  hasCrisis: boolean;
  crisisDetails?: string;
  resolution?: string;
  type: DiaryRecordType;
  createdAt: string;
  attachments?: DiaryAttachment[];
}

export interface DiaryFilters {
  startDate?: string;
  endDate?: string;
  type?: DiaryRecordType;
}

export interface SaveDiaryPayload {
  title: string;
  time: string;
  location: string;
  content: string;
  mood: DiaryMood;
  learning?: string;
  hasCrisis: boolean;
  crisisDetails?: string;
  resolution?: string;
  type: DiaryRecordType;
}

export const diaryService = {
  listByDependent(dependentId: string, token: string, filters: DiaryFilters = {}) {
    if (isLocalMockEnabled()) return localDbService.listDiaryRecords(dependentId, filters);

    const params = new URLSearchParams();
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);
    if (filters.type) params.set("type", filters.type);
    const query = params.toString();
    return http<{ records: DiaryRecord[] }>(`/school/dependents/${dependentId}/records${query ? `?${query}` : ""}`, { token });
  },
  getById(dependentId: string, recordId: string, token: string) {
    if (isLocalMockEnabled()) return localDbService.getDiaryRecord(dependentId, recordId);

    return http<{ record: DiaryRecord }>(`/school/dependents/${dependentId}/records/${recordId}`, { token });
  },
  create(dependentId: string, payload: SaveDiaryPayload, token: string) {
    if (isLocalMockEnabled()) return localDbService.createDiaryRecord(dependentId, payload);

    return http<{ record: DiaryRecord }>(`/school/dependents/${dependentId}/records`, { method: "POST", token, body: JSON.stringify(payload) });
  },
  update(dependentId: string, recordId: string, payload: SaveDiaryPayload, token: string) {
    if (isLocalMockEnabled()) return localDbService.updateDiaryRecord(dependentId, recordId, payload);

    return http<{ record: DiaryRecord }>(`/school/dependents/${dependentId}/records/${recordId}`, { method: "PUT", token, body: JSON.stringify(payload) });
  },
  remove(dependentId: string, recordId: string, token: string) {
    if (isLocalMockEnabled()) return localDbService.removeDiaryRecord(dependentId, recordId);

    return http<void>(`/school/dependents/${dependentId}/records/${recordId}`, { method: "DELETE", token });
  },
  uploadAttachment(dependentId: string, recordId: string, file: File, token: string) {
    if (isLocalMockEnabled()) return localDbService.uploadDiaryAttachment(dependentId, recordId, file);

    const formData = new FormData();
    formData.append("file", file);
    return http<{ attachment: DiaryAttachment }>(`/school/dependents/${dependentId}/records/${recordId}/attachments`, {
      method: "POST",
      token,
      body: formData,
      isMultipart: true,
    });
  },
};
