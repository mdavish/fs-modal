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
  setOriginalSnippet: Action<StoreModel, FeaturedSnippet>;
  setUpdatedSnippet: Action<StoreModel, FeaturedSnippet>;
  status: Computed<StoreModel, "UNEDITED" | "MODIFIED" | "APPROVED" | "REJECTED">;
}

export const store = createStore<StoreModel>({
  originalSnippet: undefined,
  updatedSnippet: undefined,
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
        return "REJECTED"
      }
    } else {
      return updatedSnippet ? "MODIFIED" : "UNEDITED"
    }
  }
  )
})

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;