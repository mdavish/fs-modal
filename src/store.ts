import {
  createStore,
  action,
  Action,
  createTypedHooks,
  computed,
  Computed,
} from 'easy-peasy';

interface StoreModel {
  status: "UNEDITED" | "MODIFIED" | "ADDED" | "REJECTED";

}

export const store = createStore<StoreModel>({
  status: "UNEDITED",
})

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;