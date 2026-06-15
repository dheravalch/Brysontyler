'use client';

import { ChevronLeft, ChevronRight} from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = currentPage === page;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                isActive 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/10 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
      >
        <ChevronRight size={18} />
      </button>
      <span className="ml-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}