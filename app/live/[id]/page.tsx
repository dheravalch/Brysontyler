/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, DollarSign, Heart, Send, X, 
  AlertTriangle, Video, VideoOff, Mic, MicOff, Camera, Crown, User, Settings 
} from 'lucide-react';

export default function LiveRoomPage({ role = 'creator' }: { role?: 'creator' | 'fan' }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [messages, setMessages] = useState<any[]>([{ id: 1, user: "System", text: "Welcome to the live session!", role: 'system' }]);
  const [input, setInput] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipAmount, setTipAmount] = useState("");
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [likes, setLikes] = useState(0);
  const [viewers] = useState(1248);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const initStream = async () => {
    if (role !== 'creator') return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { console.error("Hardware access denied:", err); }
  };

  useEffect(() => {
    initStream();
    return () => streamRef.current?.getTracks().forEach(t => t.stop());
  }, [role]);

const toggleTrack = async (type: 'video' | 'audio') => {
  if (!streamRef.current) return;

  const tracks = type === 'video' 
    ? streamRef.current.getVideoTracks() 
    : streamRef.current.getAudioTracks();

  tracks.forEach((track) => {
    // If the track is enabled, we stop it completely to kill the hardware
    if (track.enabled) {
      track.stop(); // This is the key: it kills the camera light
    }
  });

  // Update state
  if (type === 'video') {
    if (isVideoEnabled) {
      setIsVideoEnabled(false);
    } else {
      // Re-initialize only if we want to turn it back on
      await initStream(); 
      setIsVideoEnabled(true);
    }
  } else {
    if (isAudioEnabled) {
      setIsAudioEnabled(false);
    } else {
      await initStream();
      setIsAudioEnabled(true);
    }
  }
};

  const triggerHeart = () => {
    const id = Date.now();
    const x = Math.random() * 80 + 10;
    setHearts(prev => [...prev, { id, x }]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 3000);
  };

  const handleAction = (type: 'Like' | 'Tip' | 'Premium', content?: string) => {
    if (type === 'Like') {
      setLikes(prev => prev + 1);
      triggerHeart();
    }
    setMessages(prev => [...prev, { id: Date.now(), user: "User", text: content || `${type}d!`, role: type === 'Premium' ? 'vip' : 'user' }]);
    if (type === 'Tip') setShowTipModal(false);
  };

const handleExit = () => {
  
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    

    setIsVideoEnabled(false);
    setIsAudioEnabled(false);
    
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans">
      <main className="flex-1 flex flex-col relative bg-zinc-950">
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-red-500 bg-zinc-800 flex items-center justify-center font-black text-xl">JS</div>
            <div>
              <h1 className="font-black text-lg">JESSICA_STREAM</h1>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-1"><Users size={12}/> {viewers.toLocaleString()}</span>
                <span className="text-red-500 flex items-center gap-1"><Heart size={12}/> {likes}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setShowExitModal(true)} className="p-3 bg-white/10 hover:bg-red-600/50 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 w-full bg-black relative flex items-center justify-center overflow-hidden">
          {role === 'creator' ? (
            <video ref={videoRef} autoPlay playsInline muted={!isAudioEnabled} className="w-full h-full object-cover" />
          ) : (
            <div className="text-zinc-800 font-black text-2xl uppercase tracking-[0.5em]">Live Stream</div>
          )}
          
          {role === 'creator' && !isVideoEnabled && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm gap-4">
              <Camera size={64} className="text-zinc-700" />
              <p className="text-zinc-500 font-bold uppercase">Broadcast Paused</p>
            </div>
          )}
          {hearts.map(h => (
            <div key={h.id} className="absolute animate-[float_3s_ease-out_forwards] pointer-events-none" style={{ left: `${h.x}%`, bottom: '10%' }}>
              <Heart size={40} className="text-red-500 fill-red-500" />
            </div>
          ))}
        </div>
      </main>

      <aside className="w-full lg:w-96 bg-zinc-900 border-l border-white/5 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
              {m.role === 'vip' ? <Crown size={16} className="text-blue-400" /> : <User size={16} className="text-zinc-500" />}
              <div>
                <span className="block font-bold text-[10px] uppercase text-yellow-400">{m.user}</span>
                <span className="text-sm">{m.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-black border-t border-white/5 space-y-4">
          {role === 'fan' ? (
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleAction("Like")} className="flex flex-col items-center gap-2 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 active:scale-95 transition-all">
                <Heart className="text-red-500 fill-red-500" size={20} />
              </button>
              <button onClick={() => setShowTipModal(true)} className="flex flex-col items-center gap-2 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 active:scale-95 transition-all">
                <DollarSign className="text-yellow-400" size={20} />
              </button>
              <button onClick={() => handleAction("Premium")} className="flex flex-col items-center gap-2 p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 active:scale-95 transition-all">
                <Crown className="text-blue-400" size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mb-2">
              <button onClick={() => toggleTrack('video')} className={`flex-1 py-3 rounded-xl flex items-center justify-center ${isVideoEnabled ? 'bg-zinc-800' : 'bg-red-600'}`}>
                {isVideoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
              <button onClick={() => toggleTrack('audio')} className={`flex-1 py-3 rounded-xl flex items-center justify-center ${isAudioEnabled ? 'bg-zinc-800' : 'bg-red-600'}`}>
                {isAudioEnabled ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button className="p-3 bg-zinc-800 rounded-xl"><Settings size={16} /></button>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); setInput(""); }} className="relative flex items-center">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Send message..." className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-5 text-sm outline-none focus:border-yellow-500" />
            <button type="submit" className="absolute right-2 p-2 bg-yellow-400 text-black rounded-xl"><Send size={16} /></button>
          </form>
        </div>
      </aside>

      {/* Modals remain the same */}
      {showTipModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-xs border border-white/10">
            <h3 className="font-black text-lg mb-4">Send a Tip</h3>
            <input type="number" value={tipAmount} onChange={(e) => setTipAmount(e.target.value)} placeholder="Amount ($)" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 mb-6 outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowTipModal(false)} className="flex-1 py-3 bg-zinc-800 rounded-xl">Cancel</button>
              <button onClick={() => handleAction("Tip", `tipped $${tipAmount}! 💰`)} className="flex-1 py-3 bg-yellow-400 text-black font-bold rounded-xl">Send</button>
            </div>
          </div>
        </div>
      )}

      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-sm text-center border border-white/10">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-black mb-6">End Stream?</h3>
            <div className="flex gap-4">
              <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 bg-zinc-800 rounded-xl">Stay</button>
              <button onClick={handleExit} className="flex-1 py-3 bg-red-600 rounded-xl font-bold">End Now</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}