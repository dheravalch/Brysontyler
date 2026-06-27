'use client';

import { useState } from 'react';
import { Upload, FileText, Trash2, Globe, ShieldCheck, AlertCircle } from 'lucide-react';

export default function IdentityDocsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Passport_Front.jpg', type: 'Passport', status: 'verified', date: '2026-05-12' },
    { id: 2, name: 'National_ID_Back.pdf', type: 'National ID', status: 'pending', date: '2026-06-14' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newDoc = {
        id: Date.now(),
        name: e.target.files[0].name,
        type: 'General ID', 
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      };
      setDocuments([...documents, newDoc]);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Identity Verification</h2>
          <p className="text-zinc-500 text-sm mt-2">Global compliance verification for international creators.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-2 rounded-full border border-white/5">
          <Globe size={14} className="text-zinc-500" />
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Region: International</span>
        </div>
      </div>

      <div className="border border-dashed border-white/10 bg-[#0a0a0a] rounded-2xl p-8 mb-8 text-center hover:border-yellow-500/50 transition-colors">
        <input type="file" id="fileUpload" className="hidden" onChange={handleFileUpload} />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
          <Upload className="text-yellow-500 mb-4" size={32} />
          <span className="text-white font-bold text-sm">Submit International ID</span>
          <span className="text-zinc-500 text-[10px] mt-1 uppercase tracking-widest">Passport, National ID, or Resident Permit</span>
        </label>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-zinc-500 text-[10px] uppercase tracking-widest">
              <th className="px-6 py-4">Document</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4 flex items-center gap-3 text-white font-medium">
                  <FileText size={16} className="text-zinc-600" /> {doc.name}
                </td>
                <td className="px-6 py-4 text-zinc-400 text-xs">{doc.type}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 font-bold uppercase text-[9px] ${
                    doc.status === 'verified' ? 'text-emerald-500' : 'text-amber-500'
                  }`}>
                    {doc.status === 'verified' ? <ShieldCheck size={12} /> : <AlertCircle size={12} />}
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
        <p className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-widest leading-relaxed text-center">
          Note: International documents are processed via secure 3rd party providers. Processing may take 24-48 hours.
        </p>
      </div>
    </div>
  );
}