/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';
import { useForgotPassword } from '@/app/hooks/useAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: any) => {
    forgotPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Forgot Password</h2>
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
      
      <Button isLoading={isPending} disabled={isPending} type="submit">
        {isPending ? "SENDING..." : "SEND RESET LINK"}
      </Button>

      <div className="text-center">
        <Link href="/login" className="text-sm text-zinc-500 hover:text-white transition-colors">
          Back to Login
        </Link>
      </div>
    </form>
  );
}