/**
 * TOVOAI Pluggable Module 04: Client Content Auditor & Multi-Tier Asset Allocator
 * Path: src/modules/tovoai-client-audit/index.ts
 * 
 * Standalone Client Content Auditor.
 * Categorizes posts into Short/Medium/Long tiers with explicit technical rationale.
 */

export interface ArticleInput {
  id: string;
  title: string;
  content: string;
}

export interface ClientAuditSummary {
  clientName: string;
  totalPostsCount: number;
  shortPostsCount: number;
  mediumPostsCount: number;
  longPostsCount: number;
  requiredHeroImages: number;
  requiredInlineImages: number;
  totalRequiredAssets: number;
  averageAssetsPerPost: string;
  isolatedStoragePath: string;
}

export function auditClientContent(clientName: string, articles: ArticleInput[]): ClientAuditSummary {
  let shortCount = 0;
  let mediumCount = 0;
  let longCount = 0;

  articles.forEach((art) => {
    const len = (art.content || "").length;
    if (len > 800) {
      longCount++;
    } else if (len > 300) {
      mediumCount++;
    } else {
      shortCount++;
    }
  });

  const totalPosts = articles.length || 1;
  const heroCount = totalPosts;
  const inlineCount = mediumCount * 1 + longCount * 2;
  const totalRequiredAssets = heroCount + inlineCount;
  const averageAssetsPerPost = (totalRequiredAssets / totalPosts).toFixed(2);
  const clientSlug = clientName.toLowerCase().replace(/[^\w-]/g, '');

  return {
    clientName,
    totalPostsCount: totalPosts,
    shortPostsCount: shortCount,
    mediumPostsCount: mediumCount,
    longPostsCount: longCount,
    requiredHeroImages: heroCount,
    requiredInlineImages: inlineCount,
    totalRequiredAssets,
    averageAssetsPerPost,
    isolatedStoragePath: `clients/${clientSlug}/`,
  };
}
