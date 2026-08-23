import React from 'react';
import Link from 'next/link';
import TovoaiArchiveTreeTab from '@/components/admin/TovoaiArchiveTreeTab';

export const metadata = {
  title: 'TOVOAI Admin - AI Image & Storage Control Center',
  description: 'Manage TOVOAI CDN, Supabase Storage, and Image SEO Studio Settings.',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navigation with Navigation Links */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              TV
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">TOVOAI Control Studio</h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">
                  v1.03.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Independent AI CDN &amp; Storage Management Console</p>
            </div>
          </div>

          {/* Admin Page Links Navigation Bar */}
          <nav className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-medium">
            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <span>📊 컨트롤 개요</span>
            </Link>
            <Link
              href="/admin/client-audit"
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5"
            >
              <span>🔍 고객사 분석 &amp; 에셋 할당</span>
            </Link>
            <Link
              href="/benchmark"
              className="px-3.5 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-slate-900 transition flex items-center gap-1.5 font-bold"
            >
              <span>🏆 글로벌 벤치마크</span>
            </Link>
            <Link
              href="/gallery"
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5"
            >
              <span>🎨 8K 갤러리 &amp; SEO 주입기</span>
            </Link>
            <Link
              href="/"
              className="px-3.5 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5"
            >
              <span>🌐 메인 라이브</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8">
        
        {/* Status Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Main Web System</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">tovoai.com</h3>
            <p className="text-xs text-slate-400 mt-1">Status: Operational (Vercel Edge)</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Global CDN Endpoint</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">cdn.tovoai.com</h3>
            <p className="text-xs text-slate-400 mt-1">Status: Active (Supabase post_images)</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">B2B Clients Active</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                Client #1
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">NN-nogoodnews</h3>
            <p className="text-xs text-slate-400 mt-1">232 Assets Allocated / Audit Active</p>
          </div>
        </div>

        {/* Quick Shortcut Navigation Section */}
        <section className="bg-gradient-to-r from-indigo-900/20 via-slate-900 to-cyan-900/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur">
          <h2 className="text-lg font-bold text-white mb-2">🚀 빠른 서비스 링크</h2>
          <p className="text-xs text-slate-400 mb-6">최신 신규 구성 페이지로 즉시 이동할 수 있습니다.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/admin/client-audit"
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-indigo-500/50 transition group"
            >
              <div className="text-xs font-mono text-indigo-400 font-bold mb-1">PAGE 01</div>
              <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                🔍 고객사 콘텐츠 분석 &amp; 에셋 할당 ➔
              </div>
              <p className="text-xs text-slate-500 mt-2">단문/중문/장문 세분화 및 232장 할당 보고서</p>
            </Link>

            <Link
              href="/gallery"
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 transition group"
            >
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1">PAGE 02</div>
              <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                🎨 8K 갤러리 &amp; SEO 주입기 ➔
              </div>
              <p className="text-xs text-slate-500 mt-2">768d 오픈 임베딩 및 동적 카테고리 테스트</p>
            </Link>

            <Link
              href="/"
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-emerald-500/50 transition group"
            >
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">PAGE 03</div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                🌐 TOVOAI 메인 서비스 랜딩 ➔
              </div>
              <p className="text-xs text-slate-500 mt-2">영어/한국어 다국어 스위처 및 88px 실사 콘솔</p>
            </Link>
          </div>
        </section>

        {/* 4-Level TOVOAI Archive Taxonomy Tree */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-1">🌳 TOVOAI 4단계 아카이브 분류 트리</h2>
          <p className="text-xs text-slate-400 mb-6">10 L1 Major · 35 L2 Mid · 25 L3 Sub 카테고리 · 768D AI 임베딩 감사 패널</p>
          <TovoaiArchiveTreeTab />
        </section>
      </main>
    </div>
  );
}
