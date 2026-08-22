/**
 * TOVOAI Pluggable Module 03: SEO Content Injector Engine
 * Path: src/modules/tovoai-seo-injector/index.ts
 * 
 * Takes raw article text, computes SEO metadata, and returns an HTML figure/image payload.
 * Can be plugged into any CMS/Blog publisher to automatically inject SEO 8K images!
 */

import { generate768Embedding } from "../tovoai-embedding";
import { classifyTextToTaxonomyNode } from "../tovoai-taxonomy";

export interface SeoInjectionPayload {
  title: string;
  categorySlug: string;
  categoryNameKo: string;
  englishPrompt: string;
  seoAltKo: string;
  seoAltEn: string;
  cdnWebpUrl: string;
  embedding768d: number[];
  htmlSnippet: string;
}

const CDN_DOMAIN = "https://cdn.tovoai.com/storage/v1/object/public/post_images";

export function generateSeoAssetPayload(articleTitle: string, articleBody: string = ""): SeoInjectionPayload {
  const cleanTitle = (articleTitle || "").trim() || "AI 미디어 기술 동향";
  const fullText = `${cleanTitle} ${articleBody}`.slice(0, 1200);

  const embedding768d = generate768Embedding(fullText);
  const taxonomy = classifyTextToTaxonomyNode(fullText);
  const categorySlug = taxonomy.matchedNode.slug;

  const slug = cleanTitle.toLowerCase().replace(/[^\w\s가-힣-]/g, '').replace(/\s+/g, '-').slice(0, 30);
  const timestamp = Date.now();
  const cdnWebpUrl = `${CDN_DOMAIN}/${categorySlug}/${slug || 'tovoai'}-${timestamp}.webp`;
  
  const seoAltKo = `${cleanTitle} - 8K 실사 이미지 | TOVOAI CDN`;
  const seoAltEn = `8K Photorealistic Scene of ${cleanTitle} | TOVOAI Engine`;
  const englishPrompt = `A breathtaking photorealistic 8K photography scene of ${cleanTitle}, 35mm lens, cinematic lighting, highly detailed textures, Unreal Engine 5 style.`;

  const htmlSnippet = `<figure class="tovoai-seo-figure">
  <img src="${cdnWebpUrl}" alt="${seoAltKo}" title="${cleanTitle}" loading="lazy" decoding="async" class="tovoai-cdn-img" />
  <figcaption class="tovoai-caption">${seoAltKo} — cdn.tovoai.com</figcaption>
</figure>`;

  return {
    title: cleanTitle,
    categorySlug,
    categoryNameKo: taxonomy.matchedNode.nameKo,
    englishPrompt,
    seoAltKo,
    seoAltEn,
    cdnWebpUrl,
    embedding768d,
    htmlSnippet,
  };
}
