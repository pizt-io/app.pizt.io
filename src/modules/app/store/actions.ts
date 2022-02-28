// import { canvas } from "@/mock/animations";
import { ActionTree } from "vuex";
import { AppState } from "./state";

// import moment from "moment";

// import _cloneDeep from "lodash/cloneDeep";
import { RootState } from "@/store/state";
import { supabase } from "@/core/plugins/supabase";
import { SVG_CANVAS_EVENT_THROTTLE } from "@/core/constants/svg";

import _debounce from "lodash/debounce";
import { defaultProject } from "@/core/constants/template";

export type Actions = ActionTree<AppState, RootState>;

const updateElementsOnDatabase = _debounce(function (elements: any[]) {
  supabase.from("animations").upsert(Object.values(elements), { onConflict: "_id" });
}, SVG_CANVAS_EVENT_THROTTLE);

export const actions: Actions = {
  async createProject({ rootState }, project = defaultProject) {
    return await supabase
      .from("projects")
      .insert(Object.assign({}, project, { userId: rootState.userSession?.user?.id }));
  },
  async getProjects({ rootState, state, commit, dispatch }) {
    try {
      let res = await supabase
        .from("projects")
        .select()
        .eq("userId", rootState.userSession?.user?.id);

      if (res.data?.length) {
        commit("SET_PROJECTS", res.data);
      } else {
        res = await dispatch("createProject", defaultProject);
      }
      if (!state.selectedProject.name) {
        commit("SET_SELECTED_PROJECT", res.data?.[0]);
      }
    } catch (err) {
      console.error("catched", err);
    }
  },
  getElements: async ({ state, commit }) => {
    const res = await supabase
      .from("animations")
      .select()
      .eq("projectId", state.selectedProject._id);

    commit("SET_ELEMENTS", { elements: res.data });

    return res.data;
  },
  addElement: async ({ commit }, element: any) => {
    const res = await supabase.from("animations").insert(element);
    commit("ADD_ELEMENTS", res.data?.[0]);
  },
  removeElement: async ({ commit }, element: any) => {
    const res = await supabase.from("animations").delete().match({ _id: element._id });

    commit("REMOVE_ELEMENTS", res.data?.[0]);
  },
  updateElements: async ({ commit }, payload: any) => {
    const { elements, path, type } = payload;

    commit("SET_ELEMENTS", { elements, path, type });

    updateElementsOnDatabase(elements);
  },
};
