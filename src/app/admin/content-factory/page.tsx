'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  FileText,
  ImageIcon,
  ArrowRight,
  Send,
  Loader2,
  Cpu,
  Key,
  Plus,
  Globe,
  Share2,
  ExternalLink
} from 'lucide-react'

export default function ContentFactoryPage() {
  const [topic, setTopic] = useState('부산 맛집')
  const [selectedModel, setSelectedModel] = useState('gemma-4-31b-it')
  const [googleApiKey, setGoogleApiKey] = useState('')
  
  const [loadingStrategy, setLoadingStrategy] = useState(false)
  const [strategies, setStrategies] = useState<any[] | null>(null)
  
  // Selected Strategy State
  const [selectedStrategy, setSelectedStrategy] = useState<any | null>(null)
  const [finalTitle, setFinalTitle] = useState('')
  const [coreKeyword, setCoreKeyword] = useState('')
  const [midKeyword, setMidKeyword] = useState('')
  const [nicheKeyword, setNicheKeyword] = useState('')
  const [longtailKeyword, setLongtailKeyword] = useState('')

  // Generation & Publishing State
  const [generatingBlog, setGeneratingBlog] = useState(false)
  const [generatedArticle, setGeneratedArticle] = useState<any | null>(null)
  const [copiedBlog, setCopiedBlog] = useState(false)
  const [injectedImages, setInjectedImages] = useState<Record<number, any>>({})
  
  const [publishing, setPublishing] = useState(false)
  const [publishedLiveUrl, setPublishedLiveUrl] = useState('')

  // Step 1: Recommend 4-stage Long-tail Keyword Strategy
  const handleRecommendStrategy = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingStrategy(true)
    setStrategies(null)
    setGeneratedArticle(null)
    setInjectedImages({})
    setPublishedLiveUrl('')

    try {
      const res = await fetch('/api/blog-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          model: selectedModel,
          googleApiKey
        })
      })
      const data = await res.json()
      if (data.success) {
        setStrategies(data.strategies)
        selectStrategyItem(data.strategies[0])
      }
    } catch {
      // Handle error
    } finally {
      setLoadingStrategy(false)
    }
  }

  const selectStrategyItem = (item: any) => {
    setSelectedStrategy(item)
    setFinalTitle(item.title)
    setCoreKeyword(item.coreKeyword)
    setMidKeyword(item.midKeyword)
    setNicheKeyword(item.nicheKeyword)
    setLongtailKeyword(item.longtailKeyword)
  }

  // Step 2: Generate Long-tail Focused Article
  const handleGenerateArticleOnly = async () => {
    if (!finalTitle) return
    setGeneratingBlog(true)
    setGeneratedArticle(null)
    setInjectedImages({})
    setPublishedLiveUrl('')

    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: finalTitle,
          coreKeyword,
          midKeyword,
          nicheKeyword,
          longtailKeyword,
          model: selectedModel,
          googleApiKey
        })
      })
      const data = await res.json()
      if (data.success) {
        setGeneratedArticle(data)
      }
    } catch {
      // Error
    } finally {
      setGeneratingBlog(false)
    }
  }

  // Step 3: Publish to Public Blog (/blog/[slug])
  const handlePublishPost = async () => {
    if (!generatedArticle) return
    setPublishing(true)

    try {
      const res = await fetch('/api/publish-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedArticle.title,
          longtailKeyword: generatedArticle.longtailKeyword,
          keywords: generatedArticle.keywords,
          content: generatedArticle.fullText
        })
      })
      const data = await res.json()
      if (data.success) {
        setPublishedLiveUrl(data.liveUrl)
      }
    } catch {
      // Error
    } finally {
      setPublishing(false)
    }
  }

  const copyFullBlog = () => {
    if (!generatedArticle) return
    navigator.clipboard.writeText(generatedArticle.fullText)
    setCopiedBlog(true)
    setTimeout(() => setCopiedBlog(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 mb-2">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            LONG-TAIL SEO TRAFFIC ENGINE &amp; PUBLIC BLOG PUBLISHER
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            🤖 컨텐츠생성기 (롱테일 SEO 중심 &amp; 실시간 블로그 발행)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            롱테일 키워드(전환율 95%+) 추출 ➔ 고품질 아티클 작성 ➔ N개 시각 키워드 파싱 ➔ 공개 블로그(/blog) 실시간 발행
          </p>
        </div>

        <Link
          href="/blog"
          target="_blank"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>공개 블로그 라이브 보러가기</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </Link>
      </div>

      {/* Input Topic & Multi-LLM Model Selection Area */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
        {/* Model Selection Dropdown */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-purple-300 font-bold mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              구글 AI LLM 선택 (기본: gemma-4-31b-it):
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
            >
              <option value="gemma-4-31b-it">⭐ gemma-4-31b-it (기본 추천 모델)</option>
              <option value="gemma-4-26b-a4b-it">gemma-4-26b-a4b-it</option>
              <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite</option>
              <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite</option>
              <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              Google AI Studio API Key (선택):
            </label>
            <input
              type="password"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              placeholder="미입력 시 기본 엔진 작동"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <form onSubmit={handleRecommendStrategy} className="space-y-4">
          <label className="block text-xs font-mono text-slate-300 font-bold">
            초기 타겟 키워드 (또는 주제):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="예: 부산 맛집"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={loadingStrategy}
              className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loadingStrategy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                  <span>롱테일 전략 분석 중...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>💡 롱테일 전략 추천</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Recommended Title & Strategy Keyword Set */}
        {strategies && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
              <span>🔥 롱테일 중심 4단계 키워드 추천 세트</span>
              <span className="text-[10px] text-slate-500">Engine: {selectedModel}</span>
            </div>

            <div className="space-y-3">
              {strategies.map((item) => {
                const isSelected = selectedStrategy?.id === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => selectStrategyItem(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{item.title}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-mono">
                          {item.score}점
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          핵심: {item.coreKeyword}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          중간: {item.midKeyword}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          틈새: {item.nicheKeyword}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-500/50 font-bold">
                          {item.longtailKeyword}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Selected Editor Setup */}
        {selectedStrategy && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="text-xs font-mono font-bold text-slate-300">
              최종 제목 및 롱테일 키워드 설정:
            </div>
            <input
              type="text"
              value={finalTitle}
              onChange={(e) => setFinalTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-bold"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-purple-300 font-bold mb-1">
                  🎯 롱테일 키워드 (Organic Traffic 95%+ 노출 핵심)
                </label>
                <input
                  type="text"
                  value={longtailKeyword}
                  onChange={(e) => setLongtailKeyword(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/50 rounded-lg px-3 py-2 text-xs text-purple-200 font-bold"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-rose-400 font-bold mb-1">핵심</label>
                  <input
                    type="text"
                    value={coreKeyword}
                    onChange={(e) => setCoreKeyword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[11px] text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-sky-400 font-bold mb-1">중간</label>
                  <input
                    type="text"
                    value={midKeyword}
                    onChange={(e) => setMidKeyword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[11px] text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-emerald-400 font-bold mb-1">틈새</label>
                  <input
                    type="text"
                    value={nicheKeyword}
                    onChange={(e) => setNicheKeyword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[11px] text-slate-200"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateArticleOnly}
              disabled={generatingBlog}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {generatingBlog ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>롱테일 본문 작성 및 N개 시각 키워드 파싱 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-cyan-300" />
                  <span>🚀 선택한 롱테일 키워드로 SEO 아티클 생성하기</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Generated Article Result & Publishing Section */}
      {generatedArticle && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Google AI Live Mode Indicator Badge */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              {generatedArticle.isRealGoogleCall ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  🟢 Google AI Live Mode ({generatedArticle.modelUsed} 100% 실시간 연동됨)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  🟡 API Key Fallback Mode (기본 초고화질 엔진 구동 중)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span>글자 수: <strong className="text-cyan-300">{generatedArticle.articleCharCount || generatedArticle.fullText.length}자</strong> (목표 1,800자+)</span>
              <span>•</span>
              <span>롱테일 반복: <strong className="text-purple-300">{generatedArticle.longtailCount || 3}회</strong> (밀도 {generatedArticle.longtailDensityPercent || 0.5}%)</span>
            </div>
          </div>

          {/* 10-Step SEO Score Diagnostic Table */}
          {generatedArticle.seoChecklist && (
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  📊 10단계 SEO &amp; GEO 정밀 품질 진단 리포트
                </div>
                <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {generatedArticle.yoastGeoScore || 100}점 / 100점 만점
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {generatedArticle.seoChecklist.map((item: any) => (
                  <div key={item.step} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{item.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'}`}>
                        {item.score} / {item.maxScore}점
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                작성 완료된 롱테일 SEO 아티클 ({generatedArticle.modelUsed})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyFullBlog}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                {copiedBlog ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBlog ? '복사 완료' : '전체 복사'}</span>
              </button>

              <button
                onClick={handlePublishPost}
                disabled={publishing}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                {publishing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Globe className="w-4 h-4 text-emerald-200" />
                )}
                <span>🚀 실제 블로그에 공개 발행하기</span>
              </button>
            </div>
          </div>

          {/* Published Live Link Box */}
          {publishedLiveUrl && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  🎉 포스트가 라이브 블로그에 정상 발행되었습니다!
                </div>
                <div className="text-[11px] font-mono text-slate-400">{publishedLiveUrl}</div>
              </div>
              <Link
                href={publishedLiveUrl}
                target="_blank"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1"
              >
                <span>발행 포스트 보러가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Parsed N-Gram Visual Keywords & Image Generator Bridge */}
          {generatedArticle.extractedVisualKeywords && (
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  🎨 본문 자동 파싱 N개 시각 키워드 (이미지생성기 렌더링용)
                </span>
                <Link
                  href="/admin/seo-reallocator"
                  className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>이미지생성기 바로가기</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {generatedArticle.extractedVisualKeywords.map((kw: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono"
                  >
                    📷 {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Text Display */}
          <div className="space-y-6 text-slate-300 text-xs leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono whitespace-pre-wrap">
            {generatedArticle.fullText}
          </div>
        </div>
      )}
    </div>
  )
}
