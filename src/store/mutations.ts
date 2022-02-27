import { MutationTree } from "vuex";
import { RootState } from "./state";

export type Mutations = MutationTree<RootState>;

export const mutations: Mutations = {
  SET_VUE_CLIENT_READY(state, vueClientReady) {
    state.vueClientReady = vueClientReady;
  },
  SET_USER_SESSION(state, userSession) {
    state.userSession = userSession;
  },
  SET_TRANSITIONS(state, transitions) {
    state.transitions = transitions;
  },
  UPDATE_SELECTED_TRANSITION(state, selectedTransition) {
    state.selectedTransition = Object.assign({}, state.selectedTransition, selectedTransition);
  },
  SET_SELECTED_TRANSITION(state, selectedTransition) {
    state.selectedTransition = selectedTransition;
  },
  ADD_TRANSITION(state, payload) {
    state.transitions.push(payload);
  },
  REMOVE_TRANSITION(state, payload) {
    state.transitions = state.transitions.filter(
      (transition: any) => transition._id !== payload._id,
    );
  },
  UPDATE_TRANSITION(state, payload) {
    const transitionIndex = state.transitions.findIndex(
      (transition: any) => transition._id === payload._id,
    );

    if (transitionIndex >= 0) {
      state.transitions[transitionIndex] = payload;
    }
  },
};
