import { onBeforeUnmount, ref } from "vue";

export const useSVGCanvasEvents = (listeners: { [x: string]: (...args: any[]) => any } = {}) => {
  const {
    onKeydown = () => {},
    onKeydownControl = () => {},
    onKeydownAlt = () => {},
    onKeydownShift = () => {},
    onKeydownSpace = () => {},
    onKeydownControlA = () => {},
    onKeydownControlB = () => {},
    onKeydownControlC = () => {},
    onKeydownControlD = () => {},
    onKeydownControlS = () => {},
    onKeydownControlV = () => {},
  } = listeners;

  const isHoldingControl = ref(false);
  const isHoldingShift = ref(false);
  const isHoldingAlt = ref(false);
  const isHoldingSpace = ref(false);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case "a":
          onKeydownControlA(e);
          break;
        case "b":
          onKeydownControlB(e);
          break;
        case "c":
          onKeydownControlC(e);
          break;
        case "d":
          onKeydownControlD(e);
          break;
        case "s":
          onKeydownControlS(e);
          break;
        case "v":
          onKeydownControlV(e);
          break;
        default:
          onKeydownControl(e);
          break;
      }
      isHoldingControl.value = true;
    } else if (e.shiftKey) {
      onKeydownShift(e);
      isHoldingShift.value = true;
    } else if (e.altKey) {
      onKeydownAlt(e);
      isHoldingAlt.value = true;
    } else if (e.key === " ") {
      onKeydownSpace(e);
      isHoldingSpace.value = true;
    } else {
      onKeydown(e);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Control") {
      isHoldingControl.value = false;
    } else if (e.key === "Shift") {
      isHoldingShift.value = false;
    } else if (e.key === "Alt") {
      isHoldingAlt.value = false;
    } else if (e.key === " ") {
      isHoldingSpace.value = false;
    }
  };

  if (window) {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyUp);

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyUp);
    });
  }

  return {
    isHoldingControl,
    isHoldingShift,
    isHoldingAlt,
    isHoldingSpace,
  };
};
