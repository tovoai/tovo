/**
 * TOVOAI Pluggable Module 05: Global Enterprise Benchmark & Advanced Feature Engine
 * Path: src/modules/tovoai-benchmark/index.ts
 * 
 * Incorporates best-in-class features from Cloudinary, Unsplash Enterprise, and Yoast SEO AI:
 * 1. Dynamic Edge Resizing Parameters (w=1200, fmt=webp, q=85)
 * 2. 8K Style Presets (Photorealistic, Cinematic, Isometric 3D, Infographic)
 * 3. JSON-LD ImageObject Schema Markup Generator for Google/Naver Rich Snippets
 */

export type TovoaiStylePreset = "photorealistic" | "cinematic-film" | "isometric-3d" | "infographic-chart";

export interface GlobalBenchmarkFeatureSet {
  edgeTransformUrl: string;
  jsonLdSchemaSnippet: string;
  stylePresetPrompt: string;
  openGraphMetaSnippet: string;
}

/**
 * Transforms a standard CDN WebP URL with dynamic edge parameters.
 * Benchmark: Cloudinary / Cloudflare Images Edge API
 */
export function buildDynamicEdgeCdnUrl(
  baseCdnUrl: string,
  width: number = 1200,
  quality: number = 85,
  format: string = "webp"
): string {
  if (!baseCdnUrl) return "";
  const separator = baseCdnUrl.includes("?") ? "&" : "?";
  return `${baseCdnUrl}${separator}w=${width}&q=${quality}&fmt=${format}`;
}

/**
 * Generates Google & Naver Rich Snippet JSON-LD ImageObject Schema.
 * Benchmark: Yoast SEO AI / RankMath Premium
 */
export function generateJsonLdImageSchema(
  title: string,
  cdnUrl: string,
  captionKo: string,
  width: number = 1920,
  height: number = 1080
): string {
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": cdnUrl,
    "license": "https://tovoai.com/license",
    "acquireLicensePage": "https://tovoai.com/license",
    "creditText": "TOVOAI 8K AI Image SEO Engine",
    "creator": {
      "@type": "Organization",
      "name": "TOVOAI"
    },
    "caption": captionKo,
    "name": title,
    "width": `${width}px`,
    "height": `${height}px`
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
}

/**
 * Applies 8K Art Direction Style Presets to prompts.
 * Benchmark: Midjourney API / Unsplash Enterprise
 */
export function applyStylePresetToPrompt(rawPrompt: string, style: TovoaiStylePreset = "photorealistic"): string {
  const clean = (rawPrompt || "").trim();
  switch (style) {
    case "cinematic-film":
      return `Cinematic movie still of ${clean}, anamorphic lens, 35mm film grain, moody dramatic lighting, 8k resolution, award-winning cinematography`;
    case "isometric-3d":
      return `Isometric 3D render of ${clean}, Octane Render, clean glossy materials, pastel gradient background, vibrant lighting, highly detailed 8k`;
    case "infographic-chart":
      return `Clean vector infographic visual of ${clean}, modern UI dashboard style, sleek data graphics, sharp typography, minimalist layout, 8k`;
    case "photorealistic":
    default:
      return `Award-winning professional photography of ${clean}, 8k resolution, photorealistic, natural lighting, sharp focus, 35mm lens, cinematic depth of field, highly detailed, no text, no watermark`;
  }
}
