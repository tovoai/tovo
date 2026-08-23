'use client'

import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Mail, Key, Github, Chrome, AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'

  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    if (password !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setErrorMsg('비밀번호는 최소 6자리 이상이어야 합니다.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      if (data.session) {
        router.push(next)
        router.refresh()
      } else {
        setSuccessMsg('가입 신청이 성공적으로 완료되었습니다. 이메일을 확인해 주세요!')
        setLoading(false)
      }
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setErrorMsg(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setErrorMsg(error.message)
    }
  }

  return (
    <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
      <Link 
        href="/" 
        className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-cyan-400 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-1 transition-transform" />
        메인 페이지로 돌아가기
      </Link>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-3 shadow-lg shadow-indigo-500/10">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-display text-white tracking-tight">TOVOAI 회원가입</h1>
        <p className="text-xs text-slate-400 mt-1">새 계정을 생성하여 TOVOAI의 모든 기능을 이용해보세요.</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center text-rose-400 text-xs gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center text-emerald-400 text-xs gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuthLogin('google')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 transition-all hover:border-slate-600"
        >
          <Chrome className="w-4 h-4 text-rose-400" />
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin('github')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 transition-all hover:border-slate-600"
        >
          <Github className="w-4 h-4 text-slate-300" />
          GitHub
        </button>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <span className="relative bg-slate-900 px-3 text-[11px] font-mono uppercase text-slate-500">OR REGISTER EMAIL</span>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">이메일 주소</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">비밀번호</label>
          <div className="relative">
            <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">비밀번호 확인</label>
          <div className="relative">
            <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '회원가입 완료'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        이미 계정이 있으신가요?{' '}
        <Link href={`/auth/login?next=${encodeURIComponent(next)}`} className="text-indigo-400 hover:underline font-medium">
          로그인
        </Link>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-slate-400 text-xs">로딩 중...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
