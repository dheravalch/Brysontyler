'use client';

import { useState } from 'react';
import { Play, Eye, Search, Filter, ArrowLeft, AlertCircle, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CreatorProtocols from '../components/FAQS';

export default function ViewAllStreams() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Mock login state - replace with your actual auth hook/store
  const isUserLoggedIn = false; 

    const streams = [
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
     {
      id: 4,
      name: "Lee Princess",
      image:
        "https://images.unsplash.com/photo-1611145434336-2324aa4079cd?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "2.4k",
      tags: ["Exclusive", "VIP"],
    },
    {
      id: 5,
      name: "Alex River",
      image:
        "https://images.unsplash.com/photo-1653209708749-706432f458a7?q=80&w=1281&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "1.8k",
      tags: ["Premium", "Hot"],
    },
    {
      id: 6,
      name: "Jordan Kai",
      image:
        "https://images.unsplash.com/photo-1587434554575-c831b3d99b33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      viewers: "3.1k",
      tags: ["Top Rated", "Live"],
    },
  ];


  const filteredStreams = streams.filter(stream => 
    stream.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedStreams = filteredStreams.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStreams.length;

  const handleAction = (id: number) => {
    router.push(`/live/${id}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#020202] text-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} /> Go Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="text-5xl md:text-5xl font-black tracking-tighter leading-none">
              <span className="text-white">Live</span>{" "}
              <span className="bg-gradient-to-r from-[#F7E018] to-[#FFD700] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(247,224,24,0.3)]">
                Now
              </span>
            </h2>

            <div className="flex gap-3">
              <div className="relative w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(8); }}
                  className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-full py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-red-600 transition-all placeholder:text-zinc-700"
                />
              </div>
              <button className="flex items-center gap-2 bg-[#0a0a0a] px-8 rounded-full text-xs font-black uppercase tracking-widest border border-white/[0.08] hover:border-red-600/50 hover:text-red-500 transition-all">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          {filteredStreams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedStreams.map((creator) => (
                <motion.div
                  key={creator.id}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer group border border-white/5"
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

                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> Live
                    </span>
                  </div>

                  <AnimatePresence>
                    {hoveredId === creator.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 z-30 p-8 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
                      >
                        <h3 className="text-2xl font-black uppercase mb-2">{creator.name}</h3>
                        <div className="flex gap-2 mb-6">
                          {creator.tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="w-full py-3 bg-white text-black font-black text-sm uppercase rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-black transition-colors">
                          {isUserLoggedIn ? <Play size={16} /> : <Lock size={16} />}
                          {isUserLoggedIn ? "Watch Stream" : "Subscribe to Unlock"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {hoveredId !== creator.id && (
                    <div className="absolute bottom-8 left-8 z-20">
                      <h3 className="text-lg font-black">{creator.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-zinc-400 font-bold mt-1">
                        <Eye className="text-yellow-400" size={12} /> {creator.viewers} Watching
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-3xl">
              <AlertCircle size={48} className="text-zinc-800 mb-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">No streams found</h3>
              <p className="text-zinc-500 text-sm mt-2 max-w-sm">Try adjusting your search terms.</p>
              <button 
                onClick={() => { setSearch(''); setVisibleCount(8); }}
                className="mt-8 text-red-500 hover:text-white font-bold text-xs uppercase tracking-widest underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {hasMore && (
            <div className="mt-20 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-12 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-full"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
      <CreatorProtocols/>
      <Footer />
    </>
  );
}