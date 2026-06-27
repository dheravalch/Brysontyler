"use client";

import { Star, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function FollowingPage() {
  const subscriptions = [
    { 
      id: 1, 
      name: "Elena Rivers", 
      handle: "@elena", 
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", 
      tier: "Elite Member" 
    },
    { 
      id: 2, 
      name: "Marcus Thorne", 
      handle: "@marcus", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", 
      tier: "VIP Access" 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter">My Subscriptions</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
          Active premium access & content tiers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((sub) => (
          <div 
            key={sub.id} 
            className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500/50 transition-all cursor-pointer"
          >
            <div className="h-40 w-full relative">
              <Image 
                src={sub.image} 
                alt={sub.name} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            <div className="p-6 -mt-10 relative z-10">
              <div className="w-16 h-16 rounded-2xl border-4 border-zinc-900 overflow-hidden mb-4 shadow-xl relative">
                <Image 
                  src={sub.image} 
                  alt={sub.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-black">{sub.name}</h3>
                  <p className="text-zinc-400 text-xs font-bold uppercase">{sub.handle}</p>
                </div>
                <div className="bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {sub.tier}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                View Content <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}