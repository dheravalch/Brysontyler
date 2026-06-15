'use client';

import { useState } from 'react';
import { Play, Eye, Search, Filter, ArrowLeft, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ViewAllStreams() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const streams = [
    { id: 1, name: 'Bryson Tyler', image: 'https://picsum.photos/id/1015/800/600', viewers: '2.4k' },
    { id: 2, name: 'Alex River', image: 'https://picsum.photos/id/1025/800/600', viewers: '1.8k' },
    { id: 3, name: 'Jordan Kai', image: 'https://picsum.photos/id/1027/800/600', viewers: '3.1k' },
    { id: 4, name: 'Mia Rose', image: 'https://picsum.photos/id/1035/800/600', viewers: '4.5k' },
    { id: 5, name: 'Chase Lane', image: 'https://picsum.photos/id/1045/800/600', viewers: '900' },
    { id: 6, name: 'Sarah Jade', image: 'https://picsum.photos/id/1055/800/600', viewers: '5.2k' },
    { id: 7, name: 'Kaelin Fox', image: 'https://picsum.photos/id/1065/800/600', viewers: '1.2k' },
    { id: 8, name: 'Devon Rex', image: 'https://picsum.photos/id/1075/800/600', viewers: '2.9k' },
    { id: 9, name: 'Luna Vane', image: 'https://picsum.photos/id/1085/800/600', viewers: '6.7k' },
  ];

  const filteredStreams = streams.filter(stream => 
    stream.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedStreams = filteredStreams.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStreams.length;

  return (
    <>
     <Navbar/>
       <main className="min-h-screen bg-[#020202] text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">
        
       
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} /> Go Back
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-1">
            <h1 className="text-6xl font-black tracking-tighter uppercase">Live</h1>
            <p className="text-zinc-500 font-medium tracking-wide">Explore active premium broadcasts</p>
          </div>

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

        {/* Grid Content */}
        {filteredStreams.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedStreams.map((stream) => (
                <div 
                  key={stream.id}
                  onClick={() => router.push(`/live/${stream.id}`)}
                  className="group aspect-[4/3] bg-zinc-900 relative overflow-hidden border border-white/[0.05] transition-all hover:-translate-y-1 hover:border-red-600/50 cursor-pointer"
                >
                  <Image src={stream.image} alt={stream.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent p-6 flex flex-col justify-end">
                    <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black uppercase tracking-widest mb-3 w-fit">Live</span>
                    <h3 className="text-base font-black tracking-tight">{stream.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold mt-1">
                      <Eye size={12} className="text-red-500" /> {stream.viewers} watching
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-3xl">
            <AlertCircle size={48} className="text-zinc-800 mb-6" />
            <h3 className="text-xl font-black uppercase tracking-tight">No streams found</h3>
            <p className="text-zinc-500 text-sm mt-2 max-w-sm">Try adjusting your search terms to find what you&apos;re looking for.</p>
            <button 
              onClick={() => { setSearch(''); setVisibleCount(8); }}
              className="mt-8 text-red-500 hover:text-white font-bold text-xs uppercase tracking-widest underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </main>
    <Footer/>
    </>
  
  );
}