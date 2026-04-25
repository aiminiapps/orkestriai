"use client";

import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiScales3Line,
  RiTrophyLine,
} from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard";

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

export default function HowItWorksSection() {
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
  );
}
