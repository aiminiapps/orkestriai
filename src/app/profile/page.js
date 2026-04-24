"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  RiWallet3Line,
  RiHistoryLine,
  RiTrophyLine,
  RiArrowRightLine,
  RiLogoutBoxLine,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import AgentAvatar from "@/components/agents/AgentAvatar";
import { AGENT_MAP } from "@/lib/agents";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ProfilePage() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState({ total: 0, voted: 0 });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      setLoading(true);
      fetch(`/api/history?wallet=${encodeURIComponent(address)}&limit=8`)
        .then((res) => res.json())
        .then((data) => {
          setAnalyses(data.analyses || []);
          const totalAnalyses = data.pagination?.total || 0;
          const votedCount = (data.analyses || []).filter((a) =>
            a.responses?.some((r) => r.isWinner)
          ).length;
          setStats({ total: totalAnalyses, voted: votedCount });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [address, isConnected]);

  // Not connected state
  if (!isConnected) {
    return (
      <AppShell>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#7c75ff]/10 border border-[#7c75ff]/20 flex items-center justify-center mx-auto mb-6">
              <RiWallet3Line className="text-3xl text-[#7c75ff]" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Connect Your Wallet</h1>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Link your wallet to view your analysis history, track your votes,
              and build your on-chain identity.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7c75ff] to-[#5b54e5] text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RiWallet3Line />
              Connect Wallet
            </button>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Profile Header */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-6 sm:p-8 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c75ff] to-[#4a9eff] flex items-center justify-center text-2xl">
                🎭
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl font-bold mb-1">Your Profile</h1>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-sm font-mono text-white/50">
                    {truncatedAddress}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <RiCheckLine className="text-[#2dd4a0]" />
                    ) : (
                      <RiFileCopyLine />
                    )}
                  </button>
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <RiExternalLinkLine />
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => open({ view: "Account" })}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RiLogoutBoxLine />
                  Manage
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-5 text-center">
              <p className="text-2xl font-bold font-mono">{stats.total}</p>
              <p className="text-[11px] text-white/30 uppercase tracking-wider mt-1">
                Total Analyses
              </p>
            </div>
            <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-5 text-center">
              <p className="text-2xl font-bold font-mono text-[#f7c94b]">
                {stats.voted}
              </p>
              <p className="text-[11px] text-white/30 uppercase tracking-wider mt-1">
                Votes Cast
              </p>
            </div>
          </motion.div>

          {/* Recent Analyses */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                <RiHistoryLine className="text-[#7c75ff]" />
                Recent Analyses
              </h2>
              {analyses.length > 0 && (
                <Link
                  href="/history"
                  className="text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
                >
                  View All <RiArrowRightLine />
                </Link>
              )}
            </div>

            {loading ? (
              <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                <div className="w-5 h-5 border-2 border-white/10 border-t-white/50 rounded-full animate-spin mx-auto" />
              </div>
            ) : analyses.length === 0 ? (
              <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                <p className="text-white/30 text-sm mb-4">
                  No analyses yet.
                </p>
                <Link
                  href="/arena"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c75ff]/10 border border-[#7c75ff]/20 text-[#7c75ff] text-sm font-medium hover:bg-[#7c75ff]/15 transition-colors"
                >
                  Start First Analysis
                  <RiArrowRightLine />
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {analyses.map((analysis, i) => {
                  const winnerResponse = analysis.responses?.find(
                    (r) => r.isWinner
                  );
                  const winnerAgent = winnerResponse
                    ? AGENT_MAP[winnerResponse.agentSlug]
                    : null;

                  return (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link href={`/arena/${analysis.id}`}>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0b0c12] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer group">
                          <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-sm shrink-0">
                            🪙
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {analysis.token}
                            </p>
                            <p className="text-[11px] text-white/25 truncate">
                              {analysis.question}
                            </p>
                          </div>
                          {winnerAgent && (
                            <div className="hidden sm:flex items-center gap-1.5">
                              <AgentAvatar
                                slug={winnerAgent.slug}
                                emoji={winnerAgent.emoji}
                                color={winnerAgent.avatarColor}
                                size="sm"
                              />
                              <span className="text-[10px] text-[#f7c94b] font-mono">
                                ★
                              </span>
                            </div>
                          )}
                          <RiArrowRightLine className="text-white/15 group-hover:text-white/30 transition-colors shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
