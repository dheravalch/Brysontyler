/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';

// 1. Schema for email validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: any) => {
    toast.success("Password reset link sent to your email!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Reset Password</h2>
        <p className="text-sm text-zinc-400">
          Enter your email to receive a secure reset link.
        </p>
      </div>
      
      <Input 
        {...register("email")}
        type="email" 
        placeholder="Email Address" 
        error={errors.email?.message as string}
      />
      
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "SENDING..." : "SEND RESET LINK"}
      </Button>

      <div className="text-center">
        <Link href="/login" className="text-sm text-zinc-500 hover:text-white transition-colors">
          Back to Login
        </Link>
      </div>
    </form>
  );
}