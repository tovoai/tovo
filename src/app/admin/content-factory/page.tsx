'use client'

import React, { useState } from 'react'
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
  Plus
} from 'lucide-react'

export default function ContentFactoryPage() {
  const [topic, setTopic] = useState('2024 오사카 여행 총정리: 일정, 경비, 준비물까지 이 글 하나로 끝내기')
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

  // Generation State
  const [generatingBlog, setGeneratingBlog] = useState(false)
  const [generatedArticle, setGeneratedArticle] = useState<any | null>(null)
  const [copiedBlog, setCopiedBlog] = useState(false)
  const [injectedImages, setInjectedImages] = useState<Record<number, any>>({})

  // Step 1: Recommend SEO Keyword & Title Strategy
  const handleRecommendStrategy = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingStrategy(true)
    setStrategies(null)
    setGeneratedArticle(null)
    setInjectedImages({})

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
  }

  // Step 2: Generate PURE TEXT Blog Post First (NO IMAGES Initially!)
  const handleGenerateArticleOnly = async () => {
    if (!finalTitle) return
    setGeneratingBlog(true)
    setGeneratedArticle(null)
    setInjectedImages({})

    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: finalTitle,
          coreKeyword,
          midKeyword,
          nicheKeyword,
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

  // Step 3: Optional Manual / Context Image Post-Injection
  const handleInjectImageToSection = (sectionIndex: number, keyword: string) => {
    const sampleImages = [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        cdnUrl: `https://tovoai.com/cdn-proxy/travel/${keyword.replace(/\s+/g, '-')}-8k-${Date.now()}.webp`,
        alt: `${keyword} - 8K 실사 이미지 | TOVOAI SEO`
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        cdnUrl: `https://tovoai.com/cdn-proxy/food/${keyword.replace(/\s+/g, '-')}-8k-${Date.now()}.webp`,
        alt: `${keyword} - 8K 실사 이미지 | TOVOAI SEO`
      }
    ]
    setInjectedImages(prev => ({
      ...prev,
      [sectionIndex]: sampleImages[sectionIndex % sampleImages.length]
    }))
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
            PURE TEXT GENERATOR &amp; POST-IMAGE INJECTION ENGINE
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            🤖 컨텐츠생성기 (순수 AI 텍스트 완벽 작성)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Google {selectedModel} 엔진 ➔ 100점짜리 순수 텍스트 블로그 우선 완전 작성 ➔ 필요 시 8K 이미지 후(後)추가
          </p>
        </div>
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
              placeholder="예: 2024 오사카 여행 총정리: 일정, 경비, 준비물까지"
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
                  <span>{selectedModel} 전략 분석 중...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>💡 전략 추천</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Recommended Title & Strategy Keyword Set */}
        {strategies && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
              <span>🔥 추천 제목 및 전략 키워드 세트 (클릭하여 에디터 셋팅)</span>
              <span className="text-[10px] text-slate-500">Engine: {selectedModel}</span>
            </div>

            <div className="space-y-3">
              {strategies.map((item) => {
                const isSelected = selectedStrategy?.id === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => selectStrategyItem(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.title}</span>
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
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                        점수: {item.score}점
                      </span>
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
              최종 제목 (수정 가능):
            </div>
            <input
              type="text"
              value={finalTitle}
              onChange={(e) => setFinalTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-bold"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-rose-400 font-bold mb-1">핵심 키워드</label>
                <input
                  type="text"
                  value={coreKeyword}
                  onChange={(e) => setCoreKeyword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-sky-400 font-bold mb-1">중간 키워드</label>
                <input
                  type="text"
                  value={midKeyword}
                  onChange={(e) => setMidKeyword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-emerald-400 font-bold mb-1">틈새 키워드</label>
                <input
                  type="text"
                  value={nicheKeyword}
                  onChange={(e) => setNicheKeyword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                />
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
                  <span>{selectedModel} 엔진이 순수 블로그 본문 작성 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-cyan-300" />
                  <span>🚀 {selectedModel} 선택 키워드로 순수 텍스트 블로그 완벽 작성</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Step 2 Result: Pure Text Article First (NO Images Initially) */}
      {generatedArticle && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                작성 완료된 100점짜리 순수 텍스트 블로그 ({generatedArticle.modelUsed})
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ 이미지는 미포함된 순수 본문 상태입니다. 필요 시 아래 버튼으로 8K 이미지를 단락별 후(後)추가할 수 있습니다.
              </p>
            </div>
            <button
              onClick={copyFullBlog}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              {copiedBlog ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedBlog ? '본문 전체 복사 완료!' : '본문 전체 복사'}</span>
            </button>
          </div>

          <div className="space-y-6 text-slate-300 text-xs leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono whitespace-pre-wrap">
            {generatedArticle.fullText}
          </div>

          {/* Step 3: Optional Image Post-Injection controls */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              [Step 3] 필요 시 단락별 8K 이미지 선택적 후(後)추가
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-bold text-white">단락 1 이미지 후(後)추가 ({coreKeyword})</div>
                {injectedImages[0] ? (
                  <div className="space-y-2">
                    <img src={injectedImages[0].url} className="w-full aspect-video object-cover rounded-lg" />
                    <div className="text-[10px] font-mono text-cyan-300 truncate">{injectedImages[0].cdnUrl}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInjectImageToSection(0, coreKeyword)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-bold flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>단락 1에 8K 이미지 삽입</span>
                  </button>
                )}
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-bold text-white">단락 2 이미지 후(後)추가 ({midKeyword})</div>
                {injectedImages[1] ? (
                  <div className="space-y-2">
                    <img src={injectedImages[1].url} className="w-full aspect-video object-cover rounded-lg" />
                    <div className="text-[10px] font-mono text-cyan-300 truncate">{injectedImages[1].cdnUrl}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInjectImageToSection(1, midKeyword)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-bold flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>단락 2에 8K 이미지 삽입</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
