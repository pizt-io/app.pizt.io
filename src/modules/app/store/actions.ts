import { canvas } from "@/mock/animations";
import { ActionTree } from "vuex";
import { AppState } from "./state";

export type Actions = ActionTree<AppState, AppState>;

export const actions: Actions = {
  getElements: async ({ commit }) => {
    const elements = canvas;

    commit("SET_ELEMENTS", { elements });

    return elements;
  },
  updateElements: async ({ commit }, payload: any) => {
    const { elements, path, type } = payload;

    commit("SET_ELEMENTS", { elements, path, type });

    // Update to database asynchoronously
    // Get data back from database (in case of multiple modification from different browsers in the same time)
  },
};
