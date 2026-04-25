"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  RiWallet3Line,
  RiHistoryLine,
  RiArrowRightLine,
  RiLogoutBoxLine,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
  RiCoinLine,
  RiSwordLine,
  RiCheckboxCircleLine,
  RiArrowLeftRightLine,
  RiTimeLine,
  RiSparklingLine,
} from "react-icons/ri";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

/* ─── Seed-Based Avatar Generator ─── */
function SeedAvatar({ address, size = 80 }) {
  const colors = useMemo(() => {
    if (!address) return ["#7c75ff", "#4a9eff", "#2dd4a0", "#f7c94b"];
    const seed = address.toLowerCase();
    const palette = [];
    for (let i = 0; i < 4; i++) {
      const slice = seed.slice(2 + i * 8, 10 + i * 8);
      const hue = parseInt(slice, 16) % 360;
      palette.push(`hsl(${hue}, 70%, 60%)`);
    }
    return palette;
  }, [address]);

  const shapes = useMemo(() => {
    if (!address) return [];
    const seed = address.toLowerCase();
    const items = [];
    for (let i = 0; i < 6; i++) {
      const hex = seed.slice(2 + i * 6, 8 + i * 6);
      const val = parseInt(hex, 16);
      items.push({
        x: (val % 80) + 10,
        y: ((val >> 8) % 80) + 10,
        r: (val % 15) + 8,
        color: colors[val % colors.length],
        opacity: 0.3 + (val % 50) / 100,
      });
    }
    return items;
  }, [address, colors]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="rounded-2xl"
      style={{ background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1]}10)` }}
    >
      {shapes.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.color}
          opacity={s.opacity}
        />
      ))}
      {/* Center ring */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke={colors[0]}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle
        cx="50"
        cy="50"
        r="12"
        fill={colors[0]}
        opacity="0.25"
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ─── Reward Log Item ─── */
function RewardLogItem({ log }) {
  const icons = {
    analysis: <RiSwordLine className="text-[#7c75ff]" />,
    vote: <RiCheckboxCircleLine className="text-[#f7c94b]" />,
    compare: <RiArrowLeftRightLine className="text-[#2dd4a0]" />,
  };
  const labels = {
    analysis: "Analysis Reward",
    vote: "Vote Reward",
    compare: "Compare Reward",
  };

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-xs">
        {icons[log.action] || <RiCoinLine />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-white/70">
          {labels[log.action] || log.action}
        </p>
        <p className="text-[10px] text-white/20 font-mono">
          {new Date(log.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <span className="text-xs font-bold font-mono text-[#f7c94b]">
        +{log.amount} OKAI
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [rewards, setRewards] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

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

      // Fetch rewards
      fetch(`/api/rewards?wallet=${encodeURIComponent(address)}`)
        .then((r) => r.json())
        .then((data) => setRewards(data))
        .catch(console.error);

      // Fetch history
      fetch(`/api/history?wallet=${encodeURIComponent(address)}&limit=8`)
        .then((r) => r.json())
        .then((data) => setAnalyses(data.analyses || []))
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
            <h1 className="text-2xl font-bold mb-3 tracking-tight">Connect Your Wallet</h1>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-light">
              Link your BNB wallet to start earning OKAI tokens, track your
              analysis history, and build your on-chain reputation.
            </p>
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7c75ff] to-[#5b54e5] text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RiWallet3Line />
              Connect Wallet
            </button>

            {/* Reward rate cards */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              {[
                { action: "Analysis", amount: 30, icon: RiSwordLine, color: "#7c75ff" },
                { action: "Compare", amount: 20, icon: RiArrowLeftRightLine, color: "#2dd4a0" },
                { action: "Vote", amount: 10, icon: RiCheckboxCircleLine, color: "#f7c94b" },
              ].map((r) => (
                <div
                  key={r.action}
                  className="rounded-xl bg-[#0b0c12] border border-white/[0.06] p-4"
                >
                  <r.icon className="text-lg mb-2 mx-auto" style={{ color: r.color }} />
                  <p className="text-sm font-bold font-mono">{r.amount}</p>
                  <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5">
                    OKAI / {r.action}
                  </p>
                </div>
              ))}
            </div>
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
          {/* ─── Profile Header Card ─── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden mb-6"
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#7c75ff] via-[#4a9eff] to-[#2dd4a0]" />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Seed Avatar */}
                <SeedAvatar address={address} size={72} />

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                    <span className="text-lg font-bold font-mono tracking-tight">
                      {truncatedAddress}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="text-white/25 hover:text-white/50 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <RiCheckLine className="text-[#2dd4a0]" />
                      ) : (
                        <RiFileCopyLine />
                      )}
                    </button>
                    <a
                      href={`https://bscscan.com/address/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/25 hover:text-white/50 transition-colors"
                    >
                      <RiExternalLinkLine />
                    </a>
                  </div>
                  <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
                    BNB Smart Chain
                  </p>
                </div>

                <button
                  onClick={() => open({ view: "Account" })}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white/40 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RiLogoutBoxLine />
                  Manage
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── OKAI Balance Card ─── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-2xl bg-[#0b0c12] border border-[#f7c94b]/15 overflow-hidden mb-6"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold mb-1">
                    OKAI Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-[#f7c94b]">
                      {rewards?.balance?.toLocaleString() || "0"}
                    </span>
                    <span className="text-sm text-[#f7c94b]/50 font-bold">OKAI</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#f7c94b]/8 border border-[#f7c94b]/20 flex items-center justify-center">
                  <RiCoinLine className="text-2xl text-[#f7c94b]" />
                </div>
              </div>

              {/* Earnings breakdown */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Analyses",
                    count: rewards?.analysisCount || 0,
                    earned: (rewards?.analysisCount || 0) * 30,
                    icon: RiSwordLine,
                    color: "#7c75ff",
                  },
                  {
                    label: "Compares",
                    count: rewards?.compareCount || 0,
                    earned: (rewards?.compareCount || 0) * 20,
                    icon: RiArrowLeftRightLine,
                    color: "#2dd4a0",
                  },
                  {
                    label: "Votes",
                    count: rewards?.voteCount || 0,
                    earned: (rewards?.voteCount || 0) * 10,
                    icon: RiCheckboxCircleLine,
                    color: "#f7c94b",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5"
                  >
                    <stat.icon
                      className="text-sm mb-2"
                      style={{ color: stat.color }}
                    />
                    <p className="text-lg font-bold font-mono">{stat.count}</p>
                    <p className="text-[9px] text-white/25 uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Tabs ─── */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="flex items-center gap-1 mb-4 bg-[#0b0c12] rounded-xl p-1 border border-white/[0.06]">
              {[
                { key: "activity", label: "History", icon: RiHistoryLine },
                { key: "rewards", label: "Rewards Log", icon: RiSparklingLine },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-white/[0.06] text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Activity tab */}
            <AnimatePresence mode="wait">
              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {loading ? (
                    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                      <div className="w-5 h-5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin mx-auto" />
                    </div>
                  ) : analyses.length === 0 ? (
                    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] p-12 text-center">
                      <RiSwordLine className="text-2xl text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm mb-4">
                        No analyses yet
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
                      {analyses.map((analysis, i) => (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={`/arena/${analysis.id}`}>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0b0c12] border border-white/[0.06] hover:border-white/[0.1] transition-colors cursor-pointer group">
                              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                                <RiCoinLine className="text-[#f7c94b] text-sm" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {analysis.token}
                                </p>
                                <p className="text-[11px] text-white/20 truncate">
                                  {analysis.question}
                                </p>
                              </div>
                              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#f7c94b]/50">
                                +30 OKAI
                              </div>
                              <RiArrowRightLine className="text-white/10 group-hover:text-white/25 transition-colors shrink-0" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      {analyses.length > 0 && (
                        <Link
                          href="/history"
                          className="flex items-center justify-center gap-1.5 py-3 text-xs text-white/25 hover:text-white/40 transition-colors"
                        >
                          View All History <RiArrowRightLine />
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Rewards Log tab */}
              {activeTab === "rewards" && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.06] overflow-hidden">
                    {rewards?.recentLogs?.length > 0 ? (
                      <div className="divide-y divide-white/[0.03] px-4">
                        {rewards.recentLogs.map((log) => (
                          <RewardLogItem key={log.id} log={log} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <RiSparklingLine className="text-2xl text-white/10 mx-auto mb-3" />
                        <p className="text-white/25 text-sm">
                          No rewards earned yet
                        </p>
                        <p className="text-[11px] text-white/15 mt-1">
                          Run an analysis to earn your first OKAI
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
