"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Settings,
  Users,
  Video,
  MessageSquare,
  LogOut,
  Compass,
  Heart,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { getInitials } from "../utils/getInitials";
import { useGetAuthUser, useLogout } from "../hooks/useAuth";
import { useEffect } from "react";
import { BrysonLoader } from "../components/ui/BrysonLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearAll = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate } = useLogout();
  const {
    data: refreshedUser,
    isLoading,
    isFetching,
  } = useGetAuthUser(isAuthenticated);
  const isInitializing = isLoading || isFetching || (!user && isAuthenticated);
  useEffect(() => {
    if (refreshedUser) setUser(refreshedUser);
  }, [refreshedUser, setUser]);
  useEffect(() => {
    if (!isInitializing && user && user.profileCompleted === false) {

      router.replace("/complete-profile");
    }
  }, [user, isInitializing, router]);

  const handleLogout = () => {
    mutate();
    clearAll();
  };
  const navItems = {
    creator: [
      { name: "Home", path: "/dashboard", icon: BarChart3 },
      { name: "Content", path: "/dashboard/content", icon: Video },
      { name: "Subscribers", path: "/dashboard/subscribers", icon: Users },
      { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
    fan: [
      { name: "Discover", path: "/dashboard", icon: Compass },
      { name: "Subscriptions", path: "/dashboard/subscriptions", icon: Heart },
      { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
      { name: "Payments", path: "/dashboard/payments", icon: CreditCard },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  };

  const currentNav = user?.role === "creator" ? navItems.creator : navItems.fan;
if (isInitializing) return <BrysonLoader/>;
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="sticky top-0 w-64 h-screen border-r border-white/10 p-8 flex flex-col justify-between">
        <div>
          <div className="text-xl font-black mb-8 tracking-widest text-yellow-500">
            {getInitials(user?.name || "user")}
          </div>

          <nav className="space-y-4">
            {currentNav.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.path
                    ? "bg-[#F7E018] text-black font-bold"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <item.icon size={18} /> {item.name}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 h-screen">{children}</main>
    </div>
  );
}
