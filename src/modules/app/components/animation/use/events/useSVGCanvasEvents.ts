import { ref } from "vue";

export const useSVGCanvasEvents = (listeners: { [x: string]: (...args: any[]) => any } = {}) => {
  const {
    onKeydown = () => {},
    onKeydownControl = () => {},
    onKeydownAlt = () => {},
    onKeydownShift = () => {},
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

  if (window) {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
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
      } else {
        onKeydown(e);
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === "Control") {
        isHoldingControl.value = false;
      } else if (e.key === "Shift") {
        isHoldingShift.value = false;
      } else if (e.key === "Alt") {
        isHoldingAlt.value = false;
      }
    });
  }

  return {
    isHoldingControl,
    isHoldingShift,
    isHoldingAlt,
  };
};
