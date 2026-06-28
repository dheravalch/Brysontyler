"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CreatorGrid from "../components/CreatorGrid";
import LiveSection from "../components/LiveSection";

import Footer from "../components/Footer";
import { useState } from "react";
import AuthModal from "../components/modals/AuthModal";
import CookieConsent from "../components/CookieConsent";
import CreatorProtocols from "../components/FAQS";

export default function Home() {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black">
      <Navbar />
      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
      <main>
        <Hero
          openModal={() => {
            setModalType("signup");
          }}
        />

        <CreatorGrid />

        <LiveSection />
        <CreatorProtocols/>
        <CookieConsent/>
      </main>
      <Footer openSignUp={()=>{
        setModalType('signup')
      }}/>
    </div>
  );
}
