import Link from 'next/link'
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-slate-900/90 border border-rose-500/20 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-[11px] font-mono text-rose-400 mb-2">
          403 FORBIDDEN ACCESS
        </span>

        <h1 className="text-2xl font-bold font-display text-white tracking-tight mb-2">
          접근 권한이 없습니다
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          요청하신 <code className="text-rose-300 bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-800/40">/admin</code> 관리자 콘솔 영역은 <strong className="text-slate-200">관리자(Admin) 권한</strong>을 소지한 계정만 접근할 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-all gap-2"
          >
            <Home className="w-4 h-4" />
            메인 페이지로 이동
          </Link>
          
          <Link
            href="/auth/login?next=/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-xs font-medium shadow-lg shadow-rose-500/20 transition-all gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            다른 계정으로 로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
