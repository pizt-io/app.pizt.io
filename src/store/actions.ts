import { ActionTree } from "vuex";
import { RootState } from "./state";
import { transitions } from "@/mock/transitions";

export type Actions = ActionTree<RootState, RootState>;

export const actions: Actions = {
  vueServerInit({ rootState, commit }) {
    if (!rootState.vueClientReady) {
      commit("SET_VUE_CLIENT_READY", true);
    }
  },
  getTransitions({ state, commit }) {
    commit("SET_TRANSITIONS", transitions);

    if (!state.selectedTransition.label) {
      commit("SET_SELECTED_TRANSITION", transitions[0]);
    }
  },
};
