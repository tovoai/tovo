import { NextResponse } from 'next/server'
import { generateTovoaiEmbedding } from '@/lib/embedding'
import { classifyDynamicCategory } from '@/lib/taxonomy'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      topic = '강남 맛집 삼겹살',
      count = 1,
      colabUrl = '',
      targetKeyword = '강남 맛집 삼겹살'
    } = body

    const requestedCount = Math.min(Math.max(Number(count) || 1, 1), 1000)
    const results: any[] = []

    // Attempt to call Colab GPU if colabUrl is provided
    let colabAvailable = false
    let cleanColabUrl = colabUrl.trim().replace(/\/$/, '')

    for (let i = 0; i < requestedCount; i++) {
      let currentTitle = `${topic} #${i + 1}`
      let isMock = true
      let generatedImgUrl = ''

      if (cleanColabUrl) {
        try {
          const colabRes = await fetch(`${cleanColabUrl}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: currentTitle, num_inference_steps: 4 }),
            signal: AbortSignal.timeout(15000)
          })
          if (colabRes.ok) {
            const colabData = await colabRes.json()
            if (colabData.image_url || colabData.image_base64) {
              generatedImgUrl = colabData.image_url || colabData.image_base64
              colabAvailable = true
              isMock = false
            }
          }
        } catch {
          // Fallback to high-res sample pool if Colab is offline
        }
      }

      if (!generatedImgUrl) {
        // High quality Unsplash sample pool simulating 8K renders
        const samplePool = [
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
        ]
        generatedImgUrl = samplePool[i % samplePool.length]
      }

      // Compute 768d embedding and classification
      const vector = generateTovoaiEmbedding(`${currentTitle} ${targetKeyword}`)
      const taxonomyResult = classifyDynamicCategory(currentTitle)
      const cat = taxonomyResult.node

      // Calculate SEO suitability score (0 ~ 100)
      // Simulation of visual vs keyword matching score
      const randomBaseScore = 80 + Math.floor(Math.random() * 18) // 80 ~ 97
      // If mismatch simulation triggered for specific index
      const score = (i === 1 && requestedCount > 1) ? 62 : randomBaseScore
      const passed = score >= 85

      let finalKeyword = targetKeyword
      let reallocated = false
      let reallocatedKeyword = ''

      if (!passed) {
        reallocated = true
        // Auto re-allocation to a matching keyword when score < 85
        const altKeywords = [
          '해산물 모듬 조개구이 대표 메뉴',
          '제주 흑돼지 참숯 직화 구이',
          '숙성 한우 등심 스페셜 코스',
          '전통 한식 갈비찜 정식'
        ]
        reallocatedKeyword = altKeywords[i % altKeywords.length]
        finalKeyword = reallocatedKeyword
      }

      const slug = finalKeyword.toLowerCase().replace(/[^\w\s가-힣-]/g, '').replace(/\s+/g, '-').slice(0, 30)
      const timestamp = Date.now() + i
      const cdnUrl = `https://tovoai.com/cdn-proxy/${cat.slug}/${slug || 'tovoai-asset'}-${timestamp}.webp`
      const seoAltKo = `${finalKeyword} - 8K 실사 이미지 | TOVOAI SEO`

      results.push({
        id: `gen-${timestamp}`,
        index: i + 1,
        requestedTopic: topic,
        targetKeyword: targetKeyword,
        finalKeyword: finalKeyword,
        score: score,
        passed: passed,
        reallocated: reallocated,
        reallocatedKeyword: reallocatedKeyword,
        imgUrl: generatedImgUrl,
        cdnUrl: cdnUrl,
        categoryNameKo: cat.nameKo,
        seoAltKo: seoAltKo,
        isMock: isMock,
        createdAt: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: true,
      colabAvailable,
      count: requestedCount,
      results
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
