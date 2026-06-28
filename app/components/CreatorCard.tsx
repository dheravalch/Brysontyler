"use client";

import { Crown } from 'lucide-react';
import Image from 'next/image';

interface CreatorProps {
  name: string;
  tier: string;
  subscribers: string;
  rating: string;
  height:string;
  cover: string;
  online: boolean;
  onClick: () => void;
}

export default function CreatorCard({ 
  name, tier, subscribers, rating, cover, online, onClick , height
}: CreatorProps) {
  return (
    <div 
      onClick={onClick} 
      className="group relative bg-[#0a0a0a] rounded-3xl overflow-hidden cursor-pointer border border-white/[0.05] shadow-2xl hover:border-yellow-400/20 transition-all duration-500"
    >
      <div className={`relative w-full ${height}  overflow-hidden`}>
        <Image 
          src={cover} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
        />
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {online ? (
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Online
            </div>
          ) : <div />}

          <div className={`px-4 py-1.5 text-[10px] flex items-center gap-x-2 font-black uppercase tracking-[0.2em] rounded-full backdrop-blur-xl border ${
            tier === 'VIP' 
              ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' 
              : 'bg-white/5 text-white border-white/10'
          }`}>
          {tier==="VIP"&&<Crown className='w-5 h-5'/>}  {tier} 
          </div>
        </div>
        <div className="px-6 py-6  absolute w-full bottom-0  z-10 bg-linear-to-b from-transparent to-[#0a0a0a]">
        <h3 className="text-xl font-black tracking-tighter text-white mb-1 group-hover:text-yellow-400 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          <span className="text-zinc-300">{subscribers}</span>
          <span className="text-yellow-500/50">•</span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span> {rating} Rating
          </span>
        </div>
      </div>
      </div>

      

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}