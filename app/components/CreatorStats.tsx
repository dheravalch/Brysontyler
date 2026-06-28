import Image from 'next/image';

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
];

export default function CreatorStats() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex -space-x-3">
        {avatars.map((src, index) => (
          <div 
            key={index} 
            className="w-8 h-8 rounded-full border-2 border-zinc-900 overflow-hidden relative shadow-lg"
          >
            <Image 
              src={src} 
              alt={`Model ${index + 1}`} 
              fill 
              className="object-cover" 
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-black text-white leading-none">10K+</h3>
        <p className="text-gray-300  tracking-wide text-sm ">Unique Creators</p>
      </div>
    </div>
  );
}