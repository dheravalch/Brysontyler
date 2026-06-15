"use client";

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Check, Eye, Trash2 } from 'lucide-react';

export default function PayoutRequests() {
  const initialPayouts = [
    { id: 'PO-9921', creator: 'Jessica Streamer', amount: '$1,250.00', status: 'Pending', date: 'June 15, 2026' },
    { id: 'PO-9920', creator: 'Tech Reviews', amount: '$3,400.00', status: 'Processing', date: 'June 14, 2026' },
    { id: 'PO-9919', creator: 'Gaming Pro', amount: '$850.00', status: 'Paid', date: 'June 13, 2026' },
  ];

  const [payouts, setPayouts] = useState(initialPayouts);
  const [filter, setFilter] = useState('All');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Action Handlers
  const handleMarkPaid = (id: string) => {
    setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    setPayouts(payouts.filter(p => p.id !== id));
    setActiveMenu(null);
  };

  const filteredPayouts = filter === 'All' 
    ? payouts 
    : payouts.filter(p => p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black">Payout Management</h2>
        <div className="flex gap-2">
          {['All', 'Pending', 'Paid'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === f ? 'bg-amber-500 text-black' : 'bg-[#080808] border border-white/5 hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-2xl overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Payout ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Creator</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredPayouts.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors relative">
                <td className="px-6 py-4 text-sm font-mono text-zinc-400">{row.id}</td>
                <td className="px-6 py-4 text-sm font-bold">{row.creator}</td>
                <td className="px-6 py-4 text-sm font-bold text-amber-500">{row.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    row.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                    row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)}
                    className="text-zinc-500 hover:text-white transition-colors p-2"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {activeMenu === row.id && (
                    <div ref={menuRef} className="absolute right-6 top-12 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/5 flex items-center gap-2">
                        <Eye size={14} /> View Details
                      </button>
                      <button 
                        onClick={() => handleMarkPaid(row.id)}
                        className="w-full px-4 py-2 text-left text-sm text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-2"
                      >
                        <Check size={14} /> Mark Paid
                      </button>
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}