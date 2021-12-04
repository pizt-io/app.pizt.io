import { MutationTree } from "vuex";
import { AppState } from "./state";

export type Mutations = MutationTree<AppState>;

export const mutations: Mutations = {
  SET_ELEMENTS(state, elements) {
    state.elements = elements;
  },
};
