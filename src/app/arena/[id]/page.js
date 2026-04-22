"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCheckboxCircleLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiTrophyLine,
  RiSparklingLine,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AgentAvatar from "@/components/agents/AgentAvatar";
import AgentBadge from "@/components/agents/AgentBadge";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AGENT_MAP } from "@/lib/agents";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ComparisonPage({ params }) {
  const { id } = use(params);
  const [analysis, setAnalysis] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch(`/api/analyze/${id}`);
        if (res.ok) {
          const data = await res.json();
          setAnalysis(data.analysis);
          setResponses(data.responses);
          // Check if already voted
          const existingWinner = data.responses.find((r) => r.isWinner);
          if (existingWinner) {
            setWinner(existingWinner.agentSlug);
            setVoted(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch analysis:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [id]);

  const handleVote = async (agentSlug) => {
    if (voted || voting) return;
    setWinner(agentSlug);
    setVoting(true);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId: id, winnerAgentSlug: agentSlug }),
      });

      if (res.ok) {
        setVoted(true);
      } else {
        setWinner(null);
      }
    } catch (err) {
      console.error("Vote failed:", err);
      setWinner(null);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-white/40 text-sm">Loading analysis...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!analysis) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <GlassCard className="text-center max-w-md">
            <p className="text-white/60 mb-4">Analysis not found</p>
            <Link href="/arena">
              <GradientButton variant="outline" size="sm">
                <span className="flex items-center gap-2">
                  <RiArrowLeftLine />
                  Back to Arena
                </span>
              </GradientButton>
            </Link>
          </GlassCard>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/arena"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-4"
          >
            <RiArrowLeftLine />
            Back to Arena
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">
                Analysis: <span className="text-gradient">{analysis.token}</span>
              </h1>
              <p className="text-sm text-white/40 line-clamp-2">
                {analysis.question}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-white/30">
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                {analysis.category}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                {analysis.language}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Winner banner */}
        <AnimatePresence>
          {voted && winner && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#f7c94b]/10 to-[#f7c94b]/5 border border-[#f7c94b]/20">
                <RiTrophyLine className="text-[#f7c94b] text-xl" />
                <span className="text-sm font-medium text-[#f7c94b]">
                  Winner: {AGENT_MAP[winner]?.name}
                </span>
                <span className="text-xs text-white/30 ml-auto">
                  Vote recorded • Stats updated
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {responses.map((response, i) => {
            const agent = AGENT_MAP[response.agentSlug];
            if (!agent) return null;
            const isWinner = winner === response.agentSlug;

            return (
              <motion.div
                key={response.agentSlug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard
                  className={`h-full flex flex-col transition-all duration-500 ${
                    isWinner && voted ? "ring-2 ring-[#f7c94b]/40" : ""
                  }`}
                  glow={isWinner && voted ? "winner" : response.agentSlug}
                >
                  {/* Agent Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                    <AgentAvatar
                      slug={agent.slug}
                      emoji={agent.emoji}
                      color={agent.avatarColor}
                      size="md"
                      isWinner={isWinner && voted}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{agent.name}</h3>
                      <AgentBadge type={agent.type} color={agent.avatarColor} />
                    </div>
                    {response.responseMs > 0 && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-white/30">
                        <RiTimeLine />
                        {(response.responseMs / 1000).toFixed(1)}s
                      </div>
                    )}
                  </div>

                  {/* Response Content */}
                  <div className="flex-1 overflow-y-auto max-h-[500px] mb-4 pr-1">
                    <MarkdownRenderer content={response.content} />
                  </div>

                  {/* Vote Button */}
                  {!voted ? (
                    <GradientButton
                      variant={isWinner ? "gold" : "outline"}
                      size="md"
                      className="w-full mt-auto"
                      onClick={() => handleVote(response.agentSlug)}
                      disabled={voting}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {voting && isWinner ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <RiSparklingLine />
                            Select This Answer
                          </>
                        )}
                      </span>
                    </GradientButton>
                  ) : isWinner ? (
                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f7c94b]/10 text-[#f7c94b] text-sm font-medium">
                      <RiCheckboxCircleLine />
                      Winner Selected
                    </div>
                  ) : (
                    <div className="py-3 px-4 rounded-xl bg-white/[0.02] text-white/20 text-sm text-center">
                      Not selected
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
