"use client";

import { useState } from "react";
import { Users, Search,Trash2, Mail, Shield } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([
    { id: 1, name: "Alex Rivers", email: "alex@example.com", tier: "Premium", joined: "2026-01-12" },
    { id: 2, name: "Jordan Smith", email: "jsmith@demo.com", tier: "Standard", joined: "2026-03-05" },
    { id: 3, name: "Taylor Swift", email: "taylor@btp.com", tier: "VIP", joined: "2026-04-20" },
  ]);

  return (
    <>
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Subscribers</h1>
          <p className="text-zinc-400 mt-2">Manage your BTP community members</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-white/5 px-4 py-3 rounded-full flex items-center gap-2">
            <Users size={18} className="text-yellow-500" />
            <span className="font-bold text-lg">1,284 Total</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-12">
        {[{ label: "Active Revenue", val: "$12.4k" }, { label: "Churn Rate", val: "2.4%" }, { label: "Growth", val: "+14%" }].map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black mt-2">{stat.val}</h3>
          </div>
        ))}
      </div>
      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <Search className="text-zinc-500" size={18} />
          <input placeholder="Search subscribers..." className="bg-transparent outline-none w-full" />
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="px-8 py-4">Subscriber</th>
              <th className="px-8 py-4">Tier</th>
              <th className="px-8 py-4">Joined</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-white/5">
                <td className="px-8 py-6">
                  <p className="font-bold">{s.name}</p>
                  <p className="text-xs text-zinc-500">{s.email}</p>
                </td>
                <td className="px-8 py-6 text-sm">{s.tier}</td>
                <td className="px-8 py-6 text-sm text-zinc-400">{s.joined}</td>
                <td className="px-8 py-6 text-right space-x-2">
                  <button className="p-2 hover:bg-zinc-800 rounded-lg"><Mail size={16}/></button>
                  <button className="p-2 hover:bg-zinc-800 rounded-lg"><Shield size={16}/></button>
                  <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}