'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getAppVersion } from '@/lib/version'
import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  ImageIcon,
  Key,
  LogOut,
  Sparkles,
  Settings,
  User,
  Home,
  Menu,
  X,
  RefreshCw
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [appVersion, setAppVersion] = useState('1.06.00')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    try {
      setAppVersion(getAppVersion())
    } catch {}
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const mainMenuItems = [
    {
      name: '컨트롤 스튜디오',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: '이미지생성기',
      href: '/admin/seo-reallocator',
      icon: RefreshCw,
    },
    {
      name: '고객분석',
      href: '/admin/client-audit',
      icon: BarChart3,
    },
    {
      name: '벤치마크',
      href: '/admin/benchmark',
      icon: Trophy,
    },
  ]

  const settingsMenuItems = [
    {
      name: '비밀번호 변경 / 보안',
      href: '/admin/settings',
      icon: Key,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* WordPress-style Top Admin Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Site Logo -> Home navigation */}
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-base font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              TOVOAI
            </span>
          </Link>

          <span className="text-slate-800 font-light">/</span>

          {/* Dynamic Version badge shown ONLY in admin area */}
          <div className="flex items-center">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-md">
              v{appVersion} Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            홈페이지 메인
          </Link>

          {user && (
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-300 font-mono hidden md:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                title="로그아웃"
                className="text-slate-500 hover:text-rose-400 ml-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Body: Left Sidebar + Right Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (WordPress Admin Navigation Style) */}
        <aside
          className={`${
            mobileOpen ? 'block' : 'hidden'
          } md:block w-64 bg-slate-900/90 border-r border-slate-800 flex-shrink-0 flex flex-col justify-between p-4 sticky top-14 h-[calc(100vh-3.5rem)]`}
        >
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                MAIN NAVIGATION
              </div>
              <nav className="space-y-1">
                {mainMenuItems.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname?.startsWith(item.href)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                PUBLIC FEATURES
              </div>
              <nav className="space-y-1">
                <Link
                  href="/gallery"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>아카이브</span>
                </Link>
              </nav>
            </div>

            {/* 환경설정 영역 (리스트 최하단 배치) */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 flex items-center gap-1.5">
                <Settings className="w-3 h-3 text-indigo-400" />
                환경설정 (SETTINGS)
              </div>
              <nav className="space-y-1">
                {settingsMenuItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin Protected</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">v{appVersion}</span>
            </div>
            <p className="text-[11px] text-slate-500">RBAC 보안 및 Supabase 세션 연결됨</p>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
