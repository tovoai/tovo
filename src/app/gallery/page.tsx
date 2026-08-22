import Link from 'next/link'

interface GalleryItem {
  id: string
  title: string
  url: string
  altText: string
  format: string
  category: string
}

export default function GalleryPage() {
  // Sample initialized gallery items for preview & testing
  const sampleItems: GalleryItem[] = [
    {
      id: '1',
      title: '건강과 맛 다 잡는 가을 제철 음식 BEST 10',
      url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85',
      altText: '가을 제철 음식 BEST 10 - 8K 고화질 실사 이미지',
      format: 'webp',
      category: '음식'
    },
    {
      id: '2',
      title: '휴머노이드 로봇 시대의 전개와 인공지능 패러다임',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85',
      altText: '휴머노이드 로봇 시대 - 8K 고화질 시각 자료',
      format: 'webp',
      category: '기술/AI'
    },
    {
      id: '3',
      title: '차세대 반도체 클러스터 투자와 글로벌 시장 동향',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
      altText: '차세대 반도체 클러스터 - 8K 고화질 시각 자료',
      format: 'webp',
      category: '경제'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 max-w-7xl mx-auto">
      {/* Header Navigation */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
        <div>
          <Link href="/" className="text-sm font-semibold text-indigo-400 hover:underline mb-1 block">
            ← TOVOAI 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold text-white">🖼️ TOVOAI 시각 이미지 스튜디오 갤러리</h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">도메인 연결 상태</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded-full mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            cdn.tovoai.com 정상 동작 중
          </span>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleItems.map(item => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all">
            {/* Image Preview */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md rounded-md border border-slate-700">
                {item.category}
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-mono font-bold text-indigo-300 bg-indigo-950/90 rounded border border-indigo-800">
                {item.format.toUpperCase()}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5">
              <h3 className="font-bold text-white text-base line-clamp-1 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-4 line-clamp-2">
                <strong className="text-indigo-400 font-semibold">SEO ALT:</strong> {item.altText}
              </p>

              {/* Control Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <button className="flex-1 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                  🔄 이미지 재생성
                </button>
                <button className="px-3 py-2 text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/60 rounded-lg transition-colors">
                  🗑️ 삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
