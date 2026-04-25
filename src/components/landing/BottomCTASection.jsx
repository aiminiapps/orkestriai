"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiSwordLine, RiArrowRightLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";

export default function BottomCTASection() {
  return (
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
  );
}
