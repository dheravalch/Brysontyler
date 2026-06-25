/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Camera} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getInitials } from "@/app/utils/getInitials";
import { User } from "@/app/models/AuthModel";

const profileSchema = z.object({
  password: z.string().min(6, "Password too short").optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ProfileModal({ user, onClose }: { user:User, onClose: () => void }) {
  const [avatar, setAvatar] = useState(user?.profilePic || null);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(profileSchema) });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
      toast.success("Profile picture updated!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black">Edit Profile</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="flex flex-col items-center mb-8">
          <label className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-zinc-800">
              {avatar ? <Image fill alt="avatar" src={avatar} className="w-full h-full  rounded-full object-cover" /> : <div className="flex items-center justify-center h-full">{getInitials(user.name)}</div>}
            </div>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
              <Camera size={24} className="text-white" />
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit((d) => toast.success("Password Updated!"))} className="space-y-4">
          <input {...register("password")} type="password" placeholder="New Password" className="w-full bg-zinc-800 p-3 rounded-xl border border-zinc-700" />
          <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="w-full bg-zinc-800 p-3 rounded-xl border border-zinc-700" />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-black rounded-xl">SAVE CHANGES</button>
        </form>
      </div>
    </div>
  );
}