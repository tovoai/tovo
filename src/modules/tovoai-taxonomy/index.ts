/**
 * TOVOAI Pluggable Module 02: Dynamic AI Taxonomy Engine
 * Path: src/modules/tovoai-taxonomy/index.ts
 * 
 * Self-expanding category node classifier.
 * Can be mounted onto any CMS or Blog platform to dynamically categorize articles!
 */

import { generate768Embedding, computeCosineSimilarity } from "../tovoai-embedding";

export interface TaxonomyCategoryNode {
  id: string;
  nameEn: string;
  nameKo: string;
  slug: string;
  embedding: number[];
  count: number;
}

export const BASE_TAXONOMY_NODES: TaxonomyCategoryNode[] = [
  { id: "tech", nameEn: "Tech & Devices", nameKo: "IT · 테크", slug: "tech", embedding: generate768Embedding("technology IT mobile AI semiconductor"), count: 42 },
  { id: "ai-future", nameEn: "AI & Robotics", nameKo: "AI · 로봇 · 미래", slug: "ai-future", embedding: generate768Embedding("artificial intelligence robotics quantum space"), count: 38 },
  { id: "finance", nameEn: "Finance & Economy", nameKo: "금융 · 경제", slug: "finance", embedding: generate768Embedding("finance stock market crypto economy investment"), count: 29 },
  { id: "realestate", nameEn: "Real Estate & Architecture", nameKo: "부동산 · 건축", slug: "realestate", embedding: generate768Embedding("real estate architecture urban city building"), count: 18 },
  { id: "society", nameEn: "Society & Issues", nameKo: "사회 · 이슈", slug: "society", embedding: generate768Embedding("society environment policy education issue"), count: 24 },
  { id: "health", nameEn: "Health & Bio", nameKo: "의학 · 헬스", slug: "health", embedding: generate768Embedding("health medical bio wellness hospital"), count: 15 },
  { id: "culture", nameEn: "Culture & Lifestyle", nameKo: "문화 · 라이프", slug: "culture", embedding: generate768Embedding("culture travel food art lifestyle music"), count: 31 },
];

export function classifyTextToTaxonomyNode(
  text: string,
  nodes: TaxonomyCategoryNode[] = BASE_TAXONOMY_NODES
): { matchedNode: TaxonomyCategoryNode; similarity: number; isDynamicallyExpanded: boolean } {
  const targetVec = generate768Embedding(text);
  let bestNode = nodes[0];
  let highestSim = -1;

  for (const node of nodes) {
    const sim = computeCosineSimilarity(targetVec, node.embedding);
    if (sim > highestSim) {
      highestSim = sim;
      bestNode = node;
    }
  }

  // Self-expand new category node if similarity is low
  if (highestSim < 0.35 && text.trim().length > 0) {
    const slug = text.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 20);
    const expandedNode: TaxonomyCategoryNode = {
      id: `dynamic-${Date.now()}`,
      nameEn: text.slice(0, 18),
      nameKo: text.slice(0, 18),
      slug,
      embedding: targetVec,
      count: 1,
    };
    return { matchedNode: expandedNode, similarity: highestSim, isDynamicallyExpanded: true };
  }

  return { matchedNode: bestNode, similarity: highestSim, isDynamicallyExpanded: false };
}
