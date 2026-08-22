"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Globe,
  Settings,
  ArrowUpRight,
  Filter,
  Layers,
  Cpu,
  Zap,
  TrendingUp,
  Building2,
  HeartPulse,
  Camera,
  CheckCircle2,
  ExternalLink,
  Code,
} from "lucide-react";
import { DEFAULT_CATEGORY_NODES, CategoryNode } from "@/lib/taxonomy";
import { processArticleForSeoInjection } from "@/lib/seo_injector";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [testArticleTitle, setTestArticleTitle] = useState<string>("경복궁의 아침 안개");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const seoInjectionResult = useMemo(
    () => processArticleForSeoInjection(testArticleTitle),
    [testArticleTitle]
  );

  const sampleGalleryAssets = [
    {
      id: "1",
      title: "경복궁의 아침 안개",
      category: "culture",
      categoryKo: "문화 · 라이프",
      imgUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      cdnUrl: "https://cdn.tovoai.com/storage/v1/object/public/post_images/culture/gyeongbokgung-morning-fog-8k.webp",
      altKo: "경복궁의 아침 안개 - 8K 실사 이미지 | TOVOAI",
      views: "1.2k",
    },
    {
      id: "2",
      title: "AI 반도체 차세대 파운드리 공정",
      category: "tech",
      categoryKo: "IT · 테크",
      imgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      cdnUrl: "https://cdn.tovoai.com/storage/v1/object/public/post_images/tech/ai-semiconductor-foundry-8k.webp",
      altKo: "AI 반도체 차세대 파운드리 공정 - 8K 실사 이미지 | TOVOAI",
      views: "2.5k",
    },
    {
      id: "3",
      title: "서울 글로벌 금융 타워 야경",
      category: "finance",
      categoryKo: "금융 · 경제",
      imgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      cdnUrl: "https://cdn.tovoai.com/storage/v1/object/public/post_images/finance/seoul-financial-tower-night-8k.webp",
      altKo: "서울 글로벌 금융 타워 야경 - 8K 실사 이미지 | TOVOAI",
      views: "980",
    },
    {
      id: "4",
      title: "양자 컴퓨터 연구 및 미래 기술",
      category: "ai-future",
      categoryKo: "AI · 로봇 · 미래",
      imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      cdnUrl: "https://cdn.tovoai.com/storage/v1/object/public/post_images/ai-future/quantum-computer-future-8k.webp",
      altKo: "양자 컴퓨터 연구 및 미래 기술 - 8K 실사 이미지 | TOVOAI",
      views: "3.1k",
    },
  ];

  const filteredAssets = sampleGalleryAssets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || asset.altKo.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-black text-white tracking-tight">TOVOAI 8K GALLERY</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/" className="text-slate-400 hover:text-white">
              Home
            </Link>
            <Link href="/benchmark" className="text-cyan-400 hover:text-cyan-300 font-bold">
              /benchmark (글로벌 벤치마크)
            </Link>
            <Link href="/admin/client-audit" className="text-indigo-400 hover:text-indigo-300">
              /client-audit (고객사 분석)
            </Link>
            <Link href="/admin" className="text-slate-400 hover:text-white">
              /admin (관리자)
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Article SEO Injection Real-Time Tester */}
        <section className="mb-14 rounded-3xl border border-indigo-500/30 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold mb-3 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            TOVOAI 768d Open Embedding Article SEO Injector
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">아티클 글 분석 ➔ 8K SEO 이미지 자동 주입 테스트</h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-grow flex items-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
              <Search className="w-4 h-4 text-slate-500 mr-2" />
              <input
                type="text"
                value={testArticleTitle}
                onChange={(e) => setTestArticleTitle(e.target.value)}
                placeholder="아티클 제목 또는 글의 주제를 입력해보세요..."
                className="w-full bg-transparent text-sm text-white outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80">
              <div className="text-[10px] font-mono text-indigo-400 mb-1">AUTOMATIC AI TAXONOMY</div>
              <div className="text-sm font-bold text-white mb-2">{seoInjectionResult.categoryNameKo} ({seoInjectionResult.categorySlug})</div>
              <div className="text-[10px] font-mono text-slate-500 mb-1">768d VECTOR SIMILARITY SCORE</div>
              <div className="text-xs font-mono text-emerald-400">Score: {(seoInjectionResult.similarityScore * 100).toFixed(1)}% Match</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80">
              <div className="text-[10px] font-mono text-cyan-400 mb-1">GENERATED SEO ALT & CDN URL</div>
              <div className="text-xs font-mono text-slate-300 truncate mb-1">{seoInjectionResult.seoAltKo}</div>
              <div className="text-[10px] font-mono text-slate-500 truncate">{seoInjectionResult.cdnWebpUrl}</div>
            </div>
          </div>
        </section>

        {/* Dynamic Category Chips */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Dynamic Category Nodes</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              전체 보기 (All)
            </button>

            {DEFAULT_CATEGORY_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedCategory(node.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  selectedCategory === node.slug
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {node.nameKo} ({node.count})
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Asset Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden backdrop-blur-md hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                <img
                  src={asset.imgUrl}
                  alt={asset.altKo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 font-bold">
                  {asset.categoryKo}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white">{asset.title}</h3>
                <p className="text-xs font-mono text-slate-400 truncate bg-slate-950 p-2 rounded border border-slate-800">
                  {asset.altKo}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ACTIVE CDN
                  </span>

                  <button
                    onClick={() => copyUrl(asset.cdnUrl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                  >
                    {copiedUrl === asset.cdnUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl === asset.cdnUrl ? "Copied!" : "Copy CDN URL"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
