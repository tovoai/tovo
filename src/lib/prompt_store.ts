export interface PromptConfig {
  seoStrategyPrompt: string
  contentWriterPrompt: string
  keywordExtractorPrompt: string
  fluxImagePrompt: string
}

export const DEFAULT_PROMPTS: PromptConfig = {
  seoStrategyPrompt: `당신은 대한민국 최고의 SEO 검색엔진 최적화 전문가입니다.
입력받은 주제에 대하여 검색 전환율과 실시간 자연 트래픽(Organic Traffic)을 극대화할 수 있는 4단계 키워드 전략 세트 5개를 추천하세요:
1. 핵심 키워드 (High Volume)
2. 중간 키워드 (Mid Range)
3. 틈새 키워드 (Niche)
4. 🎯 롱테일 키워드 (Long-tail / 95%+ High Conversion / 검색 1위 즉시 노출용)

결과는 다음 JSON 형식으로 출력하세요.`,

  contentWriterPrompt: `당신은 최고 수준의 SEO 전문 카피라이터이자 블로그 에디터입니다.
주제와 롱테일 중심 키워드를 반영하여 가독성이 높고 전문성이 뛰어난 한국어 블로그 포스트 본문을 작성하세요.
- 서론, 본론(H2 소제목 3개 이상), 결론 구조
- 롱테일 키워드를 자연스럽게 반복 배치 (키워드 밀도 2.0% 유지)
- 인스타그램 광고 찌라시 스타일의 조잡한 어조는 금지하고, 신뢰성 있고 매력적인 톤앤매너로 작성하세요.`,

  keywordExtractorPrompt: `작성된 블로그 아티클 본문에서 8K AI 실사 이미지로 렌더링하기에 가장 적합한 구체적인 시각 N-gram 키워드 10~20개를 파싱하여 리스트로 출력하세요.
예: ["자갈치시장 노포 식당", "남포동 40년 전통 돼지국밥", "영도 바닷가 포장마차", "낡은 미닫이문과 탁자"]`,

  fluxImagePrompt: `A hyper-realistic 8K professional editorial photograph of {keyword}, cinematic lighting, photorealistic texture, 85mm lens, highly detailed, award-winning photography.`
}

const STORAGE_KEY = 'tovoai_prompt_config'

export function getPromptConfig(): PromptConfig {
  if (typeof window === 'undefined') return DEFAULT_PROMPTS
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return DEFAULT_PROMPTS
}

export function savePromptConfig(config: PromptConfig): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export function resetPromptConfig(): PromptConfig {
  if (typeof window === 'undefined') return DEFAULT_PROMPTS
  localStorage.removeItem(STORAGE_KEY)
  return DEFAULT_PROMPTS
}
