'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Key, ShieldCheck, AlertCircle, CheckCircle2, Loader2, Lock } from 'lucide-react'

export default function AdminSettingsPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const supabase = createClient()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    if (newPassword !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setErrorMsg('비밀번호는 최소 6자리 이상이어야 합니다.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSuccessMsg('비밀번호가 성공적으로 변경되었습니다.')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Key className="w-6 h-6 text-indigo-400" />
          비밀번호 변경 및 보안 설정
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          현재 관리자 계정의 비밀번호를 안전하게 변경할 수 있습니다.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-xl">
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center text-rose-400 text-xs gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center text-emerald-400 text-xs gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">새 비밀번호</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="최소 6자리 이상 입력"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">새 비밀번호 확인</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 재입력"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '비밀번호 변경하기'}
          </button>
        </form>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-sm font-bold text-white mb-1">보안 권장 사항</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            변경한 비밀번호는 즉시 적용되며, 비밀번호 변경 후 다른 기기에서 로그인 시 새 비밀번호가 요구됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
