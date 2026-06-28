"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useStartKYC } from "@/app/hooks/useAuth";

interface VerificationProps {
  onVerify?: () => void;
}

export default function Verification({ onVerify }: VerificationProps) {
    const { mutate: startKYC, isPending } = useStartKYC();
  return (
    <motion.div 
      className="text-center py-12 space-y-6" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-[#F7E018] to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_-10px_rgba(247,224,24,0.3)]">
        <CheckCircle2 size={48} className="text-black" />
      </div>
      
      <div>
        <h2 className="text-2xl font-black italic tracking-tighter">
          AUTHENTICATION REQUIRED
        </h2>
        <p className="text-zinc-500 mt-2 text-sm max-w-sm mx-auto">
          Identity verification is the final step to ensuring a secure ecosystem for your brand.
        </p>
      </div>

      <Button isLoading={isPending} disabled={isPending} onClick={()=>startKYC()}>
        Verify Identity with Didit
      </Button>
    </motion.div>
  );
}