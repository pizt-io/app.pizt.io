import { computed, getCurrentInstance, inject, onMounted, Ref, ref } from "vue";
import { SVG_CANVAS_EVENT, SVG_CANVAS_EVENT_THROTTLE } from "@core/constants/svg";
// import { findStageBetweenStages } from "@modules/app/utils/keyframes/findStageBetweenStages";
import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";

import _throttle from "lodash/throttle";
import _cloneDeep from "lodash/cloneDeep";
import { findStageBetweenStages } from "@/modules/app/utils/keyframes/findStageBetweenStages";
import { AttributesMap } from "@/core/components/vue-timeline-animation/src/constants";

enum ElementHandlerIndex {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
}

export const useSVGHandlers = (elements: Ref<any[]>) => {
  const vm = getCurrentInstance()?.proxy;

  const currentTime = inject("currentTime") as Ref<number>;
  const isLayoutBodyFocus = inject("isLayoutBodyFocus") as Ref<boolean>;

  const selectedElements = ref<{ [x: string]: any }>({});
  const isMousedownElement = ref(false);

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
    isMousedownElement.value = true;
  };

  const handleClearSelection = () => {
    selectedElements.value = {};
    _isSelectingMultiple.value = false;

    vm?.$emit(SVG_CANVAS_EVENT.DESELECT);
  };

  const _handleMouseup = () => {
    isMousedownElement.value = false;
    _isTransforming.value = false;

    selectedHandlers.value = {};
  };

  /**
   * Mutate elements positions through transform because element have different way to specify position
   *
   * For example: Rectangle have x, y while circle have rx, ry
   *
   */
  const _handleMousemove = (e: MouseEvent) => {
    if (!_isTransforming.value && isMousedownElement.value) {
      _handleElementMove(e);
    } else if (_isTransforming.value) {
      _handleElementResize(e);
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

  const _handleElementResize = (e: MouseEvent) => {
    const selectedHandlerKeys = Object.keys(selectedHandlers.value);

    if (selectedHandlerKeys.length > 0) {
      selectedHandlerKeys.forEach((elementId: string) => {
        const element = selectedElements.value[elementId];
        const stages = element.animations[AttributesMap.SIZE];
        const handlerIndex = selectedHandlers.value[elementId];

        if (stages) {
          const currentStageIndex = stages.findIndex(
            (stage: any) => stage.time === currentTime.value,
          );

          if (currentStageIndex >= 0) {
            switch (handlerIndex) {
              // case ElementHandlerIndex.TOP_LEFT:
              // case ElementHandlerIndex.TOP_RIGHT:
              case ElementHandlerIndex.BOTTOM_RIGHT:
                stages[currentStageIndex].size.width += e.movementX;
                stages[currentStageIndex].size.height += e.movementY;
                break;
              // case ElementHandlerIndex.BOTTOM_LEFT:
            }
          } else {
            // Create new keyframe
            const currentStage = findStageBetweenStages(
              stages,
              currentTime.value,
              AttributesMap.SIZE,
            );

            stages.push(currentStage);
          }
        } else {
          switch (handlerIndex) {
            // case ElementHandlerIndex.TOP_LEFT:
            // case ElementHandlerIndex.TOP_RIGHT:
            case ElementHandlerIndex.BOTTOM_RIGHT:
              element.attrs.size.width += e.movementX;
              element.attrs.size.height += e.movementY;
              break;
            // case ElementHandlerIndex.BOTTOM_LEFT:
          }
        }
      });

      _onUpdateElementPositions({
        elements: selectedElements.value,
        path: AttributesMap.SIZE,
      });
    }
  };

  const _handleElementMove = (e: MouseEvent) => {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleElementRotate = () => {};

  const selectedHandlers = ref<any>({});
  const handleHandlerSelection = ({ id, handlerIndex }: { id: any; handlerIndex: number }) => {
    selectedHandlers.value = {};
    selectedHandlers.value[id] = handlerIndex;

    _isTransforming.value = true;
  };

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
    isMousedownElement,
    isHoldingShift,
    handleMousedownCanvas,
    handleClearSelection,
    handleElementSelection,
    handleElementRotate,
    handleHandlerSelection,
    mouseOverElements,
    handleElementMouseover,
    handleElementMouseout,
    svgCanvasElement,
    svgCanvasBoundingRectangle,
  };
};
