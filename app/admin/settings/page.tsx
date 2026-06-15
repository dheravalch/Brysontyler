/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Lock, Globe, Save, X } from 'lucide-react';

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState('Bryson Tyler Productions');
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Security States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-black tracking-tight">Admin Settings</h2>
        <p className="text-zinc-500 mt-2">Manage global platform configurations and preferences.</p>
      </div>

      {/* General Configuration */}
      <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-6">
          <Globe className="text-amber-500" />
          <h3 className="font-bold text-lg">General Platform Settings</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Platform Name</label>
            <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)} className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-amber-500 outline-none transition-all" />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Commission Rate (%)</label>
            <input type="number" defaultValue="20" className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-amber-500 outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-6">
          <Lock className="text-amber-500" />
          <h3 className="font-bold text-lg">Administrator Security</h3>
        </div>
        <button onClick={() => setShowPasswordModal(true)} className="text-sm font-bold text-red-500 hover:text-red-400">
          Update Admin Password
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl w-full max-w-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg">Secure Password Update</h3>
              <button onClick={() => { setShowPasswordModal(false); setOtpSent(false); }}><X size={20} /></button>
            </div>
            
            {!otpSent ? (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400">Enter your new password and request a security OTP.</p>
                <input type="password" placeholder="New Password" className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm" />
                <button onClick={() => setOtpSent(true)} className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl">REQUEST OTP</button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400">We sent an OTP to your secure admin email.</p>
                <input type="text" placeholder="Enter 6-Digit OTP" className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm tracking-widest text-center" />
                <button onClick={() => { setShowPasswordModal(false); setOtpSent(false); }} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl">VERIFY & UPDATE</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Action */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all">
          <Save size={18} /> SAVE CHANGES
        </button>
      </div>
    </div>
  );
}