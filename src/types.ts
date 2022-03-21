export interface FeaturedSnippet {
  resultText: string;  // Excerpt of document body
  offset: number;
  length: number;
}

export interface FeaturedSnippetOverride {
  schema: "https://schema.yext.com/config/answers/experience-training/v1",
  experienceKey: "my-search-experience",
  locale: "en",
  searchTerm: string,
  triggerType: "query",
  type: "featuredSnippet",
  resultText: string;
  predictionType: "SPAN_EXTRACTION";
  length: number;
  offset: number;
}