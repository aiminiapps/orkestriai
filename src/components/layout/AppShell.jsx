"use client";

import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-animated -z-20" />
      <div className="fixed inset-0 dot-pattern -z-10" />

      {/* Top navbar */}
      <Navbar />

      {/* Main content */}
      <main className="pt-16 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
