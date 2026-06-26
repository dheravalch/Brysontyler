import {
  ResetPasswordPayload,
  SignUpPayload,
  LoginPayload,
  User,
} from "../models/AuthModel";
import { SuccessResponse } from "../models/AuthModel";
import { httpGet, httpPost } from "../lib/http";
export const signUp = (payload: SignUpPayload) => {
  return httpPost<SuccessResponse, SignUpPayload>(
    "/api/auth/register",
    payload,
  );
};

export const signIn = (payload: LoginPayload) => {
  return httpPost<SuccessResponse, LoginPayload>("/api/auth/login", payload);
};

export const forgotPassword = (payload: { email: string }) => {
  return httpPost<SuccessResponse, { email: string }>(
    "/api/auth/forgot-password",
    payload,
  );
};
export const ChangePassword = (payload: { newPassword: string; currentPassword:string; }) => {
  return httpPost<SuccessResponse, {newPassword: string;  currentPassword:string;  }>(
    "/api/auth/change-password",
    payload,
  );
};

export const resetPassword = (payload: ResetPasswordPayload) => {
  return httpPost<SuccessResponse, ResetPasswordPayload>(
    `/api/auth/reset-password/${payload.token}`,
    payload,
  );
};

export const getAuthUser = () => {
  return httpGet<User>("/api/auth/me");
};

export const logout = () => {
  return httpPost<{ message: string }, void>("/api/auth/logout", undefined);
};
