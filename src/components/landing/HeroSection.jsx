"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiSwordLine,
  RiTrophyLine,
  RiArrowRightLine,
  RiFlashlightLine,
} from "react-icons/ri";
import GradientButton from "@/components/ui/GradientButton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroSection() {
  return (
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
  );
}
