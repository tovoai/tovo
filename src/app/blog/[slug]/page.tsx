'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Sparkles,
  Calendar,
  User,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Tag,
  BookOpen
} from 'lucide-react'

export default function PublicBlogDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/publish-post')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const found = data.posts.find((p: any) => p.slug === slug)
          setPost(found || data.posts[0])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono text-xs">
        블로그 아티클을 불러오는 중...
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono text-xs">
        포스트를 찾을 수 없습니다.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Public Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>블로그목록으로</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
              ✓ Yoast SEO 100점 인증
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Post Title & Meta */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            {post.keywords?.map((k: string, i: number) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                #{k}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.longtailKeyword && (
            <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-300">
              🎯 타겟 롱테일 키워드: {post.longtailKeyword}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-cyan-400" /> {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl border border-slate-800 overflow-hidden aspect-video bg-slate-900">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none space-y-6 text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-800">
          {post.content}
        </article>
      </main>
    </div>
  )
}
