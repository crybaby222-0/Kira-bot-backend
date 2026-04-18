/**
 * API client for the Kira Bot Node.js backend.
 *
 * The backend URL is configured via VITE_API_URL.
 * Example: VITE_API_URL=https://api.kirabot.com
 *
 * All requests automatically attach the JWT bearer token from localStorage.
 * Responses are typed and errors normalized.
 */

const API_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
  "http://localhost:3333";

const TOKEN_KEY = "kira-token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
    credentials: "include",
  });

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : null) || `Request failed: ${res.status}`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

// ============ Domain helpers ============

export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  banned?: boolean;
};

export type Subscription = {
  id: string;
  plan: "starter" | "pro" | "business";
  status: "active" | "expired" | "canceled" | "pending";
  currentPeriodEnd: string;
};

export type BotInstance = {
  id: string;
  status: "connected" | "disconnected" | "qr" | "loading";
  phoneNumber?: string;
  qrCode?: string;
  lastSeen?: string;
};

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiRequest<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  register: (name: string, email: string, password: string) =>
    apiRequest<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),
  forgotPassword: (email: string) =>
    apiRequest<{ ok: true }>("/auth/forgot-password", {
      method: "POST",
      body: { email },
    }),
  resetPassword: (token: string, password: string) =>
    apiRequest<{ ok: true }>("/auth/reset-password", {
      method: "POST",
      body: { token, password },
    }),
  me: () => apiRequest<User>("/auth/me"),

  // Bot
  getBot: () => apiRequest<BotInstance>("/bot"),
  connectBot: () => apiRequest<BotInstance>("/bot/connect", { method: "POST" }),
  disconnectBot: () => apiRequest<{ ok: true }>("/bot/disconnect", { method: "POST" }),
  restartBot: () => apiRequest<{ ok: true }>("/bot/restart", { method: "POST" }),

  // Subscription
  getSubscription: () => apiRequest<Subscription | null>("/subscription"),
  createCheckout: (plan: string) =>
    apiRequest<{ url: string }>("/subscription/checkout", {
      method: "POST",
      body: { plan },
    }),
};
