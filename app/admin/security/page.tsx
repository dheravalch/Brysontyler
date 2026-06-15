/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Shield, Key, AlertTriangle, RefreshCw, Server, Activity } from 'lucide-react';

export default function SecurityPage() {
  const [logs] = useState([
    { id: 'LOG-001', event: 'Admin Login', status: 'Success', time: 'June 15, 2026 10:24 AM', ip: '192.168.1.1' },
    { id: 'LOG-002', event: 'Webhook Verification', status: 'Failed', time: 'June 15, 2026 09:12 AM', ip: '45.79.12.102' },
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight">System Security</h2>
        <p className="text-zinc-500 mt-2">Monitor platform integrity and manage access controls.</p>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#080808] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><Shield size={24} /></div>
          <div>
            <h3 className="font-bold">Platform Status</h3>
            <p className="text-sm text-zinc-500">All systems operational. Webhook validation active and secure.</p>
          </div>
        </div>
        <div className="bg-[#080808] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl"><Key size={24} /></div>
          <div>
            <h3 className="font-bold">API Keys</h3>
            <p className="text-sm text-zinc-500">PayStack integration keys active. Last rotated 30 days ago.</p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2"><Activity size={18} /> Recent Audit Logs</h3>
          <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white">
            <RefreshCw size={14} /> REFRESH
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">Event</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">Time</th>
              <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 text-sm font-bold">{log.event}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${log.status === 'Success' ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{log.time}</td>
                <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#080808] border border-red-900/20 p-6 rounded-2xl">
        <h3 className="font-bold text-red-500 flex items-center gap-2 mb-2">
          <AlertTriangle size={18} /> Danger Zone
        </h3>
        <p className="text-sm text-zinc-400 mb-6">Administrative security actions. Proceed with caution.</p>
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all">
          FLUSH ALL SESSION CACHE
        </button>
      </div>
    </div>
  );
}