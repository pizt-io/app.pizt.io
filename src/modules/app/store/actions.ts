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
  Promise.all(
    elements.map(
      async (element) =>
        await supabase.from("animations").update(element).match({ _id: element._id }),
    ),
  );
}, SVG_CANVAS_EVENT_THROTTLE);

export const actions: Actions = {
  async removeProject({ state, dispatch }) {
    await supabase.from("projects").delete().match({ _id: state.selectedProject._id });
    await dispatch("getProjects");
  },
  async updateProject({ state, commit }, payload) {
    const res = await supabase
      .from("projects")
      .update(Object.assign({}, state.selectedProject, payload))
      .match({ _id: state.selectedProject._id });

    commit("SET_SELECTED_PROJECT", res.data?.[0]);
    commit("SET_PROJECT", res.data?.[0]);
  },
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

      if (!res.data?.length) {
        res = await dispatch("createProject", defaultProject);
      }

      commit("SET_PROJECTS", res.data);

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
      .eq("projectId", state.selectedProject?._id);

    commit("SET_PROJECT_ELEMENTS", res.data);

    return res.data;
  },
  addElement: async ({ state, commit }, element: any) => {
    const res = await supabase
      .from("animations")
      .insert(Object.assign({}, element, { projectId: state.selectedProject._id }));

    commit("ADD_ELEMENTS", res.data?.[0]);
  },
  removeElements: async ({ commit }, elements: any[]) => {
    return await Promise.all(
      elements.map(async (element) => {
        commit("REMOVE_ELEMENTS", element);

        return await supabase.from("animations").delete().match({ _id: element._id });
      }),
    );
  },
  updateElements: async ({ state, commit }, payload: any) => {
    const { elements, path, type } = payload;

    commit("SET_ELEMENTS", { elements, path, type });

    updateElementsOnDatabase(
      Object.values(elements).map((e: any) =>
        Object.assign({}, e, { projectId: state.selectedProject._id }),
      ),
    );
  },
};
