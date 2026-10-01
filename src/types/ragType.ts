export type RagSource = {
  articleId: string;
  title: string;
  content: string;
  chunkIndex: number;
  score: number;
};

export type RagAnswer = {
  answer: string;
  sources: RagSource[];
  suggestedProducts: unknown[];
  suggestedServices: unknown[];
  confidence: number;
};
