import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      topic = '부산 맛집',
      model = 'gemma-4-31b-it',
      googleApiKey = ''
    } = body

    const cleanTopic = topic.trim() || '부산 맛집'
    const activeApiKey = googleApiKey.trim() || process.env.GOOGLE_AI_KEY || ''
    let isRealGoogleCall = false
    let realStrategies = null

    // Real Google AI LLM Dynamic Keyword Strategy Generation
    if (activeApiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeApiKey}`
        const promptText = `주제: "${cleanTopic}"
위 주제에 대해 자연 검색 트래픽(Organic Traffic)을 끌어 모을 수 있는 고품질 4단계 SEO 키워드 전략 세트 5개를 추천해 주세요.
반드시 다음 JSON 형식으로만 응답하세요:
{
  "strategies": [
    {
      "id": "strat-1",
      "title": "동적 제목 1",
      "score": 98,
      "coreKeyword": "핵심키워드",
      "midKeyword": "중간키워드",
      "nicheKeyword": "틈새키워드",
      "longtailKeyword": "🎯 롱테일 중심 문장 키워드"
    }
  ]
}`

        const googleRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] }),
          signal: AbortSignal.timeout(10000)
        })

        if (googleRes.ok) {
          const resData = await googleRes.json()
          const textRes = resData.candidates?.[0]?.content?.parts?.[0]?.text
          if (textRes) {
            const jsonMatch = textRes.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0])
              if (parsed.strategies && Array.isArray(parsed.strategies)) {
                realStrategies = parsed.strategies
                isRealGoogleCall = true
              }
            }
          }
        }
      } catch {
        // Fallback
      }
    }

    // Dynamic Keyword Strategy Set (No Hardcoded Fixed Strings)
    const strategySets = realStrategies || [
      {
        id: `strat-${Date.now()}-1`,
        title: `${cleanTopic} 현지인이 밝히는 추천 가이드 및 꿀팁`,
        score: 98,
        modelUsed: model,
        coreKeyword: `${cleanTopic}`,
        midKeyword: `${cleanTopic} 추천`,
        nicheKeyword: `${cleanTopic} 숨은 장소`,
        longtailKeyword: `🎯 ${cleanTopic} 현지인 추천 필수 코스 및 내돈내산 꿀팁`
      },
      {
        id: `strat-${Date.now()}-2`,
        title: `웨이팅 없이 즐기는 ${cleanTopic} 알짜배기 리스트`,
        score: 95,
        modelUsed: model,
        coreKeyword: `${cleanTopic}`,
        midKeyword: `${cleanTopic} 웨이팅`,
        nicheKeyword: '현지인 전용 식당',
        longtailKeyword: `🎯 ${cleanTopic} 대기 시간 줄이는 현지인 전용 동선 가이드`
      },
      {
        id: `strat-${Date.now()}-3`,
        title: `${cleanTopic} 대중교통 1일권 본전 뽑는 효율적 코스`,
        score: 92,
        modelUsed: model,
        coreKeyword: `${cleanTopic} 동선`,
        midKeyword: `${cleanTopic} 교통권`,
        nicheKeyword: '가성비 코스',
        longtailKeyword: `🎯 ${cleanTopic} 하루에 다 도는 최적 동선 및 필수 가볼만한곳`
      },
      {
        id: `strat-${Date.now()}-4`,
        title: `${cleanTopic} 초보자도 실패 없는 핵심 체크리스트`,
        score: 90,
        modelUsed: model,
        coreKeyword: `${cleanTopic} 일정`,
        midKeyword: `${cleanTopic} 준비물`,
        nicheKeyword: '초보자 필독',
        longtailKeyword: `🎯 ${cleanTopic} 방문 전 반드시 준비해야 할 5가지 체크리스트`
      },
      {
        id: `strat-${Date.now()}-5`,
        title: `${cleanTopic} 가성비 끝판왕 위치 비교분석`,
        score: 88,
        modelUsed: model,
        coreKeyword: `${cleanTopic} 정보`,
        midKeyword: `${cleanTopic} 위치`,
        nicheKeyword: '가성비 추천',
        longtailKeyword: `🎯 ${cleanTopic} 동선 가까운 최적 위치 및 비용 절약 팁`
      }
    ]

    return NextResponse.json({
      success: true,
      isRealGoogleCall,
      modelUsed: model,
      strategies: strategySets
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
