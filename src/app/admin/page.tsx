import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'TOVOAI Admin - AI Image & Storage Control Center',
  description: 'Manage TOVOAI CDN, Supabase Storage, and Image SEO Studio Settings.',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              TV
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">TOVOAI Control Studio</h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">
                  v1.01.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Independent AI CDN &amp; Storage Management Console</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            >
              메인 웹으로
            </Link>
            <Link
              href="/gallery"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-md shadow-indigo-600/30"
            >
              갤러리 스튜디오
            </Link>
          </div>
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
            <div className="text-2xl font-extrabold text-white">tovoai.com</div>
            <p className="text-xs text-slate-400 mt-1">Vercel Edge Global Network Live</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dedicated Supabase DB</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded">
                CONNECTED
              </span>
            </div>
            <div className="text-lg font-bold text-white truncate">shypmvpylzsfkaqynknk</div>
            <p className="text-xs text-slate-400 mt-1">Bucket: post_images (Public)</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Image CDN Endpoint</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded">
                v1.01 CDN
              </span>
            </div>
            <div className="text-lg font-bold text-white truncate">cdn.tovoai.com</div>
            <p className="text-xs text-slate-400 mt-1">Cloudflare CNAME Redirect Active</p>
          </div>
        </div>

        {/* Configuration Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section 1: Supabase & CDN Connection Settings */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>⚙️ Supabase &amp; CDN 연결 설정</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">독립 스토리지 및 도메인 바인딩 설정 내역입니다.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Supabase Endpoint URL</label>
                <input
                  type="text"
                  readOnly
                  value="https://shypmvpylzsfkaqynknk.supabase.co"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Public Storage Bucket</label>
                <input
                  type="text"
                  readOnly
                  value="post_images"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">CDN Image Base Path</label>
                <input
                  type="text"
                  readOnly
                  value="https://cdn.tovoai.com/storage/v1/object/public/post_images/"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Cloudflare CDN Error 1014 Resolving Helper */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>☁️ Cloudflare CDN 설정 상태 가이드</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Error 1014 (CNAME Cross-User Banned) 즉시 해결 가이드</p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                <span>⚠️ Error 1014 조치 안내</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supabase 엔드포인트(<code className="text-indigo-300">*.supabase.co</code>) 자체가 이미 Cloudflare 망을 사용하므로, 
                Cloudflare DNS 레코드에서 <code className="text-indigo-300">cdn.tovoai.com</code>의 프록시 상태를 
                <strong className="text-amber-300"> [DNS Only (회색 구름)]</strong>으로 설정하시면 100% 정상 작동합니다!
              </p>

              <div className="pt-2">
                <a
                  href="https://dash.cloudflare.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition"
                >
                  Cloudflare 대시보드 바로가기 ↗
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Dual-Control AI Image Studio Status */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">🎨 AI Image &amp; SEO Studio Engine (Desktop Dual Control)</h2>
              <p className="text-xs text-slate-400 mt-1">한글 제목 ➔ 1:1 정밀 영문 프롬프트 자동 변환 스튜디오 로컬 연동</p>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
              v1.01 READY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-400">Desktop Python Engine</span>
              <p className="text-xs text-slate-300">
                <code className="text-indigo-400">tools/image-seo-engine/desktop_app.py</code> 실행 시 GUI 제어 가능
              </p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-400">Prompt Translation Guard</span>
              <p className="text-xs text-slate-300">
                동물/사물 Mismatch 0% 차단 1:1 Prompt Mapping 엔진 활성화
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 TOVOAI Inc. All rights reserved. Version 1.01.0
      </footer>
    </div>
  );
}
