"use client";

import { useState } from "react";
import { Crown, CreditCard, X } from "lucide-react";
import { toast } from "react-toastify";

export default function Subscription() {
  const [loading, setLoading] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const handleAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`${action} triggered successfully.`);
      setLoading(false);
      setShowCardModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black">Subscription Management</h2>
        <p className="text-zinc-400 text-sm mt-1">Manage your BTP billing cycles and plan details.</p>
      </div>

      {/* Main Subscription Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest mb-2">
              <Crown size={16} /> Current Plan
            </div>
            <h3 className="text-4xl font-black">BTP PRO</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-500 font-bold uppercase">Next Billing</p>
            <p className="text-lg font-bold">July 15, 2026</p>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <p className="text-zinc-500 text-[10px] font-bold uppercase">Storage Used</p>
            <p className="font-black mt-1">84.2 GB / 500 GB</p>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <p className="text-zinc-500 text-[10px] font-bold uppercase">Subscribers</p>
            <p className="font-black mt-1">1,284 Active</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button 
            onClick={() => handleAction("Upgrade")}
            className="flex-1 bg-yellow-500 text-black py-4 rounded-xl font-black hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "PROCESSING..." : "UPGRADE PLAN"}
          </button>
          <button 
            onClick={() => handleAction("Cancel")}
            className="px-8 py-4 rounded-xl font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
          >
            CANCEL SUBSCRIPTION
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between p-6 bg-black rounded-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="bg-zinc-800 p-3 rounded-xl"><CreditCard size={20} /></div>
          <div>
            <p className="font-bold">Visa ending in 4242</p>
            <p className="text-xs text-zinc-500">Exp 12/28</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCardModal(true)}
          className="text-xs font-bold text-yellow-500 hover:text-yellow-400"
        >
          UPDATE CARD
        </button>
      </div>

      {/* Update Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">Update Payment Method</h2>
              <button onClick={() => setShowCardModal(false)}><X size={20} className="text-zinc-500" /></button>
            </div>
            
            <input placeholder="Card Number" className="w-full bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500" />
            <div className="flex gap-4">
              <input placeholder="MM/YY" className="w-1/2 bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500" />
              <input placeholder="CVC" className="w-1/2 bg-black border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500" />
            </div>

            <button 
              onClick={() => handleAction("Card Update")}
              className="w-full py-3 rounded-xl font-black bg-yellow-500 text-black mt-4 hover:bg-yellow-400 transition-all"
            >
              {loading ? "SAVING..." : "SAVE CARD"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}