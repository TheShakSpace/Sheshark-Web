export type KnowledgeMode = "business" | "health";

export type KnowledgeEntry = {
  mode: string;
  keywords: string[];
  question: string;
  answer: string;
};
