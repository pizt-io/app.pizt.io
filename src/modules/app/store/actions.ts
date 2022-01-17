import { canvas } from "@/mock/canvas";
import { ActionTree } from "vuex";
import { AppState } from "./state";

export type Actions = ActionTree<AppState, AppState>;

export const actions: Actions = {
  getElements: async ({ commit }) => {
    const elements = canvas;

    commit("SET_ELEMENTS", { elements });

    return elements;
  },
  updateElements: async ({ commit }, { elements, path }) => {
    // Update to database
    // Get data back from database (in case of multiple modification from different browsers in the same time)

    commit("SET_ELEMENTS", { elements, path });
  },
};
