import { MutationTree } from "vuex";

import { SVGElement } from "@/types/svg";

import { AppState } from "./state";
import { mapElementStageToStage } from "../utils/converter";
import { SVG_UPDATE_TYPE } from "@/core/constants/svg";
import { findStageBetweenStages } from "../utils/keyframes/findStageBetweenStages";

export type Mutations = MutationTree<AppState>;

export const mutations: Mutations = {
  SET_ELEMENTS(state, payload = {}) {
    const { elements, indexes, path, type } = payload;
    switch (type) {
      case SVG_UPDATE_TYPE.ELEMENT:
        const changedElementIds = Object.keys(elements);

        changedElementIds.forEach((id) => {
          const el = state.elements.find((el: any) => el._id === id) as unknown as SVGElement;

          if (el) {
            el.stages = mapElementStageToStage(el.type, elements[id].stages);
          }
        });

        // eslint-disable-next-line no-console
        console.log("SET_ELEMENTS", elements, state.elements, path, changedElementIds);
        break;
      case SVG_UPDATE_TYPE.TIMELINE:
        indexes.forEach((elementIndex: number) => {
          const el = state.elements[elementIndex] as unknown as any;
          const timelineEl = elements[0];

          if (el) {
            const stages: any[] = Object.values(timelineEl.stages);

            stages.forEach((stage: any) => {
              // If has existed stage, update it
              if (!el.stages[stage.time]) {
                // If not existed, create a new stage
                el.stages[stage.time] = findStageBetweenStages(
                  Object.values(el.stages),
                  stage.time,
                );
              }

              if (stage.property === path) {
                el.stages[stage.time][path] = stage.value;
              }
            });
          }
        });
        // eslint-disable-next-line no-console
        console.log("SET_TIMELINE_ELEMENTS", elements, state.elements, path, indexes);
        break;
      default:
        state.elements = elements;

        break;
    }
  },
};
