/**
 * TOVOAI AI Dynamic Self-Expanding Taxonomy Engine
 * src/lib/taxonomy.ts
 */

import { generateTovoaiEmbedding, calculateCosineSimilarity } from './embedding';

export interface CategoryNode {
  id: string;
  nameEn: string;
  nameKo: string;
  slug: string;
  iconName: string;
  embedding: number[];
  count: number;
}

export const DEFAULT_CATEGORY_NODES: CategoryNode[] = [
  { id: "tech", nameEn: "Tech & Devices", nameKo: "IT · 테크", slug: "tech", iconName: "Cpu", embedding: generateTovoaiEmbedding("technology IT mobile AI semiconductor"), count: 42 },
  { id: "ai-future", nameEn: "AI & Robotics", nameKo: "AI · 로봇 · 미래", slug: "ai-future", iconName: "Sparkles", embedding: generateTovoaiEmbedding("artificial intelligence robotics quantum space"), count: 38 },
  { id: "finance", nameEn: "Finance & Economy", nameKo: "금융 · 경제", slug: "finance", iconName: "TrendingUp", embedding: generateTovoaiEmbedding("finance stock market crypto economy investment"), count: 29 },
  { id: "realestate", nameEn: "Real Estate & Architecture", nameKo: "부동산 · 건축", slug: "realestate", iconName: "Building2", embedding: generateTovoaiEmbedding("real estate architecture urban city building"), count: 18 },
  { id: "society", nameEn: "Society & Issues", nameKo: "사회 · 이슈", slug: "society", iconName: "Globe", embedding: generateTovoaiEmbedding("society environment policy education issue"), count: 24 },
  { id: "health", nameEn: "Health & Bio", nameKo: "의학 · 헬스", slug: "health", iconName: "HeartPulse", embedding: generateTovoaiEmbedding("health medical bio wellness hospital"), count: 15 },
  { id: "culture", nameEn: "Culture & Lifestyle", nameKo: "문화 · 라이프", slug: "culture", iconName: "Camera", embedding: generateTovoaiEmbedding("culture travel food art lifestyle music"), count: 31 },
];

/**
 * Dynamically classifies input text using TOVOAI 768d vector similarity.
 * Returns best matching category node or dynamically expands a new category node if threshold is low.
 */
export function classifyDynamicCategory(
  text: string,
  existingNodes: CategoryNode[] = DEFAULT_CATEGORY_NODES
): { node: CategoryNode; isNewlyExpanded: boolean; similarityScore: number } {
  const inputVec = generateTovoaiEmbedding(text);
  let bestNode = existingNodes[0];
  let maxScore = -1;

  for (const node of existingNodes) {
    const sim = calculateCosineSimilarity(inputVec, node.embedding);
    if (sim > maxScore) {
      maxScore = sim;
      bestNode = node;
    }
  }

  // If similarity is below 0.35, dynamically expand a new Category Node!
  if (maxScore < 0.35 && text.trim().length > 0) {
    const slug = text.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 20);
    const newNode: CategoryNode = {
      id: `dynamic-${Date.now()}`,
      nameEn: text.slice(0, 18),
      nameKo: text.slice(0, 18),
      slug: slug,
      iconName: "Zap",
      embedding: inputVec,
      count: 1,
    };
    return { node: newNode, isNewlyExpanded: true, similarityScore: maxScore };
  }

  return { node: bestNode, isNewlyExpanded: false, similarityScore: maxScore };
}
