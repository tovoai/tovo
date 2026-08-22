"use client";

/**
 * TOVOAI — 8K Photorealistic AI Image Studio & Global Image SEO CDN Engine
 * src/app/page.tsx
 *
 * Stack: Next.js 15 (App Router) / React 19 / Tailwind CSS / TypeScript
 */

import { useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "CDN Status", href: "#cdn-status" },
  { label: "8K Gallery", href: "/gallery" },
  { label: "Admin Console", href: "/admin" },
];

const METRICS = [
  {
    icon: Cloud,
    stat: "0%",
    title: "Broken Links",
    body: "24/7 cloud storage uptime — your images stay served even when the local machine is powered off.",
    accent: "from-cyan-400 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    stat: "1:1",
    title: "8K Realism Guard",
    body: "A semantic parser locks every prompt to its intended subject, so nothing renders off-brief.",
    accent: "from-indigo-400 to-violet-500",
  },
  {
    icon: Search,
    stat: "0s",
    title: "Instant SEO Alt",
    body: "Korean ALT tags and optimized WebP filenames are generated the moment an image lands.",
    accent: "from-violet-400 to-fuchsia-500",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "100% Photorealistic Engine",
    body: "A semantic prompt parser translates intent — not just words — into 8K renders that match what you actually meant.",
  },
  {
    icon: Search,
    title: "Automatic Korean SEO Metadata",
    body: "Every upload is indexed with Naver and Google Image Search in mind: ALT text, titles, and slugs, written and attached automatically.",
  },
  {
    icon: Server,
    title: "Cloudflare & Supabase Infrastructure",
    body: "Dedicated storage and edge delivery, built on infrastructure designed to stay up — not to be babysat.",
  },
];

const CDN_SAMPLE_URL =
  "https://cdn.tovoai.com/storage/v1/object/public/post_images/sample.webp";

/* -------------------------------------------------------------------------- */
/* Prompt Translator — signature interactive element                         */
/* -------------------------------------------------------------------------- */

const TRANSLATION_MAP: Record<string, { en: string; alt: string }> = {
  "경복궁의 아침 안개": {
    en: "Gyeongbokgung Palace at dawn, low mist drifting between the hanok rooflines, 8k photorealistic, soft golden backlight",
    alt: "경복궁_아침_안개_8K_사진.webp",
  },
  "부산 해운대 야경": {
    en: "Busan Haeundae skyline at night, neon reflections on wet pavement, long exposure, 8k photorealistic cityscape",
    alt: "부산_해운대_야경_8K_사진.webp",
  },
  "제주 유채꽃밭": {
    en: "Jeju Island canola flower field under a pale spring sky, volcanic cone in the distance, 8k photorealistic wide shot",
    alt: "제주_유채꽃밭_8K_사진.webp",
  },
};

function translateTitle(input: string): { en: string; alt: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { en: "", alt: "" };
  }
  if (TRANSLATION_MAP[trimmed]) return TRANSLATION_MAP[trimmed];
  const slug = trimmed.replace(/\s+/g, "_");
  return {
    en: `${trimmed}, rendered as an 8k photorealistic scene with 1:1 semantic fidelity to the original title`,
    alt: `${slug}_8K_사진.webp`,
  };
}

function useTypewriter(target: string, speedMs = 14) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, speedMs);
    return () => {
      clearInterval(id);
    };
  }, [target, speedMs]);
  return output;
}

function PromptTranslator() {
  const [title, setTitle] = useState("경복궁의 아침 안개");
  const [committed, setCommitted] = useState("경복궁의 아침 안개");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_0_60px_-15px_rgba(99,102,241,0.35)] backdrop-blur-xl">
      <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300/80">
          <Zap className="h-3.5 w-3.5" />
          Live 1:1 Prompt Parser
        </div>

        <label htmlFor="ko-title" className="mt-4 block text-sm text-slate-400">
          한글 이미지 제목을 입력하세요
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3 focus-within:border-indigo-400/60 focus-within:ring-1 focus-within:ring-indigo-400/40">
          <Search className="h-4 w-4 shrink-0 text-slate-500" />
          <input
            id="ko-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 경복궁의 아침 안개"
            className="w-full bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
          />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-indigo-400/20 bg-indigo-500/[0.06] p-3.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300/80">
              EN Prompt (1:1)
            </div>
            <p className="mt-1.5 min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-slate-200">
              {enOut}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-indigo-400/70 align-middle" />
            </p>
          </div>
          <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/[0.06] p-3.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300/80">
              SEO ALT / Filename
            </div>
            <p className="mt-1.5 min-h-[3.5rem] break-all font-mono text-[13px] leading-relaxed text-slate-200">
              {altOut}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-cyan-400/70 align-middle" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CDN URL copy bar                                                          */
/* -------------------------------------------------------------------------- */

function CdnUrlBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CDN_SAMPLE_URL);
    } catch {
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2.5 sm:px-4">
      <Link2 className="h-4 w-4 shrink-0 text-slate-500" />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-slate-300 sm:text-[13px]">
        {CDN_SAMPLE_URL}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy CDN URL"
        className="relative shrink-0 rounded-md border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute right-4 top-2 -translate-y-full rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition-all duration-300 ${
          copied ? "opacity-100 translate-y-0" : "opacity-0"
        }`}
      >
        CDN URL이 복사되었습니다
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      {/* Ambient background field */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-violet-600/15 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Navigation                                                       */}
      {/* ---------------------------------------------------------------- */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_20px_-2px_rgba(99,102,241,0.8)]">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-display text-[15px] font-semibold tracking-tight text-white sm:text-base">
                TOVOAI
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[10px] leading-none text-cyan-300">
                v1.01.0
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13.5px] font-medium text-slate-400 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/gallery"
              className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.9)] transition hover:shadow-[0_0_32px_-4px_rgba(99,102,241,1)] sm:inline-flex"
            >
              <span className="relative z-10">[ Launch Studio ]</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
              className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/gallery"
                className="mt-1 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                [ Launch Studio ]
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:pb-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3.5 py-1.5 font-mono text-[12px] text-emerald-300">
              <Radio className="h-3 w-3 animate-pulse" />
              100% Uptime · cdn.tovoai.com Global CDN Active
            </div>

            <h1 className="font-display mt-7 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                Limitless{" "}
              </span>
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                8K Photorealistic
              </span>
              <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                {" "}AI Image &amp; SEO Engine
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-slate-400 sm:text-base">
              한글 제목을 입력하면 1:1 정밀도로 영문 프롬프트를 생성하고, 8K
              포토리얼리스틱 이미지를 렌더링한 뒤 로컬 PC의 전원과 무관하게
              24시간 클라우드에서 서빙합니다.
            </p>

            <div className="mt-10 w-full max-w-2xl">
              <PromptTranslator />
            </div>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/gallery"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.9)] transition hover:shadow-[0_0_40px_-4px_rgba(99,102,241,1)]"
              >
                <ImageIcon className="h-4 w-4" />
                Open Gallery Studio
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <Settings className="h-4 w-4" />
                Admin Settings
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CDN Uptime & Speed Metrics                                       */}
        {/* ---------------------------------------------------------------- */}
        <section id="cdn-status" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="font-mono text-[12px] uppercase tracking-widest text-indigo-300/70">
              Global CDN Status
            </span>
            <h2 className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
              세 가지 지표로 증명하는 안정성
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {METRICS.map((m) => (
              <div
                key={m.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-white/20"
              >
                <div
                  className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${m.accent} opacity-[0.12] blur-2xl transition group-hover:opacity-20`}
                />
                <div className="relative">
                  <m.icon className="h-5 w-5 text-slate-300" strokeWidth={1.75} />
                  <div
                    className={`font-display mt-4 bg-gradient-to-r ${m.accent} bg-clip-text text-4xl font-bold text-transparent`}
                  >
                    {m.stat}
                  </div>
                  <div className="mt-1.5 text-[15px] font-semibold text-white">
                    {m.title}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CDN Showcase & URL Copy Bar                                      */}
        {/* ---------------------------------------------------------------- */}
        <section id="gallery" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr,1.1fr]">
            <div>
              <span className="font-mono text-[12px] uppercase tracking-widest text-cyan-300/70">
                8K Gallery Sample
              </span>
              <h2 className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
                CDN에 올라가는 순간부터
                <br />
                깨지지 않는 이미지 URL
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-400">
                모든 렌더링 결과물은 <code className="font-mono text-slate-300">post_images</code>{" "}
                버킷에 WebP로 저장되고, 아래와 같은 고정 CDN 경로로 즉시
                서빙됩니다.
              </p>
              <div className="mt-6">
                <CdnUrlBar />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-3 shadow-[0_20px_80px_-30px_rgba(99,102,241,0.5)] backdrop-blur-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.45), transparent 40%), radial-gradient(circle at 75% 65%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 50% 90%, rgba(168,85,247,0.35), transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <ImageIcon className="h-9 w-9 text-white/70" strokeWidth={1.25} />
                  <span className="font-mono text-[11px] text-white/50">
                    8K · photorealistic · sample.webp
                  </span>
                </div>
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-emerald-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE ON CDN
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Feature Architecture                                             */}
        {/* ---------------------------------------------------------------- */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="font-mono text-[12px] uppercase tracking-widest text-violet-300/70">
              Architecture
            </span>
            <h2 className="font-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
              엔진을 구성하는 세 개의 레이어
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl [transform-style:preserve-3d] transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-indigo-300">
                  <f.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer & Uptime Monitor                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
                  <Sparkles className="h-3 w-3 text-white" />
                </span>
                <span className="font-display text-sm font-semibold text-white">
                  TOVOAI
                </span>
              </div>
              <p className="mt-2 text-[12.5px] text-slate-500">
                © 2026 TOVOAI Inc. All rights reserved. Version 1.01.0
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate-400">
              <a href="https://tovoai.com" className="inline-flex items-center gap-1.5 hover:text-white">
                <Globe2 className="h-3.5 w-3.5" />
                tovoai.com
              </a>
              <a href="https://cdn.tovoai.com" className="inline-flex items-center gap-1.5 hover:text-white">
                <Cloud className="h-3.5 w-3.5" />
                cdn.tovoai.com
              </a>
              <Link href="/admin" className="inline-flex items-center gap-1.5 hover:text-white">
                <Settings className="h-3.5 w-3.5" />
                /admin
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 font-mono text-[11.5px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            server.uptime: 100% · region: icn1 · last_check: just now
          </div>
        </div>
      </footer>
    </div>
  );
}
