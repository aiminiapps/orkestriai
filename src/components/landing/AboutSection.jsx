"use client";

import { motion } from "framer-motion";
import { RiEarthLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function OrbitingNode({ delay = 0, size = "w-2 h-2", color = "bg-[#7c75ff]", duration = 10, radius = "w-48 h-48", reverse = false }) {
  return (
    <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.05] rounded-full", radius)}>
      <motion.div
        className="w-full h-full absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      >
        <div className={cn("absolute -top-1 left-1/2 -translate-x-1/2 rounded-full blur-[2px]", size, color, "opacity-60")} />
        <div className={cn("absolute -top-1 left-1/2 -translate-x-1/2 rounded-full", size, color)} />
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const stats = [
    { value: "50K+", label: "Analyses Generated" },
    { value: "3", label: "Specialized AI Models" },
    { value: "100%", label: "Real-time Market Data" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Orbs to blend with the project theme */}
      <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] bg-[#7c75ff]/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-[#2dd4a0]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Top Badge matching the image style */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <RiEarthLine className="text-white/60" />
                <span className="text-xs font-semibold text-white/70 tracking-wide uppercase">
                  Global Intelligence Network
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              variants={fadeUp} 
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
            >
              Analyze Your Next Crypto Move with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c75ff] to-[#4a9eff]">
                Machine Precision
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeUp} 
              custom={2}
              className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed mb-12 font-light"
            >
              Instead of relying on biased influencers, harness our autonomous network 
              of AI agents. They instantly cross-examine token fundamentals, technical 
              action, and market sentiment to give you total investment clarity.
            </motion.p>

            {/* Stats Area (Stacked exactly like the reference image) */}
            <motion.div variants={fadeUp} custom={3} className="space-y-6 max-w-lg">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="text-4xl sm:text-5xl font-mono font-medium text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-white/40 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  {/* Subtle Separator border */}
                  {i !== stats.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Graphic Area (A premium glowing orbital visualization) */}
          <motion.div 
            className="flex-1 w-full relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Glowing core representing the AI */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#7c75ff] to-[#4a9eff] rounded-full blur-[40px] opacity-40 mix-blend-screen" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#7c75ff] to-[#2dd4a0] rounded-full shadow-[0_0_80px_rgba(124,117,255,0.6)]" />
              
              {/* The "Globe" Ring grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/[0.03] rounded-full animate-pulse" style={{ animationDuration: "4s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-white/[0.04] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-white/[0.05] rounded-full" />
              
              {/* Orbital Nodes */}
              <OrbitingNode radius="w-[100%] h-[100%]" size="w-3 h-3" color="bg-[#f7c94b]" duration={15} />
              <OrbitingNode radius="w-[85%] h-[85%]" size="w-2 h-2" color="bg-[#2dd4a0]" duration={12} delay={2} reverse />
              <OrbitingNode radius="w-[70%] h-[70%]" size="w-3 h-3" color="bg-[#7c75ff]" duration={8} delay={5} />
              <OrbitingNode radius="w-[55%] h-[55%]" size="w-1.5 h-1.5" color="bg-white" duration={6} delay={1} reverse />
              
              {/* Elegant curved connecting lines simulating data flow */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <path d="M 10,50 Q 50,10 90,50" fill="transparent" stroke="white" strokeWidth="0.2" strokeDasharray="1 2" className="animate-[pulse_3s_infinite]" />
                <path d="M 20,80 Q 50,50 80,20" fill="transparent" stroke="url(#gradient)" strokeWidth="0.3" strokeDasharray="2 3" />
                <path d="M 80,80 Q 50,100 20,80" fill="transparent" stroke="white" strokeWidth="0.1" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c75ff" />
                    <stop offset="100%" stopColor="#2dd4a0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
