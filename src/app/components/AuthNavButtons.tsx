'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LogIn, LogOut, ShieldCheck, User } from 'lucide-react'

export function AuthNavButtons() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setRole(profile?.role || 'user')
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setRole(data?.role || 'user'))
      } else {
        setRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return <div className="h-8 w-20 bg-slate-800/50 rounded-lg animate-pulse" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {role === 'admin' && (
          <Link
            href="/admin"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-500/20 text-xs font-semibold transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Admin Console
          </Link>
        )}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-mono max-w-[100px] truncate">{user.email}</span>
          <button
            onClick={handleLogout}
            title="로그아웃"
            className="text-slate-500 hover:text-rose-400 ml-1 p-0.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth/login"
        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-all hover:border-slate-700"
      >
        <LogIn className="w-3.5 h-3.5 text-cyan-400" />
        Login / Sign up
      </Link>
    </div>
  )
}
