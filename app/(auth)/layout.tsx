'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-zinc-900/80 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">

        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-8 mt-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl mx-auto mb-4 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            BT
          </div>
          <h1 className="text-2xl font-black tracking-tighter">BRYSON TYLER</h1>
        </div>
        
        {children}
      </div>
    </div>
  );
}