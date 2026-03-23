'use client';

import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] z-[100] shadow-2xl flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-bebas text-3xl tracking-widest text-white">YOUR CART</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                  <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  <p className="font-inter tracking-widest uppercase text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div 
                      className="w-20 h-24 rounded-xl flex items-center justify-center p-2 relative"
                      style={{ backgroundColor: item.color }}
                    >
                      {/* We use a standard img tag with object-contain to mock the product image */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 drop-shadow-lg" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-bebas text-2xl tracking-wide text-white leading-none">{item.name}</h3>
                        <p className="text-white/60 font-inter text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-black/40 rounded-full px-1 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10">-</button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-xs tracking-wider uppercase hover:text-red-300 ml-auto">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/60 tracking-widest uppercase text-sm">Total</span>
                  <span className="font-bebas text-4xl text-white tracking-wider">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-white text-black font-bebas text-2xl tracking-widest py-4 rounded-full hover:scale-105 transition-transform">
                  CHECKOUT SECURELY
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
