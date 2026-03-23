'use client';

import { motion } from 'framer-motion';
import { STORE_PRODUCTS } from '@/data/product';
import { useCart } from '@/lib/CartContext';

export default function ProductsSection() {
  const { addToCart } = useCart();

  return (
    <section className="relative w-full bg-[#050505] py-32 px-6 md:px-24 overflow-hidden font-inter z-20">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-6xl md:text-8xl tracking-widest text-white mb-6 uppercase"
          >
            Choose Your Fuel
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg tracking-widest uppercase"
          >
            Hydration for every athlete. Grab your flavor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STORE_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-white/30 transition-all duration-500"
            >
              {/* Product Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-[2rem] pointer-events-none"
                style={{ backgroundColor: product.color }}
              />

              {/* Image Container */}
              <div className="relative w-full h-80 flex items-center justify-center mb-8 bg-black/20 rounded-2xl p-4 overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src={product.image} 
                  alt={product.name} 
                  className="w-auto h-full object-contain drop-shadow-2xl relative z-10"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 text-center justify-between z-10">
                <div>
                  <h3 className="font-bebas text-4xl tracking-wider text-white mb-2">{product.name}</h3>
                  <p className="text-white/50 text-sm mb-6">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bebas text-3xl text-white tracking-widest">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      color: product.color
                    })}
                    className="bg-white text-black font-bebas text-xl px-6 py-2 rounded-full hover:bg-white/90 transition-transform active:scale-95"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
