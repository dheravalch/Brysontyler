/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const decline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[100] bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-full">
              <Cookie size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black uppercase text-sm tracking-widest mb-1">Privacy First</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We use cookies to improve your experience and ensure our platform runs securely. By continuing, you agree to our use of cookies.
              </p>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-zinc-600 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={accept}
              className="flex-1 bg-white text-black py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all"
            >
              Accept All
            </button>
            <button 
              onClick={decline}
              className="px-6 py-3 border border-white/10 rounded-xl text-zinc-500 font-black text-[10px] uppercase tracking-widest hover:border-white/20 hover:text-white transition-all"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}