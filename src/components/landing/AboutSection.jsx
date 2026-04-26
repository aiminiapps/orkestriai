"use client";

import { motion } from "framer-motion";
import { RiEarthLine } from "react-icons/ri";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// TopoJSON map data
const geoUrl = "/features.json";

// Major hub coordinates for the network map
const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128], color: "#7c75ff" },
  { name: "London", coordinates: [-0.1276, 51.5072], color: "#2dd4a0" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], color: "#f7c94b" },
  { name: "Singapore", coordinates: [103.8198, 1.3521], color: "#7c75ff" },
  { name: "Dubai", coordinates: [55.2708, 25.2048], color: "#2dd4a0" },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], color: "#f7c94b" },
];

// Arcs connecting the hubs
const lines = [
  { from: [-74.006, 40.7128], to: [-0.1276, 51.5072] },     // NY -> London
  { from: [-0.1276, 51.5072], to: [55.2708, 25.2048] },     // London -> Dubai
  { from: [55.2708, 25.2048], to: [103.8198, 1.3521] },     // Dubai -> Singapore
  { from: [103.8198, 1.3521], to: [139.6917, 35.6895] },    // Singapore -> Tokyo
  { from: [139.6917, 35.6895], to: [-122.4194, 37.7749] },  // Tokyo -> SF
  { from: [-122.4194, 37.7749], to: [-74.006, 40.7128] },   // SF -> NY
  { from: [-0.1276, 51.5072], to: [103.8198, 1.3521] }      // London -> Singapore
];

export default function AboutSection() {
  const stats = [
    { value: "50K+", label: "Analyses Generated" },
    { value: "3", label: "Specialized AI Models" },
    { value: "100%", label: "Real-time Market Data" },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Orbs to blend with the project theme */}
      <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] bg-[#7c75ff]/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-[#2dd4a0]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Top Badge matching the image style */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <RiEarthLine className="text-white/60" />
                <span className="text-xs font-semibold text-white/70 tracking-wide uppercase">
                  Global Intelligence Network
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              variants={fadeUp} 
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-white"
            >
              Analyze Your Next Crypto Move with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c75ff] to-[#4a9eff]">
                Machine Precision
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeUp} 
              custom={2}
              className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed mb-12 font-light"
            >
              Instead of relying on biased influencers, harness our autonomous network 
              of AI agents. They instantly cross-examine token fundamentals, technical 
              action, and market sentiment to give you total investment clarity.
            </motion.p>

            {/* Stats Area (Stacked exactly like the reference image) */}
            <motion.div variants={fadeUp} custom={3} className="space-y-6 max-w-lg">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="text-4xl sm:text-5xl font-mono font-medium text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-white/40 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  {/* Subtle Separator border */}
                  {i !== stats.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Graphic Area (A premium 2D Dot Map with Network Connections) */}
          <motion.div 
            className="flex-1 w-full relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full relative" style={{ mixBlendMode: "screen" }}>
              
              {/* Soft background glow for the map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#7c75ff]/10 rounded-full blur-[80px]" />

              <ComposableMap
                projection="geoEquirectangular"
                projectionConfig={{ scale: 180, center: [0, 10] }}
                className="w-full h-full object-contain"
              >
                {/* Custom Dot Pattern Definition */}
                <defs>
                  <pattern id="dotPattern" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1" fill="#ffffff" opacity="0.15" />
                  </pattern>
                </defs>

                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        // Use the dot pattern to fill the countries, creating the "Dot Map" effect
                        fill="url(#dotPattern)"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Animated Connecting Arcs */}
                {lines.map((line, i) => (
                  <Line
                    key={`line-${i}`}
                    from={line.from}
                    to={line.to}
                    stroke="rgba(124, 117, 255, 0.3)"
                    strokeWidth={1}
                    strokeLinecap="round"
                    className={`animated-arc-${i % 2 === 0 ? 'fast' : 'slow'}`}
                  />
                ))}

                {/* Active Hub Markers */}
                {markers.map(({ name, coordinates, color }) => (
                  <Marker key={name} coordinates={coordinates}>
                    {/* Glowing outer ring */}
                    <circle r={8} fill={color} opacity="0.2" className="animate-ping" style={{ animationDuration: "3s" }} />
                    <circle r={4} fill={color} opacity="0.4" />
                    {/* Solid inner core */}
                    <circle r={2} fill="#ffffff" />
                  </Marker>
                ))}
              </ComposableMap>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Global styles for the SVG map animations */}
      <style jsx global>{`
        .animated-arc-fast {
          stroke-dasharray: 4 8;
          animation: map-dash-fast 10s linear infinite;
        }
        .animated-arc-slow {
          stroke-dasharray: 5 10;
          animation: map-dash-slow 15s linear infinite;
        }
        @keyframes map-dash-fast {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes map-dash-slow {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
