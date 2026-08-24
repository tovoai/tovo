'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Share2
} from 'lucide-react'

export default function PublicBlogListPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/publish-post')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.posts)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Public Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-black tracking-tight text-white">TOVOAI BLOG</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/content-factory"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10"
            >
              어드민 컨텐츠생성기 바로가기
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            PUBLISHED SEO &amp; LONG-TAIL BLOG POSTS
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            🌐 TOVOAI 공식 블로그 아티클
          </h1>
          <p className="text-sm text-slate-400">
            롱테일 SEO 키워드 최적화 및 8K 실사 에셋이 적용된 발행 포스트 리스트입니다.
          </p>
        </div>

        {/* Post Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-xs font-mono">
            발행된 포스트를 불러오는 중...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4 p-5">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-emerald-500/90 text-white font-mono text-[10px] font-bold shadow-md">
                      Yoast {post.yoastScore}점
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-800/80 bg-slate-950/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                    읽기 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
