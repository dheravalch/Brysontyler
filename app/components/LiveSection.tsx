"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, Flame, Lock, User, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import CreatorProtocols from "./FAQS";

export default function LiveSection() {
  const { push } = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isUserLoggedIn = false;

  const liveCreators = [
    {
      id: 1,
      name: "Lee Princess",
      image:
        "https://images.unsplash.com/photo-1611145434336-2324aa4079cd?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "2.4k",
      tags: ["Exclusive", "VIP"],
    },
    {
      id: 2,
      name: "Alex River",
      image:
        "https://images.unsplash.com/photo-1653209708749-706432f458a7?q=80&w=1281&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "1.8k",
      tags: ["Premium", "Hot"],
    },
    {
      id: 3,
      name: "Jordan Kai",
      image:
        "https://images.unsplash.com/photo-1587434554575-c831b3d99b33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "3.1k",
      tags: ["Top Rated", "Live"],
    },
  ];

  const handleAction = (creatorId: number) => {
    if (!isUserLoggedIn) {
      push("/login");
    } else {
      push(`/live/${creatorId}`);
    }
  };

  return (
    <section className="py-20 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6">
       <div className="flex flex-col mb-12 space-y-6">
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
    <h2 className="text-5xl md:text-5xl font-black tracking-tighter leading-none">
      <span className="text-white">Live</span>{" "}
      <span className="bg-gradient-to-r from-[#F7E018] to-[#FFD700] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(247,224,24,0.3)]">
        Now
      </span>
    </h2>

    <button
      onClick={() => push("/all-streams")}
      className="text-[10px] font-black tracking-[0.25em]  text-[#F7E018] uppercase transition-colors flex items-center gap-2 group"
    >
      View All Streams
      <span className=" p-1 rounded-full w-5 h-5 flex items-center justify-center bg-[#F7E018] text-black transition-colors">
        →
      </span>
    </button>
  </div>
  <div className="flex items-center gap-3">
    <div className="h-px w-12 bg-[#F7E018]" />
    <p className="text-gray-300 max-w-lg text-sm md:text-base leading-relaxed">
      Step into the inner circle. Join exclusive, high-definition live sessions,
      engage in private chats, and gain{" "}
      <span className="text-[#F7E018] mr-1 font-bold">VIP access</span> to content you
      won&lsquo;t find anywhere else.
    </p>
  </div>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveCreators.map((creator) => (
            <motion.div
              key={creator.id}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredId(creator.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleAction(creator.id)}
            >
              <Image
                src={creator.image}
                alt={creator.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />{" "}
                  Live
                </span>
              </div>

              {/* Reveal Details on Hover */}
              <AnimatePresence>
                {hoveredId === creator.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 z-30 p-8 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
                  >
                    <h3 className="text-2xl font-black uppercase mb-2">
                      {creator.name}
                    </h3>
                    <div className="flex gap-2 mb-6">
                      {creator.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-white text-black font-black text-sm uppercase rounded-4xl flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors">
                      {isUserLoggedIn ? <Play size={16} /> : <Lock size={16} />}
                      {isUserLoggedIn ? "Watch Stream" : "Subscribe to Unlock"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {hoveredId !== creator.id && (
                <div className="absolute bottom-8 left-8 z-20 ">
                  <h3 className="text-lg font-black">{creator.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-zinc-400 font-bold mt-1">
                    <Eye className="text-yellow-400" size={12} />{" "}
                    {creator.viewers} Watching
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <CreatorProtocols/>
    </section>
  );
}
