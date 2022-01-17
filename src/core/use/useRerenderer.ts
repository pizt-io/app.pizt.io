import { ref } from "vue";

export const useRerenderer = () => {
  const forceUpdateFlag = ref(0);

  const forceUpdate = () => {
    forceUpdateFlag.value++;
  };

  return {
    forceUpdate,
    forceUpdateFlag,
  };
};
