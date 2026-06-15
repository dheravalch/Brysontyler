'use client';
import { Play, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LiveSection() {
  const { push } = useRouter();

  // Example creator data with images
  const liveCreators = [
    { id: 1, name: 'Bryson Tyler', image: 'https://picsum.photos/id/1015/800/600', viewers: '2.4k' },
    { id: 2, name: 'Alex River', image: 'https://picsum.photos/id/1025/800/600', viewers: '1.8k' },
    { id: 3, name: 'Jordan Kai', image: 'https://picsum.photos/id/1027/800/600', viewers: '3.1k' },
  ];

  return (
    <section className="py-10 bg-[#18181b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              Live Now
            </h2>
          </div>
          <button onClick={()=>push('/all-streams')} className="text-[10px] font-black tracking-[0.25em] text-zinc-500 hover:text-red-500 uppercase transition-colors">
            View All Streams
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveCreators.map((creator) => (
            <div 
              key={creator.id}
              onClick={() => push(`/live/${creator.id}`)} 
              className="group aspect-[4/3] bg-zinc-900 cursor-pointer overflow-hidden relative border border-white/[0.05] transition-all duration-500 hover:border-red-600/50"
            >
              {/* Creator Background Image */}
              <Image 
                src={creator.image} 
                alt={creator.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Intense Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black uppercase tracking-widest">Live</span>
                       <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold">
                         <Eye size={10} /> {creator.viewers}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">{creator.name}</h3>
                  </div>
                </div>
              </div>

              {/* Aggressive Hover Play Effect */}
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
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