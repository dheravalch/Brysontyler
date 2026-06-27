/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchConfig extends RequestInit {
  timeout?: number;
}

// prevents multiple logout calls
let isLoggingOut = false;

async function request<T>(
  url: string,
  method: HttpMethod,
  payload?: unknown,
  config: FetchConfig = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = config.timeout ?? 15000;

  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
      signal: controller.signal,
      credentials: "include",
      ...config,
    });

    const data = await res.json();

    if (res.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch {
  
      }

      window.location.href = "/sign-in";
      throw { message: "Session expired" };
    }

    if (!res.ok) {
      throw data || { message: "Request failed" };
    }

    return data as T;
  } catch (error: any) {
    if (error?.name === "AbortError") {
      throw { message: "Request timeout" };
    }

    const errorMessage = error?.message || error?.error || "Network error";

    throw { message: errorMessage };
  } finally {
    clearTimeout(id);
  }
}

export default request;
