import { NextResponse } from 'next/server'
import { generateTovoaiEmbedding } from '@/lib/embedding'
import { classifyDynamicCategory } from '@/lib/taxonomy'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic = '2024 오사카 여행 총정리: 일정, 경비, 준비물까지 이 글 하나로 끝내기' } = body

    // Generate 5 SEO Strategy Keyword Sets (Identical to NoGoodNews UI structure)
    const strategySets = [
      {
        id: 'strat-1',
        title: `${topic}`,
        score: 98,
        coreKeyword: `${topic.split(' ')[0] || '오사카'} 여행`,
        midKeyword: `${topic.split(' ')[0] || '오사카'} 3박 4일 일정`,
        nicheKeyword: `${topic.split(' ')[0] || '오사카'} 여행 준비물 체크리스트`
      },
      {
        id: 'strat-2',
        title: `웨이팅 지옥 탈출! ${topic.split(' ')[0] || '오사카'} 현지인이 추천하는 찐맛집 TOP 7 (광고 없음)`,
        score: 95,
        coreKeyword: `${topic.split(' ')[0] || '오사카'} 맛집`,
        midKeyword: '도톤보리 맛집 추천',
        nicheKeyword: '현지인 숨은 맛집'
      },
      {
        id: 'strat-3',
        title: `${topic.split(' ')[0] || '오사카'} 주유패스, 아직도 고민하세요? 본전 200% 뽑는 최적 동선 공개`,
        score: 92,
        coreKeyword: `${topic.split(' ')[0] || '오사카'} 주유패스`,
        midKeyword: '주유패스 가볼만한곳',
        nicheKeyword: '주유패스 1일권 효율적인 루트'
      },
      {
        id: 'strat-4',
        title: `유니버설 스튜디오 재팬(USJ) 오픈런 성공법 & 확약권 받는 꿀팁 총정리`,
        score: 90,
        coreKeyword: '유니버설 스튜디오 재팬',
        midKeyword: 'USJ 익스프레스 패스',
        nicheKeyword: 'USJ 닌텐도월드 입장 방법'
      },
      {
        id: 'strat-5',
        title: `${topic.split(' ')[0] || '오사카'} 숙소 위치 추천: 난바 vs 우메다, 내 여행 스타일에 맞는 곳은?`,
        score: 89,
        coreKeyword: `${topic.split(' ')[0] || '오사카'} 숙소`,
        midKeyword: `${topic.split(' ')[0] || '오사카'} 호텔 추천`,
        nicheKeyword: `${topic.split(' ')[0] || '오사카'} 가성비 비즈니스 호텔 추천`
      }
    ]

    return NextResponse.json({
      success: true,
      strategies: strategySets
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
