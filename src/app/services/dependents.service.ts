import { http } from "./http";
import { isLocalMockEnabled, localDbService } from "./local-db.service";

export interface Dependent {
  id: string;
  name: string;
  guardianName: string;
  guardianPhone?: string;
  teacherName?: string;
  status: "active" | "pending" | "inactive";
  avatarUrl?: string;
  hasRecentCrisis?: boolean;
}

interface LinkDependentPayload {
  code: string;
}

interface LinkDependentResponse {
  dependent: Dependent;
}

interface ListDependentsResponse {
  dependents: Dependent[];
}

function normalizeDependent(raw: any): Dependent {
  const status = String(raw?.status ?? "active").toLowerCase();
  return {
    id: String(raw?.id ?? raw?._id ?? ""),
    name: String(raw?.name ?? ""),
    guardianName: String(raw?.guardianName ?? raw?.guardian_name ?? raw?.guardian?.name ?? "Não informado"),
    guardianPhone: raw?.guardianPhone ?? raw?.guardian_phone ?? raw?.guardian?.phone,
    teacherName: raw?.teacherName ?? raw?.teacher_name,
    status: status === "pending" || status === "inactive" ? status : "active",
    avatarUrl: raw?.avatarUrl ?? raw?.avatar_url,
    hasRecentCrisis: Boolean(raw?.hasRecentCrisis ?? raw?.has_recent_crisis),
  };
}

export const dependentsService = {
  async link(payload: LinkDependentPayload, token: string) {
    if (isLocalMockEnabled()) return localDbService.linkDependent(payload.code);

    const response = await http<any>("/school/dependents/link", {
      method: "POST",
      token,
      body: JSON.stringify({ code: payload.code.trim().toUpperCase() }),
    });

    return { dependent: normalizeDependent(response?.dependent ?? response) } as LinkDependentResponse;
  },
  async list(token: string) {
    if (isLocalMockEnabled()) return localDbService.listDependents();

    const response = await http<any>("/school/dependents", {
      method: "GET",
      token,
    });

    const list = Array.isArray(response?.dependents) ? response.dependents : Array.isArray(response) ? response : [];

    return { dependents: list.map(normalizeDependent) } as ListDependentsResponse;
  },
};
