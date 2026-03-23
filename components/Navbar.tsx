"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { productData } from "../data/product";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(10px)"]);
  
  const [user, setUser] = useState<{ email: string } | null>(null);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <motion.nav
      style={{
        backgroundColor: `rgba(0,0,0, ${bgOpacity.get()})`,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300"
    >
      <Link href="/" className="font-bebas text-3xl font-bold tracking-wider text-white hover:text-white/80 transition-colors">
        PRIME
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <Link href="/dashboard" className="hidden sm:block rounded-full border border-white/20 bg-transparent px-6 py-2 font-bebas text-lg tracking-wider text-white transition-all hover:bg-white hover:text-black">
            DASHBOARD
          </Link>
        ) : (
          <Link href="/login" className="hidden sm:block rounded-full border border-white px-6 py-2 font-bebas text-lg tracking-wider text-white transition-all hover:bg-white hover:text-black">
            SIGN IN
          </Link>
        )}
        
        {/* Cart Icon / Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors border border-white/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
}

