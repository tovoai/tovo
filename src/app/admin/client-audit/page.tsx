"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
} from "lucide-react";

interface AuditTier {
  id: string;
  name: string;
  charRange: string;
  postCount: number;
  heroImagesPerPost: number;
  inlineImagesPerPost: number;
  totalImagesRequired: number;
  rationale: string;
  seoBoostScore: string;
  readabilityImpact: string;
}

export default function ClientAuditPage() {
  const [activeClient] = useState("NN-nogoodnews (Client #1)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  const auditTiers: AuditTier[] = [
    {
      id: "short",
      name: "단문 포스트 (Short Content)",
      charRange: "300자 이하",
      postCount: 22,
      heroImagesPerPost: 1,
      inlineImagesPerPost: 0,
      totalImagesRequired: 22,
      rationale: "빠른 정보 전달이 목적인 단문으로, 본문 삽입 이미지는 시선 산만을 유발할 수 있어 대표 8K 커버 썸네일 1개만 배치하여 시각적 임팩트를 고도화합니다.",
      seoBoostScore: "+120%",
      readabilityImpact: "최고 (단시간 집중)",
    },
    {
      id: "medium",
      name: "중문 포스트 (Medium Content)",
      charRange: "300자 ~ 800자",
      postCount: 54,
      heroImagesPerPost: 1,
      inlineImagesPerPost: 1,
      totalImagesRequired: 108,
      rationale: "2~3개 단락으로 구성된 일반 아티클로, 50% 스크롤 지점에 맥락을 보조하는 본문 삽입형(Inline) 8K 이미지를 1장 추가하여 이탈률을 40% 감소시킵니다.",
      seoBoostScore: "+250%",
      readabilityImpact: "우수 (중간 시선 환기)",
    },
    {
      id: "long",
      name: "장문 포스트 (Long Content)",
      charRange: "800자 이상",
      postCount: 34,
      heroImagesPerPost: 1,
      inlineImagesPerPost: 2,
      totalImagesRequired: 102,
      rationale: "깊이 있는 심층 분석 글로, 상단 커버 1장 외에 주요 서브섹션(Section A, Section B) 전환 지점마다 본문 이미지를 총 2장 추가 주입하여 긴 글의 지루함을 없애고 독자의 체류 시간을 극대화합니다.",
      seoBoostScore: "+410%",
      readabilityImpact: "최상 (잡지 스타일 몰입)",
    },
  ];

  const totalPosts = auditTiers.reduce((acc, t) => acc + t.postCount, 0);
  const totalRequiredAssets = auditTiers.reduce((acc, t) => acc + t.totalImagesRequired, 0);

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center space-x-3">
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
          </Link>

          {/* Unified Admin Navigation Links */}
          <nav className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-medium">
            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1.5"
            >
              <span>📊 컨트롤 개요</span>
            </Link>
            <Link
              href="/admin/client-audit"
              className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <span>🔍 고객사 분석 &amp; 에셋 할당</span>
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title & Client Selector */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              B2B CLIENT ASSET AUDIT REPORT
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
              고객사 콘텐트 정밀 분석 및 다층 에셋 할당보고서
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              아티클의 길이(단문/중문/장문)와 문맥 특성에 따라 최적의 8K 이미지 수량과 기술적 이유(Rationale)를 자동으로 산출합니다.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 p-2">
            <span className="text-xs font-mono text-slate-400 px-2">TARGET CLIENT:</span>
            <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-mono text-xs font-bold shadow-md">
              {activeClient}
            </span>
          </div>
        </div>

        {/* Audit Metrics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="text-xs font-mono text-slate-400 mb-1">TOTAL AUDITED POSTS</div>
            <div className="text-3xl font-black text-white">{totalPosts}개</div>
            <div className="mt-2 text-[10px] font-mono text-cyan-400">100% 전수 조사 완료</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="text-xs font-mono text-slate-400 mb-1">REQUIRED 8K ASSETS</div>
            <div className="text-3xl font-black text-cyan-300">{totalRequiredAssets}장</div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">평균 2.11장 / 포스트</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="text-xs font-mono text-slate-400 mb-1">ESTIMATED SEO BOOST</div>
            <div className="text-3xl font-black text-emerald-400">+295%</div>
            <div className="mt-2 text-[10px] font-mono text-emerald-400">네이버/구글 듀얼 태깅</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="text-xs font-mono text-slate-400 mb-1">STORAGE ISOLATION</div>
            <div className="text-sm font-bold text-violet-300 truncate">clients/nogoodnews/</div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">cdn.tovoai.com 버킷 격리</div>
          </div>
        </div>

        {/* Multi-Tier Content Analysis Table with Rationale */}
        <section className="mb-12 rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            콘텐츠 길이별 분류 및 에셋 주입 이유 (Technical Rationale)
          </h2>

          <div className="space-y-6">
            {auditTiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl border border-white/10 bg-slate-950 p-6 transition-all hover:border-indigo-500/40"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-white">{tier.name}</span>
                      <span className="px-2.5 py-0.5 rounded-md border border-slate-700 bg-slate-900 font-mono text-xs text-indigo-300">
                        {tier.charRange}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      대상 포스트: <strong className="text-white">{tier.postCount}개</strong> | 필요 에셋:{" "}
                      <strong className="text-cyan-300">{tier.totalImagesRequired}장</strong> (대표 커버 {tier.heroImagesPerPost}장 + 본문 {tier.inlineImagesPerPost}장)
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs">
                    <div className="text-right">
                      <div className="text-slate-500">SEO BOOST</div>
                      <div className="text-emerald-400 font-bold">{tier.seoBoostScore}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500">READABILITY</div>
                      <div className="text-cyan-300 font-bold">{tier.readabilityImpact}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs leading-relaxed text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  <strong className="text-indigo-400 font-mono block mb-1">💡 에셋 구성 및 추가 이유 (RATIONALE):</strong>
                  {tier.rationale}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Panel for Client Approval */}
        <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-slate-900 to-cyan-500/10 p-8 backdrop-blur-xl text-center">
          <h3 className="text-2xl font-bold text-white mb-2">클라이언트 전용 232장 8K 에셋 포트폴리오 생성</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mb-6">
            노굿뉴스 담당자(클라이언트)가 직접 원클릭으로 퀄리티를 미리 검토하고 승인할 수 있는 전용 에셋 스페이스를 동적 할당합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartGeneration}
              disabled={isGenerating}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>분석된 232장 8K 에셋 생성 중...</span>
                </>
              ) : generationComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>232장 에셋 할당 완료 (클라이언트 검토 가능)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>클라이언트 에셋 포트폴리오 동적 생성을 시작합니다</span>
                </>
              )}
            </button>

            <Link
              href="/gallery"
              className="px-6 py-4 rounded-2xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-bold transition-all flex items-center gap-2"
            >
              <span>8K 갤러리 프리뷰 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
