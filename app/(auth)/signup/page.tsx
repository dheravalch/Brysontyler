/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { CreatorApplicationForm } from '@/app/components/CreatorApplicationForm';

// Validation Schemas
const fanSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});





export default function SignupPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'fan';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(fanSchema),
  });

  const onFanSubmit = () => {
    toast.success("Account created successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-center uppercase tracking-tighter">
        {role === 'creator' ? 'Apply as Creator' : 'Join the Experience'}
      </h2>

      {role === 'fan' ? (
        <form onSubmit={handleSubmit(onFanSubmit)} className="space-y-4">
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
            {isSubmitting ? "CREATING..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      ) : (
        <CreatorApplicationForm />
      )}

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="text-yellow-400 font-bold hover:text-yellow-300">Login</Link>
      </p>
    </div>
  );
}