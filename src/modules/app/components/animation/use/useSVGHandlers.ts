import { getCurrentInstance, inject, onMounted, Ref, ref } from "vue";
import { SVGElement, SVGElementSelectPayload, SVGStage } from "@/types/svg";
import { SVG_CANVAS_EVENT, SVG_CANVAS_EVENT_THROTTLE } from "@core/constants/svg";
import { findStageBetweenStages } from "@modules/app/utils/keyframes/findStageBetweenStages";
import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";

import _throttle from "lodash/throttle";
import _cloneDeep from "lodash/cloneDeep";

export const useSVGHandlers = (initialElementsData: Array<SVGElement>) => {
  const vm = getCurrentInstance()?.proxy;

  const currentTime = inject("currentTime") as Ref<number>;

  const elements = ref<Array<SVGElement>>(initialElementsData);
  const selectedElements = ref<{ [x: string]: SVGElement }>({});
  const isMousedown = ref(false);

  const _isTransforming = ref(false);

  const _isSelectingMultiple = ref(false);

  const { isHoldingShift } = useSVGCanvasEvents({
    onKeydownControlA: (e: KeyboardEvent) => {
      e.preventDefault();
      elements.value.forEach((el: any) => {
        selectedElements.value[el._id] = el;
      });
      _isSelectingMultiple.value = true;
    },
  });

  const handleMousedownCanvas = () => {
    isMousedown.value = true;
  };

  const handleClearSelection = () => {
    selectedElements.value = {};
    _isSelectingMultiple.value = false;
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
      Object.keys(selectedElements.value).forEach((key) => {
        const el = selectedElements.value[key];

        const keyframes = Object.keys(el.stages) as unknown as number[];
        const stages: SVGStage[] = Object.values(el.stages);

        if (el.animated) {
          const currentStageIndex = stages.findIndex((stage) => stage.time === currentTime.value);

          if (currentStageIndex > -1) {
            el.stages[keyframes[currentStageIndex]].transform.translateX += e.movementX;
            el.stages[keyframes[currentStageIndex]].transform.translateY += e.movementY;
          } else {
            // Create new keyframe
            el.stages[currentTime.value] = {} as SVGStage;

            const elementStage = findStageBetweenStages(stages, currentTime.value);

            elementStage.time = currentTime.value;

            el.stages[currentTime.value] = Object.assign(
              {},
              el.stages[currentTime.value],
              elementStage,
            );
          }
        } else {
          // Use the first stage
          el.stages[keyframes[0]].transform.translateX += e.movementX;
          el.stages[keyframes[0]].transform.translateY += e.movementY;
        }
      });

      _onUpdateElementPositions({ elements: selectedElements.value, path: "transform" });
    }
  };

  onMounted(() => {
    window.addEventListener("mouseup", _handleMouseup);
    window.addEventListener("mousemove", _handleMousemove);
  });

  const handleElementSelection = ({ id, el }: SVGElementSelectPayload) => {
    // Multiple selection
    if (isHoldingShift.value) {
      selectedElements.value[id || 0] = el;
    } else {
      // If element exist in selectedElements, allow drag, if not, remove all selected elements and select the new one
      const existSelectedElement = Object.keys(selectedElements.value).find((key) => key === id);

      if (!existSelectedElement) {
        selectedElements.value = {};
        selectedElements.value[id || 0] = el;
      }
    }

    if (Object.keys(selectedElements.value).length > 1) {
      _isSelectingMultiple.value = true;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleElementResize = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleElementRotate = () => {};

  const _onUpdateElementPositions = _throttle(function ({
    elements,
    path,
  }: {
    elements: { [x: string]: SVGElement };
    path: string;
  }) {
    vm?.$emit(SVG_CANVAS_EVENT.UPDATE, { elements: _cloneDeep(elements), path });
  },
  SVG_CANVAS_EVENT_THROTTLE);

  const mouseOverElements = ref<{ [x: string]: SVGElement }>({});
  const handleElementMouseover = ({ id, el }: SVGElementSelectPayload) => {
    mouseOverElements.value = {};
    mouseOverElements.value[id || 0] = el;
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
  };
};
