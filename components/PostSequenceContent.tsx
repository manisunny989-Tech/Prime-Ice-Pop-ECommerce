"use client";

export default function PostSequenceContent() {
  return (
    <div className="relative z-10 w-full pointer-events-none flex flex-col text-white overflow-hidden">
      
      {/* Section 1: Bottle stays on the right. Text on the left. */}
      <section className="flex min-h-screen w-full items-center justify-start px-8 md:px-24">
        <div className="flex flex-col gap-8 w-full md:w-[45%]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bebas text-5xl md:text-7xl tracking-wider text-white">834MG</h3>
            <p className="text-white/80 font-inter text-lg md:text-xl tracking-widest uppercase font-semibold">Electrolytes</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bebas text-5xl md:text-7xl tracking-wider text-white">ZERO</h3>
            <p className="text-white/80 font-inter text-lg md:text-xl tracking-widest uppercase font-semibold">Sugar</p>
          </div>
        </div>
      </section>

      {/* Section 2: Bottle moves to the left. Text on the right. */}
      <section className="flex min-h-screen w-full items-center justify-end px-8 md:px-24">
        <div className="flex flex-col gap-8 w-full md:w-[45%] text-left items-end">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl w-full max-w-sm">
            <h3 className="font-bebas text-5xl md:text-7xl tracking-wider text-white">10%</h3>
            <p className="text-white/80 font-inter text-lg md:text-xl tracking-widest uppercase font-semibold">Coconut Water</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl w-full max-w-sm">
            <h3 className="font-bebas text-5xl md:text-7xl tracking-wider text-white">250MG</h3>
            <p className="text-white/80 font-inter text-lg md:text-xl tracking-widest uppercase font-semibold">BCAAs</p>
          </div>
        </div>
      </section>

      {/* Section 3: Bottle settles in the center. Text/CTA on the right. */}
      <section className="flex min-h-screen w-full items-center justify-end px-8 md:px-24 pointer-events-auto">
        <div className="flex flex-col items-end text-right w-full md:w-[45%]">
          <h2 className="mb-6 font-bebas text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider text-white drop-shadow-xl">
            THE ULTIMATE FREEZE.<br />HYDRATE NOW.
          </h2>
          <button className="rounded-full bg-white px-10 py-4 font-bebas text-2xl tracking-wider text-black border border-gray-200 transition-all hover:scale-105 shadow-xl">
            $20.00 BUY NOW
          </button>
        </div>
      </section>

    </div>
  );
}
