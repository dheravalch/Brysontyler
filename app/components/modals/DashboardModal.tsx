"use client";

import { useState } from "react";
import {
  CloudUpload,
  Link as LinkIcon,
  DollarSign,
  Users,
} from "lucide-react";

export default function DashboardModal({ onClose }: { onClose: () => void }) {
  const [webhookUrl, setWebhookUrl] = useState(
    "https://your-app.com/webhooks/bryson",
  );

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 max-w-5xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Creator Dashboard</h2>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">
              Bryson Tyler • Verified Status Active
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-zinc-600 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-8 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="font-bold text-sm text-zinc-400 flex items-center gap-2">
              <CloudUpload size={18} /> UPLOAD CONTENT
            </div>
            <div className="border-2 border-dashed border-white/10 hover:border-yellow-400 rounded-3xl p-10 text-center transition-all">
              <input type="file" id="file-input" className="hidden" />
              <button
                onClick={() => document.getElementById("file-input")?.click()}
                className="px-8 py-3 bg-zinc-800 hover:bg-yellow-400 hover:text-black font-black rounded-2xl transition-all"
              >
                CHOOSE FILE
              </button>
              <p className="mt-4 text-xs text-zinc-500">
                Supports high-res video & photo
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 p-6 rounded-3xl border border-white/5">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Users size={14} /> Subscribers
                </div>
                <div className="text-4xl font-black">124,892</div>
              </div>
              <div className="bg-zinc-950 p-6 rounded-3xl border border-yellow-500/20">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <DollarSign size={14} /> 30-Day Revenue
                </div>
                <div className="text-4xl font-black text-yellow-400">
                  $48,920
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-3xl border border-white/5">
              <div className="font-bold text-sm text-zinc-400 mb-4 flex items-center gap-2">
                <LinkIcon size={18} /> WEBHOOK NOTIFICATIONS
              </div>
              <input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-yellow-400 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
