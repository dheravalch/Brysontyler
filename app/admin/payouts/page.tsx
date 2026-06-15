/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Check, Eye, Trash2, X, Wallet } from 'lucide-react';

export default function PayoutRequests() {
  const [payouts, setPayouts] = useState([
    { id: 'PO-9921', creator: 'Jessica Streamer', amount: '$1,250.00', status: 'Pending', email: 'jess@streamer.com' },
    { id: 'PO-9920', creator: 'Tech Reviews', amount: '$3,400.00', status: 'Pending', email: 'tech@reviews.com' },
  ]);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [viewModal, setViewModal] = useState<any | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
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

  const handleMarkPaid = (id: string) => {
    setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    setPayouts(payouts.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Payout Queue</h2>
          <p className="text-zinc-500 mt-2">Manage and process creator earnings efficiently.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#080808] px-4 py-2 rounded-xl border border-white/5">
          <Wallet size={16} className="text-amber-500" />
          <span className="text-sm font-bold">
            ${payouts.filter(p => p.status === 'Pending').reduce((acc, p) => acc + parseFloat(p.amount.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()} Total Pending
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#080808] border border-white/5 rounded-2xl overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Creator</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payouts.map(row => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors relative">
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">{row.id}</td>
                <td className="px-6 py-4 font-bold text-sm">{row.creator}</td>
                <td className="px-6 py-4 font-black text-amber-500">{row.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)} className="p-2 hover:bg-white/5 rounded-lg">
                    <MoreHorizontal size={16} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === row.id && (
                    <div ref={menuRef} className="absolute right-6 top-12 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                      <button onClick={() => { setViewModal(row); setActiveMenu(null); }} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/5 flex items-center gap-2">
                        <Eye size={14} /> View Details
                      </button>
                      <button onClick={() => handleMarkPaid(row.id)} className="w-full px-4 py-2 text-left text-sm text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-2">
                        <Check size={14} /> Mark Paid
                      </button>
                      <button onClick={() => { setDeleteConfirm(row.id); setActiveMenu(null); }} className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2">
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

      {/* Details Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl w-full max-w-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg">Payout Details</h3>
              <button onClick={() => setViewModal(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-zinc-500">ID: <span className="text-white">{viewModal.id}</span></p>
              <p className="text-zinc-500">Creator: <span className="text-white">{viewModal.creator}</span></p>
              <p className="text-zinc-500">Email: <span className="text-white">{viewModal.email}</span></p>
              <p className="text-zinc-500">Status: <span className="text-amber-500">{viewModal.status}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl w-full max-w-sm text-center">
            <h3 className="font-black text-lg mb-2">Delete Payout?</h3>
            <p className="text-zinc-500 text-sm mb-6">This record will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 rounded-lg bg-white/5 font-bold">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-lg bg-red-600 font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}