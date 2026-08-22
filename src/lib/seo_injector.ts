/**
 * TOVOAI SEO Article Image Injector Pipeline
 * src/lib/seo_injector.ts
 */

import { generateTovoaiEmbedding } from './embedding';
import { classifyDynamicCategory } from './taxonomy';

export interface InjectedSeoAsset {
  originalTitle: string;
  categorySlug: string;
  categoryNameKo: string;
  englishPrompt: string;
  seoAltKo: string;
  seoAltEn: string;
  cdnWebpUrl: string;
  embedding768d: number[];
  similarityScore: number;
  readabilityHtmlSnippet: string;
}

const CDN_BASE = "https://cdn.tovoai.com/storage/v1/object/public/post_images";

export function processArticleForSeoInjection(articleTitle: string, articleBody: string = ""): InjectedSeoAsset {
  const cleanTitle = articleTitle.trim() || "AI 기술과 미래 산업 동향";
  const fullText = `${cleanTitle} ${articleBody}`.slice(0, 1500);

  // 1. Compute 768d Embedding Vector
  const vector = generateTovoaiEmbedding(fullText);

  // 2. Classify via Dynamic AI Taxonomy
  const taxonomyResult = classifyDynamicCategory(fullText);
  const cat = taxonomyResult.node;

  // 3. Generate SEO Alt tags & WebP Slug
  const slug = cleanTitle.toLowerCase().replace(/[^\w\s가-힣-]/g, '').replace(/\s+/g, '-').slice(0, 30);
  const timestamp = Date.now();
  const cdnWebpUrl = `${CDN_BASE}/${cat.slug}/${slug || 'tovoai-photo'}-${timestamp}.webp`;
  
  const seoAltKo = `${cleanTitle} - 8K 실사 이미지 | TOVOAI CDN`;
  const seoAltEn = `8K Photorealistic Image of ${cleanTitle} | TOVOAI Engine`;
  const englishPrompt = `A breathtaking photorealistic 8K scene of ${cleanTitle}, 35mm lens photography, natural lighting, highly detailed textures, Unreal Engine 5 render, cinematic depth.`;

  // 4. Generate Readability & SEO HTML Snippet ready for Article Injection
  const readabilityHtmlSnippet = `<figure className="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
  <img 
    src="${cdnWebpUrl}" 
    alt="${seoAltKo}" 
    title="${cleanTitle}" 
    loading="lazy" 
    decoding="async" 
    className="w-full h-auto object-cover" 
  />
  <figcaption className="p-3 bg-slate-950 text-slate-400 text-xs font-mono flex items-center justify-between">
    <span>${seoAltKo}</span>
    <span className="text-cyan-400">cdn.tovoai.com</span>
  </figcaption>
</figure>`;

  return {
    originalTitle: cleanTitle,
    categorySlug: cat.slug,
    categoryNameKo: cat.nameKo,
    englishPrompt,
    seoAltKo,
    seoAltEn,
    cdnWebpUrl,
    embedding768d: vector,
    similarityScore: taxonomyResult.similarityScore,
    readabilityHtmlSnippet,
  };
}
