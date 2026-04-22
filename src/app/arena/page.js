"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  RiSendPlaneLine,
  RiCoinLine,
  RiQuestionLine,
  RiGlobalLine,
  RiFileTextLine,
  RiSearchLine,
} from "react-icons/ri";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AgentAvatar from "@/components/agents/AgentAvatar";
import { AGENTS, CATEGORIES, LANGUAGES, STYLES } from "@/lib/agents";
import useAnalysisStore from "@/stores/useAnalysisStore";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ArenaPage() {
  const router = useRouter();
  const { input, setInput, resetAnalysis } = useAnalysisStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.token.trim() || !input.question.trim()) return;

    setIsSubmitting(true);
    setError(null);
    resetAnalysis();

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      router.push(`/arena/${data.analysisId}`);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Analysis <span className="text-gradient">Arena</span>
            </h1>
            <p className="text-white/40">
              Submit your crypto question and let three AI agents compete to
              deliver the best analysis.
            </p>
          </motion.div>

          {/* Agent cards */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {AGENTS.map((agent) => (
              <GlassCard
                key={agent.slug}
                className="flex items-center gap-3 p-4"
                glow={agent.slug}
              >
                <AgentAvatar
                  slug={agent.slug}
                  emoji={agent.emoji}
                  color={agent.avatarColor}
                  size="sm"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">{agent.name}</p>
                  <p className="text-[11px] text-white/30 font-mono">
                    {agent.type}
                  </p>
                </div>
              </GlassCard>
            ))}
          </motion.div>

          {/* Input Form */}
          <motion.div variants={fadeUp} custom={2}>
            <form onSubmit={handleSubmit}>
              <GlassCard className="space-y-6">
                {/* Token Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    <RiCoinLine className="text-[#f7c94b]" />
                    Token / Project Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bitcoin, Ethereum, Solana..."
                    value={input.token}
                    onChange={(e) => setInput("token", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/50 focus:ring-1 focus:ring-[#7c75ff]/20 transition-all text-sm"
                    required
                  />
                </div>

                {/* Contract Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    <RiSearchLine className="text-[#4a9eff]" />
                    Contract Address (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={input.contractAddress}
                    onChange={(e) =>
                      setInput("contractAddress", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/50 focus:ring-1 focus:ring-[#7c75ff]/20 transition-all text-sm font-mono"
                  />
                </div>

                {/* Question */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    <RiQuestionLine className="text-[#7c75ff]" />
                    Analysis Question / Request *
                  </label>
                  <textarea
                    placeholder="e.g. Is this project attractive for short-term investment? What are the risks?"
                    value={input.question}
                    onChange={(e) => setInput("question", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#7c75ff]/50 focus:ring-1 focus:ring-[#7c75ff]/20 transition-all text-sm resize-none"
                    required
                  />
                </div>

                {/* Options Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                      <RiFileTextLine className="text-[#2dd4a0]" />
                      Category
                    </label>
                    <select
                      value={input.category}
                      onChange={(e) => setInput("category", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7c75ff]/50 transition-all text-sm appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          className="bg-[#0d0f1a] text-white"
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                      <RiGlobalLine className="text-[#4a9eff]" />
                      Language
                    </label>
                    <select
                      value={input.language}
                      onChange={(e) => setInput("language", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7c75ff]/50 transition-all text-sm appearance-none cursor-pointer"
                    >
                      {LANGUAGES.map((lang) => (
                        <option
                          key={lang}
                          value={lang}
                          className="bg-[#0d0f1a] text-white"
                        >
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                      <RiFileTextLine className="text-[#ff6b5b]" />
                      Style
                    </label>
                    <select
                      value={input.style}
                      onChange={(e) => setInput("style", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7c75ff]/50 transition-all text-sm appearance-none cursor-pointer"
                    >
                      {STYLES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-[#0d0f1a] text-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="px-4 py-3 rounded-xl bg-[#ff6b5b]/10 border border-[#ff6b5b]/20 text-[#ff6b5b] text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <GradientButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={
                    isSubmitting || !input.token.trim() || !input.question.trim()
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Dispatching to Agents...
                      </>
                    ) : (
                      <>
                        <RiSendPlaneLine />
                        Submit Analysis
                      </>
                    )}
                  </span>
                </GradientButton>
              </GlassCard>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
