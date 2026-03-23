"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import TextOverlays from "@/components/TextOverlays";
import TravelingBottle from "@/components/TravelingBottle";
import PostSequenceContent from "@/components/PostSequenceContent";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Background color transitions from Blue to a darker Red across the scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#0072BC", "#8A050B"] // Darker red for readability
  );

  return (
    <motion.main
      style={{ backgroundColor }}
      className="relative min-h-screen w-full transition-colors duration-100 ease-linear"
    >
      <Navbar />

      {/* Phase 1: The Sequence */}
      <HeroCanvas />
      <TextOverlays />

      {/* Phase 2: The Journey Connector */}
      <TravelingBottle />

      {/* Content wrapper */}
      <div className="relative z-10 bg-transparent">
        <PostSequenceContent />
        <ProductsSection />
      </div>
    </motion.main>
  );
}
