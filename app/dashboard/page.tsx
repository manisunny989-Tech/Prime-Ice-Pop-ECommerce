import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import OrdersSection from '@/components/OrdersSection';
import { Suspense } from 'react';

export default async function DashboardPage({ searchParams }: { searchParams: { order?: string } }) {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-inter flex flex-col items-center">
      <nav className="w-full flex justify-between items-center max-w-5xl mb-12">
        <Link href="/" className="font-bebas text-4xl tracking-widest text-white hover:text-white/80 transition-colors">
          PRIME
        </Link>
        <form action={logout}>
          <button type="submit" className="uppercase tracking-widest text-xs font-semibold px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
            Logout
          </button>
        </form>
      </nav>

      <main className="w-full max-w-5xl">
        <h1 className="font-bebas text-5xl tracking-wide mb-2 uppercase">Welcome, Athlete</h1>
        <p className="text-white/60 text-sm tracking-wider uppercase mb-6">{user.email}</p>

        {searchParams.order === 'success' && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-6 py-4 rounded-2xl mb-8 font-semibold">
            Order placed successfully! Thank you for your purchase.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="font-bebas text-4xl mb-2 text-[#0072BC]">Hydration Stats</h3>
            <p className="text-white/70 text-sm">Your electrolyte balance is optimized.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="font-bebas text-4xl mb-2 text-[#E31C23]">Recent Orders</h3>
            <Suspense fallback={<p className="text-white/50 text-sm">Loading orders...</p>}>
              <OrdersSection />
            </Suspense>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="font-bebas text-4xl mb-2 text-white">Account Info</h3>
            <p className="text-white/70 text-sm">Member since {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
