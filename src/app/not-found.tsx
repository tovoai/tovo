import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h2>
      <p className="text-slate-400 mb-6">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
