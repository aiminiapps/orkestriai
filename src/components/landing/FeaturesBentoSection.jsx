"use client";

import { motion } from "framer-motion";
import { 
  RiFundsLine, 
  RiExchangeLine, 
  RiNodeTree, 
  RiVipCrownLine,
  RiCoinsLine,
  RiSearchLine
} from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesBentoSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
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
            Powerful Architecture That Makes <br className="hidden sm:block" />
            <span className="text-[#7c75ff]">
              Crypto Investing Decisive
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
          >
            Whether you're comparing agents or managing rewards, our platform equips 
            you with everything needed to cut through market noise fast, secure, and intuitive.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Interactive Canvas (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Investigate via Interactive Canvas</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-md">
                Don't just read plain text. Experience AI analyses mapped out in a dynamic node tree, linking research logic directly to conclusions for ultimate clarity.
              </p>
            </div>
            
            {/* Visual Canvas Mockup */}
            <div className="mt-12 flex-1 w-full bg-[#0b0c12]/50 border-t border-x border-white/[0.05] min-h-[250px] relative overflow-hidden rounded-t-[2rem] mx-auto w-[90%] flex">
               {/* Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
               
               {/* Connecting SVG arc */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <path d="M 120 80 Q 200 80 200 150 T 280 150" fill="none" stroke="#7c75ff" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_6s_linear_infinite]" opacity="0.5" />
                 <path d="M 120 80 Q 200 80 200 40 T 300 40" fill="none" stroke="#2dd4a0" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_5s_linear_infinite_reverse]" opacity="0.5" />
               </svg>

               {/* Mock Nodes */}
               <div className="absolute top-14 left-8 bg-[#0b0c12]/80 backdrop-blur-md border border-white/[0.1] rounded-xl p-4 shadow-[0_0_30px_rgba(124,117,255,0.15)] flex items-center gap-3 transition-transform duration-500 group-hover:-translate-y-1">
                 <div className="w-8 h-8 rounded-lg bg-[#7c75ff]/20 flex items-center justify-center text-[#7c75ff]">
                   <RiSearchLine />
                 </div>
                 <div>
                   <div className="text-xs font-semibold text-white/50 mb-0.5">Root Agent</div>
                   <div className="text-sm text-white font-medium">Core Query</div>
                 </div>
               </div>

               <div className="absolute top-24 left-[16rem] bg-[#0b0c12]/80 backdrop-blur-md border border-white/[0.1] rounded-xl p-3 shadow-[0_0_20px_rgba(45,212,160,0.1)] flex items-center gap-3 transition-transform duration-500 group-hover:-translate-y-2">
                 <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_10px_#2dd4a0]" />
                 <div className="text-sm text-white/80 font-medium whitespace-nowrap">Technical Node</div>
               </div>

               <div className="absolute top-6 left-[19rem] bg-[#0b0c12]/80 backdrop-blur-md border border-white/[0.1] rounded-xl p-3 shadow-[0_0_20px_rgba(247,201,75,0.1)] flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2 relative group-hover:z-20">
                 <div className="w-2 h-2 rounded-full bg-[#f7c94b] shadow-[0_0_10px_#f7c94b]" />
                 <div className="text-sm text-white/80 font-medium whitespace-nowrap">Sentiment Node</div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: Multi-Chain (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default"
          >
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Seamless Seamless BNB Chain Web3</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Connect instantly and securely across the BNB ecosystem. Zero friction.
              </p>
            </div>
            
            {/* Visual Wallet Mockup */}
            <div className="mt-12 flex-1 w-full relative flex justify-center items-center overflow-hidden min-h-[250px]">
              {/* Background gradient flare */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f3ba2f]/10 to-transparent opacity-50" />
              
              <div className="relative w-[280px] p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl z-10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f3ba2f] flex justify-center items-center text-white text-xl font-bold shadow-[0_0_20px_#f3ba2f50]">
                         B
                      </div> 
                      <div>
                        <div className="text-white text-sm font-semibold">BNB Smart Chain</div>
                        <div className="text-white/40 text-xs">Connected</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_10px_#2dd4a0] animate-pulse" />
                 </div>
                 
                 <div className="w-full h-10 rounded-xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] flex items-center px-4 mb-3 border border-white/[0.05]">
                    <div className="text-white/30 text-xs">Address: 0x4F9...e3A2</div>
                 </div>
                 <div className="h-10 w-full rounded-xl bg-gradient-to-r from-[#f7c94b] to-[#f3ba2f] text-black font-semibold text-sm text-center flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(247,201,75,0.2)]">
                    Active Session
                 </div>
              </div>

              {/* Floating blur shapes to add depth */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f7c94b]/20 blur-3xl rounded-full mix-blend-screen" />
            </div>
          </motion.div>

          {/* Card 3: OKAI Rewards (span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col p-8 cursor-default min-h-[450px]"
          >
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Earn OKAI Rewards Automatically</h3>
              <p className="text-white/40 text-base leading-relaxed">
                Get rewarded for participation. Earn 30 OKAI for generating analyses, 20 for comparing nodes, and 10 for voting on top intel.
              </p>
            </div>
            
            {/* Visual Orbital Rings */}
            <div className="absolute inset-0 top-32 flex items-center justify-center overflow-hidden pointer-events-none">
               {/* 3 Rings */}
               <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]" />
               <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#7c75ff]/30 animate-[spin_40s_linear_infinite_reverse]">
                  {/* Orbiting Coin */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1e1c2e] border border-[#7c75ff] flex items-center justify-center shadow-[0_0_15px_#7c75ff40]">
                    <RiCoinsLine className="text-[#7c75ff] text-sm" />
                  </div>
               </div>
               <div className="absolute w-[160px] h-[160px] rounded-full border border-dotted border-[#2dd4a0]/40 animate-[spin_20s_linear_infinite]">
                  {/* Orbiting Coin */}
                  <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full bg-[#182a24] border border-[#2dd4a0] flex items-center justify-center shadow-[0_0_10px_#2dd4a040]">
                    <span className="text-[#2dd4a0] text-[10px] font-bold">10</span>
                  </div>
               </div>
               
               {/* Center Main Core */}
               <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#0b0c12] to-[#1a1b26] border border-[#f7c94b]/60 flex items-center justify-center shadow-[0_0_30px_#f7c94b30] transition-transform duration-700 group-hover:scale-110">
                  <div className="flex flex-col items-center">
                     <span className="text-[#f7c94b] font-bold text-lg leading-tight uppercase">Okai</span>
                     <span className="text-white/40 text-[10px]">Token</span>
                  </div>
               </div>

               {/* Soft central glow */}
               <div className="absolute w-64 h-64 bg-[#7c75ff]/10 blur-3xl rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Real-Time Insights (span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7 group rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden relative flex flex-col cursor-default pb-0"
          >
            <div className="p-8 pb-0 relative z-20">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Real-Time Price & Sentiment Insights</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-lg">
                Track live price movements blended with sentient agent reasoning. Make hyper-informed moves by visualizing both the charts and the "whys" behind them.
              </p>
            </div>
            
            {/* Visual SVG Line Chart matching reference image */}
            <div className="relative mt-8 h-64 overflow-hidden w-full flex items-end">
              {/* Tooltip mockup floating */}
              <div className="absolute top-10 right-20 bg-white/[0.05] border border-white/[0.1] backdrop-blur-md rounded-xl p-4 shadow-xl z-20 transition-all duration-500 group-hover:-translate-y-2 opacity-80 group-hover:opacity-100">
                 <div className="flex justify-between items-center gap-6 mb-2">
                   <span className="text-white/50 text-xs">Nov 10, 2026</span>
                   <span className="text-white/50 text-xs">14:00 GMT</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#2dd4a0]" />
                     <span className="text-white text-sm font-medium">Sentiment</span>
                   </div>
                   <div className="text-[#2dd4a0] text-sm font-mono">+12.4%</div>
                 </div>
                 <div className="flex items-center justify-between mt-2">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#7c75ff]" />
                     <span className="text-white text-sm font-medium">Price</span>
                   </div>
                   <div className="text-white/80 text-sm font-mono">$4,120</div>
                 </div>
              </div>

              {/* Chart container */}
              <div className="w-full h-full relative">
                 {/* Grid lines */}
                 <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-4">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-full h-px bg-white/[0.03]" />
                   ))}
                 </div>
                 
                 {/* Animated SVG Chart Line */}
                 <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 1000 200">
                   <defs>
                     <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#7c75ff" />
                       <stop offset="50%" stopColor="#2dd4a0" />
                       <stop offset="100%" stopColor="#f7c94b" />
                     </linearGradient>
                     <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="#2dd4a0" stopOpacity="0.15" />
                       <stop offset="100%" stopColor="#2dd4a0" stopOpacity="0" />
                     </linearGradient>
                   </defs>
                   
                   {/* Fill */}
                   <path 
                     d="M 0 150 Q 80 160 150 110 T 350 150 T 450 60 T 600 120 T 750 40 T 850 90 T 1000 30 L 1000 200 L 0 200 Z" 
                     fill="url(#chartFill)"
                     className="transition-opacity duration-1000 opacity-50 group-hover:opacity-100"
                   />
                   
                   {/* Main Stroke with dash animation */}
                   <path 
                     d="M 0 150 Q 80 160 150 110 T 350 150 T 450 60 T 600 120 T 750 40 T 850 90 T 1000 30" 
                     fill="none" 
                     stroke="url(#chartLineGrad)" 
                     strokeWidth="3"
                     strokeDasharray="2000"
                     strokeDashoffset="2000"
                     className="animate-[drawChart_4s_ease-out_forwards]"
                   />
                   
                   {/* Pointers/Dots */}
                   <circle cx="150" cy="110" r="4" fill="#0b0c12" stroke="#7c75ff" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s' }} />
                   <circle cx="450" cy="60" r="4" fill="#0b0c12" stroke="#2dd4a0" strokeWidth="2" className="animate-ping" style={{ animationDuration: '4s' }} />
                   <circle cx="750" cy="40" r="4" fill="#0b0c12" stroke="#f7c94b" strokeWidth="2" className="animate-ping" style={{ animationDuration: '5s' }} />
                 </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes drawChart {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
