"use client";

import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiScales3Line,
  RiTrophyLine,
  RiCoinLine,
  RiWallet3Line,
  RiBankCardLine,
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── MICRO DETAIL COMPONENTS ──

// Card 1 Background: Circuitry Traces
const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
      {/* Background Grid */}
      <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
      
      {/* Tech Traces */}
      <path d="M-10,120 L40,120 L60,100 L140,100 L160,80 L210,80" stroke="#7c75ff" strokeWidth="1.5" strokeDasharray="4 8" className="animate-[dash_15s_linear_infinite]" />
      <path d="M-10,150 L30,150 L50,130 L100,130 L110,120" stroke="#7c75ff" strokeWidth="1" opacity="0.5" />
      <path d="M80,-10 L80,40 L100,60 L180,60" stroke="#7c75ff" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="100" r="2.5" fill="#7c75ff" className="animate-ping" style={{ animationDuration: '3s' }} />
      <circle cx="160" cy="80" r="2.5" fill="#7c75ff" className="animate-ping" style={{ animationDuration: '4s' }} />
      <circle cx="100" cy="60" r="2" fill="#ffffff" />
    </svg>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#7c75ff]/15 rounded-full blur-3xl" />
  </div>
);

// Card 2 Background: Floating Platforms
const PlatformsBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700 flex items-center justify-center">
    <div className="relative w-48 h-48 perspective-[800px] flex items-center justify-center">
      {/* Center glowing axle */}
      <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#f7c94b]/30 to-transparent" />
      
      <div className="absolute w-36 h-36 rounded-2xl border border-[#f7c94b]/40 bg-gradient-to-br from-[#f7c94b]/10 to-transparent shadow-[inset_0_0_20px_rgba(247,201,75,0.1)] transform rotateX-[65deg] rotateZ-[45deg] translate-y-10 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute w-24 h-24 rounded-xl border border-[#f7c94b]/60 bg-gradient-to-br from-[#f7c94b]/20 to-transparent shadow-[inset_0_0_15px_rgba(247,201,75,0.2)] transform rotateX-[65deg] rotateZ-[45deg] translate-y-0 animate-[float_6s_ease-in-out_infinite_1s]" />
      <div className="absolute w-12 h-12 rounded-lg border border-[#f7c94b]/80 bg-[#f7c94b]/30 shadow-[0_0_15px_rgba(247,201,75,0.4)] transform rotateX-[65deg] rotateZ-[45deg] -translate-y-10 animate-[float_6s_ease-in-out_infinite_2s]" />
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#f7c94b]/15 rounded-full blur-3xl" />
  </div>
);

// Card 3 Background: Crypto Data Grid
const CryptoGridBackground = () => {
  const icons = [RiCoinLine, RiWallet3Line, RiBankCardLine, RiCoinLine];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700 flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4 w-[140%] rotate-12 scale-110">
        {Array.from({ length: 16 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          const hasIcon = i % 3 === 0;
          return (
            <div key={i} className="aspect-square rounded-2xl border border-white/[0.04] bg-white/[0.01] shadow-[inset_0_0_10px_rgba(255,255,255,0.01)] flex items-center justify-center transition-all duration-500 group-hover:border-[#2dd4a0]/20 group-hover:bg-[#2dd4a0]/[0.03]">
              {hasIcon && <Icon className="text-[#2dd4a0]/40 text-2xl drop-shadow-[0_0_5px_rgba(45,212,160,0.5)]" />}
            </div>
          );
        })}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#2dd4a0]/15 rounded-full blur-3xl" />
    </div>
  );
};

const steps = [
  {
    prefix: "01",
    title: "Submit Target Token",
    desc: "Enter any crypto project or token you want deeply investigated.",
    icon: RiSearchLine,
    color: "#7c75ff",
    bgAccent: "from-[#7c75ff]/20 to-transparent",
    glowColor: "rgba(124, 117, 255, 0.4)",
    BackgroundComponent: CircuitBackground,
  },
  {
    prefix: "02",
    title: "Multi-Agent Analysis",
    desc: "Three specialized AI agents instantly cross-examine the fundamentals.",
    icon: RiScales3Line,
    color: "#f7c94b",
    bgAccent: "from-[#f7c94b]/20 to-transparent",
    glowColor: "rgba(247, 201, 75, 0.4)",
    BackgroundComponent: PlatformsBackground,
  },
  {
    prefix: "03",
    title: "Real-Time Verdict",
    desc: "Compare insights side-by-side and execute trades with absolute confidence.",
    icon: RiTrophyLine,
    color: "#2dd4a0",
    bgAccent: "from-[#2dd4a0]/20 to-transparent",
    glowColor: "rgba(45, 212, 160, 0.4)",
    BackgroundComponent: CryptoGridBackground,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Global Theme Background Glows */}
      <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] bg-[#7c75ff]/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-[#2dd4a0]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block matching the provided layout */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
          >
            Unlock the Full Potential of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Your Crypto Experience
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our platform's core mechanics that make crypto investing secure, 
            accessible, and highly perceptive.
          </motion.p>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group h-[450px] relative rounded-3xl border border-white/[0.05] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden flex flex-col p-4 sm:p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-[#0b0c12] pointer-events-none" />
              
              {/* Dynamic Micro-Detail Background Component */}
              <step.BackgroundComponent />

              {/* Centered Floating Glowing Icon */}
              <div className="flex-1 flex items-center justify-center relative">
                <motion.div 
                  className="relative w-24 h-24 rounded-[2rem] flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}40, ${step.color}05)`,
                    border: `1px solid ${step.color}50`,
                    boxShadow: `0 20px 40px -10px ${step.glowColor}, inset 0 2px 20px -5px ${step.color}90`
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  {/* Decorative tiny tech corners */}
                  <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/40" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/40" />
                  
                  <step.icon className="text-4xl drop-shadow-md" style={{ color: step.color }} />
                  {/* Internal glossy highlight */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
                </motion.div>
              </div>

              {/* Bottom Info Card matching the frosted pill overlay style */}
              <div className="relative z-20 mt-auto bg-[#0b0c12]/60 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:bg-[#0b0c12]/80 group-hover:border-white/[0.15] group-hover:-translate-y-2">
                <div className="absolute top-0 left-6 w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-center text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        @keyframes float {
          0% { transform: rotateX(60deg) rotateZ(45deg) translateY(0px); }
          50% { transform: rotateX(60deg) rotateZ(45deg) translateY(-20px); }
          100% { transform: rotateX(60deg) rotateZ(45deg) translateY(0px); }
        }
      `}</style>
    </section>
  );
}
