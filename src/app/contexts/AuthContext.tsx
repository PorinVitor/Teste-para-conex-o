import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AuthResponse, LoginPayload, RegisterPayload, SchoolUser } from "../services/auth.service";
import { authService } from "../services/auth.service";
import { UNAUTHORIZED_EVENT } from "../services/http";

const AUTH_STORAGE_KEY = "conexao-autista-web-auth";

interface AuthState {
  token: string | null;
  user: SchoolUser | null;
}

interface AuthContextData extends AuthState {
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function getInitialState(): AuthState {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return { token: null, user: null };

  try {
    return JSON.parse(stored) as AuthState;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { token: null, user: null };
  }
}

function persistAuth(data: AuthResponse | null) {
  if (!data) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ token: data.token, user: data.user }),
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => getInitialState());

  async function login(payload: LoginPayload) {
    const authData = await authService.login(payload);
    setState({ token: authData.token, user: authData.user });
    persistAuth(authData);
  }

  async function register(payload: RegisterPayload) {
    const authData = await authService.register(payload);
    setState({ token: authData.token, user: authData.user });
    persistAuth(authData);
  }

  function logout() {
    setState({ token: null, user: null });
    persistAuth(null);
  }

  useEffect(() => {
    function handleUnauthorized() {
      if (!state.token) return;
      logout();
      toast.error("Sua sessão expirou. Faça login novamente.");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [state.token]);

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token),
      login,
      register,
      logout,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
