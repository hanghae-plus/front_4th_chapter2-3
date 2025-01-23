import { AppError, handleError } from "../lib/utils/errorHelper";
import { CONFIG } from "../config";


interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
}

async function request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  if (!endpoint) {
    throw new Error("Invalid endpoint: endpoint is required.");
  }

  const baseURL = CONFIG.API.BASE_URL.startsWith("http")
    ? CONFIG.API.BASE_URL
    : `${window.location.origin}${CONFIG.API.BASE_URL}`;
  
  const url = new URL(`${baseURL}${endpoint}`);
  try {
    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new AppError(
        "API request failed",
        "API_ERROR",
        response.status
      );
    }

    return response.json();
  } catch (error) {
    throw handleError(error);
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, "body">) => 
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};