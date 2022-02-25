import { ActionTree } from "vuex";
import { RootState } from "./state";
import { supabase } from "@/core/plugins/supabase";

export type Actions = ActionTree<RootState, RootState>;

export const actions: Actions = {
  vueServerInit({ rootState, commit }) {
    if (!rootState.vueClientReady) {
      commit("SET_VUE_CLIENT_READY", true);
    }
  },
  async getTransitions({ state, commit }) {
    const res = await supabase.from("transitions").select();

    commit("SET_TRANSITIONS", res.data);

    if (!state.selectedTransition.label) {
      commit("SET_SELECTED_TRANSITION", res.data?.[0]);
    }
  },
};
