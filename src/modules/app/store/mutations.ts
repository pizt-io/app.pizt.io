import { MutationTree } from "vuex";
import { AppState } from "./state";

export type Mutations = MutationTree<AppState>;

export const mutations: Mutations = {
  SET_ELEMENTS(state, payload = {}) {
    const { elements, path } = payload;
    if (path) {
      const changedIds = Object.keys(elements);

      changedIds.forEach((id) => {
        const el: any = state.elements.find((el: any) => el._id === id);

        if (el) {
          el.stages = Object.assign({}, el.stages, elements[id].stages);
        }
      });

      // eslint-disable-next-line no-console
      console.log("SET_ELEMENTS", state.elements, path, changedIds);
    } else {
      state.elements = elements;
    }
  },
};
