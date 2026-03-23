"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 192;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 0.8], [1, FRAME_COUNT]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load images
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // ezgif-frame-001.jpg
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/images/sequence/ezgif-frame-${paddedIndex}.jpg`;
      images.push(img);
    }

    const render = (index: number) => {
      const img = images[index - 1];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);

      // Contain logic
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    // Initial render
    images[0].onload = () => render(1);

    // Update on scroll
    const unsubscribe = frameIndex.on("change", (latest) => {
      const currentFrame = Math.min(FRAME_COUNT, Math.max(1, Math.round(latest)));
      requestAnimationFrame(() => render(currentFrame));
    });

    // Handle resize
    const handleResize = () => {
      render(Math.min(FRAME_COUNT, Math.max(1, Math.round(frameIndex.get()))));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [frameIndex]);

  return (
    // Pacing container
    <div className="h-[1400vh] w-full relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-transparent">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
