import {
  createStore,
  action,
  Action,
  createTypedHooks,
  computed,
  Computed,
} from 'easy-peasy';
import { FeaturedSnippet } from "./types";

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
})

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;