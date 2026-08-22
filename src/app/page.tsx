"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Settings, 
  Activity, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check, 
  Globe, 
  Zap, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Code,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function Page() {
  const [promptText, setPromptText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cdnUrl = "https://cdn.tovoai.com/storage/v1/object/public/post_images/sample.webp";

  // Handle scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyUrl = () => {
    try {
      navigator.clipboard.writeText(cdnUrl);
    } catch {
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const demoEnglishPrompt = promptText 
    ? `An ultra-realistic 8K photograph of ${promptText}, cinematic lighting, highly detailed, Unreal Engine 5 render, global illumination.`
    : "An ultra-realistic 8K photograph of Morning fog at Gyeongbokgung Palace, cinematic lighting, highly detailed, Unreal Engine 5 render.";
    
  const demoSeoAlt = promptText 
    ? `${promptText} - 8K AI Photorealistic Image | TOVOAI`
    : "경복궁의 아침 안개 - 8K AI Photorealistic Image | TOVOAI";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">TOVOAI</span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-md w-max border border-indigo-500/20">v1.01.0</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#cdn-status" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">CDN Status</a>
            <Link href="/gallery" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">8K Gallery</Link>
            <Link href="/admin" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <Settings className="w-4 h-4" /> Admin Console
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link href="/gallery" className="relative group px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-500 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-sm font-semibold text-white flex items-center gap-2">
                [ Launch Studio ] <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/5 p-6 flex flex-col gap-6 md:hidden">
          <a href="#features" className="text-lg font-medium text-slate-200" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#cdn-status" className="text-lg font-medium text-slate-200" onClick={() => setMobileMenuOpen(false)}>CDN Status</a>
          <Link href="/gallery" className="text-lg font-medium text-slate-200" onClick={() => setMobileMenuOpen(false)}>8K Gallery</Link>
          <Link href="/admin" className="text-lg font-medium text-indigo-400 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Settings className="w-5 h-5" /> Admin Console
          </Link>
          <Link href="/gallery" className="mt-4 w-full text-center py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold">
            Launch Studio
          </Link>
        </div>
      )}

      <main className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400 tracking-wide">100% Uptime • cdn.tovoai.com Global CDN Active</span>
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Limitless <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">8K Photorealistic</span><br className="hidden md:block"/> AI Image &amp; SEO Engine
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          The ultimate independent studio. Experience 1:1 Korean-to-English semantic precision, 0% quota limits, and a 24/7/365 zero-broken-link global storage infrastructure.
        </p>

        {/* Interactive Prompt Input Demo Box */}
        <div className="w-full max-w-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 mb-12 shadow-2xl overflow-hidden relative group transition-all hover:border-indigo-500/50">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
          
          <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 px-4 py-3">
            <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
            <input 
              type="text" 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. 경복궁의 아침 안개 (Type in Korean...)"
              className="w-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 text-lg"
            />
            <Link href="/gallery" className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Sparkles className="w-4 h-4" /> Generate
            </Link>
          </div>

          {/* Real-time Demo Output */}
          <div className="relative mt-2 p-4 bg-slate-900/80 rounded-xl text-left border border-slate-800/50">
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 mb-1 uppercase tracking-wider">Semantic 1:1 Translation Engine</div>
                <div className="text-sm text-slate-300 font-mono leading-relaxed">{demoEnglishPrompt}</div>
              </div>
              <div className="h-px w-full bg-slate-800"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-violet-400 mb-1 uppercase tracking-wider">Auto SEO Metadata (ALT)</div>
                  <div className="text-xs text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block">
                    {demoSeoAlt}
                  </div>
                </div>
                <Code className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link href="/gallery" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300">
            <ImageIcon className="w-5 h-5" /> Open Gallery Studio
          </Link>
          <Link href="/admin" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-lg hover:bg-slate-700 hover:text-white transition-all duration-300 border border-slate-700 hover:border-slate-600">
            <Settings className="w-5 h-5" /> Admin Settings
          </Link>
        </div>
      </main>

      <section id="cdn-status" className="relative z-10 py-20 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Infrastructure</h2>
            <p className="text-slate-400">Engineered for 24/7 reliability, uncompromising 8K quality, and supreme SEO velocity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "0% Broken Links",
                desc: "24/7 Cloud Storage Uptime. Your images remain globally accessible even when your local PC is turned off.",
                icon: <Globe className="w-6 h-6 text-cyan-400" />,
                metric: "99.999%",
                metricLabel: "Uptime SLA",
                color: "cyan"
              },
              {
                title: "8K Realism Guard",
                desc: "1:1 Semantic Parser prevents prompt mismatches, ensuring the exact photorealistic vision you requested.",
                icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
                metric: "100%",
                metricLabel: "Photorealism",
                color: "indigo"
              },
              {
                title: "Instant SEO Alt",
                desc: "Auto-generated Korean ALT tags and optimized WebP filenames for maximum Google & Naver Search visibility.",
                icon: <Zap className="w-6 h-6 text-violet-400" />,
                metric: "<50ms",
                metricLabel: "TTFB Speed",
                color: "violet"
              }
            ].map((card, i) => (
              <div key={i} className="group relative bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden flex flex-col justify-between h-full">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}-500/10 blur-[50px] rounded-full group-hover:bg-${card.color}-500/20 transition-colors`}></div>
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 shadow-lg shadow-${card.color}-900/20`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-end justify-between">
                  <span className="text-sm font-mono text-slate-500">{card.metricLabel}</span>
                  <span className={`text-2xl font-bold text-${card.color}-400`}>{card.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Mock Image Display */}
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] group">
                <div className="aspect-[4/5] bg-slate-800 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                    alt="Abstract cybernetic landscape" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-indigo-500/30">8K UHD</span>
                      <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-cyan-500/30">WebP</span>
                    </div>
                    <p className="text-sm text-slate-200 font-medium">sample_gyeongbokgung_morning_fog.webp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* URL Copy Bar & Info */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div>
                <h3 className="text-3xl font-bold mb-4">Zero-Broken-Link CDN</h3>
                <p className="text-slate-400 leading-relaxed">
                  Every 8K image generated by TOVOAI is instantly uploaded to our dedicated global Edge network (`cdn.tovoai.com`). Enjoy lightning-fast load times and permanent URLs that never expire.
                </p>
              </div>

              <div className="bg-slate-900 rounded-xl p-1.5 border border-slate-700 flex items-center shadow-inner">
                <div className="flex-grow px-3 py-2 overflow-hidden flex items-center">
                  <Globe className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <span className="text-sm font-mono text-slate-300 truncate">{cdnUrl}</span>
                </div>
                <button 
                  onClick={handleCopyUrl}
                  className={`shrink-0 ml-2 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isCopied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'}`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? 'Copied!' : 'Copy URL'}
                </button>
              </div>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm text-slate-300">Hotlink Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm text-slate-300">Auto WebP Compression</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group bg-slate-900/40 rounded-3xl p-8 border border-white/5 hover:bg-slate-800/50 hover:border-indigo-500/30 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">100% Photorealistic Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our proprietary Semantic Prompt Parser ensures absolute fidelity. No stylized artifacts, just pure, unadulterated 8K photographic reality translated flawlessly from your intent.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative group bg-slate-900/40 rounded-3xl p-8 border border-white/5 hover:bg-slate-800/50 hover:border-cyan-500/30 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Automatic Korean SEO</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Dominate Google and Naver Image Search. The system automatically injects perfectly localized, keyword-rich Korean ALT tags and meta-descriptions into every generated asset.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative group bg-slate-900/40 rounded-3xl p-8 border border-white/5 hover:bg-slate-800/50 hover:border-violet-500/30 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Dedicated Infrastructure</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built on a robust architecture leveraging Cloudflare edge routing and Supabase PostgreSQL. Experience zero quota limits and unparalleled data sovereignty for your studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-lg font-bold tracking-tight text-white">TOVOAI</span>
            </div>
            <p className="text-xs text-slate-500">Copyright © 2026 TOVOAI Inc. All rights reserved. Version 1.01.0</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="https://tovoai.com" className="text-slate-400 hover:text-indigo-400 transition-colors">tovoai.com</a>
            <span className="text-slate-700">|</span>
            <a href="https://cdn.tovoai.com" className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> cdn.tovoai.com
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/admin" className="text-slate-400 hover:text-violet-400 transition-colors">/admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
