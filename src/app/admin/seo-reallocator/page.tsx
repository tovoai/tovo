'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Server,
  Key,
  Edit3,
  Save,
  Cpu,
  ShieldCheck,
  Eye,
  SlidersHorizontal
} from 'lucide-react'

export default function SeoReallocatorPage() {
  const [topic, setTopic] = useState('강남 맛집 삼겹살')
  const [count, setCount] = useState<number>(3)
  const [colabUrl, setColabUrl] = useState('')
  const [hfToken, setHfToken] = useState('')
  const [generatorModel, setGeneratorModel] = useState('black-forest-labs/FLUX.1-schnell')
  const [evaluatorModel, setEvaluatorModel] = useState('OpenCLIP ViT-L/14 (768d Vector Engine)')
  
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [colabStatus, setColabStatus] = useState<'idle' | 'online' | 'offline'>('idle')

  // Edit State for Manual Overrides (Regardless of High Score)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editKeyword, setEditKeyword] = useState('')

  const handleRunBatch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    setEditingIndex(null)

    try {
      const res = await fetch('/api/generate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          targetKeyword: topic,
          count,
          colabUrl,
          hfToken,
          generatorModel,
          evaluatorModel
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

  const handleStartEdit = (idx: number, currentKeyword: string) => {
    setEditingIndex(idx)
    setEditKeyword(currentKeyword)
  }

  const handleSaveEdit = (idx: number) => {
    if (!results) return
    const updated = [...results]
    const item = updated[idx]
    
    const slug = editKeyword.toLowerCase().replace(/[^\w\s가-힣-]/g, '').replace(/\s+/g, '-').slice(0, 30)
    const timestamp = Date.now()
    
    item.finalKeyword = editKeyword
    item.seoAltKo = `${editKeyword} - 8K 실사 이미지 | TOVOAI SEO`
    item.cdnUrl = `https://tovoai.com/cdn-proxy/${item.categoryNameKo || 'asset'}/${slug}-${timestamp}.webp`
    item.manuallyEdited = true

    setResults(updated)
    setEditingIndex(null)
  }

  const copyCdnUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-2">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            INDEPENDENT DUAL-MODEL ENGINE &amp; MANUAL OVERRIDE CONSOLE
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            생성 · 평가 독립 모델 콘솔 및 SEO 파일명 직접 수정기
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            독립된 렌더링/평가 모델로 8K 선(先) 생성 ➔ 고득점 결과도 사용자가 직접 키워드 및 CDN 파일명을 자유롭게 수정 및 확정
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
              <span className="text-cyan-400 font-bold">HF Free Serverless Active</span>
            )}
          </span>
        </div>
      </div>

      {/* 2. Step 1: Model Registration & Configuration Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          [Step 1] 생성 모델 &amp; 평가 모델 독립 등록 및 수량 설정
        </div>

        <form onSubmit={handleRunBatch} className="space-y-6">
          {/* Dual Independent Model Registration Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                1. 생성 전용 모델 (Generator):
              </label>
              <select
                value={generatorModel}
                onChange={(e) => setGeneratorModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="black-forest-labs/FLUX.1-schnell">FLUX.1 Schnell (8K Photorealistic - HF Free)</option>
                <option value="stabilityai/sdxl-turbo">SDXL Turbo (High-Speed Turbo Render)</option>
                <option value="colab-gpu-custom">Google Colab T4 Custom Diffusers GPU</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-indigo-400 mb-1.5 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                2. 평가 전용 검증 모델 (Evaluator):
              </label>
              <select
                value={evaluatorModel}
                onChange={(e) => setEvaluatorModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              >
                <option value="OpenCLIP ViT-L/14 (768d Vector Engine)">OpenCLIP ViT-L/14 (768d Cosine Engine - 100% Free)</option>
                <option value="OpenCLIP ViT-B/32">OpenCLIP ViT-B/32 (Lightweight Vector Scorer)</option>
              </select>
            </div>
          </div>

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
                placeholder="예: 강남 맛집 삼겹살, 성수동 디저트 카페"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300">
                  생성 수량 지정 (Count: 1~1000장):
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={count}
                  onChange={(e) => setCount(Math.min(1000, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono font-bold text-cyan-400 text-right"
                />
              </div>
              <input
                type="range"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>1장</span>
                <span>100장</span>
                <span>500장</span>
                <span>1000장</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                Hugging Face Free Token (선택 입력):
              </label>
              <input
                type="password"
                value={hfToken}
                onChange={(e) => setHfToken(e.target.value)}
                placeholder="hf_xxxxxxxxxxxxxxxx (입력 시 24시간 무인 구동)"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                Google Colab / Kaggle URL (선택 입력):
              </label>
              <input
                type="url"
                value={colabUrl}
                onChange={(e) => setColabUrl(e.target.value)}
                placeholder="https://xxxx.ngrok-free.app (선택 사항)"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                <span>{count}장 8K 선(先) 렌더링 및 OpenCLIP 시각 점수 검증 중...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-300" />
                <span>🚀 {count}장 8K AI 이미지 일괄 생성 시작</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 3. Step 2 & 3: Results, Score Inspection & Manual Keyword Modification */}
      {results && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
              생성 결과 &amp; OpenCLIP 적합도 검증 리포트 ({results.length}장)
            </h2>
            <div className="text-xs font-mono text-slate-400">
              💡 <strong className="text-cyan-400">고득점/저득점 모두 [키워드 직접 수정]으로 자유롭게 변경 가능</strong>
            </div>
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
                {/* Image Preview & Score Badge */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden group">
                  <img
                    src={item.imgUrl}
                    alt={item.seoAltKo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-300">
                    #0{item.index} • {item.engineUsed}
                  </div>

                  {/* OpenCLIP Suitability Score Ring */}
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

                {/* Status & Manual Modification Interface */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase">REQUESTED TOPIC</div>
                      <div className="text-xs font-bold text-slate-300">{item.requestedTopic}</div>
                    </div>

                    {/* Manual Keyword Editing Area (Available for ALL Scores) */}
                    {editingIndex === idx ? (
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/40 rounded-xl space-y-2">
                        <label className="text-[10px] font-mono text-indigo-300 font-bold block">
                          ✏️ 파일명 및 키워드 직접 입력:
                        </label>
                        <input
                          type="text"
                          value={editKeyword}
                          onChange={(e) => setEditKeyword(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(idx)}
                          className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>수정본 저장 및 CDN 파일명 확정</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div
                          className={`p-3 rounded-xl border ${
                            item.manuallyEdited
                              ? 'bg-indigo-500/10 border-indigo-500/30'
                              : item.passed
                              ? 'bg-emerald-500/10 border-emerald-500/20'
                              : 'bg-rose-500/10 border-rose-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {item.manuallyEdited
                                ? '✏️ 사용자가 직접 확정한 키워드'
                                : item.passed
                                ? '🟢 OpenCLIP 검증 통과 키워드'
                                : '🔴 점수 미달 ➔ 자동 재정정 키워드'}
                            </span>
                            <button
                              onClick={() => handleStartEdit(idx, item.finalKeyword)}
                              className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>직접 수정</span>
                            </button>
                          </div>
                          <div className="text-xs font-bold text-slate-100">{item.finalKeyword}</div>
                        </div>
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
