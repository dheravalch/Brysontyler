'use client';

import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { Mail } from 'lucide-react'; 

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center  space-y-8  text-center">
      <div className="bg-zinc-900 p-6 rounded-full">
        <Mail size={48} className="text-yellow-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black  tracking-tighter">
          Check your inbox
        </h2>
        <p className="text-zinc-400 max-w-sm mx-auto">
          We have sent a verification link to your email address. 
          Please click it to activate your account.
        </p>
      </div>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <Link href="/login" className="w-full">
          <Button className="w-full">Back to Login</Button>
        </Link>
        <p className="text-xs text-zinc-600 uppercase font-bold tracking-widest">
          Didn&apos;t receive it? <span className="text-yellow-400 cursor-pointer underline">Resend link</span>
        </p>
      </div>
    </div>
  );
}