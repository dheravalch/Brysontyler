"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CreatorGrid from "../components/CreatorGrid";
import LiveSection from "../components/LiveSection";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black">
      <Navbar />

      <main>
        <Hero />

        <CreatorGrid />

        <LiveSection />
      </main>
      <Footer />
    </div>
  );
}
