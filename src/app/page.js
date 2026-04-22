"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiSwordLine,
  RiSearchLine,
  RiScales3Line,
  RiTrophyLine,
  RiArrowRightLine,
  RiFlashlightLine,
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AgentAvatar from "@/components/agents/AgentAvatar";
import AgentBadge from "@/components/agents/AgentBadge";
import { AGENTS } from "@/lib/agents";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const steps = [
  {
    icon: RiSearchLine,
    title: "Submit Query",
    desc: "Enter your crypto project, token, or investment question for analysis.",
    color: "#7c75ff",
  },
  {
    icon: RiScales3Line,
    title: "Compare Agents",
    desc: "Three AI agents analyze from different perspectives — side by side.",
    color: "#f7c94b",
  },
  {
    icon: RiTrophyLine,
    title: "Select Winner",
    desc: "Choose the most useful analysis. Agent reputation is updated live.",
    color: "#2dd4a0",
  },
];

export default function Home() {
  return (
    <AppShell>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#7c75ff]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#4a9eff]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-[#2dd4a0]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-white/60 mb-8">
                <RiFlashlightLine className="text-[#f7c94b]" />
                AI-Powered Crypto Intelligence
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Multi-Agent{" "}
              <span className="text-gradient">Crypto Analysis</span>
              <br />
              Arena
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Three specialized AI agents analyze your crypto investment from
              different perspectives. Compare results, pick the best insight,
              and build smarter decisions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/arena">
                <GradientButton size="lg" className="group">
                  <span className="flex items-center gap-2">
                    <RiSwordLine />
                    Start Analysis
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </GradientButton>
              </Link>
              <Link href="/leaderboard">
                <GradientButton variant="outline" size="lg">
                  <span className="flex items-center gap-2">
                    <RiTrophyLine />
                    View Leaderboard
                  </span>
                </GradientButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
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
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto">
              Three steps to smarter crypto investment decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <GlassCard className="text-center h-full relative overflow-hidden group">
                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03] font-mono">
                    0{i + 1}
                  </div>

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <step.icon
                      className="text-2xl"
                      style={{ color: step.color }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {step.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Agents ── */}
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

      {/* ── Bottom CTA ── */}
      <section className="py-20 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="relative overflow-hidden py-16 px-8">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c75ff]/5 via-transparent to-[#2dd4a0]/5 pointer-events-none" />

              <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
                Ready to <span className="text-gradient-gold">Analyze?</span>
              </h2>
              <p className="text-white/40 text-lg max-w-lg mx-auto mb-8 relative">
                Submit your first crypto analysis and let three AI agents
                compete for the best investment insight.
              </p>
              <Link href="/arena" className="relative inline-block">
                <GradientButton variant="gold" size="lg" className="group">
                  <span className="flex items-center gap-2">
                    <RiSwordLine />
                    Enter the Arena
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </GradientButton>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </AppShell>
  );
}
