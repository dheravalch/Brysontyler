"use client";

import { Play, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LiveSection() {
  const { push } = useRouter();

  const liveCreators = [
    { id: 1, name: 'Bryson Tyler', image: 'https://picsum.photos/id/1015/800/600', viewers: '2.4k' },
    { id: 2, name: 'Alex River', image: 'https://picsum.photos/id/1025/800/600', viewers: '1.8k' },
    { id: 3, name: 'Jordan Kai', image: 'https://picsum.photos/id/1027/800/600', viewers: '3.1k' },
  ];

  return (
    <section className="py-10 bg-[#18181b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Stacks on mobile */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            Live Now
          </h2>
          <button 
            onClick={() => push('/all-streams')} 
            className="text-[10px] font-black tracking-[0.25em] text-zinc-500 hover:text-red-500 uppercase transition-colors self-start sm:self-auto"
          >
            View All Streams
          </button>
        </div>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveCreators.map((creator) => (
            <div 
              key={creator.id}
              onClick={() => push(`/live/${creator.id}`)} 
              className="group aspect-[16/10] sm:aspect-[4/3] bg-zinc-900 cursor-pointer overflow-hidden relative border border-white/[0.05] transition-all duration-500 hover:border-red-600/50"
            >
              {/* Creator Background Image */}
              <Image 
                src={creator.image} 
                alt={creator.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black uppercase tracking-widest">Live</span>
                   <span className="flex items-center gap-1 text-[10px] text-zinc-300 font-bold">
                     <Eye size={10} /> {creator.viewers}
                   </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight">{creator.name}</h3>
              </div>

              {/* Play Button - Always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm sm:hover:bg-white sm:hover:text-black transition-all">
                  <Play fill="currentColor" size={20} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}