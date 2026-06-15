"use client";

import { useState } from "react";
import CreatorCard from "./CreatorCard";
import { Creator, creators } from "../lib/data";
import CreatorProfileModal from "./modals/CreatorModal";
import { useRouter } from "next/navigation";

export default function CreatorGrid() {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOPen] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator | null>(null);
  const {push}=useRouter()
  
  const filteredCreators = creators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.25em]">
            Discover Your Favorite
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Featured Creators
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl pl-11 pr-6 py-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:bg-zinc-900 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/10"
            />
          </div>

          <button onClick={()=>push('/creators')} className="px-8 py-4 bg-white/5 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all whitespace-nowrap">
            View All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            className="group transition-transform duration-300 hover:-translate-y-2"
          >
            <CreatorCard
              {...creator}
              onClick={() => {
                setIsOPen(true);
                setCreator(creator);
              }}
            />
          </div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="py-20 text-center text-zinc-500 font-bold">
          No creators found for {search}
        </div>
      )}
      <CreatorProfileModal
        onSubscribe={() => {}}
        onClose={() => {
          setIsOPen(false);
          setCreator(null);
        }}
        isOpen={isOpen}
        creator={creator}
      />
    </section>
  );
}
