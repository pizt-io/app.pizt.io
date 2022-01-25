import { MutationTree } from "vuex";

import { SVGElement } from "@/types/svg";

import { AppState } from "./state";
import { mapElementStageToStage } from "../utils/converter";

export type Mutations = MutationTree<AppState>;

export const mutations: Mutations = {
  SET_ELEMENTS(state, payload = {}) {
    const { elements, path } = payload;
    if (path) {
      const changedElementIds = Object.keys(elements);

      changedElementIds.forEach((id) => {
        const el = state.elements.find((el: any) => el._id === id) as unknown as SVGElement;

        if (el) {
          el.stages = mapElementStageToStage(el.type, elements[id].stages);
        }
      });

      // eslint-disable-next-line no-console
      console.log("SET_ELEMENTS", elements, state.elements, path, changedElementIds);
    } else {
      state.elements = elements;
    }
  },
};
