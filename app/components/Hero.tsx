"use client";

import { useState } from "react";
import SubscribeModal from "./modals/SubscribeModal";

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://picsum.photos/id/1015/2000/1200')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <div className="relative max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-8 shadow-2xl">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
            18+ Exclusive Membership
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl sm:text-7xl md:text-[5rem] mt-24 font-black tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-lg">
          YOUR ULTIMATE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            BOYFRIEND EXPERIENCE
          </span>
        </h2>

        <p className="max-w-lg mx-auto text-lg text-zinc-400 mb-10 leading-relaxed">
          Unlock your private daily content, direct sessions, and a truly
          personalized connection.
        </p>

        {/* Primary CTA Only */}
        <div className="flex justify-center">
          <button onClick={()=>setIsModalOpen(true)} className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg px-14 py-6 rounded-2xl shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:shadow-[0_0_60px_rgba(250,204,21,0.5)] transition-all active:scale-[0.97]">
            START YOUR EXPERIENCE — $14.99/MO
          </button>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
          7-day free trial • Secure & Private
        </p>
      </div>
      {isModalOpen && (
        <SubscribeModal
          creatorName="Bryson Tyler" 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}
