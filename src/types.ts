interface FeaturedSnippetBase {
  fieldType: "rich_text" | "multi_line_text",
  entity: {
    id: string;
    name: string;
  }
  resultText: string;  // Excerpt of document body
  offset?: number;
  length?: number;
  value?: string; // For convenience - technically can be inferred by other two
}

interface RichTextFeaturedSnippet extends FeaturedSnippetBase {
  fieldType: "rich_text";
  /*The highlighted rich text*/
  value: string;
}

interface MultiLineTextFeaturedSnippet extends FeaturedSnippetBase {
  fieldType: "multi_line_text";
  offset?: number;
  length?: number;
  value?: string;
}

export type FeaturedSnippet = RichTextFeaturedSnippet | MultiLineTextFeaturedSnippet;

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