"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function TravelingBottle() {
  const { scrollYProgress } = useScroll();

  // Opacity: hidden 0 to 0.79, fade in fully at 0.8 when canvas sequence finishes
  const opacity = useTransform(scrollYProgress, [0, 0.79, 0.8], [0, 0, 1]);

  // Movement Path
  // 0.8 (Canvas End): Start perfectly aligned in the center, scale=1
  // 0.85 (Section 1): Move to right side, scale=0.4
  // 0.92 (Section 2): Move to left side, scale=0.4
  // 0.98 (Section 3): Move to center, scale=0.5
  
  const x = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.92, 0.98, 1],
    ["0vw", "30vw", "-30vw", "0vw", "0vw"]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.92, 0.98, 1],
    [0, 5, -5, 0, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.92, 0.98, 1],
    [1, 0.35, 0.35, 0.45, 0.45]
  );

  // Keep vertically centered
  const y = useTransform(
    scrollYProgress,
    [0.8, 0.98, 1],
    ["0vh", "0vh", "0vh"]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      style={{ opacity, x, y, rotate, scale }}
      // We make the container exactly screen-sized
      className="pointer-events-none fixed inset-0 z-50 flex mix-blend-screen origin-center"
    >
      <img
        src="/images/sequence/ezgif-frame-192.jpg"
        alt="Prime Sequence Final Frame"
        // Use object-cover to match the exact mathematical rendering logic of HeroCanvas
        className="w-full h-full object-cover"
        style={{
          // Eliminates the rectangular background while keeping the bottle and splashes!
          maskImage: "radial-gradient(circle at center, black 25%, transparent 55%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 25%, transparent 55%)"
        }}
      />
    </motion.div>
  );
}
