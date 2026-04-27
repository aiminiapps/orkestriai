import Link from "next/link";
import { RiTwitterXLine, RiGithubLine, RiBookLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-[#0b0c12]/80 backdrop-blur-3xl overflow-hidden mt-auto">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#7c75ff]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[100px] bg-[#7c75ff]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c75ff] to-[#2dd4a0] flex items-center justify-center p-[1px] shadow-[0_0_20px_rgba(124,117,255,0.3)] group-hover:shadow-[0_0_30px_rgba(45,212,160,0.5)] transition-shadow duration-500">
                <div className="w-full h-full bg-[#0b0c12] rounded-[11px] flex items-center justify-center">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
                    O
                  </span>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors duration-300">
                Orkestri
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
              The ultimate multi-agent consensus network. Navigate the crypto landscape with real-time intelligence, risk profiling, and advanced market sentiment analysis.
            </p>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/agents" className="text-white/40 hover:text-white transition-colors text-sm">Agents</Link></li>
              <li><Link href="/agents/research" className="text-white/40 hover:text-[#7c75ff] transition-colors text-sm">Agent Profiles</Link></li>
              <li><Link href="/arena" className="text-white/40 hover:text-white transition-colors text-sm">Compare</Link></li>
              <li><Link href="/leaderboard" className="text-white/40 hover:text-[#f7c94b] transition-colors text-sm">Board</Link></li>
              <li><Link href="/profile" className="text-white/40 hover:text-white transition-colors text-sm">Profile</Link></li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Ecosystem & Social</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group flex items-center gap-2 text-white/40 hover:text-[#f3ba2f] transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-[#f3ba2f]/40 transition-colors">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BSC" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  BSC Scan (Contract)
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.3] transition-colors">
                    <RiTwitterXLine className="text-xs" />
                  </div>
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-2 text-white/40 hover:text-[#2dd4a0] transition-colors text-sm">
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-[#2dd4a0]/40 transition-colors">
                    <RiBookLine className="text-xs" />
                  </div>
                  Documentation
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} Orkestri AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-mono text-white/30">
            <Link href="#" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
