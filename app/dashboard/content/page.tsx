/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Video, Trash2, Edit3, Eye, X, Save, CloudUpload, Image as ImageIcon } from "lucide-react";

// Modal component defined outside to avoid render errors
const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div 
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm" 
    onClick={onClose}
  >
    <div 
      className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-2xl relative shadow-2xl" 
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
        <X size={24} />
      </button>
      {children}
    </div>
  </div>
);

export default function ContentPage() {
  const [items, setItems] = useState([
    { id: 1, title: 'Exclusive Studio Session v1', status: 'Published', views: '28.4k', type: 'video', preview: '' },
  ]);

  const [uploads, setUploads] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random(),
        title: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'image',
        status: 'Draft',
        views: '0',
      }));
      setUploads([...uploads, ...newFiles]);
    }
  };

  const commitUploads = () => {
    setItems([...items, ...uploads]);
    setUploads([]);
  };

  const deleteItem = (id: number) => setItems(items.filter((i) => i.id !== id));

  return (
    <>
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Content Library</h1>
          <p className="text-zinc-400 mt-2">Manage and monitor your BTP production library</p>
        </div>
        <button onClick={commitUploads} className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-black text-sm hover:bg-yellow-400 transition-all">
          <Save size={16} /> SAVE ALL
        </button>
      </header>

      {/* Upload Zone */}
      <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl mb-12">
        <div className="font-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500">
          <CloudUpload size={20} className="text-yellow-500" /> BTP Uploader
        </div>
        <input type="file" multiple accept="image/*,video/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-zinc-700 hover:border-yellow-500/50 rounded-2xl p-8 text-center cursor-pointer bg-black/20 mb-6">
          <p className="text-sm font-medium">Click to upload Images/Videos</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {uploads.map((up) => (
            <div key={up.id} className="bg-black p-4 rounded-2xl border border-white/10">
              <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-3">
                {up.type === 'video' ? <video src={up.preview} className="w-full h-full object-cover" /> : <img src={up.preview} className="w-full h-full object-cover" />}
                <button onClick={() => setUploads(uploads.filter((u) => u.id !== up.id))} className="absolute top-2 right-2 bg-black/60 p-1 rounded-full text-white hover:bg-red-500"><X size={14} /></button>
              </div>
              <input value={up.title} onChange={(e) => setUploads(uploads.map((u) => u.id === up.id ? { ...u, title: e.target.value } : u))} className="w-full bg-zinc-800 text-sm p-2 rounded-lg border border-white/5 outline-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/5">
                <td className="px-8 py-6 font-bold flex items-center gap-3">
                  {item.type === 'video' ? <Video size={16} className="text-yellow-500" /> : <ImageIcon size={16} className="text-blue-500" />} {item.title}
                </td>
                <td className="px-8 py-6 text-sm text-zinc-400">{item.status}</td>
                <td className="px-8 py-6 text-right space-x-4">
                  <button onClick={() => setViewingItem(item)} className="text-zinc-500 hover:text-white"><Eye size={16} /></button>
                  <button onClick={() => setEditingItem(item)} className="text-zinc-500 hover:text-yellow-500"><Edit3 size={16} /></button>
                  <button onClick={() => deleteItem(item.id)} className="text-zinc-500 hover:text-red-500"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <Modal onClose={() => setEditingItem(null)}>
          <h2 className="text-xl font-black mb-6">Edit Production</h2>
          <input value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded-xl mb-4" />
          <button onClick={() => { setItems(items.map((i) => i.id === editingItem.id ? editingItem : i)); setEditingItem(null); }} className="w-full bg-white text-black py-3 rounded-xl font-black hover:bg-yellow-500">APPLY CHANGES</button>
        </Modal>
      )}

      {/* Preview Modal */}
      {viewingItem && (
        <Modal onClose={() => setViewingItem(null)}>
          <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
            {viewingItem.type === 'video' ? <video controls src={viewingItem.preview} className="w-full h-full" /> : <img src={viewingItem.preview} className="w-full h-full object-contain" />}
          </div>
        </Modal>
      )}
    </>
  );
}