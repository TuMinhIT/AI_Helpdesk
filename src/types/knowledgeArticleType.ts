export type KnowledgeArticleStatus = "Draft" | "Published" | "Archived";

export type KnowledgeArticle = {
  id: string;
  title: string;
  content: string;
  source?: string;
  tags?: string;
  status: KnowledgeArticleStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export type KnowledgeArticleInput = {
  title: string;
  content: string;
  source?: string;
  tags?: string;
  status?: KnowledgeArticleStatus;
};
