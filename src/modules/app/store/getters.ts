import { GetterTree } from "vuex";
import { convertDataToElements, convertDataToTimelineElements } from "../utils/converter";
import { AppState } from "./state";

export type Getters = GetterTree<AppState, AppState>;

export const getters: Getters = {
  getCanvasElements: (state) => convertDataToElements(state.elements),
  getTimelineElements: (state) => convertDataToTimelineElements(state.elements),
};
