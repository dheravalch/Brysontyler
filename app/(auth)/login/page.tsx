/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Link from "next/link";

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    toast.success("Login successful! Redirecting...");
    localStorage.setItem('isVerified', 'true');
    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Welcome Back</h2>
      
      <Input 
        {...register("email")} 
        type="email" 
        placeholder="Email Address" 
        error={errors.email?.message as string}
      />
      
      <Input 
        {...register("password")} 
        type="password" 
        placeholder="Password" 
        error={errors.password?.message as string}
      />

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "PROCESSING..." : "LOGIN"}
      </Button>

      <div className="flex justify-center text-sm mt-4 text-zinc-400">
        <Link href="/forgot-password" className="hover:text-white">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}