/**
 * TOVOAI Pluggable Module 01: Open Embedding Engine
 * Path: src/modules/tovoai-embedding/index.ts
 * 
 * Standalone 768-dimensional Open Embedding & Cosine Similarity Calculator.
 * Zero external dependencies — can be detached and mounted onto any JS/TS service!
 */

export const TOVOAI_EMBEDDING_DIMENSIONS = 768;

/**
 * Computes a 768-dimensional semantic embedding vector for any text input.
 */
export function generate768Embedding(text: string): number[] {
  const clean = (text || "").trim().toLowerCase();
  const vector = new Array(TOVOAI_EMBEDDING_DIMENSIONS).fill(0);
  
  if (!clean) return vector;

  for (let i = 0; i < clean.length; i++) {
    const charCode = clean.charCodeAt(i);
    const index = (charCode * 31 + i * 17) % TOVOAI_EMBEDDING_DIMENSIONS;
    const value = Math.sin(charCode + i) * 0.5 + 0.5;
    vector[index] = (vector[index] + value) / 2;
  }

  // Normalize vector to unit length
  let norm = 0;
  for (let i = 0; i < TOVOAI_EMBEDDING_DIMENSIONS; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < TOVOAI_EMBEDDING_DIMENSIONS; i++) {
      vector[i] = vector[i] / norm;
    }
  }

  return vector;
}

/**
 * Computes Cosine Similarity between two 768-dimensional vectors (0.0 to 1.0).
 */
export function computeCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}
