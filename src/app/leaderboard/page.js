"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RiTrophyLine,
  RiMedalLine,
  RiTimeLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiSortDesc,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import GlassCard from "@/components/ui/GlassCard";
import AgentAvatar from "@/components/agents/AgentAvatar";
import AgentBadge from "@/components/agents/AgentBadge";
import ScoreBar from "@/components/ui/ScoreBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AGENT_MAP } from "@/lib/agents";

const rankColors = {
  1: "#f7c94b",
  2: "#c0c0c0",
  3: "#cd7f32",
};

const sortOptions = [
  { key: "wins", label: "Total Wins" },
  { key: "winRate", label: "Win Rate" },
  { key: "score", label: "Avg Score" },
  { key: "speed", label: "Fastest" },
];

export default function LeaderboardPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("wins");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`/api/leaderboard?sort=${sortBy}`);
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch (err) {
        console.error("Leaderboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [sortBy]);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Agent <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-white/40">
            Ranked by performance across all analyses.
          </p>
        </motion.div>

        {/* Sort Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-6 overflow-x-auto pb-2"
        >
          <RiSortDesc className="text-white/30 shrink-0" />
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                sortBy === opt.key
                  ? "bg-white/[0.08] text-white border border-white/[0.12]"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Rankings */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : agents.length === 0 ? (
          <GlassCard className="text-center py-16">
            <RiTrophyLine className="text-4xl text-white/20 mx-auto mb-4" />
            <p className="text-white/40">
              No analyses completed yet. Rankings will appear after the first
              vote.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {agents.map((agent, i) => {
              const agentData = AGENT_MAP[agent.slug];
              const rankColor = rankColors[agent.rank];

              return (
                <motion.div
                  key={agent.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  layout
                >
                  <Link href={`/agents/${agent.slug}`}>
                    <GlassCard
                      className="flex items-center gap-4 sm:gap-6 p-5 cursor-pointer group"
                      glow={agent.rank === 1 ? agent.slug : undefined}
                    >
                      {/* Rank */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold font-mono shrink-0"
                        style={{
                          background: rankColor
                            ? `${rankColor}15`
                            : "rgba(255,255,255,0.04)",
                          color: rankColor || "rgba(255,255,255,0.3)",
                          border: `1px solid ${
                            rankColor ? `${rankColor}30` : "rgba(255,255,255,0.06)"
                          }`,
                        }}
                      >
                        {agent.rank}
                      </div>

                      {/* Agent Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <AgentAvatar
                          slug={agent.slug}
                          emoji={agent.emoji}
                          color={agent.avatarColor}
                          size="md"
                          isWinner={agent.rank === 1}
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm group-hover:text-white transition-colors">
                            {agent.name}
                          </h3>
                          <AgentBadge
                            type={agent.type}
                            color={agent.avatarColor}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden sm:flex items-center gap-6 text-center">
                        <div>
                          <p className="text-lg font-bold font-mono">
                            {agent.totalWins}
                          </p>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">
                            Wins
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold font-mono">
                            {agent.winRate.toFixed(1)}%
                          </p>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">
                            Win Rate
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold font-mono">
                            {agent.avgScore.toFixed(1)}
                          </p>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">
                            Avg Score
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-bold font-mono">
                            {agent.avgResponseMs > 0
                              ? `${(agent.avgResponseMs / 1000).toFixed(1)}s`
                              : "—"}
                          </p>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">
                            Avg Time
                          </p>
                        </div>
                      </div>

                      {/* Mobile stats */}
                      <div className="sm:hidden text-right">
                        <p
                          className="text-lg font-bold font-mono"
                          style={{ color: agent.avatarColor }}
                        >
                          {agent.totalWins}
                        </p>
                        <p className="text-[10px] text-white/30">wins</p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
