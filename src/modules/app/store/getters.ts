import { GetterTree } from "vuex";
import { AppState } from "./state";

export type Getters = GetterTree<AppState, AppState>;

export const getters: Getters = {};
