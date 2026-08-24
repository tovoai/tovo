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
  Loader2
} from 'lucide-react'

export default function ContentFactoryPage() {
  const [topic, setTopic] = useState('2024 오사카 여행 총정리: 일정, 경비, 준비물까지 이 글 하나로 끝내기')
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
  const [generatedBlogContent, setGeneratedBlogContent] = useState<any | null>(null)
  const [copiedBlog, setCopiedBlog] = useState(false)

  // Step 1: Recommend SEO Keyword & Title Strategy
  const handleRecommendStrategy = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingStrategy(true)
    setStrategies(null)
    setGeneratedBlogContent(null)

    try {
      const res = await fetch('/api/blog-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      })
      const data = await res.json()
      if (data.success) {
        setStrategies(data.strategies)
        // Auto select top 98 score strategy
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

  // Step 2 & 3: Generate AI Blog Text First ➔ Auto Inject Matching 8K Image
  const handleGenerateBlog = async () => {
    if (!finalTitle) return
    setGeneratingBlog(true)

    // Simulate AI Blog Text Generation + Subsequent 8K Image Auto Injection
    setTimeout(() => {
      setGeneratedBlogContent({
        title: finalTitle,
        keywords: [coreKeyword, midKeyword, nicheKeyword],
        sections: [
          {
            heading: `1. ${coreKeyword} 핵심 요약 및 준비사항`,
            text: `${finalTitle} 관련 최신 가이드입니다. 현지 완벽 여행을 위한 체크리스트부터 필수 방문지 동선까지 한눈에 확인하세요.`,
            image: {
              url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
              cdnUrl: 'https://tovoai.com/cdn-proxy/travel/osaka-travel-guide-8k-1001.webp',
              alt: `${finalTitle} - 8K 실사 이미지 | TOVOAI SEO`
            }
          },
          {
            heading: `2. ${midKeyword} - 실패 없는 동선 추천`,
            text: `시간을 200% 아낄 수 있는 동선 노하우를 공개합니다. 현지에서 대기 시간을 최소화하고 만족도를 최대로 높이는 법을 정리했습니다.`,
            image: {
              url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
              cdnUrl: 'https://tovoai.com/cdn-proxy/food/osaka-dining-recommendation-8k-1002.webp',
              alt: `${midKeyword} - 8K 실사 이미지 | TOVOAI SEO`
            }
          }
        ]
      })
      setGeneratingBlog(false)
    }, 1500)
  }

  const copyFullBlog = () => {
    if (!generatedBlogContent) return
    const text = `# ${generatedBlogContent.title}\n\n${generatedBlogContent.sections.map((s: any) => `## ${s.heading}\n\n${s.text}\n\n![${s.image.alt}](${s.image.cdnUrl})`).join('\n\n')}`
    navigator.clipboard.writeText(text)
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
            AI BLOG STRATEGY &amp; AUTO IMAGE INJECTION FACTORY
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            🤖 AI 블로그 기획 / 양산소
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            SEO 적합도 점수별 전략 키워드 추천 ➔ AI 블로그 글선(先)생성 ➔ 8K 이미지 후(後)추가 자동 연동 프로세스
          </p>
        </div>
      </div>

      {/* Input Topic Area */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
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
                  <span>SEO 전략 분석 중...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>💡 AI 전략 추천</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Recommended Title & Strategy Keyword Set */}
        {strategies && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
              <span>🔥 추천 제목 및 전략 키워드 세트 (클릭하여 에디터 셋팅)</span>
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
              onClick={handleGenerateBlog}
              disabled={generatingBlog}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {generatingBlog ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>글 선(先) 작성 ➔ 8K 이미지 문맥 후(後)추가 생성 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-cyan-300" />
                  <span>🚀 선택한 키워드로 100점짜리 AI 블로그 생성하기</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Generated Blog Post & Image Auto-injection Result */}
      {generatedBlogContent && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              발행 준비 완료된 AI 블로그 포스트
            </h2>
            <button
              onClick={copyFullBlog}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              {copiedBlog ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedBlog ? '마크다운 전체 복사 완료!' : '블로그 전체 복사'}</span>
            </button>
          </div>

          <div className="space-y-6 text-slate-300 text-xs leading-relaxed">
            <h1 className="text-2xl font-bold text-white">{generatedBlogContent.title}</h1>

            <div className="flex gap-2">
              {generatedBlogContent.keywords.map((k: string, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                  #{k}
                </span>
              ))}
            </div>

            {generatedBlogContent.sections.map((sec: any, idx: number) => (
              <div key={idx} className="space-y-4 pt-4 border-t border-slate-800/60">
                <h3 className="text-base font-bold text-white">{sec.heading}</h3>
                <p className="text-slate-300">{sec.text}</p>

                {/* Post-injected 8K Image */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden space-y-2 p-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> 문맥 자동 추출 8K 후(後)추가 이미지
                    </span>
                    <span>ACTIVE CDN</span>
                  </div>
                  <img src={sec.image.url} alt={sec.image.alt} className="w-full aspect-video object-cover rounded-xl" />
                  <div className="text-[10px] font-mono text-slate-500 truncate">{sec.image.cdnUrl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
