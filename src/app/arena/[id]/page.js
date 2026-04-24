"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCheckboxCircleLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiTrophyLine,
  RiSparklingLine,
  RiMicroscopeLine,
  RiLineChartLine,
  RiShieldKeyholeLine,
} from "react-icons/ri";
import Link from "next/link";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AGENT_MAP } from "@/lib/agents";

// --- Node Architecture Constants ---
const CANVAS_SIZE = 4000;
const HUB_X = 1450;
const HUB_Y = 1850;
const HUB_W = 440;
const HUB_H = 300; 

const NODE_X = 2100;
const START_Y = 1250;
const GAP_Y = 500;
const NODE_W = 480;
const NODE_H = 460;

const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-[22px] h-[22px]" />,
  market: <RiLineChartLine className="w-[22px] h-[22px]" />,
  risk: <RiShieldKeyholeLine className="w-[22px] h-[22px]" />
};

// Reusable Local UI Components
const LuxuryContainer = ({ children, className = "", innerStyle = {} }) => (
  <div className={`rounded-2xl p-[1px] relative overflow-hidden bg-[#7c75ff]/20 shadow-[0_0_80px_-15px_rgba(124,117,255,0.15)] ${className}`}>
    <div className="bg-[#0b0c10] w-full h-full rounded-2xl p-7 relative z-10 pl-9" style={innerStyle}>
      <div 
        className="absolute left-0 top-0 w-6 h-full border-r border-[var(--pattern-fg)] pointer-events-none"
        style={{
          "--pattern-fg": "rgba(124, 117, 255, 0.2)",
          backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px"
        }}
      />
      <div className="pl-1 h-full flex flex-col">
        {children}
      </div>
    </div>
  </div>
);

const LuxuryButton = ({ children, disabled, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.02 }}
    whileTap={disabled ? {} : { scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className={`w-full relative rounded-xl overflow-hidden group ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_35px_-5px_rgba(124,117,255,0.6)]"} ${className}`}
  >
    <div 
      className="w-full h-full rounded-xl py-3.5 flex items-center justify-center font-bold text-white tracking-wide transition-all duration-500 relative z-10"
      style={{ background: 'linear-gradient(135deg, #8a84ff 0%, #7c75ff 50%, #5b54e5 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_10px_rgba(0,0,0,0.15)] pointer-events-none" />
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none" />
      <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] flex items-center gap-2">
        {children}
      </div>
    </div>
  </motion.button>
);

const drawLine = (startY, endY) => {
  const startX = HUB_X + HUB_W; 
  const endX = NODE_X; 
  const ctrlX1 = startX + (endX - startX) * 0.4;
  const ctrlX2 = startX + (endX - startX) * 0.6;
  return `M${startX},${startY} C${ctrlX1},${startY} ${ctrlX2},${endY} ${endX},${endY}`;
};

export default function InfiniteComparisonPage({ params }) {
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
      <div className="fixed inset-0 bg-[#0a0b12] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Loading Oracle Map...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="fixed inset-0 bg-[#0a0b12] flex items-center justify-center">
        <LuxuryContainer className="max-w-md text-center p-4">
          <p className="text-white/80 font-bold text-xl mb-2">Node Missing</p>
          <p className="text-white/50 mb-6">The requested analysis sector could not be located in the matrix.</p>
          <Link href="/arena" className="inline-block w-full">
            <LuxuryButton>
              <RiArrowLeftLine /> Return to Hub
            </LuxuryButton>
          </Link>
        </LuxuryContainer>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 117, 255, 0.4);
        }
      `}</style>
      
      {/* 1. Static HUD Layer */}
      <div className="fixed top-0 left-0 right-0 p-6 sm:p-8 z-50 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <Link href="/arena" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0a0b12]/60 backdrop-blur-3xl border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group font-mono text-sm uppercase tracking-widest">
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" /> Exit Map
          </Link>
        </div>
        
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="px-5 py-3 rounded-2xl bg-[#0a0b12]/60 backdrop-blur-3xl border border-[#7c75ff]/20 text-[#7c75ff] shadow-[0_10px_40px_-10px_rgba(124,117,255,0.15)] flex items-center gap-2">
            <RiCheckboxCircleLine className="text-xl" />
            <span className="text-sm font-bold tracking-widest uppercase">Orchestrator Online</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {voted && winner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#f7c94b]/15 to-[#f7c94b]/5 backdrop-blur-2xl border border-[#f7c94b]/40 shadow-[0_0_50px_-10px_rgba(247,201,75,0.4)]">
              <RiTrophyLine className="text-[#f7c94b] text-2xl" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#f7c94b] uppercase tracking-widest">
                  Signal Adopted: {AGENT_MAP[winner]?.name}
                </span>
                <span className="text-xs text-white/50 font-mono mt-0.5">
                  Path verified & locked via Oracle
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Infinite Canvas Layer */}
      <div className="fixed inset-0 bg-[#06070a] text-white overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing">
        
        <motion.div 
          drag
          dragConstraints={{ top: -1500, bottom: 1500, left: -1500, right: 1500 }}
          dragElastic={0.15}
          initial={{ x: "-50%", y: "-50%", opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2"
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            // Infinite Grid Canvas effect
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
            backgroundSize: "50px 50px",
            backgroundPosition: "center center"
          }}
        >
          {/* SVG Connection Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c75ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#2dd4a0" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="winnerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c75ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f7c94b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f7c94b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {responses.map((resp, i) => {
              const isWinnerNode = winner === resp.agentSlug;
              const isLoser = voted && !isWinnerNode;
              const startY = HUB_Y + HUB_H/2;
              const endY = START_Y + i * GAP_Y + NODE_H/2;
              
              return (
                <path 
                  key={resp.agentSlug}
                  d={drawLine(startY, endY)}
                  fill="none"
                  stroke={isWinnerNode ? "url(#winnerGrad)" : isLoser ? "rgba(255,255,255,0.03)" : "url(#lineGrad)"}
                  strokeWidth={isWinnerNode ? 5 : 2}
                  className={isWinnerNode ? "animate-pulse" : ""}
                  style={{ filter: isWinnerNode ? 'drop-shadow(0 0 15px rgba(247, 201, 75, 0.4))' : 'none' }}
                />
              );
            })}
          </svg>

          {/* Central Hub Node (Analysis Request) */}
          <div 
            className="absolute z-10"
            style={{ left: HUB_X, top: HUB_Y, width: HUB_W, height: HUB_H }}
            onPointerDownCapture={(e) => e.stopPropagation()}
            onPointerUpCapture={(e) => e.stopPropagation()}
          >
            <LuxuryContainer className="h-full shadow-[0_0_100px_-20px_rgba(124,117,255,0.2)]">
              <div className="flex items-center gap-3 text-xs text-[#7c75ff] font-bold uppercase tracking-widest mb-4">
                <RiSparklingLine className="text-xl" />
                Analysis Core Hub
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 text-white tracking-tight break-words pr-4">
                {analysis.token}
              </h2>
              {analysis.contractAddress && (
                <p className="text-white/40 font-mono text-xs mb-4 truncate pr-4">
                  Contract: {analysis.contractAddress}
                </p>
              )}
              <div className="text-white/60 text-[15px] mb-6 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.03] overflow-y-auto max-h-[80px] custom-scrollbar">
                {analysis.question}
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#4a9eff] uppercase tracking-wider mt-auto">
                <span className="px-3 py-1.5 rounded-lg bg-[#4a9eff]/10 border border-[#4a9eff]/20">{analysis.category}</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40">{analysis.language}</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40">{analysis.style}</span>
              </div>
            </LuxuryContainer>
          </div>

          {/* Agent Response Nodes */}
          {responses.map((resp, i) => {
            const agent = AGENT_MAP[resp.agentSlug];
            if (!agent) return null;
            const isWinnerNode = winner === resp.agentSlug;
            const isLoser = voted && !isWinnerNode;

            return (
              <div 
                key={resp.agentSlug}
                className={`absolute transition-all duration-700 z-10 ${isWinnerNode ? 'scale-[1.03] z-20' : isLoser ? 'opacity-40 grayscale-[40%] hover:opacity-80 hover:grayscale-0' : ''}`}
                style={{ left: NODE_X, top: START_Y + i * GAP_Y, width: NODE_W, height: NODE_H }}
              >
                <div className={`w-full h-full rounded-2xl p-[1px] relative shadow-2xl transition-all duration-500 overflow-hidden ${isWinnerNode ? 'bg-gradient-to-r from-[#f7c94b] to-[#f7c94b]/50 shadow-[0_0_60px_-10px_rgba(247,201,75,0.3)]' : 'bg-white/[0.04] hover:bg-white/[0.08]'}`}>
                  
                  <div className="h-full w-full bg-[#0a0b12]/95 rounded-2xl p-6 md:p-8 flex flex-col backdrop-blur-2xl">
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.04]">
                      <div 
                        className="w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors"
                        style={{
                          background: `linear-gradient(135deg, ${agent.avatarColor}20, ${agent.avatarColor}05)`,
                          border: `1px solid ${agent.avatarColor}40`,
                          color: agent.avatarColor
                        }}
                      >
                        {AGENT_ICONS[agent.slug]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[17px] text-white/95">{agent.name}</h3>
                        <p className="text-[11px] text-white/40 font-mono tracking-widest uppercase mt-1">{agent.type}</p>
                      </div>
                      {resp.responseMs > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/30 bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-white/[0.04]">
                          <RiTimeLine />
                          {(resp.responseMs / 1000).toFixed(1)}s
                        </div>
                      )}
                    </div>

                    {/* Content Frame */}
                    <div 
                      className="flex-1 overflow-y-auto mb-6 pr-4 custom-scrollbar text-[14px] leading-relaxed text-white/70"
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      onWheelCapture={(e) => e.stopPropagation()}
                    >
                      <MarkdownRenderer content={resp.content} />
                    </div>

                    {/* Interaction CTA */}
                    <div 
                      className="mt-auto pt-2 border-t border-transparent"
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      onPointerUpCapture={(e) => e.stopPropagation()}
                    >
                      {!voted ? (
                        <LuxuryButton onClick={() => handleVote(resp.agentSlug)} disabled={voting}>
                          {voting && winner === resp.agentSlug ? (
                            <>Locking Pathway...</>
                          ) : (
                            <>
                              <RiSparklingLine className="text-xl" /> Integrate Node Strategy
                            </>
                          )}
                        </LuxuryButton>
                      ) : isWinnerNode ? (
                        <div className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-gradient-to-r from-[#f7c94b]/20 to-[#f7c94b]/5 border border-[#f7c94b]/30 text-[#f7c94b] text-[15px] font-bold shadow-[0_0_20px_-5px_rgba(247,201,75,0.3)] tracking-wide">
                          <RiTrophyLine className="text-xl" /> Protocol Selected
                        </div>
                      ) : (
                        <div className="py-4 px-4 rounded-xl bg-white/[0.02] text-white/20 text-sm font-medium tracking-wide w-full text-center border border-white/[0.02]">
                          Dormant Sequence
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </motion.div>
      </div>
    </>
  );
}
