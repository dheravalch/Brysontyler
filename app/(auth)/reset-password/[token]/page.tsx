/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useResetPassword } from '@/app/hooks/useAuth';

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token as string;
  
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: any) => {
    if (!token) return;
    resetPassword({ token, password: data.password });
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Set New Password</h2>
        </div>

        <Input 
          {...register("password")}
          type="password" 
          placeholder="New Password" 
          error={errors.password?.message as string}
        />
        
        <Input 
          {...register("confirmPassword")}
          type="password" 
          placeholder="Confirm Password" 
          error={errors.confirmPassword?.message as string}
        />
        
        <Button isLoading={isPending} disabled={isPending || !token} type="submit">
          {isPending ? "UPDATING..." : "RESET PASSWORD"}
        </Button>

        {!token && (
          <p className="text-red-500 text-xs text-center">Invalid or missing reset token.</p>
        )}
      </form>
    </div>
  );
}