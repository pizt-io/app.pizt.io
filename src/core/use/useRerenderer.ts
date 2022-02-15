import { ref } from "vue";

export const useRerenderer = (defaultVal = 1) => {
  const forceUpdateFlag = ref(defaultVal);

  const forceUpdate = () => {
    forceUpdateFlag.value++;
  };

  return {
    forceUpdate,
    forceUpdateFlag,
  };
};
