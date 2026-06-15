"use client";

import { useState } from "react";
import { ShieldAlert, Trash2, Key, X } from "lucide-react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { toast } from "react-toastify";

export default function Security() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black">Security Settings</h2>
        <p className="text-zinc-400 text-sm mt-1">Protect your account and manage access.</p>
      </div>

      <div className="space-y-6">
        {/* Password Section */}
        <div className="bg-black p-6 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-800 p-3 rounded-xl"><Key size={20} className="text-yellow-500" /></div>
            <div>
              <p className="font-bold">Account Password</p>
              <p className="text-xs text-zinc-500">Last changed 3 months ago</p>
            </div>
          </div>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-xl font-bold text-sm transition-all"
          >
            CHANGE
          </button>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <ShieldAlert size={20} />
            <h3 className="font-black uppercase tracking-widest text-sm">Danger Zone</h3>
          </div>
          <p className="text-sm text-zinc-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 text-red-500 font-bold hover:text-red-400 transition-all"
          >
            <Trash2 size={16} /> DELETE ACCOUNT
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black">Change Password</h2>
                <button onClick={() => setShowPasswordModal(false)}><X size={20}/></button>
            </div>
            <Input type="password" placeholder="Current Password"  />
            <Input type="password" placeholder="New Password"  />
            <Button className="w-full py-3 rounded-xl font-black bg-yellow-500 text-black mt-4">UPDATE PASSWORD</Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full">
            <h2 className="text-xl font-black mb-4">Are you sure?</h2>
            <p className="text-zinc-400 text-sm mb-8">This action cannot be undone. All your productions will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 rounded-xl font-bold bg-zinc-800">CANCEL</button>
              <button onClick={() => {
                toast.warn("Account deleted")
                setShowDeleteModal(false)
              }} className="flex-1 py-3 rounded-xl font-black bg-red-500 text-white">CONFIRM</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}