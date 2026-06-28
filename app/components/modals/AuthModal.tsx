"use client";

import { X, User, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AuthModal({ onClose, type }: { onClose: () => void, type: 'login' | 'signup' }) {
  const router = useRouter();

  const handleRoleSelect = (role: 'fan' | 'creator') => {
    router.push(`/${type}?role=${role}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-zinc-950 rounded-[2rem] overflow-hidden relative border border-white/10 shadow-2xl flex flex-col md:flex-row">
        
        <div className="hidden md:block w-1/3 relative">
          <Image
          fill
            src="https://images.unsplash.com/photo-1587230969143-b830cd7df113?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Exclusive" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute top-40 left-6">
            <h3 className="text-white font-black text-lg leading-tight uppercase">Unleash Your<br/>Desires</h3>
          </div>
        </div>

        <div className="flex-1 p-10 relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              {type === 'login' ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-zinc-400 text-sm">Select your account type to access the inner circle.</p>
          </div>
          
          <div className="space-y-4">
            <button onClick={() => handleRoleSelect('fan')} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-white/5 hover:border-[#F7E018]/50 transition-all group">
              <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-[#F7E018] group-hover:text-black transition-colors">
                <User size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Fan</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Access exclusive content</div>
              </div>
            </button>

            <button onClick={() => handleRoleSelect('creator')} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-[#F7E018]/20 hover:border-[#F7E018] transition-all group">
              <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-[#F7E018] group-hover:text-black transition-colors">
                <Star size={20} className="text-[#F7E018] group-hover:text-black" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Creator</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Start monetizing</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}