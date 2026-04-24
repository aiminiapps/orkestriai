"use client";

import { useEffect, useState, use, useMemo } from "react";
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

// React Flow Libraries
import { 
  ReactFlow, 
  ReactFlowProvider, 
  Background, 
  Controls, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState, 
  useReactFlow 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

const AGENT_ICONS = {
  research: <RiMicroscopeLine className="w-[20px] h-[20px]" />,
  market: <RiLineChartLine className="w-[20px] h-[20px]" />,
  risk: <RiShieldKeyholeLine className="w-[20px] h-[20px]" />
};

/* =========================================================================
   1. LUXURY UI COMPONENTS
   ========================================================================= */

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
      className="w-full h-full rounded-xl py-3 flex items-center justify-center font-bold text-white tracking-wide transition-all duration-500 relative z-10"
      style={{ background: 'linear-gradient(135deg, #8a84ff 0%, #7c75ff 50%, #5b54e5 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_10px_rgba(0,0,0,0.15)] pointer-events-none" />
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none" />
      <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] flex items-center gap-2 text-sm">
        {children}
      </div>
    </div>
  </motion.button>
);

/* =========================================================================
   2. CUSTOM FLOW NODES
   ========================================================================= */

const HubNode = ({ data }) => {
  const { analysis } = data;
  return (
    <>
      <div className="w-[420px] rounded-2xl p-[1px] relative overflow-hidden bg-[#7c75ff]/20 shadow-[0_0_80px_-15px_rgba(124,117,255,0.2)] pb-4">
        <div className="bg-[#0b0c10] w-full h-full rounded-2xl p-7 relative z-10 pl-9">
          <div 
            className="absolute left-0 top-0 w-6 h-full border-r border-[var(--pattern-fg)] pointer-events-none"
            style={{
              "--pattern-fg": "rgba(124, 117, 255, 0.2)",
              backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px"
            }}
          />
          <div className="pl-2 flex flex-col">
            <div className="flex items-center gap-3 text-[11px] text-[#7c75ff] font-bold uppercase tracking-widest mb-4">
              <RiSparklingLine className="text-lg" />
              Intelligence Core Request
            </div>
            <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight break-words">
              {analysis.token}
            </h2>
            <div className="text-white/60 text-[14px] leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.03] mb-5">
              {analysis.question}
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#4a9eff] uppercase tracking-wider">
              <span className="px-3 py-1.5 rounded-md bg-[#4a9eff]/10 border border-[#4a9eff]/20">{analysis.category}</span>
            </div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0" />
    </>
  );
};

const AgentNode = ({ data }) => {
  const { agentSlug, responseMs, isWinnerNode, voted, isLoser, onVote, voting } = data;
  const agent = AGENT_MAP[agentSlug];

  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0" />
      <div className={`w-[360px] transition-all duration-700 z-10 ${isWinnerNode ? 'scale-[1.03]' : isLoser ? 'opacity-40 grayscale-[40%]' : ''}`}>
        <div className={`w-full rounded-2xl p-[1px] relative shadow-2xl transition-all duration-500 overflow-visible ${isWinnerNode ? 'bg-gradient-to-r from-[#f7c94b] to-[#f7c94b]/50 shadow-[0_0_60px_-10px_rgba(247,201,75,0.3)]' : 'bg-white/[0.04]'}`}>
          <div className="w-full bg-[#0a0b12]/95 rounded-2xl p-6 flex flex-col backdrop-blur-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div 
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-[0_0_20px_-5px_var(--glow)]"
                style={{
                  '--glow': agent.avatarColor,
                  background: `linear-gradient(135deg, ${agent.avatarColor}20, ${agent.avatarColor}05)`,
                  border: `1px solid ${agent.avatarColor}40`,
                  color: agent.avatarColor
                }}
              >
                {AGENT_ICONS[agentSlug]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[16px] text-white/95">{agent.name}</h3>
                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-0.5">{agent.type}</p>
              </div>
            </div>

            <div className="pt-2">
              {!voted ? (
                <LuxuryButton onClick={onVote} disabled={voting}>
                  {voting ? "Locking Pathway..." : <><RiCheckboxCircleLine className="text-lg" /> Select Agent Blueprint</>}
                </LuxuryButton>
              ) : isWinnerNode ? (
                <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#f7c94b]/20 to-[#f7c94b]/5 border border-[#f7c94b]/30 text-[#f7c94b] text-[13px] font-bold shadow-[0_0_20px_-5px_rgba(247,201,75,0.3)] tracking-widest uppercase">
                  <RiTrophyLine className="text-lg" /> Winning Protocol
                </div>
              ) : (
                <div className="py-3 px-4 rounded-xl bg-white/[0.02] text-white/20 text-[12px] font-medium tracking-wide w-full text-center border border-white/[0.02] uppercase">
                  Dormant Node
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0" />
    </>
  );
};

const SectionNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0" />
      <div className={`w-[450px] rounded-xl p-[1px] ${data.isWinnerNode ? 'bg-[#f7c94b]/30 shadow-[0_0_30px_-5px_rgba(247,201,75,0.15)]' : 'bg-white/[0.03]'} transition-colors duration-500`}>
        <div className="bg-[#0b0c13] p-6 rounded-xl border border-transparent flex flex-col shadow-2xl">
          <h4 className="text-[13px] font-extrabold text-white/90 mb-3 pb-3 border-b border-white/[0.05] tracking-wide uppercase">{data.title}</h4>
          <div className="text-[14px] leading-relaxed text-white/60 max-h-[300px] overflow-y-auto custom-scrollbar pr-3 nodrag nowheel font-light">
            <MarkdownRenderer content={data.content} />
          </div>
        </div>
      </div>
    </>
  );
};

/* =========================================================================
   3. DATA PARSING & LAYOUT ALGORITHM
   ========================================================================= */

const parseMarkdownNodes = (markdownText) => {
  const tokens = markdownText.split(/(?=^##\s)/gm);
  const sections = [];
  
  tokens.forEach((token) => {
    if (!token.startsWith('##')) {
       if (token.trim().length > 0) {
          sections.push({ title: 'Overview Context', content: token.trim() });
       }
       return;
    }
    const lines = token.split('\n');
    const title = lines[0].replace('##', '').trim();
    const content = lines.slice(1).join('\n').trim();
    
    if (content.length > 0) {
       sections.push({ title, content });
    }
  });
  return sections;
};

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Arrange tree from Left to Right with generous spacing
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 220, nodesep: 150 });

  nodes.forEach((node) => {
    let w = 440, h = 300;
    if (node.type === 'agent') { w = 360; h = 180; }
    if (node.type === 'section') { w = 450; h = 400; }
    dagreGraph.setNode(node.id, { width: w, height: h });
  });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

/* =========================================================================
   4. CONTENT FLOW MAP CANVAS COMPONENT
   ========================================================================= */

const FlowMapCanvas = ({ analysis, responses, winner, handleVote, voting, voted }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = useMemo(() => ({ hub: HubNode, agent: AgentNode, section: SectionNode }), []);

  useEffect(() => {
    const newNodes = [];
    const newEdges = [];

    // Root Query Node
    newNodes.push({
      id: 'hub',
      type: 'hub',
      data: { analysis },
    });

    responses.forEach(resp => {
      const agentId = resp.agentSlug;
      const isWinnerNode = winner === agentId;
      
      // Agent Intermediary Node
      newNodes.push({
        id: `agent-${agentId}`,
        type: 'agent',
        data: { 
          agentSlug: agentId, 
          responseMs: resp.responseMs,
          isWinnerNode,
          voted,
          isLoser: voted && !isWinnerNode,
          onVote: () => handleVote(agentId),
          voting: voting && (winner === agentId)
        },
      });

      newEdges.push({
        id: `edge-hub-${agentId}`,
        source: 'hub',
        target: `agent-${agentId}`,
        type: 'default', // Smooth curve
        animated: isWinnerNode,
        style: { stroke: isWinnerNode ? '#f7c94b' : 'rgba(124,117,255,0.4)', strokeWidth: isWinnerNode ? 4 : 2 },
      });

      // Split Markdown Content into Sub-Nodes
      const sections = parseMarkdownNodes(resp.content);
      sections.forEach((sec, idx) => {
        const secId = `section-${agentId}-${idx}`;
        newNodes.push({
          id: secId,
          type: 'section',
          data: { title: sec.title, content: sec.content, isWinnerNode },
        });
        
        newEdges.push({
          id: `edge-${agentId}-${secId}`,
          source: `agent-${agentId}`,
          target: secId,
          type: 'default',
          animated: isWinnerNode,
          style: { stroke: isWinnerNode ? 'rgba(247,201,75,0.4)' : 'rgba(255,255,255,0.06)', strokeWidth: 2 },
        });
      });
    });

    // Compute automatic perfect layout geometry via Dagre
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Zoom and pan gracefully to frame the layout on load
    setTimeout(() => {
      fitView({ padding: 0.1, duration: 1500 });
    }, 100);
    
  }, [analysis, responses, winner, voted, voting, handleVote, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      fitView
      minZoom={0.05}
      maxZoom={1.2}
      className="bg-[#050608]"
    >
      <Background color="rgba(255,255,255,0.03)" size={1} gap={40} />
      <Controls 
        className="!bg-[#0b0c10] !border !border-white/5 !fill-white !rounded-xl !shadow-2xl overflow-hidden [&>button]:!bg-[#0a0b12] hover:[&>button]:!bg-white/10 [&>button]:!border-white/5" 
        showInteractive={false}
      />
    </ReactFlow>
  );
};

/* =========================================================================
   5. PAGE WRAPPER & LOGIC
   ========================================================================= */

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
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Connecting to Database...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="fixed inset-0 bg-[#0a0b12] flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-white/80 font-bold text-xl mb-2">Node Missing</p>
          <p className="text-white/50 mb-6">The requested analysis sector could not be located in the matrix.</p>
          <Link href="/arena" className="inline-block w-full">
             <div className="px-6 py-3 bg-white/10 rounded-xl text-white">Return Home</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050608] w-screen h-screen overflow-hidden">
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
        /* Prevents standard text scrolling from scrolling the canvas */
        .react-flow__node {
          cursor: default;
        }
      `}</style>

      {/* Static Nav HUD Layer */}
      <div className="absolute top-0 left-0 right-0 p-6 sm:p-8 z-50 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <Link href="/arena" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0a0b12]/90 backdrop-blur-3xl border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group font-mono text-[11px] uppercase tracking-widest font-bold">
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" /> Exit Map Workspace
          </Link>
        </div>
        
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="px-5 py-3 rounded-2xl bg-[#0a0b12]/90 backdrop-blur-3xl border border-[#7c75ff]/20 text-[#7c75ff] shadow-[0_10px_40px_-10px_rgba(124,117,255,0.15)] flex items-center gap-2">
            <RiCheckboxCircleLine className="text-xl" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Content Flow Online</span>
          </div>

          <AnimatePresence>
            {voted && winner && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#f7c94b]/10 backdrop-blur-2xl border border-[#f7c94b]/30 shadow-[0_0_30px_-5px_rgba(247,201,75,0.2)]">
                  <RiTrophyLine className="text-[#f7c94b] text-xl" />
                  <span className="text-[11px] font-bold text-[#f7c94b] uppercase tracking-widest">
                    {AGENT_MAP[winner]?.name} Active
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Render The Immersive Map */}
      <ReactFlowProvider>
        <FlowMapCanvas
          analysis={analysis}
          responses={responses}
          winner={winner}
          handleVote={handleVote}
          voting={voting}
          voted={voted}
        />
      </ReactFlowProvider>

    </div>
  );
}
