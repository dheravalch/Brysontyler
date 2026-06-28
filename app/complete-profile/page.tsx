/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import PersonalDetails from "./components/PersonalDetails";
import BrandIdentity from "./components/BrandIdentity";
import Verification from "./components/Verification";
import { useAuthStore } from "../store/useAuthStore";
import { useGetAuthUser } from "../hooks/useAuth";
import { AnimatedPulseLoader } from "../components/ui/AnimatedPulseLoader";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const [step, setStep] = useState(1);
  const progress = (step / 3) * 100;
  const {isAuthenticated} = useAuthStore();
  const {push}=useRouter()
  const {data:user, isLoading}=useGetAuthUser(isAuthenticated)
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const stepConfig = {
    1: {
      title: "Personal Details",
      desc: "Provide your core information to establish your profile.",
    },
    2: {
      title: "Profile Picture/Cover Upload",
      desc: "Curate the aesthetic of your profile. High-quality assets build trust.",
    },
    3: { 
    title: "Identity Verification", 
    desc: "We verify all creators to protect our community. Your data is encrypted and used solely for safety and age compliance." 
  },
  };
useEffect(() => {
  if (user) {
    if (user.kycStatus === "verified") {
      setStep(3); 
    } 
    else if (user.profileCompleted && (!user.profileImage || !user.coverImage)) {
      setStep(2);
    } 
    else if (user.profileCompleted && user.profileImage && user.coverImage) {
      setStep(3);
    } 
    else {
      setStep(1);
    }
  }
}, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full relative">
        <div className="absolute -inset-1 bg-gradient-to-b from-[#F7E018]/20 to-transparent rounded-[2.5rem] blur-xl" />

        <div className="relative mb-3 bg-zinc-900 border border-white/10 p-12 rounded-[2rem] shadow-2xl">
        {step > 1 && (
  <button 
    onClick={() => push('/dashboard')}
    className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors"
  >
    Save & Exit to Dashboard
  </button>
)}
          <div className="mb-12 border-b border-white/5 pb-8 flex justify-between items-start">
          
            <div>
              <div className="flex items-center gap-2 text-[#F7E018] text-[10px] uppercase tracking-widest font-bold mb-3">
                <Sparkles size={12} /> BrysonTyler Onboarding
              </div>
              <h1 className="text-4xl font-black italic tracking-tighter mb-2">
                {isLoading?"Checking Progress..":stepConfig[step as 1].title}
              </h1>
              <p className="text-zinc-500 text-sm max-w-sm">
                {isLoading?'please wait..':stepConfig[step as 1].desc}
              </p>
            </div>

            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-zinc-800"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#F7E018"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="176"
                  animate={{ strokeDashoffset: 176 - (176 * progress) / 100 }}
                />
              </svg>
              <span className="absolute font-black text-xs">{step}/3</span>
            </div>
          </div>

          {isLoading?<AnimatedPulseLoader className="h-[100px] rounded-lg"/>:<><AnimatePresence mode="wait">
            {step === 1 && <PersonalDetails onNext={() => setStep(2)} />}
            {step === 2 && <BrandIdentity onNext={() => setStep(3)} />}
            {step === 3 && <Verification />}
          </AnimatePresence></>}
        </div>
      </div>
    </div>
  );
}
