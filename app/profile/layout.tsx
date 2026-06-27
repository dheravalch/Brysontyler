"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { ProfileSidebarLink } from "../components/ui/ProfileSidearLink";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    <div className="w-full min-h-screen">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center text-black font-black text-lg shrink-0">
              BT
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black uppercase tracking-tighter">
                Welcome, {user?.name.split(" ")[0] || "User"}
              </h1>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest hidden md:block">
                My Account Settings
              </p>
            </div>
          </div>

          <button 
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Home size={14} /> <span className="hidden md:inline">Home</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 pb-12">
        <nav className="md:w-50 shrink-0">
          <div className="md:sticky md:top-28 flex flex-row md:flex-col overflow-x-auto gap-1 border-b md:border-b-0 border-zinc-800 pb-2 md:pb-0 scrollbar-hide">
            <ProfileSidebarLink href="/profile" label="Account" iconName="user" />
            <ProfileSidebarLink href="/profile/following" label="Creators" iconName="shield" />
            <ProfileSidebarLink href="/profile/wallet" label="Coins" iconName="wallet" />
            <ProfileSidebarLink href="/profile/creator" label="Creator" iconName="video" roleRequired="creator" />
          </div>
        </nav>

        <main className="flex-grow bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 w-full md:max-w-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}