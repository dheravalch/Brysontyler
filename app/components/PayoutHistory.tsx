"use client";

import { useState } from "react";
import Pagination from "./Pagination";

interface Payout {
  date: string;
  amount: string;
  method: string;
  status: string;
}

const payouts: Payout[] = [
  {
    date: "June 5, 2026",
    amount: "$12,500",
    method: "Bank",
    status: "Completed",
  },
  {
    date: "May 28, 2026",
    amount: "$8,200",
    method: "Crypto",
    status: "Completed",
  },
  {
    date: "May 15, 2026",
    amount: "$9,100",
    method: "Bank",
    status: "Completed",
  },
];

export default function PayoutHistory() {
  const [page, setPage] = useState(1);
  return (
    <div className="w-full">
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-zinc-950 px-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            History Log
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center">
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
            Recent Transactions
          </h4>
        </div>

        <div className="divide-y divide-white/5">
          {payouts.map((payout, i) => (
            <div
              key={i}
              className="px-8 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm text-zinc-400 font-medium">
                {payout.date}
              </span>

              <div className="flex gap-8 items-center">
                <span className="font-black text-white tabular-nums tracking-tight">
                  {payout.amount}
                </span>
                <span className="w-16 text-center text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
                  {payout.method}
                </span>
              </div>

              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
