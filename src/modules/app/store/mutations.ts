/* eslint-disable */

import { MutationTree } from "vuex";

import { AppState } from "./state";
import { SVG_UPDATE_TYPE } from "@/core/constants/svg";

export type Mutations = MutationTree<AppState>;

export const mutations: Mutations = {
  SET_ELEMENTS(state, payload = {}) {
    const { elements, path, type } = payload;

    console.log("SET_ELEMENTS", elements, path, type);

    if (elements) {
      switch (type) {
        case SVG_UPDATE_TYPE.CANVAS:
          const changedElementIds = Object.keys(elements);

          changedElementIds.forEach((id) => {
            const el = state.elements.find((el: any) => el._id === id) as unknown as any;
            const animations = el.animations;

            if (animations[path]) {
              el.animations[path] = elements[id].animations[path];
            } else {
              el.animations = elements[id].animations;
              el.attrs = elements[id].attrs;
            }
          });
          break;
        case SVG_UPDATE_TYPE.TIMELINE:
        default:
          state.elements = elements;

          break;
      }
    }
  },
};
