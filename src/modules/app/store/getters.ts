import { GetterTree } from "vuex";
import { AppState } from "./state";
import { RootState } from "@/store/state";

import _cloneDeep from "lodash/cloneDeep";

export type Getters = GetterTree<AppState, RootState>;

export const getters: Getters = {
  getElements: (state) => _cloneDeep(state.elements),
  getProjects: (state) => _cloneDeep(state.projects),
  getSelectedProject: (state) => _cloneDeep(state.selectedProject),
};
