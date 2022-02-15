import { onUnmounted } from "vue";
import { Store, useStore } from "vuex";

export const useLazyStore = <T>(moduleName: string, module: any): Store<T> => {
  const store = useStore<T>();

  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, module);
  }

  onUnmounted(() => {
    if (store.hasModule(moduleName)) {
      store.unregisterModule(moduleName);
    }
  });

  return store;
};
