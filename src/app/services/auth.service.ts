import { http } from "./http";

export interface SchoolUser {
  id: string;
  name: string;
  email: string;
  role: string;
  schoolName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  schoolName: string;
}

export interface AuthResponse {
  token: string;
  user: SchoolUser;
}

function normalizeAuthResponse(response: any): AuthResponse {
  const token = response?.token ?? response?.accessToken ?? "";
  const rawUser = response?.user ?? response?.schoolUser ?? {};

  return {
    token,
    user: {
      id: String(rawUser.id ?? rawUser._id ?? ""),
      name: String(rawUser.name ?? rawUser.fullName ?? ""),
      email: String(rawUser.email ?? ""),
      role: String(rawUser.role ?? "teacher"),
      schoolName: String(rawUser.schoolName ?? rawUser.school_name ?? ""),
    },
  };
}

export const authService = {
  async login(payload: LoginPayload) {
    const response = await http<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      }),
    });

    return normalizeAuthResponse(response);
  },
  async register(payload: RegisterPayload) {
    const response = await http<any>("/school-users", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        email: payload.email.trim().toLowerCase(),
      }),
    });

    return normalizeAuthResponse(response);
  },
};
