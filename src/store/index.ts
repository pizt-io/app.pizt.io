import _cloneDeep from "lodash/cloneDeep";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { state, RootState } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});

store.dispatch("vueServerInit");

const initialStateCopy = _cloneDeep(store.state);

export function resetVuexState(): void {
  store.replaceState(_cloneDeep(initialStateCopy));
}
