/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Image from "next/image";
import { useUploadProfileImage, useUploadCoverImage } from "@/app/hooks/useAuth";

interface BrandIdentityProps {
  onNext: () => void;
}

export default function BrandIdentity({ onNext }: BrandIdentityProps) {
  const [files, setFiles] = useState<{ profilePicture: File | null; coverPhoto: File | null }>({
    profilePicture: null,
    coverPhoto: null,
  });

  const [previews, setPreviews] = useState<{ profilePicture: string | null; coverPhoto: string | null }>({
    profilePicture: null,
    coverPhoto: null,
  });

  const [error, setError] = useState<string>("");

  const { mutateAsync: uploadProfile, isPending: isUploadingProfile } = useUploadProfileImage();
  const { mutateAsync: uploadCover, isPending: isUploadingCover } = useUploadCoverImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'profilePicture' | 'coverPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [key]: file }));
      setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
      setError("");
    }
  };

  const removeFile = (e: React.MouseEvent, key: 'profilePicture' | 'coverPhoto') => {
    e.preventDefault();
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: null }));
  };

  const validateAndNext = async () => {
    if (!files.profilePicture || !files.coverPhoto) {
      setError("Please upload both a profile picture and a cover photo.");
      return;
    }

    try {

      const profileFormData = new FormData();
      profileFormData.append("image", files.profilePicture);

      const coverFormData = new FormData();
      coverFormData.append("image", files.coverPhoto);

  
      await Promise.all([
        uploadProfile(profileFormData),
        uploadCover(coverFormData)
      ]);

      onNext();
    } catch (err) {
      setError("Failed to upload images. Please try again.");
    }
  };

  const isPending = isUploadingProfile || isUploadingCover;

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="grid grid-cols-2 gap-6">
        {[
          { key: 'profilePicture', label: 'Profile Picture' },
          { key: 'coverPhoto', label: 'Cover Photo' }
        ].map(({ key, label }) => (
          <div key={key} className="relative">
            <input type="file" accept="image/*" className="hidden" id={key} onChange={(e) => handleFileChange(e, key as any)} />
            <label htmlFor={key} className={`cursor-pointer border-2 border-dashed rounded-3xl p-4 flex flex-col items-center justify-center gap-4 transition-all h-48 ${previews[key as keyof typeof previews] ? 'border-[#F7E018] bg-zinc-800' : 'border-white/10 hover:border-[#F7E018] bg-white/5'}`}>
              {previews[key as keyof typeof previews] ? (
                <div className="relative w-full h-full">
                  <Image width={200} height={200} src={previews[key as keyof typeof previews]!} alt="preview" className="w-full h-full object-cover rounded-2xl" />
                  <button onClick={(e) => removeFile(e, key as any)} className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-500 transition-colors">
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-zinc-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                </>
              )}
            </label>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
      
      <Button 
        onClick={validateAndNext} 
        type="button" 
        className="w-full" 
        isLoading={isPending}
      >
        {isPending ? "Uploading..." : "Upload Photos"}
      </Button>
    </motion.div>
  );
}