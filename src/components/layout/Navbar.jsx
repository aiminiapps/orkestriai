"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiSwordLine, RiTrophyLine, RiHistoryLine, RiRobot2Line } from "react-icons/ri";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/arena", label: "Arena", icon: RiSwordLine },
  { href: "/leaderboard", label: "Leaderboard", icon: RiTrophyLine },
  { href: "/history", label: "History", icon: RiHistoryLine },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c75ff] to-[#4a9eff] flex items-center justify-center shadow-lg shadow-[#7c75ff]/20 group-hover:shadow-[#7c75ff]/40 transition-shadow duration-300">
              <RiRobot2Line className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Orkestri<span className="text-gradient"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                  )}
                >
                  <link.icon className="text-base" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Wallet placeholder */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block px-4 py-2 rounded-xl text-sm font-mono text-white/40 border border-white/[0.08] bg-white/[0.03]">
              Connect Wallet
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
