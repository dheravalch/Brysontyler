"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, Wallet, Video, LucideIcon } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { User as UserType } from "@/app/models/AuthModel";


const iconMap: Record<string, LucideIcon> = {
  user: User,
  shield: Shield,
  wallet: Wallet,
  video: Video,
};

interface SidebarLinkProps {
  href: string;
  label: string;
  iconName: keyof typeof iconMap; 
  roleRequired?: UserType["role"];
}

export const ProfileSidebarLink = ({ href, label, iconName, roleRequired }: SidebarLinkProps) => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const Icon = iconMap[iconName];

  if (roleRequired && user?.role !== roleRequired) return null;

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive ? "bg-zinc-800 text-yellow-500" : "hover:bg-zinc-900 text-zinc-400"
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
};