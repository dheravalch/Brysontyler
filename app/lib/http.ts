import request from "./api";

export const httpGet = <T>(url: string, config?: RequestInit) =>
  request<T>(url, "GET", undefined, config);

export const httpPost = <T, P = unknown>(
  url: string,
  payload: P,
  config?: RequestInit
) => request<T>(url, "POST", payload, config);

export const httpPut = <T, P = unknown>(
  url: string,
  payload: P,
  config?: RequestInit
) => request<T>(url, "PUT", payload, config);

export const httpPatch = <T, P = unknown>(
  url: string,
  payload: P,
  config?: RequestInit
) => request<T>(url, "PATCH", payload, config);

export const httpDelete = <T>(url: string, config?: RequestInit) =>
  request<T>(url, "DELETE", undefined, config);
// Add this if your current httpPost forces JSON
export const httpPostFormData = <T>(url: string, data: FormData) => {
  return fetch(url, {
    method: "POST",
    headers: {
      // Intentionally leave Content-Type empty!
      // The browser will add "multipart/form-data; boundary=..." automatically.
    },
    body: data,
  }).then(async (res) => {
    if (!res.ok) throw await res.json();
    return res.json() as Promise<T>;
  });
};