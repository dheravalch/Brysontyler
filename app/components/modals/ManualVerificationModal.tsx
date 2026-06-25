"use client";

import { useState} from "react";
import { X,Lock, AlertCircle} from "lucide-react";
import { UploadSection } from "../ui/UploadSection";

export default function ManualVerificationModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-zinc-950  p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Manual Verification</h2>
            <p className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
              <Lock size={12} /> SECURE & ENCRYPTED UPLOAD
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          <UploadSection title="Passport Photo" desc="Clear, high-quality, neutral background." />
          <UploadSection title="Required Photos" desc="Upload at least 3 high-quality photos." isMulti />
          <UploadSection title="Verification Videos" desc="3 clips (semi-nude/nude) for identity check." isVideo />

          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex gap-3 text-[11px] text-zinc-400">
            <AlertCircle className="text-yellow-500 shrink-0" size={16} />
            <p>Your media is for <strong>verification purposes only</strong>. It will be encrypted, stored offline, and will NEVER appear on your public profile. This process is mandatory for account activation.</p>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {loading ? "ENCRYPTING & UPLOADING..." : "SUBMIT FOR REVIEW"}
          </button>
        </div>
      </div>
    </div>
  );
}

