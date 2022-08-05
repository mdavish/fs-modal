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
  updatedSnippet?: FeaturedSnippet;
  displaySnippet: Computed<StoreModel, FeaturedSnippet | undefined, StoreModel>;
  setOriginalSnippet: Action<StoreModel, FeaturedSnippet | undefined>;
  setUpdatedSnippet: Action<StoreModel, FeaturedSnippet | undefined>;
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
  selectParagraph: Action<StoreModel, number>;
  unselectParagraph: Action<StoreModel, number>;
  clearSelectedParagraphs: Action<StoreModel>;
  toggleParagraphSelection: Action<StoreModel, number>;
}

export const store = createStore<StoreModel>({
  originalSnippet: undefined,
  updatedSnippet: undefined,
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
  setUpdatedSnippet: action((state, snippet) => {
    state.updatedSnippet = snippet;
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
  getEntityData: thunk(async (actions, entityId) => {
    const params = {
      api_key: '1c81e4de0ec0e8051bdf66c31fc26a45',
      v: '20220101'
    }
    try {
      const response = await axios.get<EntityResponse>(`https://liveapi.yext.com/v2/accounts/me/entities/${entityId}`, { params })
      actions.setEntityData(response.data);
    } catch {
      actions.setEntityFetchError(true);
    }
  }),
  segmentedBody: computed([s => s.selectedEntityData], entityData => {
    if (entityData) {
      const body = entityData.response.body;
      const segments = body.split("\n").filter(s => s.length > 0);
      return segments;
    } else {
      return undefined;
    }
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
      state.selectedParagraphs.push(paragraphNumber);
    } else {
      state.selectedParagraphs = [paragraphNumber];
    }
  }),
  toggleParagraphSelection: action((state, paragraphNumber) => {
    if (state.selectedParagraphs && state.selectedParagraphs.includes(paragraphNumber)) {
      state.selectedParagraphs = state.selectedParagraphs.filter(p => p !== paragraphNumber);
    } else if (state.selectedParagraphs && !state.selectedParagraphs.includes(paragraphNumber)) {
      state.selectedParagraphs.push(paragraphNumber);
    } else {
      state.selectedParagraphs = [paragraphNumber];
    }
  }),
})

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;