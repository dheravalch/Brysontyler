"use client";

import Image from "next/image";
import { Image as ImageIcon, Smile, Type, MoreHorizontal, VerifiedIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { PostActions } from "../components/ui/PostActions";
import { SuggestedCreators } from "../components/ui/SuggestedCreators";
import { useRouter } from "next/navigation";

const POSTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  user: ["Elena", "Seraphina", "Jade", "Valentina"][i % 4],
  handle: ["@elena_vibe", "@sera.glow", "@jade.noir", "@val_lux"][i % 4],
  content: [
    "Just finished shooting an exclusive set in my favorite silk outfit. You guys are going to love the lighting in this one—full gallery is now live for subscribers! ✨",
    "Nothing like a quiet evening at home with a glass of wine. It’s the perfect time to catch up on messages and share a little something extra with my top fans. Check your DMs. 🍷",
    "Feeling bold today and decided to try something I've never done on camera before. This is definitely one of my most requested looks. Let me know what you think in the comments! 🔥",
    "Live session starting in 30 minutes! I'm going to be answering all your questions and doing some fun requests. Don't miss out, it's going to be a long one tonight. 🎥"
  ][i % 4],
  time: `${(i + 1) * 2}m ago`,
  image: [
    "https://images.unsplash.com/photo-1585323524366-b82f90606731?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592399786447-6ad3da3e751e?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1630567136459-7a8fa832c80e?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545816721-3be831cbe7d1?w=600&auto=format&fit=crop"
  ][i % 4]
}));

export default function DashboardOverview() {
  const user = useAuthStore((state) => state.user);
  const isCreator = user?.role === 'creator';
 const {push}=useRouter()
  return (
    <div className="w-full h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        
        <div className="col-span-12 lg:col-span-8">
          <header className="mb-8">
            <h1 className="text-xl font-black uppercase tracking-tighter">
              {isCreator ? "Creator" : "Fan"} Dashboard
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Welcome back, {user?.name}</p>
          </header>

          {isCreator && (
            <div className="p-4 border border-white/5 rounded-xl mb-6 bg-white/5">
              <textarea 
                placeholder="Compose new post..." 
                className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none resize-none text-sm" 
                rows={2} 
              />
              <div className="flex items-center gap-4 text-zinc-500 mt-2">
                <ImageIcon size={18} className="cursor-pointer hover:text-white" />
                <Smile size={18} className="cursor-pointer hover:text-white" />
                <Type size={18} className="cursor-pointer hover:text-white" />
                <button className="ml-auto bg-[#F7E018] text-black font-bold px-4 py-1 rounded text-[10px] uppercase hover:bg-yellow-400 transition-colors">
                  Post
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            {POSTS.map((post) => (
              <div onClick={()=>push(`/dashboard/profile/${post.id}`)} key={post.id} className="border-b cursor-pointer border-white/5 py-6 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center font-black text-xs">BT</div>
                    <div>
                      <div className="font-bold flex items-center gap-x-2 text-sm text-white">
                        {post.user} <VerifiedIcon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                        {post.handle} <span>•</span> {post.time}
                      </div>
                    </div>
                  </div>
                  <MoreHorizontal size={16} className="text-zinc-500 cursor-pointer" />
                </div>
                
                <p className="text-sm text-zinc-300 mb-3 leading-relaxed">{post.content}</p>
                
                <div className="w-full h-80 overflow-hidden rounded-xl bg-zinc-800 relative">
                   <Image src={post.image} alt="post" fill className="object-cover" />
                </div>

                <PostActions postId={post.id} />
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden lg:block col-span-4">
          <div className="sticky top-6">
            <SuggestedCreators />
          </div>
        </aside>
        
      </div>
    </div>
  );
}