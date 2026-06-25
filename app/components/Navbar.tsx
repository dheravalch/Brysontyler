"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./modals/AuthModal";
import { LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useGetAuthUser, useLogout } from "../hooks/useAuth";
import Image from "next/image";
import { getInitials } from "../utils/getInitials";
import { AnimatedPulseLoader } from "./ui/AnimatedPulseLoader";

export default function Navbar() {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { push, replace } = useRouter();
  
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: logout } = useLogout();
  const { data: refreshedUser, isLoading, isFetching } = useGetAuthUser(isAuthenticated);
  const isInitializing = isLoading || isFetching || (!user && isAuthenticated);

  useEffect(() => {
    if (refreshedUser) setUser(refreshedUser);
  }, [refreshedUser, setUser]);

  const handleAction = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  return (
    <>
      {modalType && <AuthModal type={modalType} onClose={() => setModalType(null)} />}

      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-yellow-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => push("/home")}>
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-xl">BT</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">Bryson Tyler</h1>
              <p className="text-[10px] text-yellow-400 font-bold tracking-[2px]">PRODUCTIONS</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isInitializing ? <AnimatedPulseLoader className="w-32 h-10 rounded-full" /> : renderActions(false)}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-yellow-500 p-6 flex flex-col items-center gap-6">
            {isInitializing ? <AnimatedPulseLoader className="w-full h-10" /> : renderActions(true)}
          </div>
        )}
      </nav>
    </>
  );

  function renderActions(isMobile: boolean) {
    return user ? (
      <>
        <div onClick={() => handleAction(() => push("/profile"))} className="flex cursor-pointer items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">
            {user.profilePic ? <Image alt={user.name} src={user.profilePic} width={32} height={32} className="object-cover" /> : getInitials(user.name)}
          </div>
          <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
        </div>
        {(user.role === "creator" || user.role === "admin") && (
          <button onClick={() => handleAction(() => push("/live/1/?=fan"))} className="px-8 py-3 bg-red-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">Go Live</button>
        )}
        <button onClick={() => handleAction(() => logout())} className="flex items-center gap-2 text-zinc-500 hover:text-red-400">
          <LogOut size={18} /> {isMobile && "Logout"}
        </button>
      </>
    ) : (
      <>
        <button onClick={() => handleAction(() => replace("/login"))} className="px-5 py-2.5 text-sm font-semibold">Login</button>
        <button onClick={() => handleAction(() => setModalType("signup"))} className="px-8 py-3 bg-yellow-400 text-black font-black rounded-2xl text-sm uppercase">Sign Up</button>
      </>
    );
  }
}