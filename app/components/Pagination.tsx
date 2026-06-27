"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => onPageChange(1)} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === 1 ? 'bg-yellow-500 text-black' : 'bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white'}`}>1</button>
          
          {currentPage > 3 && <span className="text-zinc-600 px-2">...</span>}
          
          {pages.map(p => (
            <button key={p} onClick={() => onPageChange(p)} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === p ? 'bg-yellow-500 text-black' : 'bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white'}`}>{p}</button>
          ))}
          
          {currentPage < totalPages - 2 && <span className="text-zinc-600 px-2">...</span>}
          
          {totalPages > 1 && (
            <button onClick={() => onPageChange(totalPages)} className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === totalPages ? 'bg-yellow-500 text-black' : 'bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white'}`}>{totalPages}</button>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest sm:ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}