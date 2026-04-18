import { create } from "zustand";
import { api, getToken, setToken, type User } from "./api";

type AuthState = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  // Mock helper for demo (works without backend)
  mockLogin: (role?: "user" | "admin") => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,
  init: async () => {
    const token = getToken();
    if (!token) {
      set({ initialized: true });
      return;
    }
    try {
      const user = await api.me();
      set({ user, initialized: true });
    } catch {
      setToken(null);
      set({ user: null, initialized: true });
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { token, user } = await api.login(email, password);
      setToken(token);
      set({ user, loading: false });
      return user;
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },
  register: async (name, email, password) => {
    set({ loading: true });
    try {
      const { token, user } = await api.register(name, email, password);
      setToken(token);
      set({ user, loading: false });
      return user;
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },
  logout: () => {
    setToken(null);
    set({ user: null });
  },
  mockLogin: (role = "user") => {
    const user: User = {
      id: "demo-user",
      email: role === "admin" ? "admin@kirabot.com" : "demo@kirabot.com",
      name: role === "admin" ? "Admin Demo" : "Usuário Demo",
      role,
      createdAt: new Date().toISOString(),
    };
    setToken("demo-token");
    set({ user });
  },
}));
