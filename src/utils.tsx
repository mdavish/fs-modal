import { FeaturedSnippetDirectAnswer } from "@yext/search-headless-react";
import { FeaturedSnippet } from "./types";


export function findUpdatedOffset(
  fullBody: string,
  bodyExcerpt: string,
  originalOffset: number
): number {
  // Remove ellipses 
  const trimmedExcerpt = bodyExcerpt.replace(/ ?\.{3}$/, '').replace(/^\.{3} ?/, '');
  // How many ellipses you removed
  const additionalOffset = bodyExcerpt.indexOf(trimmedExcerpt);
  const bodyOffset = fullBody.indexOf(trimmedExcerpt);
  return originalOffset + bodyOffset - additionalOffset
}

export const directAnswerToFS = (directAnswer: FeaturedSnippetDirectAnswer): FeaturedSnippet => {
  if (directAnswer.fieldType === "rich_text") {
    return {
      entity: {
        id: directAnswer.relatedResult.id as string,
        name: directAnswer.relatedResult.name as string,
      },
      // What do here?
      resultText: directAnswer.snippet.value,
      value: directAnswer.snippet.value,
    }
  } else if (directAnswer.fieldType === "multi_line_text") {
    return {
      entity: {
        id: directAnswer.relatedResult.id as string,
        name: directAnswer.relatedResult.name as string,
      },
      value: directAnswer.value ?? directAnswer.snippet.value.slice(
        directAnswer.snippet.matchedSubstrings[0].offset,
        directAnswer.snippet.matchedSubstrings[0].offset + directAnswer.snippet.matchedSubstrings[0].length
      ),
      resultText: directAnswer.snippet.value,
      offset: directAnswer.snippet.matchedSubstrings[0].offset,
      length: directAnswer.snippet.matchedSubstrings[0].length,
    }
  } else {
    throw new Error("Unknown field type");
  }
}

export const canSelectParagraph = (index: number, selectedParagraphs: number[] | undefined) => {
  if (!selectedParagraphs) {
    return true;
  } else {
    const firstSelection = Math.min(...selectedParagraphs);
    const lastSelection = Math.max(...selectedParagraphs);
    return (index === firstSelection - 1 || index === lastSelection + 1) || (index > firstSelection && index < lastSelection);
  }
}