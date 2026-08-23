"use client";

import React, { useState } from "react";
import {
  Sliders,
  Code,
  CheckCircle2,
  Copy,
  Check,
  Award,
} from "lucide-react";
import {
  applyStylePresetToPrompt,
  generateJsonLdImageSchema,
  buildDynamicEdgeCdnUrl,
  TovoaiStylePreset,
} from "@/modules/tovoai-benchmark";

export default function AdminBenchmarkPage() {
  const [selectedStyle, setSelectedStyle] = useState<TovoaiStylePreset>("photorealistic");
  const [promptText, setPromptText] = useState("경복궁의 아침 안개와 고요한 잔디밭");
  const [width] = useState(1200);
  const [quality] = useState(85);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const baseCdnUrl = "https://cdn.tovoai.com/storage/v1/object/public/post_images/culture/gyeongbokgung-morning-fog-8k.webp";
  const dynamicEdgeUrl = buildDynamicEdgeCdnUrl(baseCdnUrl, width, quality, "webp");
  const styledPrompt = applyStylePresetToPrompt(promptText, selectedStyle);
  const jsonLdSchema = generateJsonLdImageSchema(promptText, dynamicEdgeUrl, `${promptText} - TOVOAI 8K CDN`);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(jsonLdSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const benchmarkComparisons = [
    {
      target: "Cloudflare Images / Cloudinary",
      feature: "Dynamic Edge Resizing & Format Tuning",
      advantage: "TOVOAI는 Edge 파라미터(?w=1200&q=85&fmt=webp)를 지원하여 모바일/데스크톱 기기별로 0ms 초고속 적응형 이미지 서빙.",
      status: "TOVOAI 엔진 탑재 완료",
    },
    {
      target: "Midjourney API / Unsplash Enterprise",
      feature: "8K Art Direction & Multi-Style Presets",
      advantage: "Photorealistic(실사), Cinematic(영화), Isometric 3D(3D 입체), Infographic(데이터 시각화) 4대 화풍 모드 즉시 적용.",
      status: "TOVOAI 엔진 탑재 완료",
    },
    {
      target: "Yoast SEO / RankMath AI",
      feature: "Google/Naver Rich Snippet JSON-LD Schema",
      advantage: "구글과 네이버 검색 엔진 수집기가 100% 상위 인덱싱하도록 JSON-LD ImageObject 스키마 마크업을 자동 추출 및 주입.",
      status: "TOVOAI 엔진 탑재 완료",
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-3">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          GLOBAL ENTERPRISE BENCHMARK &amp; ADVANCED SPECS
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
          글로벌 최고 수준 서비스 벤치마크 &amp; TOVOAI 3대 고도화 엔진
        </h1>
        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Cloudflare Images, Cloudinary, Midjourney API, Yoast SEO의 세계적 장점을 모두 분석하여 TOVOAI 플랫폼 독자 모듈로 이식했습니다.
        </p>
      </div>

      {/* Benchmark Comparisons Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benchmarkComparisons.map((b, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-indigo-500/40 transition">
            <div className="text-[10px] font-mono text-indigo-400 font-bold mb-1">BENCHMARK TARGET #{idx + 1}</div>
            <h3 className="text-lg font-bold text-white mb-2">{b.target}</h3>
            <div className="text-xs font-mono text-cyan-300 mb-3">{b.feature}</div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{b.advantage}</p>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3 h-3" /> {b.status}
            </div>
          </div>
        ))}
      </section>

      {/* Live Interactive Benchmark Demonstrators */}
      <section className="space-y-8">
        {/* Demonstrator 1: 8K Art Direction Presets */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            1. 8K 화풍 스타일 프리셋 파서 (Midjourney / Unsplash API 벤치마크)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">화풍 스타일 선택 (Style Preset):</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(["photorealistic", "cinematic-film", "isometric-3d", "infographic-chart"] as TovoaiStylePreset[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStyle(st)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                      selectedStyle === st
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <label className="text-xs font-mono text-slate-400 block mb-2">한국어 원본 주제 (Raw Prompt):</label>
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 mb-1">GENERATED 8K PROMPT PARSER OUTPUT</div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                  {styledPrompt}
                </p>
              </div>
              <div className="mt-3 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 8K Art Direction Spec Ready
              </div>
            </div>
          </div>
        </div>

        {/* Demonstrator 2: JSON-LD Schema Generator */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              2. Google &amp; Naver Rich Snippet JSON-LD 스키마 마크업 (Yoast SEO 벤치마크)
            </h2>

            <button
              onClick={handleCopySchema}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono transition flex items-center gap-1.5"
            >
              {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSchema ? "Copied!" : "Copy JSON-LD"}
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
            {jsonLdSchema}
          </pre>
        </div>
      </section>
    </div>
  );
}
