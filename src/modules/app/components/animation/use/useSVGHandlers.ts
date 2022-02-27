import { computed, getCurrentInstance, inject, onMounted, Ref, ref } from "vue";
import { SVG_CANVAS_EVENT, SVG_CANVAS_EVENT_THROTTLE } from "@core/constants/svg";
// import { findStageBetweenStages } from "@modules/app/utils/keyframes/findStageBetweenStages";
import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";

import _throttle from "lodash/throttle";
import _cloneDeep from "lodash/cloneDeep";
import { findStageBetweenStages } from "@/modules/app/utils/keyframes/findStageBetweenStages";
import { AttributesMap } from "@/core/components/vue-timeline-animation/src/constants";

export const useSVGHandlers = (elements: Ref<any[]>) => {
  const vm = getCurrentInstance()?.proxy;

  const currentTime = inject("currentTime") as Ref<number>;
  const isLayoutBodyFocus = inject("isLayoutBodyFocus") as Ref<boolean>;

  const selectedElements = ref<{ [x: string]: any }>({});
  const isMousedown = ref(false);

  const _isTransforming = ref(false);

  const _isSelectingMultiple = ref(false);

  const svgCanvasElement = computed(() => document && document.getElementById("svg-canvas"));
  const svgCanvasBoundingRectangle = computed(() =>
    svgCanvasElement.value?.getBoundingClientRect(),
  );

  const { isHoldingShift } = useSVGCanvasEvents({
    onKeydownControlA: (e: KeyboardEvent) => {
      if (isLayoutBodyFocus.value) {
        e.preventDefault();
        elements.value.forEach((el: any) => {
          selectedElements.value[el._id] = el;
        });
        _isSelectingMultiple.value = true;
      } else {
        return;
      }
    },
  });

  const handleMousedownCanvas = () => {
    isMousedown.value = true;
  };

  const handleClearSelection = () => {
    selectedElements.value = {};
    _isSelectingMultiple.value = false;

    vm?.$emit(SVG_CANVAS_EVENT.DESELECT);
  };

  const _handleMouseup = () => {
    isMousedown.value = false;
  };

  /**
   * Mutate elements positions through transform because element have different way to specify position
   *
   * For example: Rectangle have x, y while circle have rx, ry
   *
   */
  const _handleMousemove = (e: MouseEvent) => {
    if (!_isTransforming.value && isMousedown.value) {
      const selectedElementsKeys = Object.keys(selectedElements.value);

      if (selectedElementsKeys.length > 0) {
        selectedElementsKeys.forEach((elementId: string) => {
          const element = selectedElements.value[elementId];
          const stages = element.animations[AttributesMap.TRANSLATE];

          if (stages) {
            const currentStageIndex = stages.findIndex(
              (stage: any) => stage.time === currentTime.value,
            );

            if (currentStageIndex >= 0) {
              stages[currentStageIndex].transform.translate.translateX += e.movementX;
              stages[currentStageIndex].transform.translate.translateY += e.movementY;
            } else {
              // Create new keyframe
              const currentStage = findStageBetweenStages(
                stages,
                currentTime.value,
                AttributesMap.TRANSLATE,
              );

              stages.push(currentStage);
            }
          } else {
            element.attrs.transform.translate.translateX += e.movementX;
            element.attrs.transform.translate.translateY += e.movementY;
          }
        });

        _onUpdateElementPositions({
          elements: selectedElements.value,
          path: AttributesMap.TRANSLATE,
        });
      }
    }
  };

  onMounted(() => {
    window.addEventListener("mouseup", _handleMouseup);
    window.addEventListener("mousemove", _handleMousemove);
  });

  const handleElementSelection = ({ id, element }: any) => {
    // Multiple selection
    if (isHoldingShift.value) {
      selectedElements.value[id] = element;
    } else {
      // If element exist in selectedElements, allow drag, if not, remove all selected elements and select the new one
      const existSelectedElement = Object.keys(selectedElements.value).find((key) => key === id);

      if (!existSelectedElement) {
        selectedElements.value = {};
        selectedElements.value[id] = element;
      }
    }

    if (Object.keys(selectedElements.value).length > 1) {
      _isSelectingMultiple.value = true;
    }

    vm?.$emit(SVG_CANVAS_EVENT.SELECT, selectedElements.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleElementResize = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleElementRotate = () => {};

  const _onUpdateElementPositions = _throttle(function ({ elements, path }: any) {
    vm?.$emit("update:modelElements", { elements: _cloneDeep(elements), path });
  }, SVG_CANVAS_EVENT_THROTTLE);

  const mouseOverElements = ref<{ [x: string]: any }>({});
  const handleElementMouseover = ({ id, element }: any) => {
    mouseOverElements.value = {};
    mouseOverElements.value[id || 0] = element;
  };
  const handleElementMouseout = () => {
    mouseOverElements.value = {};
  };

  return {
    currentTime,
    elements,
    selectedElements,
    isMousedown,
    isHoldingShift,
    handleMousedownCanvas,
    handleClearSelection,
    handleElementSelection,
    handleElementResize,
    handleElementRotate,
    mouseOverElements,
    handleElementMouseover,
    handleElementMouseout,
    svgCanvasElement,
    svgCanvasBoundingRectangle,
  };
};
