"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, RotateCw, EyeOff, VerifiedIcon } from "lucide-react";

const CREATORS = [
  { 
    id: 1, 
    name: "Julia Sweet", 
    handle: "@julia_sweets", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop", 
    banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=200&fit=crop" 
  },
  { 
    id: 2, 
    name: "Sophie Rayne", 
    handle: "@sophieraynetv", 
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop", 
    banner: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=200&fit=crop" 
  },
  { 
    id: 3, 
    name: "Suena", 
    handle: "@lovelysuena", 
    avatar: "https://images.unsplash.com/photo-1502720705749-871143f0e671?w=150&h=150&fit=crop", 
    banner: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=200&fit=crop" 
  },
];

export const SuggestedCreators = () => {
  const [search, setSearch] = useState("");

  const filtered = CREATORS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#050505] p-4 rounded-xl border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Suggestions</h2>
        <div className="flex gap-2 text-zinc-500">
          <EyeOff size={14} className="cursor-pointer hover:text-white" />
          <RotateCw size={14} className="cursor-pointer hover:text-white" />
          <ChevronLeft size={14} className="cursor-pointer hover:text-white" />
          <ChevronRight size={14} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-zinc-700" size={14} />
        <input 
          placeholder="Search posts" 
          className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-yellow-500 text-white placeholder-zinc-700"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="relative group overflow-hidden rounded-xl h-20 border border-white/5 hover:border-yellow-500/50 transition-all cursor-pointer">
            <Image src={c.banner} alt="banner" fill className="object-cover brightness-[0.4]" />
            <div className="absolute inset-0 flex items-center px-4 gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden shrink-0">
                <Image src={c.avatar} alt="avatar" width={40} height={40} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-xs flex items-center gap-1">
                  {c.name} <VerifiedIcon className="text-yellow-400 w-4 h-4"/>
                </div>
                <div className="text-zinc-400 text-[9px]">{c.handle}</div>
              </div>
              <div className="bg-black/40 px-2 py-0.5 rounded text-[8px] font-black uppercase text-white tracking-wider border border-white/10">Free</div>
            </div>
          </div>
        ))}
      </div>
      <footer className="mt-auto pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-zinc-600">
          <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
          <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
          <span className="hover:text-zinc-400 cursor-pointer">Cookies</span>
          <span className="hover:text-zinc-400 cursor-pointer">Help</span>
        </div>
        <div className="mt-3 text-[9px] text-zinc-700 font-medium tracking-tighter">
          © {new Date().getFullYear()} BrysonTyler Productions
        </div>
      </footer>
    </div>
  );
};