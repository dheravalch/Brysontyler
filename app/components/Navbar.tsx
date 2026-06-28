"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./modals/AuthModal";
import { LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useGetAuthUser, useLogout } from "../hooks/useAuth";
import Image from "next/image";
import { getInitials } from "../utils/getInitials";
import { AnimatedPulseLoader } from "./ui/AnimatedPulseLoader";
import Link from "next/link";

export default function Navbar() {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { push } = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: logout } = useLogout();
  const { data: refreshedUser, isLoading, isFetching } = useGetAuthUser(isAuthenticated);
  const isInitializing = isLoading || isFetching || (!user && isAuthenticated);

  const menulinks = [
    { title: "Creators", path: "/creators" },
    { title: "Live Now", path: "/all-streams" },
    { title: "FAQs", path: "#faqs" },
  ];

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

      <nav className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => push("/home")}>
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-xl">BT</div>
            <div>
              <h1 className="text-lg font-bold tracking-tighter">BrysonTyler</h1>
              <p className="text-[10px] text-yellow-400 font-bold tracking-[2px]">PRODUCTIONS</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {isInitializing ? <AnimatedPulseLoader className="w-32 h-10" /> : renderActions(false)}
          </div>

          <button className="md:hidden p-2 text-white z-[60]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {renderActions(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

function renderActions(isMobile: boolean) {
  return (
    <>
      <div className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row gap-4"}`}>
        {menulinks.map((item) => (
          <Link 
            className={`font-medium transition-colors hover:text-yellow-400 ${
              isMobile 
                ? "text-xl py-2 border-b border-white/10 w-full text-center" 
                : "bg-[#ffffff22] px-4 py-1.5 text-xs rounded-full border border-gray-400"
            }`} 
            href={item.path} 
            key={item.path}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {user ? (
        <div className={`flex ${isMobile ? "flex-col items-center gap-6 mt-6" : "items-center gap-4"}`}>
          <div 
            onClick={() => handleAction(() => push("/dashboard"))} 
            className="flex cursor-pointer items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">
              {user.profileImage ? (
                <Image alt={user.name} src={user.profileImage} width={32} height={32} className="object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
          </div>
          
          <button 
            onClick={() => handleAction(() => logout())} 
            className="flex items-center gap-2 text-zinc-500 hover:text-red-400 font-bold uppercase tracking-widest text-xs"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={() => handleAction(() => setModalType("signup"))} 
          className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-yellow-400 transition-colors"
        >
          Join Now
        </button>
      )}
    </>
  );
}
}