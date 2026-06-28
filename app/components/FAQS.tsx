"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, DollarSign, Eye, ChevronRight } from "lucide-react";

const creatorProtocols = [
  { 
    title: "CONTENT OWNERSHIP", 
    desc: "You own every frame. Our infrastructure is built to ensure your exclusivity remains absolute, with platform-level protection against unauthorized distribution.",
    icon: Eye 
  },
  { 
    title: "SECURE MONETIZATION", 
    desc: "Seamless, high-velocity payouts. We handle the global banking complexities so your earnings hit your account without friction, delay, or compromise.",
    icon: DollarSign 
  },
  { 
    title: "PRIVACY PROTOCOLS", 
    desc: "Total discretion. From advanced anti-scraping to tiered subscriber permissions, we provide the defensive tech you need to control who sees your content.",
    icon: Lock 
  }
];

export default function CreatorProtocols() {
  const [active, setActive] = useState(0);

  return (
    <section id="faqs" className="lg:py-20 py-10 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5">
            <h2 className="lg:text-[52px] text-[42px] font-black italic tracking-tighter leading-[0.85] mb-8">
              THE BRYSON <br /> <span className="text-yellow-400">STANDARD.</span>
            </h2>
            <p className="text-gray-300  max-w-sm">
              Professional-grade tools for creators who demand control over their brand, their revenue, and their privacy.
            </p>
          </div>

          {/* Interaction Area */}
          <div className="lg:col-span-7 space-y-4">
            {creatorProtocols.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === i;
              
              return (
                <div 
                  key={i} 
                  className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${isActive ? 'bg-zinc-900 border-yellow-400' : 'bg-transparent border-white/5 hover:border-white/20'}`}
                  onClick={() => setActive(i)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${isActive ? 'bg-yellow-400 text-black' : 'bg-white/5 text-zinc-500'}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className={`lg:text-xl text-lg font-black italic tracking-widest ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                        {item.title}
                      </h3>
                    </div>
                    {isActive && <ChevronRight className="text-yellow-400" />}
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-zinc-300 lg:text-lg leading-relaxed pl-16 max-w-lg"
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}