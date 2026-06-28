/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { useSignIn } from "@/app/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutateAsync, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-black text-center tracking-tighter">
        Welcome Back
      </h2>

      <Input
        {...register("email")}
        type="email"
        placeholder="Email Address"
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />

      <Button isLoading={isPending} type="submit">
      Login
      </Button>

      <div className="flex justify-center text-sm mt-4 text-zinc-400">
        <Link
          href="/forgot-password"
          className="hover:text-yellow-400 font-bold transition-colors"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
