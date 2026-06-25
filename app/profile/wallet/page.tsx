"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { Plus, Clock, Copy, Check, ArrowDownLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function WalletPage() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  // Dynamic balance with 2 decimal precision
  const balance = user?.coinBalance ?? 450.00;
  const isLowBalance = balance < 1000;

  // Fake data for UI preview
  const mockTransactions = [
    { id: 1, type: "Tip to Creator", amount: 500.00, date: "Jun 24, 2026", status: "Completed", incoming: false },
    { id: 2, type: "Subscription", amount: 1200.00, date: "Jun 01, 2026", status: "Completed", incoming: false },
    { id: 3, type: "Bonus Coins", amount: 200.00, date: "May 15, 2026", status: "Completed", incoming: true },
  ];

  const handleCopyId = () => {
    const idToCopy = user?._id 
    if (!idToCopy) return;
    navigator.clipboard.writeText(idToCopy);
    setCopied(true);
    toast.success("Wallet ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopUp = () => {
    toast.info("Checkout initiated...");
  };

  return (
    <div className="space-y-8">
      {/* Hero Balance Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Available Balance</h2>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-black tracking-tighter transition-colors ${isLowBalance ? "text-red-500" : "text-white"}`}>
              {balance.toFixed(2)}
            </span>
            <span className={`text-xl font-bold ${isLowBalance ? "text-red-500" : "text-yellow-500"}`}>
              BT COINS
            </span>
          </div>
          
          {/* Low Balance Warning */}
          {isLowBalance && (
            <div className="mt-3 flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse">
              <AlertCircle size={14} />
              <span>Wallet balance is low. Kindly top up.</span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 bg-zinc-800/50 p-2 rounded-lg w-fit cursor-pointer hover:bg-zinc-800 transition-all" onClick={handleCopyId}>
            <span className="text-[10px] text-zinc-500 font-mono">
              WALLET ID: {(user?._id || user?._id) ? (user._id || user._id).slice(0, 8) + "..." : "BT-X892-44"}
            </span>
            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-zinc-400" />}
          </div>
        </div>

        <button 
          onClick={handleTopUp}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-yellow-400 transition-all uppercase text-sm tracking-widest"
        >
          <Plus size={18} /> Buy Coins
        </button>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Transaction History</h3>
        <div className="space-y-2">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.incoming ? 'bg-green-900/20' : 'bg-zinc-900'}`}>
                  {tx.incoming ? <ArrowDownLeft size={18} className="text-green-500" /> : <Clock size={18} className="text-zinc-500" />}
                </div>
                <div>
                  <p className="font-bold text-sm">{tx.type}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black ${tx.incoming ? 'text-green-500' : 'text-yellow-500'}`}>
                  {tx.incoming ? '+' : '-'}{tx.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-zinc-500 uppercase">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}