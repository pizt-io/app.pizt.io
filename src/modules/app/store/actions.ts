import { SVG_ELEMENT_PREFIX } from "@/core/constants/svg";
import { canvas } from "@/mock/canvas";
import { ActionTree } from "vuex";
import { useSVGConverter } from "../use/svg/converter";
import { AppState } from "./state";

export type Actions = ActionTree<AppState, AppState>;

export const actions: Actions = {
  getCanvasElements: async ({ commit }) => {
    const { convertDataToElements } = useSVGConverter();

    const elements = convertDataToElements(canvas).map((el, index) => ({
      ...el,
      id: `${SVG_ELEMENT_PREFIX}-g-${index}`,
    }));

    commit("SET_ELEMENTS", elements);

    console.log("getCanvasElements", elements);

    return elements;
  },
  updateCanvasElements: async ({ commit }, elements) => {
    // Update to database
    // Get data back from database (in case of multiple modification from different browsers in the same time)

    commit("SET_ELEMENTS", elements);
  },
};
