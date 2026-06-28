'use client';

import { useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import { creators } from '../lib/data';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AuthModal from '../components/modals/AuthModal';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import CreatorProtocols from '../components/FAQS';

export default function AllCreatorsView() {
  const [search, setSearch] = useState('');
    const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
    const {user}=useAuthStore()
    const {push}=useRouter()

  return (
   <>
   <Navbar/>
    <section className="pt-32 pb-20 px-6 ">
      {modalType && (
                    <AuthModal type={modalType} onClose={() => setModalType(null)} />
                  )}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-8">
        <div className="space-y-1">
         
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            All Creators
          </h2>
           <div className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.25em]">
            Discover Your Favorite 
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search creators..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl pl-11 pr-6 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:bg-zinc-900 focus:border-yellow-500/50"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {creators.map((creator, index) => (
          <CreatorCard 
            key={index} 
            {...creator} 
             onClick={() => {
                if(user){
                   push(`/dashboard/profile/${user._id}`)
                }
                else{
                 setModalType('signup')
                }
              }}
          />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button className="px-10 py-4 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-all">
          Load More Creators
        </button>
      </div>
   
    </section>
       <CreatorProtocols/>
    <Footer/>
   </>
  );
}