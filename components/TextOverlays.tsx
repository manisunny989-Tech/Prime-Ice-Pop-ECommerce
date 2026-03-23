"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { productData } from "../data/product";

export default function TextOverlays() {
  const { scrollYProgress } = useScroll();

  // Sequence is first 80% of total scroll. We have 4 sections.
  // We can stagger them evenly between 0 and 0.8.
  // 1: 0.00 - 0.20
  // 2: 0.20 - 0.40
  // 3: 0.40 - 0.60
  // 4: 0.60 - 0.80

  const layouts = [
    { container: "items-end md:pr-24 lg:pr-32 text-right", inner: "items-end" }, // Right
    { container: "items-center text-center", inner: "items-center" },            // Center
    { container: "items-start md:pl-24 lg:pl-32 text-left", inner: "items-start" },// Left
    { container: "items-center text-center", inner: "items-center" }             // Center
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Subtle radial gradient for mobile readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] md:hidden"></div>
      {productData.storySections.map((section, i) => {
        const start = i * 0.2;
        const middle = start + 0.1;
        const end = start + 0.2;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(
          scrollYProgress,
          [start, start + 0.02, end - 0.02, end],
          [0, 1, 1, 0]
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(
          scrollYProgress,
          [start, start + 0.05, end - 0.05, end],
          [30, 0, 0, -30]
        );

        const currentLayout = layouts[i % layouts.length];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center px-8 ${currentLayout.container}`}
          >
            <div className={`max-w-xl lg:max-w-3xl flex flex-col ${currentLayout.inner}`}>
              <h1 className="font-bebas text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-wider text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-[0.9] mb-4 md:mb-6">
                {section.title}
              </h1>
              <p className="text-white/90 font-inter text-lg md:text-2xl font-light tracking-wide drop-shadow-md leading-relaxed max-w-lg">
                {section.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
