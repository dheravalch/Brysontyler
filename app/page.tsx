/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Lock, Eye, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const isVerified = localStorage.getItem('isVerified');
    if (isVerified === 'true') {

      push('/home');
    } else {

      setIsOpen(true);
    }
  }, [push]);

  const handleVerify = () => {
    localStorage.setItem('isVerified', 'true');
    setIsOpen(false);
    push('/home');
  };

  const handleBounce = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center p-6">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Top Left Branding */}
      <div className="absolute top-8 left-8 flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          BT
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white">Bryson Tyler</h1>
          <p className="text-[8px] text-yellow-400 font-bold tracking-[2px]">PRODUCTIONS</p>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="max-w-xl w-full z-10 bg-[#0a0a0a] border border-white/[0.08] p-12 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
        <ShieldAlert size={64} className="text-yellow-500 mb-8 animate-pulse" />
        
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-6">
          Age Restricted
        </h2>
        
        <p className="text-zinc-400 text-sm max-w-sm mb-12 leading-relaxed">
          The content on this platform is intended for mature audiences only. Please confirm you are 18+ and accept our terms of service to proceed.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-12">
          {[
            { icon: Lock, label: '18+ VERIFIED' },
            { icon: Eye, label: 'EXPLICIT MEDIA' },
            { icon: AlertTriangle, label: 'PRIVATE ACCESS' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 bg-[#0f0f0f] border border-white/[0.05] rounded-2xl">
              <item.icon className="text-zinc-700" size={16} />
              <span className="text-[9px] font-black text-zinc-500 tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full max-w-sm">
          <button 
            onClick={handleVerify}
            className="flex-[2] py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02]"
          >
            I Am 18+ Enter
          </button>
          <button 
            onClick={handleBounce}
            className="flex-1 py-4 bg-[#141414] hover:bg-[#1a1a1a] text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/5"
          >
            Exit
          </button>
        </div>

        <p className="mt-12 text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
          By proceeding, you agree to our <span className="text-zinc-400 cursor-pointer hover:underline">Privacy Policy</span> and <span className="text-zinc-400 cursor-pointer hover:underline">Terms of Use</span>.
        </p>
      </div>
    </div>
  );
}