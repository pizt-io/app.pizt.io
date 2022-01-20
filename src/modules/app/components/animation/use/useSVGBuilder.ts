import { computed, h } from "vue";
import { SVGElement } from "@/types/svg";
import { SVG_ELEMENT_PREFIX, SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING } from "./mapper";

import { useSVGHandlers } from "./useSVGHandlers";

import { findStageBetweenStages } from "@modules/app/utils/keyframes/findStageBetweenStages";

import SVGElementComponent from "@modules/app/components/animation/svg-wrapper/SVGElement.vue";

export const useSVGBuilder = (initialElementsData: Array<SVGElement>) => {
  const {
    currentTime,
    elements,
    selectedElements,
    isHoldingShift,
    isMousedown,
    handleMousedownCanvas,
    handleElementSelection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleElementResize,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleElementRotate,
    mouseOverElements,
    handleElementMouseover,
    handleElementMouseout,
  } = useSVGHandlers(initialElementsData);

  const svgVNode = computed(() => {
    return h(
      SVG_ELEMENT_TYPE.SVG,
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        onMousedown: handleMousedownCanvas,
      },
      [
        elements.value.map((el: SVGElement, index: number) => {
          const stages = Object.values(el.stages);
          const currentStageIndex = stages.findIndex((stage) => stage.time === currentTime.value);

          const keyframes: string[] = Object.keys(el.stages);

          let elementStage: any = null;

          if (el.animated) {
            elementStage = el.stages[keyframes[currentStageIndex]];

            // If currentTime doesn't match any keyframe, calculate the stage value between 2 nearest keyframes
            if (!elementStage) {
              elementStage = findStageBetweenStages(stages, currentTime.value);
            }
          } else {
            elementStage = el.stages[keyframes[0]];
          }

          const borderVNode = BORDER_BUILDER_MAPPING[el.type].build(elementStage as any, {
            name: el.name,
            labelStyle: { fontSize: "12px", pointerEvents: "none", userSelect: "none" },
            labelOffset: 3,
          });
          const handleVNodes = HANDLES_BUILDER_MAPPING[el.type].build(elementStage as any);

          return (
            elementStage &&
            h(
              SVGElementComponent,
              {
                transform: elementStage.transform,
                index,
                element: el,
                key: el._id,
                id: el._id,
                onMouseover: () => handleElementMouseover({ id: el._id, el }),
                onMouseout: handleElementMouseout,
              },
              [
                h(
                  el.type,
                  {
                    ...elementStage.attrs,
                    onMousedown: () => handleElementSelection({ id: el._id, el }),
                    id: [SVG_ELEMENT_PREFIX, "el", index].join("-"),
                  },
                  [
                    // Animation tags
                  ],
                ),
                [
                  selectedElements.value[el._id || 0] &&
                    h(
                      SVG_ELEMENT_TYPE.G,
                      {
                        id: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                        key: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                      },
                      [borderVNode, handleVNodes],
                    ),
                  mouseOverElements.value[el._id || 0] &&
                    h(
                      SVG_ELEMENT_TYPE.G,
                      {
                        id: [SVG_ELEMENT_PREFIX, "obox", index].join("-"),
                        key: [SVG_ELEMENT_PREFIX, "obox", index].join("-"),
                      },
                      [borderVNode],
                    ),
                ],
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
