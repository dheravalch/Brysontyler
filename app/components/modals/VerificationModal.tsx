'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function VerificationModal({ onClose }: { onClose: () => void }) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVerified(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-zinc-900 max-w-lg w-full rounded-3xl p-10 border border-emerald-400 text-center" onClick={(e) => e.stopPropagation()}>
        {!isVerified ? (
          <>
            <div className="font-black text-3xl mb-2">AI Verification in Progress</div>
            <div className="text-sm text-zinc-400 mb-8">Reviewing documents and video...</div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-yellow-400 w-[78%] animate-[progress_2.5s_ease-out_forwards]" />
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto w-20 h-20 bg-emerald-400 rounded-full flex items-center justify-center mb-6">
              <Check size={40} className="text-black" />
            </div>
            <div className="font-black text-3xl mb-2">Verification Successful!</div>
            <button onClick={onClose} className="mt-6 w-full py-4 bg-emerald-400 text-black font-black rounded-2xl">
              GO TO CREATOR DASHBOARD
            </button>
          </>
        )}
      </div>
    </div>
  );
}