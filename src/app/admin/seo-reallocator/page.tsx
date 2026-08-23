'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Server,
  Code,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'

export default function SeoReallocatorPage() {
  const [topic, setTopic] = useState('강남 맛집 삼겹살')
  const [count, setCount] = useState<number>(3)
  const [colabUrl, setColabUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [colabStatus, setColabStatus] = useState<'idle' | 'online' | 'offline'>('idle')

  const handleRunBatch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      const res = await fetch('/api/generate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          targetKeyword: topic,
          count,
          colabUrl
        })
      })
      const data = await res.json()
      if (data.success) {
        setResults(data.results)
        setColabStatus(data.colabAvailable ? 'online' : 'offline')
      }
    } catch {
      // Error handling
    } finally {
      setLoading(false)
    }
  }

  const copyCdnUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-2">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            SEO MATCH SCORER &amp; AUTO RE-ALLOCATION CONSOLE
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            SEO 점수 검증 &amp; 배치 수량 생성 콘솔
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            이미지 선(先) 렌더링 ➔ SEO 적합도 점수(0~100점) 산출 ➔ 미달 시 부합하는 키워드로 자동 재정정 저장
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Colab GPU:</span>
            {colabStatus === 'online' ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            ) : (
              <span className="text-slate-500 font-bold">Simulated (Mock)</span>
            )}
          </span>
        </div>
      </div>

      {/* Input Form Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <form onSubmit={handleRunBatch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-300 mb-2">
                타겟 주제 / SEO 키워드 입력:
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 강남 맛집 삼겹살, 성수동 카페 추천"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300">
                  생성 수량 지정 (Count):
                </label>
                <span className="text-xs font-mono font-bold text-cyan-400">{count}장</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>1장</span>
                <span>5장</span>
                <span>10장</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Google Colab / Kaggle 무료 GPU API 주소 (선택 사항):
            </label>
            <input
              type="url"
              value={colabUrl}
              onChange={(e) => setColabUrl(e.target.value)}
              placeholder="예: https://xxxx-xx-xxx-xx-xx.ngrok-free.app (미입력 시 8K 시뮤레이션 서빙)"
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                <span>{count}장 이미지 선(先) 렌더링 &amp; SEO 점수 검증 중...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>{count}장 배치 생성 &amp; SEO 적합도 검증 시작</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Dashboard Grid */}
      {results && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              배치 생성 및 SEO 정정 검증 리포트 ({results.length}장)
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Score Benchmark: <strong className="text-emerald-400">85+ Pass</strong> / <strong className="text-rose-400">&lt;85 Auto Re-allocated</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <div
                key={item.id}
                className={`rounded-2xl border bg-slate-900/90 overflow-hidden shadow-xl flex flex-col justify-between transition-all ${
                  item.passed
                    ? 'border-emerald-500/30 hover:border-emerald-500/60'
                    : 'border-rose-500/40 hover:border-rose-500/70'
                }`}
              >
                {/* Image Header & Score Badge */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden group">
                  <img
                    src={item.imgUrl}
                    alt={item.seoAltKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-300">
                    #0{item.index}
                  </div>

                  {/* Score Ring Badge */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full border text-xs font-mono font-black backdrop-blur-xl shadow-lg flex items-center gap-1.5 ${
                      item.passed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    <span>{item.score}점</span>
                    {item.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    )}
                  </div>
                </div>

                {/* Body Status Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">REQUESTED TOPIC</div>
                      <div className="text-xs font-bold text-slate-300">{item.requestedTopic}</div>
                    </div>

                    {item.reallocated ? (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>점수 미달 ({item.score}점) ➔ 타 키워드로 자동 재정정 저장됨</span>
                        </div>
                        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                          <ArrowRight className="w-3 h-3 text-rose-400" />
                          <span>{item.finalKeyword}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 mb-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>적합도 통과 ({item.score}점) ➔ 키워드 100% 매칭 완료</span>
                        </div>
                        <div className="text-xs font-medium text-slate-200">{item.finalKeyword}</div>
                      </div>
                    )}
                  </div>

                  {/* CDN URL Copy Footer */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[10px] font-mono text-cyan-400 truncate">
                      {item.cdnUrl}
                    </div>
                    <button
                      onClick={() => copyCdnUrl(item.cdnUrl, idx)}
                      className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>CDN URL 복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>CDN URL 복사</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
