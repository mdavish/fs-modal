import {
  createStore,
  action,
  Action,
  createTypedHooks,
  computed,
  Computed,
  thunk,
  Thunk
} from 'easy-peasy';
import axios from "axios";
import { FeaturedSnippet } from "./types";
import { findSelectedParagraphs, segmentRichText } from "./utils";

interface EntityResponse {
  meta: {
    id: string
  };
  response: {
    body: string;
  }
}

type SegmentedBody = string[];

interface StoreModel {
  originalSnippet?: FeaturedSnippet;
  updatedSnippet: Computed<StoreModel, FeaturedSnippet | undefined>;
  displaySnippet: Computed<StoreModel, FeaturedSnippet | undefined, StoreModel>;
  setOriginalSnippet: Action<StoreModel, FeaturedSnippet | undefined>;
  status: Computed<StoreModel, "UNEDITED" | "MODIFIED" | "APPROVED" | "REJECTED">;
  showFSModal: boolean;
  setShowFSModal: Action<StoreModel, boolean>;
  selectedEntity?: { name: string, id: string };
  setSelectedEntity: Action<StoreModel, { name: string, id: string }>;
  entityFetchError: boolean;
  entityFetchLoading: boolean;
  setEntityFetchError: Action<StoreModel, boolean>;
  selectedEntityData?: EntityResponse;
  setEntityData: Action<StoreModel, EntityResponse>;
  getEntityData: Thunk<StoreModel, string, EntityResponse>;
  segmentedBody: Computed<StoreModel, SegmentedBody | undefined>;
  selectedParagraphs?: number[];
  setSelectedParagraphs: Action<StoreModel, number[]>;
  selectParagraph: Action<StoreModel, number>;
  unselectParagraph: Action<StoreModel, number>;
  clearSelectedParagraphs: Action<StoreModel>;
  toggleParagraphSelection: Action<StoreModel, number>;
}

export const store = createStore<StoreModel>({
  originalSnippet: undefined,
  updatedSnippet: computed((state) => {
    if (state.selectedParagraphs && state.segmentedBody) {
      const orderedParagraphs = state.selectedParagraphs.sort((a, b) => a - b);
      // @ts-ignore
      const paragraphs: string[] = orderedParagraphs.map(paragraph => state.segmentedBody[paragraph]);
      const value = paragraphs.join("\n");
      const newSnippet: FeaturedSnippet = {
        fieldType: "rich_text",
        value: value,
        entity: {
          id: state.selectedEntity?.id ?? "",
          name: state.selectedEntity?.name ?? "",
        },
        resultText: ""
      }
      return newSnippet;
    } else {
      return undefined;
    }
  }),
  displaySnippet: computed([
    s => s.originalSnippet,
    s => s.updatedSnippet
  ], (originalSnippet, updatedSnippet) => {
    const displaySnip = updatedSnippet ?? originalSnippet;
    if (displaySnip !== undefined) {
      return {
        ...displaySnip,
      }
    } else {
      return displaySnip
    }
  }),
  setOriginalSnippet: action((state, snippet) => {
    state.originalSnippet = snippet;
  }),
  status: computed([
    s => s.originalSnippet,
    s => s.updatedSnippet,
  ], (originalSnippet, updatedSnippet) => {
    if (originalSnippet) {
      if (updatedSnippet) {
        return originalSnippet === updatedSnippet ? "APPROVED" : "MODIFIED"
      } else {
        return "UNEDITED"
      }
    } else {
      return updatedSnippet ? "MODIFIED" : "UNEDITED"
    }
  }
  ),
  showFSModal: false,
  setShowFSModal: action((state, show) => {
    state.showFSModal = show;
  }),
  setSelectedEntity: action((state, entity) => {
    state.selectedEntity = entity;
  }),
  entityFetchLoading: false,
  entityFetchError: false,
  setEntityFetchError: action((state, error) => {
    state.entityFetchError = error;
  }),
  setEntityData: action((state, data) => {
    state.selectedEntityData = data;
  }),
  getEntityData: thunk(async (actions, entityId, helpers) => {
    const params = {
      api_key: '1c81e4de0ec0e8051bdf66c31fc26a45',
      v: '20220101'
    }
    try {
      const response = await axios.get<EntityResponse>(`https://liveapi.yext.com/v2/accounts/me/entities/${entityId}`, { params })
      actions.setEntityData(response.data);
      const state = helpers.getState();
      const { originalSnippet } = state;
      // If there is a Rich Text direct answer, then we need to compute which 
      // paragraphs it corresponds to in the entity, so we can highlight those paragraphs
      if (originalSnippet && originalSnippet.fieldType === "rich_text") {
        const selectedParagraphs = findSelectedParagraphs(
          response.data.response.body,
          originalSnippet.value
        )
        // Once computed, we set those paragraphs as the original selection
        actions.setSelectedParagraphs(selectedParagraphs);
      } else {
        // TODO: Infer the offset/length of the entity from the response
        console.warn("Have not implemented multiline text offset finding yet.")
      }
    } catch {
      actions.setEntityFetchError(true);
    }
  }),
  segmentedBody: computed([s => s.selectedEntityData], entityData => {
    if (entityData) {
      const body = entityData.response.body;
      return segmentRichText(body);
    } else {
      return undefined;
    }
  }),
  setSelectedParagraphs: action((state, paragraphs) => {
    state.selectedParagraphs = paragraphs;
  }),
  clearSelectedParagraphs: action((state) => {
    state.selectedParagraphs = undefined;
  }),
  unselectParagraph: action((state, paragraphNumber) => {
    if (state.selectedParagraphs) {
      state.selectedParagraphs = state.selectedParagraphs.filter(p => p !== paragraphNumber);
    }
  }),
  selectParagraph: action((state, paragraphNumber) => {
    if (state.selectedParagraphs) {
      // If the new paragraph is NOT adjacent, clear the selection
      const firstSelection = Math.min(...state.selectedParagraphs);
      const lastSelection = Math.max(...state.selectedParagraphs);
      const isAdjacent = paragraphNumber >= firstSelection - 1 && paragraphNumber <= lastSelection + 1;
      console.log({
        firstSelection,
        lastSelection,
        isAdjacent,
        selectedParagraphs: state.selectedParagraphs,
      })
      if (!isAdjacent) {
        state.selectedParagraphs = [paragraphNumber];
      } else {
        state.selectedParagraphs.push(paragraphNumber);
      }
    } else {
      state.selectedParagraphs = [paragraphNumber];
    }
  }),
  toggleParagraphSelection: action((state, paragraphNumber) => {

    let firstSelection: number;
    let lastSelection: number;
    let isAdjacent: boolean | undefined = undefined;

    if (state.selectedParagraphs) {
      firstSelection = Math.min(...state.selectedParagraphs);
      lastSelection = Math.max(...state.selectedParagraphs);
      isAdjacent = paragraphNumber >= firstSelection - 1 && paragraphNumber <= lastSelection + 1;
    }


    // If the paragraph is already selected, unselect it
    if (
      state.selectedParagraphs &&
      state.selectedParagraphs.includes(paragraphNumber)
    ) {
      state.selectedParagraphs = state.selectedParagraphs.filter(p => p !== paragraphNumber);
    }
    // If the paragraph isn't selected but is adjacent to the selection, select it
    else if (
      state.selectedParagraphs &&
      !state.selectedParagraphs.includes(paragraphNumber) &&
      isAdjacent
    ) {
      state.selectedParagraphs.push(paragraphNumber);
    } else if (
      state.selectedParagraphs &&
      !state.selectedParagraphs.includes(paragraphNumber) &&
      !isAdjacent
    ) {
      state.selectedParagraphs = [paragraphNumber];
    } else {
      console.warn("Something is wrong...");
      state.selectedParagraphs = [paragraphNumber];
    }
  }),
})

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;