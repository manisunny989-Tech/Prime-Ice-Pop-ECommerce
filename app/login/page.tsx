'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('A network error occurred');
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse: any) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Google authentication failed');
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh(); // Ensure layout clears cached state
      }
    } catch (err) {
      setError('A network error occurred');
      setLoading(false);
    }
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy_client_id_for_ssr';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen w-full bg-[#8A050B] flex items-center justify-center p-6 transition-colors duration-500">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="font-bebas text-5xl tracking-widest text-white mb-2">PRIME</h1>
            <p className="text-white/70 font-inter uppercase tracking-widest text-sm">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? (
            <>
              <div className="w-full flex justify-center mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google login failed')}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                  text={isLogin ? "signin_with" : "signup_with"}
                />
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-white/20 flex-1"></div>
                <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">OR</span>
                <div className="h-px bg-white/20 flex-1"></div>
              </div>
            </>
          ) : (
             <div className="bg-orange-500/20 border border-orange-500/50 text-white px-4 py-2 rounded-xl mb-6 text-xs text-center">
              Google Auth disabled: Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-white/80 uppercase tracking-widest text-xs font-semibold mb-2 ml-1">Email</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/50 focus:bg-black/30 transition-all placeholder:text-white/30"
                placeholder="athlete@example.com"
              />
            </div>
            
            <div>
              <label className="block text-white/80 uppercase tracking-widest text-xs font-semibold mb-2 ml-1">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/50 focus:bg-black/30 transition-all placeholder:text-white/30"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full bg-white text-black font-bebas text-2xl tracking-widest py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'REGISTER')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}
