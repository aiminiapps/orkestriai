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
            
            {/* Visual Canvas Mockup - Fixed Coordinate Grid */}
            <div className="mt-12 flex-1 w-full flex relative overflow-hidden items-center justify-center min-h-[300px]">
               {/* Subtle Dot Matrix Background */}
               <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)", backgroundSize: "20px 20px" }} />
               
               {/* Unified 600x300 Coordinate Space for Perfect Alignment */}
               <div className="relative w-[600px] h-[300px] scale-75 sm:scale-90 md:scale-100 origin-center pointer-events-none">
                 
                 {/* SVG Connecting Paths */}
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300">
                    {/* Center to Top-Left */}
                    <path d="M 300 150 C 210 150, 210 80, 140 80" fill="none" stroke="#7c75ff" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                    
                    {/* Center to Top-Right */}
                    <path d="M 300 150 C 390 150, 390 80, 460 80" fill="none" stroke="#2dd4a0" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_12s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Left */}
                    <path d="M 300 150 C 210 150, 210 220, 140 220" fill="none" stroke="#f7c94b" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_8s_linear_infinite_reverse]" opacity="0.4" />
                    
                    {/* Center to Bottom-Right */}
                    <path d="M 300 150 C 390 150, 390 220, 460 220" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" className="animate-[dash_10s_linear_infinite]" opacity="0.4" />
                 </svg>

                 {/* Nodes Overlay */}
                 
                 {/* Center Hub */}
                 <div className="absolute left-[300px] top-[150px] -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e1c2e] to-[#0b0c12] border border-[#7c75ff]/40 shadow-[0_0_30px_#7c75ff30] flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                   <RiNodeTree className="text-[#7c75ff] text-2xl" />
                 </div>

                 {/* Top-Left Content Card: Research */}
                 <div className="absolute left-[140px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#7c75ff] shadow-[0_0_8px_#7c75ff]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Research</span>
                    </div>
                    <div className="text-white/60 text-[9px] leading-relaxed">Cross-referencing whitepaper topology and tokenomics...</div>
                 </div>

                 {/* Top-Right Content Card: Sentiment */}
                 <div className="absolute left-[460px] top-[80px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4.5s_ease-in-out_infinite_2s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#2dd4a0] shadow-[0_0_8px_#2dd4a0]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Sentiment</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="bg-[#2dd4a0]/10 text-[#2dd4a0] px-1.5 py-0.5 rounded text-[9px] font-medium border border-[#2dd4a0]/20">BULLISH</span>
                      <span className="bg-white/5 text-white/50 px-1.5 py-0.5 rounded text-[9px]">98%</span>
                    </div>
                 </div>

                 {/* Bottom-Left Content Card: Market Data */}
                 <div className="absolute left-[140px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_5s_ease-in-out_infinite_1.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#f7c94b] shadow-[0_0_8px_#f7c94b]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Market</span>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-white/40 text-[9px]">24h Volume</span>
                      <span className="text-[#f7c94b] font-mono text-[10px]">$1.2B</span>
                    </div>
                 </div>

                 {/* Bottom-Right Content Card: Risk Eval */}
                 <div className="absolute left-[460px] top-[220px] -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] rounded-xl p-3 w-[150px] shadow-xl shadow-black/50 animate-[float_4s_ease-in-out_infinite_0.5s]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
                      <span className="text-white/80 text-[10px] font-mono uppercase tracking-wider">Risk Eval</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
                       <div className="bg-[#ef4444] h-full w-[15%]" />
                    </div>
                    <span className="text-white/50 text-[9px]">Low Contract Risk</span>
                 </div>

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
                      <div className="w-10 h-10 rounded-full bg-[#f3ba2f] flex justify-center items-center overflow-hidden shadow-[0_0_20px_#f3ba2f50]">
                         <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-6 h-6 object-contain" />
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
            <div className="absolute inset-0 top-32 flex items-center justify-center overflow-hidden pointer-events-none scale-90 sm:scale-100">
               {/* Ring 1: Outer (300px) */}
               <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]">
                  {/* SOL - Bottom Left */}
                  <div className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025" alt="SOL" className="w-full h-full object-contain" />
                  </div>
                  {/* MATIC - Bottom Right */}
                  <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025" alt="MATIC" className="w-full h-full object-contain" />
                  </div>
                  {/* ARB - Top Right */}
                  <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=025" alt="ARB" className="w-full h-full object-contain" />
                  </div>
                  {/* AVAX - Top Left */}
                  <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/[0.1] bg-[#0b0c12] p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_60s_linear_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=025" alt="AVAX" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 2: Middle (210px) */}
               <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-[#7c75ff]/30 animate-[spin_40s_linear_infinite_reverse]">
                  {/* ETH - Top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#7c75ff]/50 bg-[#1e1c2e] p-1.5 shadow-[0_0_15px_#7c75ff40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025" alt="ETH" className="w-full h-full object-contain" />
                  </div>
                  {/* BNB - Bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border border-[#f3ba2f]/50 bg-[#2a2414] p-1.5 shadow-[0_0_15px_#f3ba2f40] animate-[spin_40s_linear_infinite]">
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025" alt="BNB" className="w-full h-full object-contain" />
                  </div>
               </div>

               {/* Ring 3: Inner (120px) */}
               <div className="absolute w-[120px] h-[120px] rounded-full border border-dotted border-[#f7c94b]/40 animate-[spin_20s_ease-in-out_infinite]">
                  {/* BTC - Right */}
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#f7c94b]/50 bg-[#2a2414] p-1 shadow-[0_0_15px_#f7c94b40] animate-[spin_20s_ease-in-out_infinite_reverse]">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" className="w-full h-full object-contain" />
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
            
            {/* Card 4: Real-Time Intelligence Terminal Feed */}
            <div className="relative mt-8 min-h-[250px] overflow-hidden w-full flex items-end">
              {/* Terminal Frame */}
              <div className="w-full h-full absolute inset-0 bg-[#0b0c12]/80 backdrop-blur-xl border-t border-[#2dd4a0]/20 rounded-t-3xl shadow-[inset_0_20px_40px_rgba(45,212,160,0.05)] overflow-hidden">
                 
                 {/* Moving Code/Log Feed Effect */}
                 <div className="absolute inset-x-8 bottom-0 flex flex-col gap-3 pb-6">
                    
                    <motion.div 
                      className="w-full bg-[#2dd4a0]/10 border border-[#2dd4a0]/20 rounded-lg p-3 backdrop-blur-sm"
                      animate={{ y: [20, 0], opacity: [0, 1] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2dd4a0] animate-pulse" />
                        <span className="text-[#2dd4a0] text-[10px] font-mono tracking-wider uppercase">Market Sentinel</span>
                      </div>
                      <span className="text-white/80 text-xs font-mono">Whale accumulation detected on Binance orderbooks. Validating volume spike...</span>
                    </motion.div>

                    <motion.div 
                      className="w-full bg-[#7c75ff]/10 border border-[#7c75ff]/20 rounded-lg p-3 backdrop-blur-sm"
                      animate={{ y: [20, 0], opacity: [0, 1] }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7c75ff]" />
                        <span className="text-[#7c75ff] text-[10px] font-mono tracking-wider uppercase">Sentiment Engine</span>
                      </div>
                      <span className="text-white/80 text-xs font-mono">X/Twitter mention velocity up 400% in last 1hr. Dominant emotion: Bullish.</span>
                    </motion.div>

                    <motion.div 
                      className="w-3/4 bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 backdrop-blur-sm"
                      animate={{ y: [20, 0], opacity: [0, 0.4] }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <span className="text-white text-xs font-mono">Awaiting new blocks...</span>
                    </motion.div>

                 </div>
                 
                 {/* Top gradient fade-out to blend the text bubbling up */}
                 <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0b0c12] to-transparent z-10" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
