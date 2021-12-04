import { MutationTree } from "vuex";
import { RootState } from "./state";

export type Mutations = MutationTree<RootState>;

export const mutations: Mutations = {
  SET_VUE_CLIENT_READY(state, vueClientReady) {
    state.vueClientReady = vueClientReady;
  },
  SET_ANIMATION_SETTINGS(state, selectedTransition) {
    state.selectedTransition = {
      ...state.selectedTransition,
      ...selectedTransition,
    };
  },
};
