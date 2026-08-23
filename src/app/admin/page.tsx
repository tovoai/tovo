import React from 'react';
import Link from 'next/link';
import TovoaiArchiveTreeTab from '@/components/admin/TovoaiArchiveTreeTab';
import { LayoutDashboard, BarChart3, Trophy, ImageIcon, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'TOVOAI Admin Console',
  description: 'Manage TOVOAI CDN, Supabase Storage, and Image SEO Studio Settings.',
};

export default function AdminPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            TOVOAI Control Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            독자 AI CDN &amp; 4단계 아카이브 분류 중앙 컨트롤 대시보드
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full">
            Role: Admin
          </span>
          <span className="px-3 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CDN Operational
          </span>
        </div>
      </div>

      {/* Status Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Main Web System</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">tovoai.com</h3>
          <p className="text-xs text-slate-400 mt-1">Status: Operational (Vercel Edge)</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Global CDN Endpoint</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">cdn.tovoai.com</h3>
          <p className="text-xs text-slate-400 mt-1">Status: Supabase Public Storage Proxy</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">B2B Clients Active</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
              Client #1
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">NN-nogoodnews</h3>
          <p className="text-xs text-slate-400 mt-1">232 Assets Allocated / Audit Active</p>
        </div>
      </div>

      {/* Quick Admin Shortcut Navigation Section */}
      <section className="bg-gradient-to-r from-indigo-900/20 via-slate-900 to-cyan-900/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur">
        <h2 className="text-base font-bold text-white mb-1">🚀 관리자 핵심 콘솔 메뉴</h2>
        <p className="text-xs text-slate-400 mb-6">주요 관리자 전용 분석 패널 및 벤치마크 도구로 바로 이동합니다.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/client-audit"
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-indigo-500/50 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
              고객사 콘텐츠 분석 &amp; 에셋 할당
            </div>
            <p className="text-xs text-slate-500 mt-1">232장 에셋 할당 보고서 및 텍스트 세분화</p>
          </Link>

          <Link
            href="/admin/benchmark"
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-5 h-5 text-cyan-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
              글로벌 벤치마크 &amp; SEO 스펙
            </div>
            <p className="text-xs text-slate-500 mt-1">4대 화풍 스타일 프리셋 및 JSON-LD 추출</p>
          </Link>

          <Link
            href="/gallery"
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-emerald-500/50 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
              8K 갤러리 스튜디오
            </div>
            <p className="text-xs text-slate-500 mt-1">8K AI 실사 이미지 갤러리 및 CDN 테스트</p>
          </Link>
        </div>
      </section>

      {/* 4-Level TOVOAI Archive Taxonomy Tree */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-white mb-1">🌳 TOVOAI 4단계 아카이브 분류 트리</h2>
        <p className="text-xs text-slate-400 mb-6">10 L1 Major · 35 L2 Mid · 25 L3 Sub 카테고리 · 768D AI 임베딩 감사 패널</p>
        <TovoaiArchiveTreeTab />
      </section>
    </div>
  );
}
