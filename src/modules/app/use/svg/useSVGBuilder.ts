import { SVGElement, SVGElementSelectPayload } from "@/types/svg";
import {
  SVG_CANVAS_EVENT,
  SVG_CANVAS_EVENT_DEBOUNCE,
  SVG_ELEMENT_PREFIX,
  SVG_ELEMENT_TYPE,
} from "@core/constants/svg";
import { computed, getCurrentInstance, h, inject, onMounted, Ref, ref } from "vue";
import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";
import { BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING } from "./mapper";

import SVGElementComponent from "@modules/app/components/animation/svg/SVGElement.vue";

import _debounce from "lodash/debounce";
import { findNearestObjects } from "@/core/utils/findNearestObjects";

export const useSVGBuilder = (initialElementsData: Array<SVGElement>) => {
  const vm = getCurrentInstance()?.proxy;

  const currentTime = inject("currentTime") as Ref<number>;

  const elements = ref<Array<SVGElement>>(initialElementsData);
  const selectedElements = ref<{ [x: string]: SVGElement }>({});
  const isMousedown = ref(false);

  const isTransforming = ref(false);

  const isSelectingMultiple = ref(false);

  const { isHoldingShift } = useSVGCanvasEvents({
    onKeydownControlA: (e: KeyboardEvent) => {
      e.preventDefault();
      elements.value.forEach((el: any) => {
        selectedElements.value[el._id] = el;
      });
      isSelectingMultiple.value = true;
    },
  });

  const _isClickingOnCanvas = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    return targetElement?.nodeName === SVG_ELEMENT_TYPE.SVG;
  };

  const _handleMousedownCanvas = (e: MouseEvent) => {
    isMousedown.value = true;

    if (_isClickingOnCanvas(e)) {
      // TODO(BUG): Drag multiple selected elements
      selectedElements.value = {};
      isSelectingMultiple.value = false;
    }
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
    const targetElement = e.target as HTMLElement;

    targetElement?.nodeName === SVG_ELEMENT_TYPE.SVG;

    if (!isTransforming.value && isMousedown.value) {
      Object.keys(selectedElements.value).forEach((key) => {
        const el = selectedElements.value[key];

        const keyframes: string[] = Object.keys(el.stages);

        if (el.animated) {
          const stages = Object.values(el.stages);
          const currentStageIndex = stages.findIndex((stage) => stage.time === currentTime.value);

          if (currentStageIndex > -1) {
            el.stages[keyframes[currentStageIndex]].transform.translateX += e.movementX;
            el.stages[keyframes[currentStageIndex]].transform.translateY += e.movementY;
          } else {
            // Create new keyframe
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

  const _handleElementSelection = ({ id, el }: SVGElementSelectPayload) => {
    // Multiple selection
    if (isHoldingShift.value) {
      selectedElements.value[id || 0] = el;
    } else {
      selectedElements.value = {};
      selectedElements.value[id || 0] = el;
    }

    if (Object.keys(selectedElements.value).length > 1) {
      isSelectingMultiple.value = true;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleElementResize = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleElementRotate = () => {};

  const _onUpdateElementPositions = _debounce(function ({
    elements,
    path,
  }: {
    elements: { [x: string]: SVGElement };
    path: string;
  }) {
    vm?.$emit(SVG_CANVAS_EVENT.UPDATE, { elements, path });
  },
  SVG_CANVAS_EVENT_DEBOUNCE);

  const svgVNode = computed(() => {
    return h(
      SVG_ELEMENT_TYPE.SVG,
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        onMousedown: _handleMousedownCanvas,
      },
      [
        elements.value.map((el: SVGElement, index: number) => {
          const stages = Object.values(el.stages);
          const currentStageIndex = stages.findIndex((stage) => stage.time === currentTime.value);

          const keyframes: string[] = Object.keys(el.stages);

          let elementStage: any = null;
          // let keyframe = "";

          if (el.animated) {
            elementStage = el.stages[keyframes[currentStageIndex]];
            // keyframe = keyframes[currentStageIndex];

            if (!elementStage) {
              elementStage = {
                time: currentTime.value,
              };

              const [previousStage, nextStage] = findNearestObjects(
                stages,
                currentTime.value,
                "time",
              );

              if (previousStage && nextStage) {
                Object.keys(previousStage).forEach((stageKey) => {
                  elementStage[stageKey] = {};

                  Object.keys(previousStage[stageKey]).forEach((attrKey) => {
                    elementStage[stageKey][attrKey] =
                      (Math.abs(currentTime.value - previousStage.time) *
                        100 *
                        Math.abs(nextStage[stageKey][attrKey] - previousStage[stageKey][attrKey])) /
                      Math.abs(currentTime.value - nextStage.time);
                  });
                });

                console.log(previousStage, nextStage, elementStage);
              }
            }
          } else {
            elementStage = el.stages[keyframes[0]];
            // keyframe = keyframes[0];
          }

          return (
            elementStage &&
            h(
              SVGElementComponent,
              {
                transform: elementStage.transform,
                index,
                element: el,
                id: el._id,
              },
              [
                h(
                  el.type,
                  {
                    ...elementStage.attrs,
                    onMousedown: () => _handleElementSelection({ id: el._id, el }),
                    id: [SVG_ELEMENT_PREFIX, "el", index].join("-"),
                  },
                  [
                    // Animation tags
                  ],
                ),
                selectedElements.value[el._id || 0] &&
                  h(
                    SVG_ELEMENT_TYPE.G,
                    {
                      id: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                    },
                    [
                      BORDER_BUILDER_MAPPING[el.type].build(elementStage as any),
                      HANDLES_BUILDER_MAPPING[el.type].build(elementStage as any),
                    ],
                  ),
              ],
            )
          );
        }),
      ],
    );
  });

  return {
    svgVNode,
    elements,
    selectedElements,
    isMousedown,
    isHoldingShift,
  };
};
