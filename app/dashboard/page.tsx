"use client";

import { Activity, Link as LinkIcon, BarChart3, Clock } from "lucide-react";

export default function CreatorDashboardPage() {
  return (
    <>
      <header className="mb-12">
        <h1 className="text-4xl font-black">Creator Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Welcome back, Bryson Tyler • Account Status:{" "}
          <span className="text-yellow-500 font-bold">VERIFIED</span>
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "TOTAL SUBSCRIBERS", val: "124,892", sub: "+2.4% vs last month" },
          { label: "30-DAY EARNINGS", val: "$48,920", sub: "Paid via direct deposit" },
          { label: "ACTIVE VIDEOS", val: "1,204", sub: "Total media library" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <div className="text-[10px] tracking-widest text-zinc-500 font-bold mb-2 uppercase">
              {stat.label}
            </div>
            <div className="text-4xl font-black">{stat.val}</div>
            <div className="text-xs text-yellow-600 font-medium mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Overview */}
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
          <div className="font-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
            <Activity size={20} className="text-yellow-500" /> RECENT ACTIVITY
          </div>
          <div className="space-y-6">
            {[
              { action: "New subscriber from YouTube", time: "2m ago" },
              { action: "Video 'Summer Tour' processed", time: "1h ago" },
              { action: "Payout confirmed", time: "5h ago" },
            ].map((act, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                <span className="text-sm font-medium text-zinc-300">{act.action}</span>
                <span className="text-xs text-zinc-600 flex items-center gap-1"><Clock size={12}/> {act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook Overview */}
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
          <div className="font-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
            <LinkIcon size={20} className="text-yellow-500" /> WEBHOOK STATUS
          </div>
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500 font-bold uppercase">Endpoint</span>
              <span className="text-xs font-mono bg-black px-2 py-1 rounded">/webhooks/bryson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500 font-bold uppercase">Status</span>
              <span className="text-xs font-bold text-green-500 flex items-center gap-1"><BarChart3 size={12}/> ACTIVE</span>
            </div>
            <div className="p-4 bg-black rounded-xl border border-white/5 text-xs text-zinc-400">
              Your webhook is currently listening for events and reporting a 200 OK status on all recent attempts.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}