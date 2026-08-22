import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 rounded-full backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        TOVOAI.COM Standalone AI Image CDN Server Active
      </div>

      {/* Main Headline */}
      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300">
        AI Image &amp; SEO CDN Hub
      </h1>

      {/* Description */}
      <p className="max-w-2xl mt-6 text-lg text-slate-400 leading-relaxed">
        쿼터 제한 0%, 100% 무제한 8K 실사 이미지 생성 및 <code className="text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded">cdn.tovoai.com</code> 초고속 글로벌 CDN 통합 관리 시스템
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <Link
          href="/gallery"
          className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all transform hover:-translate-y-0.5"
        >
          🖼️ 이미지 갤러리 스튜디오 열기
        </Link>
        <a
          href="https://cdn.tovoai.com"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 text-base font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-xl hover:bg-slate-700 hover:text-white transition-all"
        >
          🌐 cdn.tovoai.com 연결 상태 확인
        </a>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-20 text-left">
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="text-3xl mb-3">📸</div>
          <h3 className="text-xl font-bold text-white mb-2">100% 실사 맞춤 연산</h3>
          <p className="text-sm text-slate-400">LLM 시맨틱 파서가 한글 제목을 100% 어울리는 8K 실사 사진 프롬프트로 변환하여 엉뚱한 이미지 Mismatch를 차단합니다.</p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="text-3xl mb-3">🏷️</div>
          <h3 className="text-xl font-bold text-white mb-2">한글 SEO 메타데이터</h3>
          <p className="text-sm text-slate-400">구글/네이버 이미지 검색에 노출되는 한글 SEO 파일명과 대체 텍스트(ALT)를 세트로 자동 발급합니다.</p>
        </div>

        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold text-white mb-2">365일 엑스박스 0%</h3>
          <p className="text-sm text-slate-400">PC가 꺼져도 cdn.tovoai.com 24시간 클라우드 스토리지를 통해 영구적으로 엑스박스 없이 이미지를 전송합니다.</p>
        </div>
      </div>
    </main>
  )
}
