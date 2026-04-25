"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard";
import AgentAvatar from "@/components/agents/AgentAvatar";
import AgentBadge from "@/components/agents/AgentBadge";
import { AGENTS } from "@/lib/agents";

export default function MeetAgentsSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet the <span className="text-gradient">Agents</span>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            Three perspectives. One investment decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={`/agents/${agent.slug}`}>
                <GlassCard
                  className="h-full group cursor-pointer"
                  glow={agent.slug}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <AgentAvatar
                      slug={agent.slug}
                      emoji={agent.emoji}
                      color={agent.avatarColor}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1">
                        {agent.name}
                      </h3>
                      <AgentBadge
                        type={agent.type}
                        color={agent.avatarColor}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-4">
                    {agent.specialty}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors">
                    View Passport
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
