import { GetterTree } from "vuex";
import { RootState } from "./state";

export type Getters = GetterTree<RootState, RootState>;

export const getters: Getters = {};
