'use client';

import { useState } from 'react';
import { X, Star, ArrowRight, Check } from "lucide-react";
import { toast } from 'react-toastify';
interface SubscribeModalProps {
  creatorName: string;
  onClose: () => void;
}

export default function SubscribeModal({ creatorName, onClose }: SubscribeModalProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>('premium');
  const [autoRenew, setAutoRenew] = useState(true);
const handleSubScribed = () => {

    toast.success(`Starting 7-day trial for ${selectedTier}. Note: Trial cannot be canceled once started.`);
  };
  const tiers = [
    { id: 'supporter', tier: 'Supporter', price: '$9.99', desc: 'Photos & Updates' },
    { id: 'premium', tier: 'Premium', price: '$14.99', desc: 'Full Access + Live Chat', featured: true },
    { id: 'vip', tier: 'VIP', price: '$49.99', desc: 'Direct Access + Priority' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh] relative overflow-hidden">
        
        <div className="flex-none p-8 pb-4">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Unlock {creatorName}</h2>
          <p className="text-sm text-zinc-400 mt-2">Start your 7-day free trial today.</p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-2 [mask-image:linear-gradient(to_bottom,transparent,black_20px,black_calc(100%-20px),transparent)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-3">
            {tiers.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedTier(item.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 relative ${
                  selectedTier === item.id ? 'bg-zinc-800 border-yellow-400' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                }`}
              >
                {item.featured && (
                  <div className="absolute -top-3 right-6 bg-yellow-400 text-black text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${selectedTier === item.id ? 'bg-yellow-400 text-black' : 'bg-white/5 text-zinc-500'}`}>
                    <Star size={18} fill={selectedTier === item.id ? "currentColor" : "none"} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">{item.tier}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.desc}</div>
                  </div>
                </div>
                <div className="font-black text-white">{item.price}/mo</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-none p-6 border-t border-white/5 bg-zinc-950 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div onClick={() => setAutoRenew(!autoRenew)} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${autoRenew ? 'bg-yellow-400 border-yellow-400' : 'border-zinc-600 bg-transparent'}`}>
              {autoRenew && <Check size={14} className="text-black" />}
            </div>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">Auto-renew subscription after 7-day trial</span>
          </label>

          <button 
            disabled={!selectedTier}
            onClick={handleSubScribed}
            className="w-full py-4 bg-yellow-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Start 7-Day Free Trial
          </button>
          
          <p className="text-[10px] text-center text-zinc-600 px-4">
            By starting your trial, you agree to the terms. This trial cannot be canceled once initiated.
          </p>
        </div>
      </div>
    </div>
  );
}