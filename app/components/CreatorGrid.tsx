"use client";

import { useState } from "react";
import CreatorCard from "./CreatorCard";
import { Creator, creators } from "../lib/data";
import CreatorProfileModal from "./modals/CreatorModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import AuthModal from "./modals/AuthModal";

export default function CreatorGrid() {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator | null>(null);
  const { push } = useRouter();
    const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const {user}=useAuthStore()
  const filteredCreators = creators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {modalType && (
              <AuthModal type={modalType} onClose={() => setModalType(null)} />
            )}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-1">
         
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Featured Creators
          </h2>
           <div className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.25em]">
            Discover Your Favorite Creator
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
    

           <button
          onClick={() => push("/creators")}
          className="bg-yellow-400 rounded-4xl w-fit ml-auto flex justify-end hover:bg-yellow-300 text-black font-semibold text-sm px-7 py-2  shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] transition-all active:scale-[0.97]"
        >
          View All
        </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCreators.map((creator) => (
          <div key={creator.id} className="group transition-transform duration-300 hover:-translate-y-1">
            <CreatorCard
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
          </div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="py-20 text-center text-zinc-500 font-bold">
          No creators found for {search}
        </div>
      )}

      <CreatorProfileModal
        onSubscribe={() => {}}
        onClose={() => {
          setIsOpen(false);
          setCreator(null);
        }}
        isOpen={isOpen}
        creator={creator}
      />
    </section>
  );
}