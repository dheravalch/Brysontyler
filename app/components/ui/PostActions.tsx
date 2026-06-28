"use client";

import { useState } from "react";
import { MessageSquare, DollarSign, Heart, Bookmark } from "lucide-react";

interface PostActionsProps {
  postId: number;
}

export const PostActions = ({ postId }: PostActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex items-center justify-between pt-4 text-zinc-500">
      <div className="flex items-center gap-6">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors text-xs font-bold ${liked ? "text-red-500" : "hover:text-white"}`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} /> {likes > 0 ? likes : "Like"}
        </button>
        
        <button 
          onClick={() => console.log(`Open comments for post: ${postId}`)}
          className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors text-xs font-bold"
        >
          <MessageSquare size={18} /> Comment
        </button>
        
        <button 
          onClick={() => console.log(`Trigger tip modal for post: ${postId}`)}
          className="flex items-center gap-1.5 hover:text-green-500 transition-colors text-xs font-bold"
        >
          <DollarSign size={18} /> Tip
        </button>
      </div>

      <button 
        onClick={() => setSaved(!saved)}
        className={`transition-colors hover:text-white ${saved ? "text-yellow-500" : ""}`}
      >
        <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
};