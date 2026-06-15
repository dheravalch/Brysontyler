'use client';

import { X, User, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthModal({ onClose, type }: { onClose: () => void, type: 'login' | 'signup' }) {
    const router = useRouter();

  const handleRoleSelect = (role: 'fan' | 'creator') => {
    router.push(`/${type}?role=${role}`);

  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-black mb-8 text-center bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          {type === 'login' ? 'Welcome Back' : 'Join the Experience'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Fan Button */}
          <button onClick={()=>handleRoleSelect('fan')} className="group flex flex-col items-center gap-3 p-6 bg-zinc-950 border border-white/5 rounded-2xl hover:border-zinc-500 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <div className="p-3 rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
              <User size={28} className="text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold text-sm">Fan</span>
          </button>

          <button onClick={()=>handleRoleSelect('creator')} className="group flex flex-col items-center gap-3 p-6 bg-zinc-950 border border-yellow-500/20 rounded-2xl hover:border-yellow-400 transition-all hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
            <div className="p-3 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
              <Star size={28} className="text-yellow-400 fill-yellow-400" />
            </div>
            <span className="font-bold text-sm text-yellow-100">Creator</span>
          </button>
        </div>

        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
          Choose your path to continue
        </p>
      </div>
    </div>
  );
}