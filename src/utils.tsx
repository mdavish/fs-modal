import { FeaturedSnippetDirectAnswer } from "@yext/answers-headless-react";
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
  return {
    resultText: directAnswer.snippet.value,
    offset: directAnswer.snippet.matchedSubstrings[0].offset,
    length: directAnswer.snippet.matchedSubstrings[0].length,
  }
}