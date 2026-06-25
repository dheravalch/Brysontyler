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
