const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const UNAUTHORIZED_EVENT = "conexao-autista:unauthorized";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  token?: string | null;
  isMultipart?: boolean;
}

function getErrorMessage(payload: any) {
  if (!payload) return "Não foi possível concluir a ação.";
  if (typeof payload.message === "string") return payload.message;
  if (Array.isArray(payload.message)) return payload.message.join(", ");
  if (typeof payload.error === "string") return payload.error;
  return "Não foi possível concluir a ação.";
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, isMultipart, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      ...(isMultipart ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }

    throw new ApiError(getErrorMessage(payload), response.status);
  }

  return payload as T;
}

export { API_BASE_URL };
