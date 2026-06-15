"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "./modals/AuthModal";
import { LayoutDashboard, LogOut, Radio } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const { push } = useRouter();
  return (
    <>
      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-yellow-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Branding */}

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              BT
            </div>
            <div className="cursor-pointer" onClick={() => push("/home")}>
              <h1 className="text-3xl font-bold tracking-tighter">
                Bryson Tyler
              </h1>
              <p className="text-[10px]  text-yellow-400 font-bold tracking-[2px]">
                PRODUCTIONS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => push("/live/1/?=fan")}
                  className="group relative flex items-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_-5px_rgba(220,38,38,0.4)]"
                >
                  {/* Subtle Pulse Indicator */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  GO LIVE
                </button>
                <button
                  onClick={() => push("/dashboard")}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3 py-2.5 text-zinc-500 hover:text-red-400 transition-all"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setModalType("login")}
                  className="px-5 py-2.5 hover:text-yellow-400 text-sm font-semibold transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => setModalType("signup")}
                  className="px-6 py-2.5 bg-yellow-400 text-black font-black rounded-2xl text-sm hover:bg-yellow-300 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
