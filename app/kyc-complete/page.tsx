'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KycStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get('status')

  return (
    <main className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className={`p-6 rounded-full border border-white/10 ${status === 'Verified' ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
            {status === 'Verified' ? (
              <CheckCircle2 size={48} className="text-green-500" />
            ) : (
              <Clock size={48} className="text-yellow-500 animate-pulse" />
            )}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
            {status === 'Verified' ? 'Identity Verified' : 'Under Review'}
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {status === 'Verified' 
              ? "Your identity has been confirmed. You are all set to start streaming and engaging with your fans."
              : "We are currently verifying your documents. This usually takes a few minutes, but can take up to 24 hours. We'll notify you via email."}
          </p>
        </div>
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
        >
          {status === 'Verified' ? 'Go to Dashboard' : 'Return Home'} <ArrowRight size={16} />
        </button>
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-8">
          <ShieldCheck size={14} /> Secured by Industry Standards
        </div>
      </motion.div>
    </main>
  );
}