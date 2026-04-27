"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiArrowRightLine, 
  RiMicroscopeLine, 
  RiLineChartLine, 
  RiShieldCheckLine 
} from "react-icons/ri";
import { AGENTS } from "@/lib/agents";

const getAgentIcon = (slug) => {
  if (slug === 'research') return RiMicroscopeLine;
  if (slug === 'market') return RiLineChartLine;
  if (slug === 'risk') return RiShieldCheckLine;
  return RiMicroscopeLine;
};

export default function MeetAgentsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row (Image Layout Style) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              The Intelligence Behind<br />Every Decision
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className="text-white/40 text-base leading-relaxed mb-6">
              Three specialized autonomous agents working in tandem to deliver comprehensive fundamental research, technical market analysis, and security risk assessment.
            </p>
            <Link 
              href="/arena" 
              className="flex items-center gap-2 text-white font-medium hover:text-[#7c75ff] transition-colors group text-sm uppercase tracking-widest"
            >
              Meet The Agents
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => {
            const Icon = getAgentIcon(agent.slug);
            
            return (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link href={`/agents/${agent.slug}`} className="block h-full">
                  <div className="relative h-full p-8 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden group bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:shadow-2xl hover:-translate-y-2">
                    
                    {/* Hover Gradient Overlay (Image style dark fill effect) */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                      style={{ 
                        background: `linear-gradient(180deg, ${agent.avatarColor}10 0%, transparent 100%)` 
                      }} 
                    />
                    
                    {/* Dark Metallic Core (Appears on Hover) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b26] to-[#0b0c12] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Premium Rounded Icon Box */}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg bg-white/[0.03] border border-white/[0.08]"
                           style={{ 
                             color: agent.avatarColor,
                             boxShadow: `inset 0 0 20px ${agent.avatarColor}10`
                           }}>
                        <Icon className="text-2xl drop-shadow-[0_0_10px_currentColor]" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight transition-colors duration-300">
                        {agent.name}
                      </h3>
                      
                      <p className="text-white/40 text-sm leading-relaxed flex-1 group-hover:text-white/60 transition-colors duration-300">
                        {agent.specialty}
                      </p>

                      <div className="mt-8 flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-300"
                           style={{ color: agent.avatarColor }}>
                        View Passport
                        <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
