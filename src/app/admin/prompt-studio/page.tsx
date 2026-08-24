'use client'

import React, { useState, useEffect } from 'react'
import {
  Sliders,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  Bot,
  FileText,
  Search,
  ImageIcon
} from 'lucide-react'
import {
  getPromptConfig,
  savePromptConfig,
  resetPromptConfig,
  PromptConfig
} from '@/lib/prompt_store'

export default function PromptStudioPage() {
  const [config, setConfig] = useState<PromptConfig>(getPromptConfig())
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    setConfig(getPromptConfig())
  }, [])

  const handleSave = () => {
    savePromptConfig(config)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleReset = () => {
    if (confirm('모든 프롬프트 설정을 기본값으로 초기화하시겠습니까?')) {
      const def = resetPromptConfig()
      setConfig(def)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 2000)
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 mb-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            ADMIN PROMPT STUDIO &amp; FINE-TUNING CONSOLE
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            ⚙️ 프롬프트 스튜디오 (단계별 시스템 프롬프트 관리)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            SEO 추천 ➔ 롱테일 본문 작성 ➔ 시각 키워드 파싱 ➔ FLUX.1 이미지 4단계 프롬프트를 미세 조정하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>기본값 복원</span>
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? '설정 저장 완료!' : '프롬프트 저장'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 1: SEO Strategy Prompt */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-purple-300 font-mono">
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              1단계: SEO 롱테일 전략 추천 프롬프트
            </span>
          </div>
          <textarea
            rows={7}
            value={config.seoStrategyPrompt}
            onChange={(e) => setConfig({ ...config, seoStrategyPrompt: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500 transition-all leading-relaxed"
          />
        </div>

        {/* Stage 2: Content Writer Prompt */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-300 font-mono">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              2단계: 롱테일 본문 작성 프롬프트 (페르소나)
            </span>
          </div>
          <textarea
            rows={7}
            value={config.contentWriterPrompt}
            onChange={(e) => setConfig({ ...config, contentWriterPrompt: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
          />
        </div>

        {/* Stage 3: Keyword Extractor Prompt */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-sky-300 font-mono">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-sky-400" />
              3단계: 본문 시각 키워드 N개 파싱 프롬프트
            </span>
          </div>
          <textarea
            rows={7}
            value={config.keywordExtractorPrompt}
            onChange={(e) => setConfig({ ...config, keywordExtractorPrompt: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500 transition-all leading-relaxed"
          />
        </div>

        {/* Stage 4: FLUX.1 Image Prompt Template */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300 font-mono">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              4단계: FLUX.1 8K 이미지 생성 템플릿
            </span>
          </div>
          <textarea
            rows={7}
            value={config.fluxImagePrompt}
            onChange={(e) => setConfig({ ...config, fluxImagePrompt: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  )
}
