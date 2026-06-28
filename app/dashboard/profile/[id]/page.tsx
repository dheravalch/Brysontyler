"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  X,
  Film,
  Image as ImageIcon,
  Radio,
  DollarSign,
  Play,
  VerifiedIcon,
  MapIcon,
  LocateIcon,
  MapPin,
} from "lucide-react";
import { Creator } from "@/app/lib/data";
import Input from "@/app/components/ui/Input";
import PayoutHistory from "@/app/components/PayoutHistory";
import SubscribeModal from "@/app/components/modals/SubscribeModal";
import { useScrollLock } from "@/app/hooks/useScrollLock";
import { toast } from "react-toastify";
import Pagination from "@/app/components/Pagination";
import { useAuthStore } from "@/app/store/useAuthStore";

interface CreatorProfileModalProps {
  creator: Creator | null;
  onClose: () => void;
  onSubscribe: (creatorId: number) => void;
}

type TabType = "videos" | "photos" | "live" | "finance";

export default function CreatorProfileModal({
  creator = {
    id: 1,
    name: "Bryson Tyler",
    tier: "VIP",
    subscribers: "124k",
    rating: "4.98",
    online: true,
    cover:
      "https://images.unsplash.com/photo-1624635440108-3509b974cf61?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://picsum.photos/id/64/300/300",
    bio: "The original boyfriend experience.",
    videos: 87,
    photos: 1240,
    earnings: 48920,
    height: "h-96",
  },

  onClose,
  onSubscribe,
}: CreatorProfileModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  const [payoutAmount, setPayoutAmount] = useState<string>("");
  const [isEnteringAmount, setIsEnteringAmount] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();
  const [showSubscribe, setShowSubscribe] = useState(false);
  const handlePayoutRequest = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsConfirming(false);
    toast.success("Transfer successful! Funds are on their way.");
  };
  if (!creator) return null;

  return (
    <div className="  flex items-center justify-center backdrop-blur-md overflow-y-auto">
      {showSubscribe ? (
        <SubscribeModal
          creatorName={creator.name}
          onClose={() => setShowSubscribe(false)}
        />
      ) : (
        <div className="relative bg-zinc-950 w-full max-w-5xl overflow-hidden border border-white/5 shadow-2xl z-10">
          <div className="h-64 relative bg-zinc-900">
            {user?.coverImage && (
              <Image
                src={user.coverImage}
                alt="Creator Hub Banner"
                fill
                className="object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
          </div>

          <div className="px-8 pb-6 -mt-16 relative z-10 border-b border-white/5">
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <div className="w-20 h-20 rounded-full border-2 border-yellow-400 overflow-hidden relative bg-zinc-800 shadow-2xl flex-shrink-0">
                {user?.profileImage && (
                  <Image
                    src={user.profileImage}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-black flex items-center gap-x-2  tracking-tight text-white ">
                  {user?.name}{" "}
                  <VerifiedIcon className="w-4 h-4 text-yellow-400" />
                </h2>
                <div className="flex items-center gap-5 text-sm font-bold tracking-wide">
                  <div className="text-zinc-400">
                    <span className="text-white font-black text-base">0</span>{" "}
                    Subscribers
                  </div>
                  {/* <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-white font-black text-base">
                      {"0.00"}
                    </span>
                    <Star size={16} fill="currentColor" />
                  </div> */}
                </div>
                <div></div>
              </div>

              <button
                onClick={() => {
                  onSubscribe(creator.id);
                  setShowSubscribe(true);
                }}
                className="group w-full sm:w-auto px-10 py-4 bg-yellow-400 hover:bg-white text-black font-black text-xs rounded-2xl uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] flex items-center justify-center gap-2"
              >
                <Star size={16} className="fill-black" />
                Subscribe Access
              </button>
            </div>
            <div className="text-sm text-zinc-400 ml-22">
              <p>{user?.bio}</p>
              <p className="flex items-center gap-1.5 capitalize mt-1 text-zinc-500">
                <MapPin size={16} />
                {`${user?.city} ${user?.state}, ${user?.country}`}
              </p>
            </div>
          </div>

          <div className="px-8 bg-zinc-950">
            <div className="flex border-b border-white/5 text-sm font-black tracking-wider overflow-x-auto scrollbar-none">
              {[
                { id: "videos", label: "VIDEOS", icon: Film },
                { id: "photos", label: "PHOTOS", icon: ImageIcon },
                { id: "live", label: "LIVE SCHEDULE", icon: Radio },
                { id: "finance", label: "FINANCE STUDIO", icon: DollarSign },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all uppercase whitespace-nowrap ${
                      isActive
                        ? "border-yellow-400 text-yellow-400 bg-white/[0.02]"
                        : "border-transparent text-zinc-500 hover:text-white"
                    }`}
                  >
                    <IconComponent size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              className="py-10 px-5 h-[350px] overflow-y-auto
  scrollbar-thin 
  scrollbar-thumb-zinc-700 
  scrollbar-track-transparent 
  hover:scrollbar-thumb-zinc-600"
            >
              {activeTab === "videos" && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/10 transition-colors"
                      >
                        <div className="aspect-video bg-zinc-950 flex items-center justify-center relative">
                          <Play
                            size={28}
                            className="text-zinc-600 group-hover:text-yellow-400 transition-colors"
                          />
                        </div>
                        <div className="p-3 text-xs font-bold text-zinc-400 tracking-wide uppercase">
                          Premium Content Chapter {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={5}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              )}

              {activeTab === "photos" && (
                <div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden relative group cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] font-black tracking-widest uppercase bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                            View Image
                          </span>
                        </div>
                        <Image
                          src={`https://picsum.photos/id/${30 + i}/300/300`}
                          alt="Gallery asset item"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={5}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              )}

              {activeTab === "live" && (
                <div className="text-center py-12 max-w-sm mx-auto bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                  {/* Elevated Icon with Glow */}
                  <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]">
                    <Radio size={28} className="text-red-500 animate-pulse" />
                  </div>

                  <div className="space-y-1 mb-8">
                    <h4 className="font-black text-lg text-white uppercase tracking-tighter">
                      Next Scheduled Session
                    </h4>
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <p className="text-sm font-medium text-zinc-400">
                        Tonight at 10:00 PM EST
                      </p>
                    </div>
                  </div>

                  {/* Button with high-end shadow and tracking */}
                  <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] tracking-[0.25em] rounded-xl uppercase transition-all shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] active:scale-[0.98]">
                    Reserve Entrance Link
                  </button>
                </div>
              )}
              {activeTab === "finance" && (
                <div className="space-y-6">
                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-900 border border-white/5 p-5 rounded-2xl">
                      <div className="text-[10px] font-black tracking-wider text-zinc-500 mb-1 uppercase">
                        30 Day Revenue Window
                      </div>
                      <div className="text-2xl font-black text-white">
                        ${creator.earnings?.toLocaleString() || "0"}
                      </div>
                    </div>
                    <div className="bg-zinc-900 border border-white/5 p-5 rounded-2xl">
                      <div className="text-[10px] font-black tracking-wider text-zinc-500 mb-1 uppercase">
                        Active Members
                      </div>
                      <div className="text-2xl font-black text-white">
                        {creator.subscribers}
                      </div>
                    </div>
                    <div className="bg-zinc-900 border border-white/5 p-5 rounded-2xl">
                      <div className="text-[10px] font-black tracking-wider text-zinc-500 mb-1 uppercase">
                        Escrow Settlement
                      </div>
                      <div className="text-2xl font-black text-emerald-400">
                        $8,420
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl shadow-xl">
                    {!isEnteringAmount ? (
                      <button
                        onClick={() => setIsEnteringAmount(true)}
                        className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs tracking-[0.2em] rounded-xl uppercase transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20"
                      >
                        Execute New Payout
                      </button>
                    ) : (
                      <div className="space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">
                            Enter Withdrawal Amount (USD)
                          </label>
                          <button
                            onClick={() => setIsEnteringAmount(false)}
                            className="text-[10px] text-zinc-600 hover:text-white uppercase tracking-widest transition-colors"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-white/50">
                            $
                          </span>
                          <Input
                            type="number"
                            value={payoutAmount}
                            onChange={(e) => setPayoutAmount(e.target.value)}
                            placeholder="0.00"
                          />
                        </div>

                        <button
                          disabled={!payoutAmount || Number(payoutAmount) <= 0}
                          onClick={handlePayoutRequest}
                          className="w-full py-5 bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-xs tracking-[0.2em] rounded-xl uppercase transition-all hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed"
                        >
                          {isProcessing
                            ? "Processing Transfer..."
                            : "Confirm & Send Transfer"}
                        </button>
                      </div>
                    )}
                  </div>

                  <PayoutHistory />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="fixed inset-0" onClick={onClose} />
    </div>
  );
}
