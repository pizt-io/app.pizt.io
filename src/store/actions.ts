import { ActionTree } from "vuex";
import { RootState } from "./state";
import { supabase } from "@/core/plugins/supabase";
import { defaultTransition } from "@/core/constants/template";

import { ElMessage } from "element-plus";

import _cloneDeep from "lodash/cloneDeep";

export type Actions = ActionTree<RootState, RootState>;

export const actions: Actions = {
  vueServerInit({ rootState, commit }) {
    if (!rootState.vueClientReady) {
      commit("SET_VUE_CLIENT_READY", true);
    }
  },
  updateSelectedTransition({ commit }, selectedTransition) {
    commit("UPDATE_SELECTED_TRANSITION", selectedTransition);
  },
  async createTransition({ state, commit }, payload = defaultTransition) {
    if (state.userSession?.user?.id) {
      const newTransition = _cloneDeep(payload);

      delete newTransition._id;

      try {
        const res = await supabase.from("transitions").insert([
          Object.assign({}, newTransition, {
            userId: state.userSession.user.id,
          }),
        ]);

        console.log("createTransition", res.data);

        commit("ADD_TRANSITION", res.data?.[0]);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async updateTransition({ state, commit, dispatch }, payload) {
    if (state.userSession?.user?.id && payload.userId) {
      try {
        const res = await supabase
          .from("transitions")
          .update(payload)
          .match({ _id: payload._id, userId: payload.userId });

        commit("UPDATE_TRANSITION", res.data?.[0]);

        console.log("updateTransition", res.data);
      } catch (err) {
        console.error("catched", err);
      }
    } else {
      dispatch("createTransition", payload);
    }
  },
  setDefaultSelectedTransition({ state, commit }) {
    const defaultTransitions = state.transitions.filter((t: any) => !t.userId) as any[];
    const userTransitions = state.transitions.filter(
      (t: any) => t.userId === state.userSession?.user?.id,
    ) as any[];

    commit(
      "SET_SELECTED_TRANSITION",
      userTransitions.length ? userTransitions[0] : defaultTransitions[0],
    );
  },
  async deleteTransition({ state, commit, dispatch }, payload) {
    if (state.userSession?.user?.id && payload.userId) {
      try {
        await supabase.from("transitions").delete().match({ _id: payload._id });

        commit("REMOVE_TRANSITION", payload);

        dispatch("setDefaultSelectedTransition");
      } catch (err) {
        console.error("catched", err);
      }
    } else {
      ElMessage.error("You can't delete default transition");
    }
  },
  async getTransitions({ state, commit, dispatch }) {
    let res = {} as any;

    try {
      if (state.userSession?.user?.id) {
        res = await supabase
          .from("transitions")
          .select()
          .or(`userId.is.null, userId.eq.${state.userSession?.user?.id}`);
      } else {
        res = await supabase.from("transitions").select().or("userId.is.null");
      }

      commit("SET_TRANSITIONS", res.data);

      if (!state.selectedTransition.label) {
        dispatch("setDefaultSelectedTransition");
      }
    } catch (err) {
      console.error("catched", err);
    }
  },
};
