"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Profile', href: '/dashboard/settings' },
    { name: 'Notifications', href: '/dashboard/settings/notifications' },
    { name: 'Security', href: '/dashboard/settings/security' },
    { name: 'Subscription', href: '/dashboard/settings/subscription' },
     { name: 'Identity docs', href: '/dashboard/settings/identity-docs' },
  ];

  return (
    <div className="flex gap-12">
      <aside className="w-64 space-y-2">
        {tabs.map((tab) => {
          // Debugging: open your browser console to see if these match
          // console.log("Path:", pathname, "Tab:", tab.href);

          // Logic: 
          // 1. Profile: Only active if exact match
          // 2. Others: Active if the pathname starts with the href
          const isActive = tab.href === '/dashboard/settings' 
            ? pathname === tab.href
            : pathname.startsWith(tab.href);

          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`block w-full px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                  ? "bg-white text-black" 
                  : "text-zinc-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </aside>
      
      <main className="flex-1 bg-zinc-900 border border-white/5 p-10 rounded-3xl min-h-[500px]">
        {children}
      </main>
    </div>
  );
}