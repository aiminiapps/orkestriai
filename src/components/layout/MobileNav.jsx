"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiSwordLine,
  RiTrophyLine,
  RiHistoryLine,
  RiHome4Line,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: RiHome4Line },
  { href: "/arena", label: "Arena", icon: RiSwordLine },
  { href: "/leaderboard", label: "Board", icon: RiTrophyLine },
  { href: "/history", label: "History", icon: RiHistoryLine },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-white/[0.06]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-[#7c75ff]"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <item.icon className="text-xl" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-[#7c75ff]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
