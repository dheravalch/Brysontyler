"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuthStore } from "@/app/store/useAuthStore";
import { getInitials } from "@/app/utils/getInitials";
import { useChangePassword } from "../hooks/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password too short"),
  confirmPassword: z.string().min(6, "Confirm password required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const [avatar, setAvatar] = useState<string | null>(user?.profilePic || null);
  const { mutate: changePassword ,isPending} = useChangePassword();

  const { register, handleSubmit, formState: { errors } } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
      toast.success("Profile picture updated!");
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-black mb-8">EDIT ACCOUNT</h2>

      <div className="flex flex-col items-center mb-8">
        <label className="relative cursor-pointer group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-zinc-800">
            {avatar ? (
              <Image 
                width={96} height={96} alt="avatar" src={avatar} 
                className="w-full h-full rounded-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-xl font-bold">
                {getInitials(user.name)}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
            <Camera size={24} className="text-white" />
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
        </label>
      </div>

      <form onSubmit={handleSubmit((data) => changePassword(data))} className="space-y-6">
        <Input 
          label="Full Name" 
          value={user.name} 
          disabled 
        />

        <Input
          {...register("currentPassword")}
          type="password"
          placeholder="Current Password" 
          error={errors.currentPassword?.message}
        />

        <Input
          {...register("newPassword")}
          
          type="password"
          placeholder="New Password" 
          error={errors.password?.message}
        />

        <Input 
          {...register("confirmPassword")}

          type="password"
          placeholder="Confirm Password" 
          error={errors.confirmPassword?.message}
        />

        <Button isLoading={isPending} type="submit" disabled={isPending}>
          SAVE CHANGES
        </Button>
      </form>
    </div>
  );
}