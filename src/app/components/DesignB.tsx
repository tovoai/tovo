"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleCheck,
  Cloud,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  Layers3,
  Menu,
  Network,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const CDN_URL =
  "https://cdn.tovoai.com/storage/v1/object/public/post_images/sample.webp";

const DEFAULT_TITLE = "경복궁의 아침 안개";

const PROMPT_MAP: Record<string, string> = {
  "경복궁의 아침 안개":
    "A breathtaking photorealistic 8K scene of Gyeongbokgung Palace at dawn, surrounded by soft morning mist, subtle golden sunlight, realistic Korean architecture, cinematic atmosphere, ultra-detailed textures, natural volumetric lighting, true-to-life colors, physically accurate reflections, professional architectural photography.",
  "부산 광안대교의 밤":
    "A breathtaking photorealistic 8K night scene of Gwangan Bridge in Busan, Korea, illuminated against the dark ocean, realistic city lights, subtle reflections across the water, cinematic atmosphere, ultra-detailed architecture, natural night exposure, professional long-exposure photography.",
  "서울의 비 오는 거리":
    "A photorealistic 8K cinematic street scene in Seoul during rainfall, wet asphalt reflecting city lights, realistic Korean urban architecture, pedestrians with umbrellas, atmospheric depth, natural reflections, physically accurate lighting, ultra-detailed textures, professional street photography.",
};

function translatePrompt(title: string) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    return PROMPT_MAP[DEFAULT_TITLE];
  }

  if (PROMPT_MAP[cleanTitle]) {
    return PROMPT_MAP[cleanTitle];
  }

  return `A photorealistic 8K cinematic scene inspired by "${cleanTitle}", realistic Korean atmosphere, natural lighting, physically accurate materials, ultra-detailed textures, authentic environmental details, realistic depth and perspective, professional photography, true-to-life colors, high dynamic range.`;
}

function generateAlt(title: string) {
  const cleanTitle = title.trim() || DEFAULT_TITLE;
  return `${cleanTitle} — 8K 실사 이미지 | TOVOAI`;
}

export default function DesignB() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const englishPrompt = useMemo(() => translatePrompt(title), [title]);
  const seoAlt = useMemo(() => generateAlt(title), [title]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function copyCdnUrl() {
    try {
      await navigator.clipboard.writeText(CDN_URL);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = CDN_URL;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (err) {
        console.error('Failed to copy', err);
      }
      document.body.removeChild(textArea);
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    }
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-cyan-400/30 selection:text-white font-sans pt-12">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-18rem] top-[-14rem] h-[38rem] w-[38rem] rounded-full bg-indigo-600/20 blur-[130px]" />
        <div className="absolute right-[-14rem] top-[15rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-[-20rem] left-[25%] h-[40rem] w-[40rem] rounded-full bg-violet-600/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <header className={`fixed left-0 right-0 top-12 z-40 px-4 pt-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? '-translate-y-2' : ''}`}>
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/[0.09] bg-slate-950/70 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                className="group flex items-center gap-3"
                aria-label="TOVOAI home"
              >
                <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-indigo-300/20 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
                  <span className="absolute inset-[1px] rounded-[10px] bg-slate-950/30" />
                  <Sparkles className="relative h-4 w-4 text-white" />
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-[-0.04em] text-white">
                    TOVOAI
                  </span>
                  <span className="hidden rounded-md border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-cyan-300 sm:inline-flex">
                    v1.01.0 (시안 B)
                  </span>
                </span>
              </Link>

              <nav className="hidden items-center gap-1 lg:flex">
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#cdn-status">CDN Status</NavLink>
                <NavLink href="#gallery">8K Gallery</NavLink>
                <Link
                  href="/admin"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Admin Console
                </Link>
              </nav>

              <div className="hidden items-center gap-3 sm:flex">
                <Link
                  href="#gallery"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-bold text-white transition hover:border-indigo-300/50 hover:bg-indigo-500/20"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <ImageIcon className="relative h-4 w-4 text-cyan-300" />
                  <span className="relative">Launch Studio</span>
                  <ArrowUpRight className="relative h-3.5 w-3.5 text-slate-400" />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            {mobileOpen && (
              <div className="border-t border-white/[0.07] px-4 pb-4 pt-2 lg:hidden">
                <div className="flex flex-col gap-1">
                  <MobileNavLink href="#features" onClick={closeMobile}>
                    Features
                  </MobileNavLink>
                  <MobileNavLink href="#cdn-status" onClick={closeMobile}>
                    CDN Status
                  </MobileNavLink>
                  <MobileNavLink href="#gallery" onClick={closeMobile}>
                    8K Gallery
                  </MobileNavLink>
                  <Link
                    href="/admin"
                    onClick={closeMobile}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
                  >
                    Admin Console
                  </Link>
                  <Link
                    href="#gallery"
                    onClick={closeMobile}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Launch Studio
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="relative px-4 pb-24 pt-36 sm:px-6 sm:pb-32 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] font-bold tracking-wide text-emerald-300 shadow-lg shadow-emerald-500/5 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              100% Uptime
              <span className="text-slate-600">•</span>
              cdn.tovoai.com Global CDN Active
            </div>

            <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              <span className="block">Limitless</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                8K Photorealistic
              </span>
              <span className="mt-2 block">AI Image &amp; SEO Engine</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Korean-to-English 1:1 prompt precision meets always-on cloud
              infrastructure. Generate cinematic 8K imagery, automatically
              create Korean SEO metadata, and serve every asset through a
              global CDN designed for zero broken links.
            </p>

            <div className="mx-auto mt-12 max-w-5xl text-left">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="rounded-[20px] border border-white/[0.06] bg-slate-950/80 p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-cyan-300" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Prompt Precision Console
                      </span>
                    </div>

                    <span className="hidden rounded-full border border-indigo-400/20 bg-indigo-400/5 px-2 py-1 font-mono text-[9px] text-indigo-300 sm:inline-flex">
                      KO → EN / 1:1 SEMANTIC
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex min-w-0 flex-1 items-center rounded-xl border border-white/10 bg-white/[0.035]">
                      <Search className="ml-4 h-4 w-4 shrink-0 text-slate-500" />
                      <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        aria-label="Korean image title"
                        className="w-full bg-transparent px-3 py-4 text-sm font-medium text-white outline-none placeholder:text-slate-600"
                      />
                      <span className="mr-3 hidden rounded-md bg-white/5 px-2 py-1 font-mono text-[9px] text-slate-500 sm:block">
                        LIVE
                      </span>
                    </div>

                    <Link
                      href="#gallery"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400"
                    >
                      Generate
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <PromptPreview
                      label="ENGLISH PROMPT"
                      icon={<Globe2 className="h-3.5 w-3.5" />}
                      value={englishPrompt}
                    />

                    <PromptPreview
                      label="SEO ALT"
                      icon={<Search className="h-3.5 w-3.5" />}
                      value={seoAlt}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#gallery"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-white/5 transition hover:bg-cyan-50 sm:w-auto"
              >
                <ImageIcon className="h-4 w-4" />
                Open Gallery Studio
                <span className="font-mono text-xs text-slate-500">
                  /gallery
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/admin"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07] sm:w-auto"
              >
                <Settings className="h-4 w-4" />
                Admin Settings
                <span className="font-mono text-xs text-slate-600">
                  /admin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cdn-status" className="scroll-mt-28 px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionEyebrow
            eyebrow="LIVE INFRASTRUCTURE"
            title="Built for images that stay online."
            description="Every layer is designed around reliability, semantic accuracy, and search visibility."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<CircleCheck className="h-5 w-5" />}
              number="0%"
              label="Broken Links"
              description="24/7 cloud storage uptime even when the local production PC is offline."
              accent="emerald"
            />

            <MetricCard
              icon={<ShieldCheck className="h-5 w-5" />}
              number="8K"
              label="Realism Guard"
              description="1:1 semantic parsing keeps generated imagery aligned with the original intent."
              accent="violet"
            />

            <MetricCard
              icon={<Search className="h-5 w-5" />}
              number="SEO"
              label="Instant Alt"
              description="Automatically generated Korean ALT tags and optimized WebP filenames."
              accent="cyan"
            />
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-28 px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/30">
            <div className="grid lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[430px] overflow-hidden border-b border-white/10 lg:min-h-[620px] lg:border-b-0 lg:border-r">
                <img
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=90"
                  alt="Photorealistic architectural scene representing TOVOAI 8K image generation"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 to-cyan-950/10 mix-blend-screen" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/60 px-3 py-2 font-mono text-[9px] font-bold tracking-wider text-white backdrop-blur-xl sm:left-7 sm:top-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/80" />
                  8K PHOTOREALISTIC
                </div>

                <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    TOVOAI / IMAGE_001
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Semantic image generation.
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
                    One Korean concept transformed into a precise visual
                    instruction and a search-ready asset.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
                  <Network className="h-5 w-5 text-cyan-300" />
                </div>

                <div className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  GLOBAL ASSET DELIVERY
                </div>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                  Your image.
                  <br />
                  <span className="text-slate-500">Always reachable.</span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Store once, serve globally. TOVOAI exposes every production
                  asset through a dedicated CDN endpoint so your content does
                  not depend on a local workstation remaining online.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="mb-2 flex items-center justify-between px-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      PUBLIC CDN URL
                    </span>

                    <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                      <CircleCheck className="h-3 w-3" />
                      ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-slate-950/80 p-2">
                    <code className="min-w-0 flex-1 overflow-hidden px-2 text-ellipsis whitespace-nowrap font-mono text-[10px] leading-5 text-slate-400">
                      {CDN_URL}
                    </code>

                    <button
                      type="button"
                      onClick={copyCdnUrl}
                      className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-50"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            Copy CDN URL
                          </span>
                          <span className="sm:hidden">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <MiniStat label="Storage" value="Cloud" />
                  <MiniStat label="Delivery" value="Global CDN" />
                  <MiniStat label="Format" value="WebP" />
                  <MiniStat label="Availability" value="24 / 7 / 365" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-28 px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionEyebrow
            eyebrow="SYSTEM ARCHITECTURE"
            title="The image engine is only half the product."
            description="TOVOAI connects generation, metadata, storage, and delivery into one image infrastructure."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <ArchitectureCard
              number="01"
              icon={<Cpu className="h-5 w-5" />}
              title="100% Photorealistic Engine"
              description="A semantic prompt layer translates intent into structured visual instructions, reducing the gap between what you describe and what the model renders."
              tags={["Semantic Parser", "8K", "Prompt Precision"]}
            />

            <ArchitectureCard
              number="02"
              icon={<Search className="h-5 w-5" />}
              title="Automatic Korean SEO Metadata"
              description="Each asset can carry Korean ALT metadata and optimized filenames designed for discoverability across Google and Naver image search."
              tags={["Korean ALT", "WebP", "Image SEO"]}
            />

            <ArchitectureCard
              number="03"
              icon={<Cloud className="h-5 w-5" />}
              title="Cloudflare & Supabase Infrastructure"
              description="Dedicated cloud storage and edge delivery provide a persistent public asset layer independent from your local image production environment."
              tags={["Cloudflare", "Supabase", "CDN"]}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-400/10 bg-gradient-to-br from-indigo-500/[0.07] via-white/[0.025] to-cyan-500/[0.05] p-6 sm:p-8 lg:p-10">
            <div className="absolute right-[-5rem] top-[-5rem] h-60 w-60 rounded-full bg-indigo-500/10 blur-[80px]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                  <Layers3 className="h-3.5 w-3.5" />
                  IMAGE INFRASTRUCTURE
                </div>

                <h2 className="mt-4 max-w-3xl text-2xl font-black tracking-tight text-white sm:text-3xl">
                  From Korean idea to globally delivered image.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Prompt → semantic parsing → image generation → SEO metadata
                  → cloud storage → global CDN.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
                <FlowNode icon={<Terminal className="h-3.5 w-3.5" />} label="Prompt" />
                <FlowArrow />
                <FlowNode icon={<Cpu className="h-3.5 w-3.5" />} label="AI Engine" />
                <FlowArrow />
                <FlowNode icon={<Database className="h-3.5 w-3.5" />} label="Storage" />
                <FlowArrow />
                <FlowNode icon={<Globe2 className="h-3.5 w-3.5" />} label="CDN" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-6 py-16 text-center shadow-2xl shadow-black/30 sm:px-10">
            <div className="absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[90px]" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                <Zap className="h-6 w-6 text-violet-300" />
              </div>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Build your image library
                <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  without infrastructure limits.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Generate, optimize, store, and deliver your visual assets from
                one premium AI image environment.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="#gallery"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-cyan-50"
                >
                  <ImageIcon className="h-4 w-4" />
                  Open Gallery Studio
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
                >
                  <Settings className="h-4 w-4" />
                  Admin Console
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-black/20 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="font-black tracking-[-0.03em] text-white">
                  TOVOAI
                </span>
              </Link>

              <p className="mt-3 text-xs leading-5 text-slate-600">
                © 2026 TOVOAI Inc. All rights reserved.
                <span className="mx-2 text-slate-800">•</span>
                Version 1.01.0
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs">
              <a
                href="https://tovoai.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-500 transition hover:text-white"
              >
                tovoai.com
                <ExternalLink className="h-3 w-3" />
              </a>

              <a
                href="https://cdn.tovoai.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-500 transition hover:text-white"
              >
                cdn.tovoai.com
                <ExternalLink className="h-3 w-3" />
              </a>

              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-slate-500 transition hover:text-white"
              >
                /admin
                <Settings className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.05] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-700">
              <Server className="h-3 w-3" />
              TOVOAI GLOBAL EDGE MONITOR
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] text-emerald-500/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              ALL SYSTEMS OPERATIONAL
              <BarChart3 className="h-3 w-3" />
            </div>
          </div>
        </div>
      </footer>

      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
          copied
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          CDN URL copied to clipboard
        </div>
      </div>
    </main>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}

function SectionEyebrow({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/60" />
        {eyebrow}
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function MetricCard({ icon, number, label, description, accent }: { icon: React.ReactNode; number: string; label: string; description: string; accent: 'emerald' | 'violet' | 'cyan' }) {
  const accentClasses = {
    emerald: {
      border: "hover:border-emerald-400/30",
      icon: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
      glow: "bg-emerald-400/10",
    },
    violet: {
      border: "hover:border-violet-400/30",
      icon: "text-violet-300 bg-violet-400/10 border-violet-400/20",
      glow: "bg-violet-400/10",
    },
    cyan: {
      border: "hover:border-cyan-400/30",
      icon: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
      glow: "bg-cyan-400/10",
    },
  };

  const current = accentClasses[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 ${current.border}`}
    >
      <div
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[50px] ${current.glow}`}
      />

      <div className="relative">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${current.icon}`}
        >
          {icon}
        </div>

        <div className="mt-8 flex items-end gap-2">
          <span className="text-4xl font-black tracking-[-0.05em] text-white">
            {number}
          </span>
          <span className="pb-1 text-sm font-bold text-slate-500">
            {label}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function PromptPreview({ label, icon, value }: { label: string; icon: React.ReactNode; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.16em] text-slate-500">
        {icon}
        {label}
      </div>

      <p className="mt-3 max-h-20 overflow-hidden text-xs leading-5 text-slate-400">
        {value}
      </p>
    </div>
  );
}

function ArchitectureCard({ number, icon, title, description, tags }: { number: string; icon: React.ReactNode; title: string; description: string; tags: string[] }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:bg-white/[0.04] sm:p-7">
      <div className="absolute right-[-2rem] top-[-2rem] h-32 w-32 rounded-full bg-indigo-500/10 blur-[55px] transition group-hover:bg-indigo-500/15" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-300">
            {icon}
          </div>

          <span className="font-mono text-[10px] font-bold tracking-widest text-slate-700">
            {number}
          </span>
        </div>

        <h3 className="mt-8 text-xl font-black tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/[0.07] bg-black/20 px-2.5 py-1.5 font-mono text-[9px] font-bold text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
      <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </div>
      <div className="mt-1 text-xs font-bold text-slate-300">{value}</div>
    </div>
  );
}

function FlowNode({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-950/60 px-3 py-2.5">
      <span className="text-indigo-300">
        {icon}
      </span>
      <span className="font-mono text-[9px] font-bold text-slate-400">
        {label}
      </span>
    </div>
  );
}

function FlowArrow() {
  return (
    <ChevronRight className="hidden h-3.5 w-3.5 text-slate-700 sm:block" />
  );
}
