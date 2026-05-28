import type { AuthResponse, LoginPayload, RegisterPayload } from "./auth.service";
import type { Dependent } from "./dependents.service";
import type { DiaryAttachment, DiaryFilters, DiaryRecord, SaveDiaryPayload } from "./diary.service";

const LOCAL_AUTH_USER_ID = "local-school-user";
const LOCAL_TOKEN = "local-demo-token";
const DEPENDENTS_STORAGE_KEY = "conexao-autista-web-local-dependents";
const DIARY_STORAGE_KEY = "conexao-autista-web-local-diary-records";

const demoDependents: Dependent[] = [
  {
    id: "demo-student-1",
    name: "Ana Clara",
    guardianName: "Mariana Souza",
    guardianPhone: "(11) 99999-0001",
    teacherName: "Professor João",
    status: "active",
    hasRecentCrisis: false,
  },
  {
    id: "demo-student-2",
    name: "Pedro Henrique",
    guardianName: "Carlos Oliveira",
    guardianPhone: "(11) 99999-0002",
    teacherName: "Professora Maria",
    status: "active",
    hasRecentCrisis: true,
  },
];

const demoDiaryRecords: DiaryRecord[] = [
  {
    id: "demo-record-1",
    dependentId: "demo-student-1",
    title: "Participação em atividade sensorial",
    time: "09:30",
    location: "Sala de Aula",
    content: "A aluna participou bem da atividade, interagiu com os colegas e concluiu a proposta com apoio leve.",
    mood: "Feliz",
    learning: "Reconhecimento de cores e texturas.",
    hasCrisis: false,
    crisisDetails: "",
    resolution: "",
    type: "activity",
    createdAt: new Date().toISOString(),
    attachments: [],
  },
];

export function isLocalMockEnabled() {
  return import.meta.env.VITE_USE_LOCAL_MOCKS !== "false";
}

function readStorage<T>(key: string, fallback: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(stored) as T;
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createDemoUser(payload: Partial<LoginPayload & RegisterPayload>): AuthResponse {
  const email = payload.email?.trim().toLowerCase() || "escola@demo.com";
  const name = "name" in payload && payload.name ? payload.name : "Escola Demonstração";
  const schoolName = "schoolName" in payload && payload.schoolName ? payload.schoolName : "Escola Demonstração";

  return {
    token: LOCAL_TOKEN,
    user: {
      id: LOCAL_AUTH_USER_ID,
      name,
      email,
      role: "role" in payload && payload.role ? payload.role : "teacher",
      schoolName,
    },
  };
}

function parsePtBrDate(value?: string) {
  if (!value) return null;
  const [day, month, year] = value.split("-").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

function normalizeDateOnly(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler o anexo."));
    reader.readAsDataURL(file);
  });
}

export const localDbService = {
  login(payload: LoginPayload) {
    return Promise.resolve(createDemoUser(payload));
  },

  register(payload: RegisterPayload) {
    return Promise.resolve(createDemoUser(payload));
  },

  listDependents() {
    const dependents = readStorage<Dependent[]>(DEPENDENTS_STORAGE_KEY, demoDependents);
    return Promise.resolve({ dependents });
  },

  linkDependent(code: string) {
    const dependents = readStorage<Dependent[]>(DEPENDENTS_STORAGE_KEY, demoDependents);
    const normalizedCode = code.trim().toUpperCase();
    const dependent: Dependent = {
      id: createId("local-student"),
      name: `Aluno ${normalizedCode}`,
      guardianName: "Responsável demonstração",
      guardianPhone: "(00) 00000-0000",
      teacherName: "Professor demonstração",
      status: "active",
      hasRecentCrisis: false,
    };

    const nextDependents = [dependent, ...dependents];
    writeStorage(DEPENDENTS_STORAGE_KEY, nextDependents);
    return Promise.resolve({ dependent });
  },

  listDiaryRecords(dependentId: string, filters: DiaryFilters = {}) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    const start = parsePtBrDate(filters.startDate);
    const end = parsePtBrDate(filters.endDate);

    const filtered = records.filter((record) => {
      if (record.dependentId !== dependentId) return false;
      if (filters.type && record.type !== filters.type) return false;

      const createdAt = normalizeDateOnly(new Date(record.createdAt));
      if (start && createdAt < normalizeDateOnly(start)) return false;
      if (end && createdAt > normalizeDateOnly(end)) return false;

      return true;
    });

    return Promise.resolve({ records: filtered });
  },

  getDiaryRecord(dependentId: string, recordId: string) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    const record = records.find((item) => item.dependentId === dependentId && item.id === recordId);

    if (!record) throw new Error("Anotação não encontrada.");
    return Promise.resolve({ record });
  },

  createDiaryRecord(dependentId: string, payload: SaveDiaryPayload) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    const record: DiaryRecord = {
      ...payload,
      id: createId("local-record"),
      dependentId,
      createdAt: new Date().toISOString(),
      attachments: [],
    };

    writeStorage(DIARY_STORAGE_KEY, [record, ...records]);
    return Promise.resolve({ record });
  },

  updateDiaryRecord(dependentId: string, recordId: string, payload: SaveDiaryPayload) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    let updatedRecord: DiaryRecord | null = null;

    const nextRecords = records.map((record) => {
      if (record.dependentId !== dependentId || record.id !== recordId) return record;
      updatedRecord = { ...record, ...payload };
      return updatedRecord;
    });

    if (!updatedRecord) throw new Error("Anotação não encontrada.");
    writeStorage(DIARY_STORAGE_KEY, nextRecords);
    return Promise.resolve({ record: updatedRecord });
  },

  removeDiaryRecord(dependentId: string, recordId: string) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    writeStorage(
      DIARY_STORAGE_KEY,
      records.filter((record) => record.dependentId !== dependentId || record.id !== recordId),
    );
    return Promise.resolve();
  },

  async uploadDiaryAttachment(dependentId: string, recordId: string, file: File) {
    const records = readStorage<DiaryRecord[]>(DIARY_STORAGE_KEY, demoDiaryRecords);
    const url = await fileToDataUrl(file);
    const attachment: DiaryAttachment = {
      id: createId("local-attachment"),
      fileName: file.name,
      contentType: file.type,
      size: file.size,
      url,
      uploadedAt: new Date().toISOString(),
    };

    const nextRecords = records.map((record) => {
      if (record.dependentId !== dependentId || record.id !== recordId) return record;
      return { ...record, attachments: [...(record.attachments ?? []), attachment] };
    });

    writeStorage(DIARY_STORAGE_KEY, nextRecords);
    return { attachment };
  },
};
