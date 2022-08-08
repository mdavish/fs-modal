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

export function segmentRichText(
  richText: string,
): string[] {
  // Eventually we will make this smarter, but it MUST be consistent
  return richText.split("\n").filter(s => s.length > 0);
}

export function findSelectedParagraphs(
  fullBody: string,
  directAnswerValue: string,
): number[] {
  console.log({
    fullBody,
    directAnswerValue,
  })
  const segmentedBody = segmentRichText(fullBody);
  const segmentedValue = segmentRichText(directAnswerValue);
  console.log({
    segmentedBody,
    segmentedValue,
  })
  const selectedParagraphs = segmentedValue.map(segment => {
    const index = segmentedBody.indexOf(segment);
    if (index === -1) {
      throw new Error(`Could not find segment ${segment} in body`);
    }
    return index;
  })
  return selectedParagraphs;
}

/**
 * This function reformats the direct answer so that it's a little easier to deal with.
 * In retrospect, this was probably unecessary, and we could have just used the library's 
 * native Typescript types. Oh well!
 * @param directAnswer 
 * @returns 
 */
export const directAnswerToFS = (directAnswer: FeaturedSnippetDirectAnswer): FeaturedSnippet => {
  if (directAnswer.fieldType === "rich_text") {
    return {
      fieldType: "rich_text",
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
      fieldType: "multi_line_text",
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

//TODO: Deprecate this
export const canSelectParagraph = (index: number, selectedParagraphs: number[] | undefined) => {
  if (!selectedParagraphs) {
    return true;
  } else {
    const firstSelection = Math.min(...selectedParagraphs);
    const lastSelection = Math.max(...selectedParagraphs);
    return index >= firstSelection - 1 && index <= lastSelection + 1;
  }
}