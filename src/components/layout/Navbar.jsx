"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  RiSwordLine,
  RiTrophyLine,
  RiHistoryLine,
  RiRobot2Line,
  RiUser3Line,
  RiWallet3Line,
  RiArrowLeftRightLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/arena", label: "Arena", icon: RiSwordLine },
  { href: "/compare", label: "Compare", icon: RiArrowLeftRightLine },
  { href: "/leaderboard", label: "Leaderboard", icon: RiTrophyLine },
];

export default function Navbar() {
  const pathname = usePathname();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c75ff] to-[#4a9eff] flex items-center justify-center">
              <RiRobot2Line className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Orkestri<span className="text-gradient"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname?.startsWith(link.href + "/");
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

          {/* Wallet + Profile */}
          <div className="flex items-center gap-2">
            {isConnected && (
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all"
              >
                <RiUser3Line />
                <span className="hidden lg:inline">Profile</span>
              </Link>
            )}
            <button
              onClick={() => open()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer",
                isConnected
                  ? "bg-[#7c75ff]/10 border border-[#7c75ff]/20 text-[#7c75ff] hover:bg-[#7c75ff]/15"
                  : "bg-gradient-to-r from-[#7c75ff] to-[#5b54e5] text-white hover:opacity-90"
              )}
            >
              <RiWallet3Line className="text-base" />
              <span className="font-mono text-xs sm:text-sm">
                {isConnected ? truncatedAddress : "Connect"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
