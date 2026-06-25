/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from "../services/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { User } from "../models/AuthModel";
import { toast } from "react-toastify";

const getErrorMessage = (err: any) =>
  err?.message || "An unexpected error occurred";

export const useSignUp = () => {
  const { replace } = useRouter();
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (res) => {
      toast.success(res.message || "Registration Successful");
      replace("/verify-email");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useSignIn = () => {
  const { replace } = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (res) => {
      setUser(res.data?.user as User);
      toast.success(res.message || "Login Successful");
      replace("/home");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (res) =>
      toast.success(res.message || "Password reset link sent"),
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useResetPassword = () => {
  const { replace } = useRouter();
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (res) => {
      toast.success(res.message || "Password updated successfully");
      replace("/login");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};
export const useChangePassword = () => {
    const clearAll =useAuthStore((store)=>store.logout)
  const { replace } = useRouter();
    const { mutate: logout } = useLogout();
  return useMutation({
    mutationFn: authService.ChangePassword,
    onSuccess: (res) => {
      toast.success(res.message || "Password changed successfully");
      clearAll()
      logout()
      replace("/home");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAll = useAuthStore((state) => state.logout);
  
  const { replace } = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAll();
      queryClient.clear();
      toast.info("Logged out successfully");
      replace("/home");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};
export const useGetAuthUser = (isAuthenticated:boolean) => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: authService.getAuthUser,
     enabled:isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
