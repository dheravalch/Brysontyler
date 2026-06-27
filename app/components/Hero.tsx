"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubscribeModal from "./modals/SubscribeModal";

const MEDIA_ASSETS = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=80",
  },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&q=80",
  },
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEDIA_ASSETS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative lg:min-h-screen lg:mt-18 mt-20 flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {MEDIA_ASSETS[currentIndex].type === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={MEDIA_ASSETS[currentIndex].src} type="video/mp4" />
              </video>
            ) : (
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${MEDIA_ASSETS[currentIndex].src}')`,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-10 shadow-2xl"
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
            18+ Exclusive Membership
          </span>
        </motion.div>

        <h2 className="text-5xl sm:text-7xl md:text-[5rem] font-black tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-lg">
          YOUR ULTIMATE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            BOYFRIEND EXPERIENCE
          </span>
        </h2>

        <p className="max-w-lg mx-auto text-lg text-zinc-300 mb-10 leading-relaxed font-medium">
          Unlock your private daily content, direct sessions, and a truly
          personalized connection.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg px-12 py-5 rounded-2xl shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] transition-all active:scale-[0.97]"
        >
          START YOUR EXPERIENCE — $14.99/MO
        </button>

        <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
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
