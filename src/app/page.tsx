"use client";

/**
 * TOVOAI — Ultimate 8K AI Image Studio & SEO CDN Engine (Final Hybrid)
 * src/app/page.tsx
 *
 * Stack: Next.js 15 (App Router) / React 19 / Tailwind CSS / TypeScript
 * Multi-Language: English (Default Public) & Korean (Admin / Localization)
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Radio,
  Copy,
  Check,
  ArrowRight,
  Image as ImageIcon,
  ShieldCheck,
  Search,
  Cloud,
  Settings,
  Menu,
  X,
  Zap,
  Globe2,
  Server,
  Link2,
  Terminal,
  CircleCheck,
  Network,
  Cpu,
  Database,
  Layers3,
  ExternalLink,
  BarChart3,
  ChevronRight,
  Globe,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Translations (EN / KO)                                                     */
/* -------------------------------------------------------------------------- */

type Lang = "en" | "ko";

const DICT = {
  en: {
    statusPill: "100% Uptime • cdn.tovoai.com Global CDN Active",
    heroTitle1: "Limitless",
    heroTitle2: "8K Photorealistic",
    heroTitle3: "AI Image & SEO Engine",
    heroSub:
      "Korean-to-English 1:1 prompt precision meets always-on cloud infrastructure. Generate cinematic 8K imagery, automatically create Korean SEO metadata, and serve every asset through a global CDN designed for zero broken links.",
    promptConsoleTitle: "Live 1:1 Prompt & SEO Parser",
    promptInputLabel: "Enter Korean image title (or prompt concept):",
    promptInputPlaceholder: "e.g. 경복궁의 아침 안개 (Type in Korean...)",
    enPromptLabel: "ENGLISH PROMPT (1:1 SEMANTIC)",
    seoAltLabel: "AUTO SEO ALT & FILENAME",
    openGalleryBtn: "Open Gallery Studio",
    adminSettingsBtn: "Admin Settings",
    cdnStatusEyebrow: "LIVE INFRASTRUCTURE",
    cdnStatusTitle: "Built for images that stay online 24/7.",
    cdnStatusSub:
      "Every layer is engineered around zero-broken-link reliability, semantic accuracy, and search visibility.",
    metric1Stat: "0%",
    metric1Title: "Broken Links",
    metric1Desc:
      "24/7 cloud storage uptime — your images stay served even when your local machine is powered off.",
    metric1Sla: "99.999% SLA",
    metric2Stat: "1:1",
    metric2Title: "8K Realism Guard",
    metric2Desc:
      "A semantic parser locks every prompt to its intended subject, so nothing renders off-brief.",
    metric2Sla: "100% Photorealism",
    metric3Stat: "<50ms",
    metric3Title: "Instant SEO Alt",
    metric3Desc:
      "Korean ALT tags and WebP filenames generated automatically for maximum Google & Naver Search ranking.",
    metric3Sla: "Edge Velocity",
    showcaseTitle: "Your image. Always reachable.",
    showcaseDesc:
      "Store once, serve globally. TOVOAI exposes every production asset through a dedicated CDN endpoint so your content does not depend on a local workstation remaining online.",
    copyCdnBtn: "Copy CDN URL",
    copiedCdnBtn: "Copied!",
    copyToast: "CDN URL copied to clipboard",
    archEyebrow: "SYSTEM ARCHITECTURE",
    archTitle: "The image engine is only half the product.",
    archSub:
      "TOVOAI connects 8K rendering, semantic translation, metadata generation, and global edge delivery into one unified stack.",
    layer1Title: "100% Photorealistic Engine",
    layer1Desc:
      "A semantic prompt parser translates intent into structured visual instructions, eliminating stylized artifacts.",
    layer2Title: "Automatic Korean SEO Metadata",
    layer2Desc:
      "Each asset carries localized Korean ALT tags, meta-descriptions, and WebP slugs for search engine indexing.",
    layer3Title: "Cloudflare & Supabase Infrastructure",
    layer3Desc:
      "Dedicated storage and edge delivery provide a persistent public asset layer with zero quota limits.",
    flowTitle: "From Korean idea to globally delivered image.",
    flowSub: "Prompt → Semantic Parsing → 8K Render → SEO Alt → Cloud Storage → Edge CDN",
    footerCopy: "© 2026 TOVOAI Inc. All rights reserved. Version 1.01.0",
    edgeStatus: "server.uptime: 100% • region: icn1 • ALL SYSTEMS OPERATIONAL",
  },
  ko: {
    statusPill: "100% 가동률 • cdn.tovoai.com 글로벌 CDN 활성화됨",
    heroTitle1: "한계 없는",
    heroTitle2: "8K 포토리얼리스틱",
    heroTitle3: "AI 이미지 & SEO 엔진",
    heroSub:
      "한글 제목을 입력하면 1:1 정밀도로 영문 프롬프트를 생성하고, 8K 포토리얼리스틱 이미지를 렌더링한 뒤 로컬 PC의 전원과 무관하게 24시간 클라우드에서 무중단 서빙합니다.",
    promptConsoleTitle: "실시간 1:1 프롬프트 & SEO 파서",
    promptInputLabel: "한글 이미지 제목을 입력하세요:",
    promptInputPlaceholder: "예: 경복궁의 아침 안개",
    enPromptLabel: "영문 프롬프트 (1:1 정밀 번역)",
    seoAltLabel: "자동 생성 SEO ALT 및 파일명",
    openGalleryBtn: "스튜디오 갤러리 열기",
    adminSettingsBtn: "관리자 콘솔 설정",
    cdnStatusEyebrow: "글로벌 인프라 현황",
    cdnStatusTitle: "24시간 깨지지 않는 이미지 서빙",
    cdnStatusSub:
      "로컬 컴퓨터가 꺼져도 이미지는 글로벌 CDN 클라우드에서 끊김 없이 전 세계로 송출됩니다.",
    metric1Stat: "0%",
    metric1Title: "깨진 링크 비율",
    metric1Desc:
      "24시간 클라우드 스토리지 가동 — 로컬 PC 전원이 꺼져도 이미지는 지속적으로 서빙됩니다.",
    metric1Sla: "99.999% 가동률 SLA",
    metric2Stat: "1:1",
    metric2Title: "8K 리얼리즘 가드",
    metric2Desc:
      "의미론적 파서가 모든 프롬프트를 렌더링 목적에 정확히 고정시켜 의도와 다른 결과물을 방지합니다.",
    metric2Sla: "100% 포토리얼리즘",
    metric3Stat: "<50ms",
    metric3Title: "초고속 SEO ALT",
    metric3Desc:
      "구글 및 네이버 이미지 검색 최적화를 위한 한글 ALT 태그와 WebP 파일명이 자동 생성됩니다.",
    metric3Sla: "초고속 엣지 반응속도",
    showcaseTitle: "당신의 이미지, 365일 어디서나 접속 가능.",
    showcaseDesc:
      "한 번 저장으로 전 세계 서빙. TOVOAI의 모든 결과물은 전용 CDN 엔드포인트를 통해 즉시 서빙되므로 로컬 PC 구동 여부에 영향받지 않습니다.",
    copyCdnBtn: "CDN URL 복사",
    copiedCdnBtn: "복사 완료!",
    copyToast: "CDN URL이 클립보드에 복사되었습니다",
    archEyebrow: "시스템 아키텍처",
    archTitle: "렌더링 엔진은 전체 제품의 시작일 뿐입니다.",
    archSub:
      "TOVOAI는 8K 이미지 생성, 한국어 SEO 메타데이터, 클라우드 저장소, 글로벌 CDN 전달을 하나로 통합합니다.",
    layer1Title: "100% 포토리얼리스틱 엔진",
    layer1Desc:
      "의미론적 프롬프트 파서가 한국어 의도를 구조화된 영문 시각 지시어로 변환하여 왜곡 없는 8K 실사를 렌더링합니다.",
    layer2Title: "자동 한국어 SEO 메타데이터",
    layer2Desc:
      "모든 결과물에 네이버 및 구글 검색 수집을 위한 키워드 중심 한글 ALT 태그와 WebP 파일명이 자동 부착됩니다.",
    layer3Title: "Cloudflare & Supabase 인프라",
    layer3Desc:
      "전용 클라우드 스토리지와 엣지 라우팅을 통해 쿼터 제한 없이 영구적인 이미지를 클라우드에서 제공합니다.",
    flowTitle: "한글 아이디어부터 글로벌 CDN 서빙까지.",
    flowSub: "한글 프롬프트 → 시맨틱 파싱 → 8K 렌더링 → SEO ALT → 클라우드 저장 → 글로벌 CDN",
    footerCopy: "© 2026 TOVOAI Inc. All rights reserved. Version 1.01.0",
    edgeStatus: "server.uptime: 100% • region: icn1 • 모든 시스템 정상 작동 중",
  },
};

const CDN_SAMPLE_URL =
  "https://cdn.tovoai.com/storage/v1/object/public/post_images/sample.webp";

const TRANSLATION_MAP: Record<string, { en: string; alt: string }> = {
  "경복궁의 아침 안개": {
    en: "A breathtaking photorealistic 8K scene of Gyeongbokgung Palace at dawn, surrounded by soft morning mist, golden backlight, ultra-detailed korean architecture, cinematic volumetric lighting, 8k resolution.",
    alt: "경복궁_아침_안개_8K_실사_이미지.webp",
  },
  "부산 해운대 야경": {
    en: "A breathtaking photorealistic 8K night scene of Busan Haeundae skyline, neon reflections on wet pavement, long exposure oceanic reflections, cinematic atmosphere, 8k resolution.",
    alt: "부산_해운대_야경_8K_실사_이미지.webp",
  },
  "제주 유채꽃밭": {
    en: "An ultra-realistic 8K photograph of Jeju Island canola flower field under a pale spring sky, volcanic cone in the distance, soft natural morning light, 8k resolution.",
    alt: "제주_유채꽃밭_8K_실사_이미지.webp",
  },
};

function translateTitle(input: string): { en: string; alt: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return TRANSLATION_MAP["경복궁의 아침 안개"];
  }
  if (TRANSLATION_MAP[trimmed]) return TRANSLATION_MAP[trimmed];
  const slug = trimmed.replace(/\s+/g, "_");
  return {
    en: `An ultra-realistic 8K photograph of ${trimmed}, Korean atmospheric depth, natural lighting, physically accurate materials, ultra-detailed textures, cinematic Unreal Engine 5 render.`,
    alt: `${slug}_8K_실사_이미지.webp`,
  };
}

function useTypewriter(target: string, speedMs = 12) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [target, speedMs]);
  return output;
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [title, setTitle] = useState("경복궁의 아침 안개");
  const [committed, setCommitted] = useState("경복궁의 아침 안개");
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = DICT[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setCommitted(title), 260);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [title]);

  const result = useMemo(() => translateTitle(committed), [committed]);
  const enOut = useTypewriter(result.en);
  const altOut = useTypewriter(result.alt, 10);

  const copyCdnUrl = async () => {
    try {
      await navigator.clipboard.writeText(CDN_SAMPLE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = CDN_SAMPLE_URL;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {}
      document.body.removeChild(textArea);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      {/* Background ambient field */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-18rem] top-[-14rem] h-[38rem] w-[38rem] rounded-full bg-indigo-600/20 blur-[140px]" />
        <div className="absolute right-[-14rem] top-[15rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute bottom-[-20rem] left-[25%] h-[40rem] w-[40rem] rounded-full bg-violet-600/15 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Header Navigation */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "-translate-y-1" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="group flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">
                    TOVOAI
                  </span>
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-cyan-300">
                    v1.01.0
                  </span>
                </span>
              </Link>

              <nav className="hidden items-center gap-6 lg:flex">
                <a
                  href="#features"
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  Features
                </a>
                <a
                  href="#cdn-status"
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  CDN Status
                </a>
                <Link
                  href="/gallery"
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  8K Gallery
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  <Settings className="h-4 w-4" />
                  Admin Console (관리자)
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                {/* Language Switcher Button (EN / KO) */}
                <button
                  onClick={() => setLang((l) => (l === "en" ? "ko" : "en"))}
                  className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-xs font-bold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  aria-label="Toggle language"
                >
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{lang === "en" ? "EN 🇺🇸" : "KO 🇰🇷"}</span>
                </button>

                <Link
                  href="/gallery"
                  className="group relative hidden items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 sm:inline-flex"
                >
                  <ImageIcon className="h-4 w-4 text-cyan-300" />
                  <span>Launch Studio</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  className="rounded-lg p-2 text-slate-300 lg:hidden"
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
              <div className="mt-3 border-t border-white/10 pt-3 lg:hidden">
                <div className="flex flex-col gap-2 text-sm font-medium">
                  <a
                    href="#features"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5"
                  >
                    Features
                  </a>
                  <a
                    href="#cdn-status"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5"
                  >
                    CDN Status
                  </a>
                  <Link
                    href="/gallery"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5"
                  >
                    8K Gallery
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-indigo-400 hover:bg-white/5"
                  >
                    Admin Console (관리자)
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section (88px Ultra Typography + Hybrid Live Prompt Parser) */}
        <section className="px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pt-48">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 font-mono text-[11px] font-bold text-emerald-300 shadow-lg sm:text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t.statusPill}
              </div>

              <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
                <span className="block">{t.heroTitle1}</span>
                <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  {t.heroTitle2}
                </span>
                <span className="mt-2 block">{t.heroTitle3}</span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {t.heroSub}
              </p>

              {/* Live Interactive Prompt Translator Console with Typewriter */}
              <div className="mx-auto mt-12 max-w-4xl text-left">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="rounded-[20px] border border-white/[0.06] bg-slate-950/80 p-4 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                        <Zap className="h-4 w-4" />
                        {t.promptConsoleTitle}
                      </div>

                      <span className="hidden rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 font-mono text-[10px] text-indigo-300 sm:inline-flex">
                        KO → EN / 1:1 SEMANTIC TYPEWRITER
                      </span>
                    </div>

                    <label
                      htmlFor="title-input"
                      className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400"
                    >
                      {t.promptInputLabel}
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex min-w-0 flex-1 items-center rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-3 focus-within:border-indigo-400/60 focus-within:ring-1 focus-within:ring-indigo-400/40">
                        <Search className="h-4 w-4 shrink-0 text-slate-500 mr-2" />
                        <input
                          id="title-input"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={t.promptInputPlaceholder}
                          className="w-full bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-600 outline-none"
                        />
                      </div>
                      <Link
                        href="/gallery"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Generate</span>
                      </Link>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/[0.06] p-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                          {t.enPromptLabel}
                        </div>
                        <p className="mt-2 min-h-[3.5rem] font-mono text-xs leading-relaxed text-slate-200">
                          {enOut}
                          <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-indigo-400/80 align-middle" />
                        </p>
                      </div>

                      <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/[0.06] p-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          {t.seoAltLabel}
                        </div>
                        <p className="mt-2 min-h-[3.5rem] break-all font-mono text-xs leading-relaxed text-slate-200">
                          {altOut}
                          <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-cyan-400/80 align-middle" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/gallery"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 sm:w-auto"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>{t.openGalleryBtn}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/admin"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] sm:w-auto"
                >
                  <Settings className="h-4 w-4 text-indigo-400" />
                  <span>{t.adminSettingsBtn}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CDN Uptime & Speed Metrics Section */}
        <section id="cdn-status" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                {t.cdnStatusEyebrow}
              </span>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                {t.cdnStatusTitle}
              </h2>
              <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
                {t.cdnStatusSub}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl transition hover:border-cyan-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Cloud className="h-6 w-6" />
                </div>
                <div className="mt-6 text-4xl font-black text-white">
                  {t.metric1Stat}
                </div>
                <div className="mt-1 text-base font-bold text-slate-200">
                  {t.metric1Title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {t.metric1Desc}
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>SLA Status</span>
                  <span className="text-cyan-400 font-bold">{t.metric1Sla}</span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl transition hover:border-indigo-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="mt-6 text-4xl font-black text-white">
                  {t.metric2Stat}
                </div>
                <div className="mt-1 text-base font-bold text-slate-200">
                  {t.metric2Title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {t.metric2Desc}
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>Accuracy Guard</span>
                  <span className="text-indigo-400 font-bold">{t.metric2Sla}</span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl transition hover:border-violet-400/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="mt-6 text-4xl font-black text-white">
                  {t.metric3Stat}
                </div>
                <div className="mt-1 text-base font-bold text-slate-200">
                  {t.metric3Title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {t.metric3Desc}
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>Speed Rating</span>
                  <span className="text-violet-400 font-bold">{t.metric3Sla}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CDN Showcase & Copy Section */}
        <section id="gallery" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-2xl">
              <div className="grid lg:grid-cols-[1fr,1.1fr]">
                <div className="relative min-h-[400px] overflow-hidden border-b border-white/10 lg:min-h-[500px] lg:border-b-0 lg:border-r">
                  <img
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=90"
                    alt="TOVOAI 8K Photorealistic Sample"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1.5 font-mono text-[10px] text-emerald-300 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE ON CDN
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Network className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-3xl font-black text-white">
                    {t.showcaseTitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {t.showcaseDesc}
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950 p-3">
                    <div className="mb-2 flex items-center justify-between px-2 font-mono text-[10px] text-slate-500">
                      <span>PUBLIC CDN URL</span>
                      <span className="text-emerald-400">ACTIVE SLA</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2">
                      <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-slate-300 px-2">
                        {CDN_SAMPLE_URL}
                      </code>

                      <button
                        type="button"
                        onClick={copyCdnUrl}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-50"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>{t.copiedCdnBtn}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>{t.copyCdnBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Architecture Section */}
        <section id="features" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-violet-400">
                {t.archEyebrow}
              </span>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                {t.archTitle}
              </h2>
              <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto">
                {t.archSub}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <Cpu className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-lg font-bold text-white">
                  {t.layer1Title}
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {t.layer1Desc}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Search className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-lg font-bold text-white">
                  {t.layer2Title}
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {t.layer2Desc}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <Cloud className="h-6 w-6" />
                </div>
                <h4 className="mt-6 text-lg font-bold text-white">
                  {t.layer3Title}
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {t.layer3Desc}
                </p>
              </div>
            </div>

            {/* Architecture Pipeline Flow */}
            <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/10 via-slate-900 to-cyan-500/10 p-8 backdrop-blur-xl">
              <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                <div>
                  <div className="font-mono text-xs font-bold text-indigo-300">
                    PIPELINE FLOW
                  </div>
                  <h4 className="mt-1 text-xl font-bold text-white">
                    {t.flowTitle}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">{t.flowSub}</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 font-mono text-xs text-indigo-300">
                    Prompt
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <span className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 font-mono text-xs text-cyan-300">
                    AI Engine
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <span className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 font-mono text-xs text-violet-300">
                    Storage
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                  <span className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-300">
                    CDN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="font-bold text-white">TOVOAI</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">{t.footerCopy}</p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <a
                href="https://tovoai.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1"
              >
                <Globe2 className="h-3.5 w-3.5" /> tovoai.com
              </a>
              <a
                href="https://cdn.tovoai.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1"
              >
                <Cloud className="h-3.5 w-3.5" /> cdn.tovoai.com
              </a>
              <Link
                href="/admin"
                className="hover:text-indigo-400 flex items-center gap-1 text-indigo-400"
              >
                <Settings className="h-3.5 w-3.5" /> /admin (관리자)
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.edgeStatus}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
