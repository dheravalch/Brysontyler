"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubscribeModal from "./modals/SubscribeModal";
import { useRouter } from "next/navigation";
import CreatorStats from "./CreatorStats";
interface HeroProps{
  openModal:()=>void;
}
const MEDIA_ASSETS = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1592399786447-6ad3da3e751e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1590397041404-a0cfb285a2a6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1445088803572-b7b975c96e12?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "image",
    src: " https://images.unsplash.com/photo-1604238400876-0f653479e649?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Hero({openModal}:HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEDIA_ASSETS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative lg:min-h-screen pb-38 pt-24 overflow-hidden">
       
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

      <div className="relative  z-10 pt-28 px-8">
        <h2 className="text-3xl sm:text-3xl md:text-[2rem] font-black tracking-tight leading-[0.9] mb-4 text-white drop-shadow-lg">
          Unlock Private Content and
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            Join an Excluisve Community
          </span>
        </h2>

        <p className=" text-md mb-4 w-[450px] text-gray-200 leading-relaxed">
         Bryson is a platform built for creators and fans. Join a global community where millions of creators connect with their audience, monetize their content securely, and express their vision entirely on their own terms
        </p>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 w-fit bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-4 shadow-2xl"
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
            18+ Exclusive Membership
          </span>
        </motion.div>
       <div className="flex items-center">
         <button
          onClick={openModal}
          className="bg-yellow-400 rounded-4xl hover:bg-yellow-300 text-black font-semibold text-md px-7 py-2  shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] transition-all active:scale-[0.97]"
        >
          Join Now
        </button>
        <CreatorStats/>
       </div>
        {/* <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
          7-day free trial • Secure & Private
        </p> */}
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
