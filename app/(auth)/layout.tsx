"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
      
      <div className="hidden md:flex flex-col justify-center p-16 w-1/2 relative bg-cover bg-center">

        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632026644887-c3d790f10aea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        />
        
<div className="absolute inset-0 bg-gradient-to-br from-[#F7E018]/20 via-[#050505]/60 to-[#050505] mix-blend-multiply" />
        
        <div className="relative z-10 max-w-md">
         <Logo size={16}/>
          <p className="text-white/90 text-lg  leading-relaxed drop-shadow-sm">
            Gain exclusive, high-definition access to private content and direct communication with creators. Your inner circle awaits.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center p-6 md:p-16 relative">
        
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="w-full max-w-lg mx-auto bg-zinc-900/60 p-10 rounded-3xl border border-white/10">
          <div className="md:hidden text-2xl font-black text-[#F7E018] mb-8">BRYSON TYLER</div>
          
          {children}
        </div>
        <p className="text-[9px] text-center mt-5 text-zinc-600 uppercase tracking-widest font-bold">
        © 2026 Bryson Tyler Productions • 18+ Only
      </p>
      </div>
    </div>
  );
}