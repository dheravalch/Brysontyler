// app/admin/page.tsx
import { ArrowUpRight, ArrowDownRight, Users, Wallet, FileText } from 'lucide-react';

export default function AdminOverview() {
  const stats = [
    { 
      label: 'Total Revenue', 
      value: '$45,231.00', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Wallet 
    },
    { 
      label: 'Pending Payouts', 
      value: '12', 
      change: '+3 from yesterday', 
      trend: 'neutral', 
      icon: FileText 
    },
    { 
      label: 'New Applications', 
      value: '5', 
      change: '-2.1%', 
      trend: 'down', 
      icon: Users 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight">System Overview</h2>
          <p className="text-zinc-500 mt-2">Platform performance and administrative tasks at a glance.</p>
        </div>
        <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm rounded-xl transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div 
            key={s.label} 
            className="group bg-[#080808] border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-amber-500">
                <s.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
                s.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 
                s.trend === 'down' ? 'text-red-500 bg-red-500/10' : 'text-zinc-500 bg-white/5'
              }`}>
                {s.trend === 'up' && <ArrowUpRight size={12} />}
                {s.trend === 'down' && <ArrowDownRight size={12} />}
                {s.change}
              </span>
            </div>
            
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-3xl font-black tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-2xl p-8">
        <h3 className="font-bold mb-6">Recent Administrative Actions</h3>
        <div className="space-y-4">
           <div className="text-sm text-zinc-600 italic">No recent administrative activity found.</div>
        </div>
      </div>
    </div>
  );
}