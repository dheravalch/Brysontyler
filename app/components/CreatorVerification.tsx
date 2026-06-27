/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import ManualVerificationModal from "./modals/ManualVerificationModal";

const accountSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const CreatorApplicationWizard = () => {
  const [step, setStep] = useState(1);
  const [showManualModal, setShowManualModal] = useState(false);

  const { handleSubmit } = useForm({
    resolver: zodResolver(accountSchema),
    mode: "onChange"
  });

  const onNext = async (data: any) => {
    if (step === 1) {
      console.log("Account Details:", data);
      setStep(2);
    }
  };

  return (
    
    <div>
      
      {showManualModal && (
        <ManualVerificationModal 
          onClose={() => setShowManualModal(false)} 
          onSuccess={() => toast.success("Submission received!")}
        />
      )}
     

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
  
        {step === 1 && (
          <div className="space-y-6 text-center animate-in slide-in-from-right-4">
            <h2 className="text-2xl font-black">Identity Verification</h2>
            <p className="text-zinc-400 text-sm">Verify your profile to unlock features.</p>
            <Button type="button" onClick={() => setShowManualModal(true)} className="w-full bg-yellow-500 text-black font-bold">
              VERIFY NOW
            </Button>
            <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full">
              BACK
            </Button>
          </div>
        )}
      </form>

    </div>
  );
};