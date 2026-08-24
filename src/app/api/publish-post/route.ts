import { NextResponse } from 'next/server'

// Global In-Memory Published Posts Store for Immediate Public Access
const publishedPostsStore: any[] = [
  {
    id: 'post-1',
    slug: 'busan-local-restaurant-guide-2024',
    title: '현지인만 아는 부산 맛집 지도: 남포동 40년 전통 노포 국밥 추천',
    longtailKeyword: '부산 남포동 현지인 추천 40년 전통 노포 국밥집 내돈내산',
    keywords: ['부산 맛집', '부산 로컬 맛집', '남포동 노포 맛집', '부산 남포동 현지인 추천 40년 전통 노포 국밥집 내돈내산'],
    content: `# 현지인만 아는 부산 맛집 지도: 남포동 40년 전통 노포 국밥 추천

부산 여행을 계획하면서 진짜 현지인들이 찾는 숨은 로컬 맛집을 찾고 계신가요?
인스타그램 협찬 광고나 화려한 간판에 속아 겉만 번지르르한 곳에서 실패했던 경험이 있다면 이 가이드에 주목하세요.

---

## 1. 40년 전통이 증명하는 부산 남포동 노포 국밥집의 위엄
남포동 골목 안쪽에 위치한 이 노포 식당은 세월의 흔적이 느껴지는 투박한 미닫이문과 깊은 육수 향으로 방문객을 맞이합니다.

가장 대표적인 국밥 한 그릇에는 잡내 없이 진하게 우려낸 돼지사골 육수와 부드러운 고기가 가득 담겨 나와, 첫 숟갈부터 깊은 감동을 안겨줍니다.

![부산 남포동 노포 국밥](https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80)

---

## 2. 웨이팅 없이 즐기는 현지인 로컬 동선 노하우
관광객들로 붐비는 피크 타임을 약간 비켜난 오후 1시 30분 이후 방문을 추천합니다.
정갈한 밑반찬으로 나오는 푹 익은 깍두기와 부추무침을 국밥에 곁들이면 맛의 완성도가 극대화됩니다.

#부산맛집 #부산로컬맛집 #남포동노포국밥 #부산여행
`,
    excerpt: '인스타그램 광고에 속지 않는 부산 남포동 40년 전통 노포 국밥집과 현지인 추천 로컬 동선 완전 정리 가이드입니다.',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    yoastScore: 100,
    author: 'TOVOAI SEO Editor',
    publishedAt: new Date().toISOString()
  }
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      longtailKeyword = '',
      keywords = [],
      content,
      coverImage = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    } = body

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 })
    }

    // Generate SEO friendly clean URL slug
    const slug = `${title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString().slice(-4)}`

    const newPost = {
      id: `post-${Date.now()}`,
      slug,
      title,
      longtailKeyword,
      keywords,
      content,
      excerpt: content.slice(0, 140).replace(/[#*`\n]/g, ' '),
      coverImage,
      yoastScore: 100,
      author: 'TOVOAI Professional AI Editor',
      publishedAt: new Date().toISOString()
    }

    publishedPostsStore.unshift(newPost)

    return NextResponse.json({
      success: true,
      post: newPost,
      liveUrl: `/blog/${slug}`
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    posts: publishedPostsStore
  })
}
