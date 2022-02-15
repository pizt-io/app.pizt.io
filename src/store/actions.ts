import { ActionTree } from "vuex";
import { RootState } from "./state";

export type Actions = ActionTree<RootState, RootState>;

export const actions: Actions = {
  vueServerInit({ rootState, commit }) {
    if (!rootState.vueClientReady) {
      commit("SET_VUE_CLIENT_READY", true);
    }
  },
};
