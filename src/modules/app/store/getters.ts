import { GetterTree } from "vuex";
import { AppState } from "./state";

import _cloneDeep from "lodash/cloneDeep";

export type Getters = GetterTree<AppState, AppState>;

export const getters: Getters = {
  getElements: (state) => _cloneDeep(state.elements),
};
