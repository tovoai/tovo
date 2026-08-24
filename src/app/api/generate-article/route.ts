import { NextResponse } from 'next/server'
import { evaluate10StepSEO } from '@/lib/seo_10step_evaluator'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title = '부산 맛집 현지인 가이드',
      coreKeyword = '부산 맛집',
      midKeyword = '부산 로컬 맛집',
      nicheKeyword = '남포동 노포 맛집',
      longtailKeyword = '부산 남포동 현지인 추천 40년 전통 노포 국밥집 내돈내산 가이드',
      model = 'gemma-4-31b-it',
      googleApiKey = ''
    } = body

    const activeApiKey = googleApiKey.trim() || process.env.GOOGLE_AI_KEY || ''
    let realBlogText = ''
    let isRealGoogleCall = false

    const systemPrompt = `당신은 대한민국 최고 수준의 SEO 전문 카피라이터이자 블로그 마케팅 전문가입니다.
다음 조건으로 최소 1,800자 이상의 풍부하고 고품질인 한국어 블로그 포스트 본문을 작성하세요:

- 제목: "${title}"
- 🎯 핵심 롱테일 키워드: ${longtailKeyword}
- 핵심/중간/틈새 키워드: ${coreKeyword}, ${midKeyword}, ${nicheKeyword}

[작성 가이드라인]
1. 분량 필수 요건: 본문 전체 길이 최소 1,800자 이상으로 깊이 있게 풍부하게 작성할 것.
2. 롱테일 키워드 본문 반복: 본문 내에 "${longtailKeyword}" 문장을 3회 이상 자연스럽게 반복 언급할 것.
3. 본론 구조: H2 소제목 3개 이상 구성 및 상세 가이드 포함.
4. 해시태그: 하단에 #${coreKeyword.replace(/\s+/g, '')} #${midKeyword.replace(/\s+/g, '')} 배치`

    if (activeApiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeApiKey}`
        const googleRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }]
          }),
          signal: AbortSignal.timeout(18000)
        })

        if (googleRes.ok) {
          const resData = await googleRes.json()
          const textRes = resData.candidates?.[0]?.content?.parts?.[0]?.text
          if (textRes) {
            realBlogText = textRes
            isRealGoogleCall = true
          }
        }
      } catch {
        // Fallback
      }
    }

    // High quality rich 1800+ character blog text (No fixed weird persona)
    const fullArticleText = realBlogText || `# ${title}

${title}에 대한 현지인 검증 가이드에 오신 것을 환영합니다. 최근 수많은 외지 방문객들이 인스타그램이나 블로그의 화려한 협찬 광고에 속아 정작 겉만 번지르르하고 깊이가 없는 식당에서 소중한 시간과 비용을 낭비하는 안타까운 일들이 반복되고 있습니다.

오늘 소개해 드리는 정보는 단순한 광고성 글로 도배된 추천이 아닌, 오랫동안 그 자리를 지켜온 진짜 현지인들의 살아있는 노하우가 담긴 비책입니다.

---

## 1. 세월의 진정성이 담긴 40년 전통 노포의 깊은 매력
가장 먼저 눈여겨보아야 할 핵심 요소는 바로 세월의 무게가 선사하는 깊은 맛입니다. 화려한 조명이나 세련된 인테리어를 갖추지는 않았지만, 투박한 미닫이문을 열고 들어서는 순간 코끝을 자극하는 구수한 육수 향이 방문객들의 마음을 단번에 사로잡습니다.

특히 ${longtailKeyword} 정보는 현지 주민들 사이에서도 입소문으로만 묵묵히 전해지는 숨은 비책 중 하나입니다. 잡내 없이 오랜 시간 깊게 우려낸 사골 육수와 부드러운 살코기의 절묘한 조화는 첫 숟가락부터 잊을 수 없는 풍부한 감동을 선물해 드립니다.

많은 분들이 여행지에서 실패 없는 미식을 만나는 법을 문의하시는데, 소란스럽게 홍보하는 대형 매장보다는 오랜 시간 한곳을 지켜온 전통 있는 매장을 선택하는 것이 최선의 지름길입니다.

---

## 2. ${midKeyword} - 시간을 200% 아껴주는 효율적인 현지인 동선 가이드
여행에서 맛만큼이나 중요한 것은 바로 한정된 시간을 얼마나 효율적으로 활용하느냐 하는 점입니다. 피크 타임인 점심 12시부터 1시 사이에는 장시간 대기 줄이 길게 늘어서기 쉽기 때문에, 오후 1시 30분 이후나 오픈 직후 시간대를 공략하는 것이 지혜로운 선택입니다.

현지인들이 즐겨 찾는 이 동선을 활용하시면 대기 시간을 대폭 줄일 수 있을 뿐만 아니라, 훨씬 쾌적하고 조용한 환경에서 식사를 즐기실 수 있습니다. 또한 푹 익은 신선한 깍두기와 부추무침을 함께 곁들이시면 음식 본연의 풍미가 더욱 풍성해집니다.

이를 통해 ${longtailKeyword} 노하우를 직접 경험해 보시면 단순한 한 끼 식사를 넘어 잊지 못할 깊은 추억을 쌓으실 수 있을 것입니다.

---

## 3. ${nicheKeyword} - 비용 절약 및 만족도를 극대화하는 최종 노하우
마지막으로 예산을 대폭 아끼면서도 실패 없는 만족도를 챙기는 핵심 팁입니다. 무조건 비싼 메뉴를 선택하기보다는 식당의 기본 대표 메뉴와 정식을 선택하시는 것이 현명합니다.

무심한 듯 정성스럽게 내어놓는 푸짐한 상차림과 넉넉한 인심이야말로 진짜 로컬 여행의 가장 큰 묘미입니다. 오늘 정리해 드린 지침을 바탕으로 과장된 광고의 유혹에 흔들리지 마시고, 깊고 정직한 진짜의 맛을 마음껏 즐겨보시길 바랍니다.

마지막으로 다시 한 번 강조해 드리자면, ${longtailKeyword} 가이드를 꼼꼼히 확인하고 움직이시는 것이 시간과 경비를 동시에 아끼는 최고의 지름길임을 잊지 마세요.

#${coreKeyword.replace(/\s+/g, '')} #${midKeyword.replace(/\s+/g, '')} #${nicheKeyword.replace(/\s+/g, '')} #${longtailKeyword.split(' ')[0]}
`

    // Evaluate 10-Step SEO Diagnosis Engine (1,800+ chars requirement & longtail repeat counter)
    const diagnosis = evaluate10StepSEO(fullArticleText, longtailKeyword, coreKeyword, midKeyword, nicheKeyword)

    // Extract 10~20 Visual N-Gram Keywords for Image Generator Pipeline
    const extractedVisualKeywords = [
      `${coreKeyword} 노포 간판`,
      `${midKeyword} 식당 입구 전경`,
      `40년 전통 돼지국밥 사골 육수`,
      `투박한 미닫이문과 목재 탁자`,
      `푹 익은 깍두기와 부추무침 상차림`,
      `골목길 숨은 노포 식당`,
      `김이 모락모락 나는 진한 국밥`,
      `정갈한 한식 밑반찬 전체 샷`
    ]

    return NextResponse.json({
      success: true,
      isRealGoogleCall,
      modelUsed: model,
      title,
      fullText: fullArticleText,
      longtailKeyword,
      yoastGeoScore: diagnosis.totalScore,
      articleCharCount: diagnosis.articleCharCount,
      longtailCount: diagnosis.longtailCount,
      longtailDensityPercent: diagnosis.longtailDensityPercent,
      seoChecklist: diagnosis.items,
      extractedVisualKeywords,
      keywords: [coreKeyword, midKeyword, nicheKeyword, longtailKeyword]
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
