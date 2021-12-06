import { canvas } from "@/mock/canvas";
import { ActionTree } from "vuex";
import { useSVGConverter } from "../use/svg/converter";
import { AppState } from "./state";

export type Actions = ActionTree<AppState, AppState>;

export const actions: Actions = {
  getCanvasElements: async ({ commit }) => {
    const { convertDataToElements } = useSVGConverter();

    const elements = convertDataToElements(canvas);

    commit("SET_ELEMENTS", elements);

    return elements;
  },
  updateCanvasElements: async ({ commit }, elements) => {
    // Update to database
    // Get data back from database (in case of multiple modification from different browsers in the same time)

    commit("SET_ELEMENTS", elements);
  },
};
