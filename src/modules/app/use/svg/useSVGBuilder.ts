import { SVGElement, SVGElementSelectPayload } from "@/types/svg";
import { SVG_ELEMENT_PREFIX, SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { computed, h, inject, onMounted, Ref, ref } from "vue";

import SVGElementComponent from "@modules/app/components/animation/svg/SVGElement.vue";

import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";
import { BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING } from "./mapper";

export const useSVGBuilder = (initialElementsData: Array<SVGElement>) => {
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
        // Elements are passed into selectedElements by references so we can mutate them through the selectedElements object
        selectedElements.value[key].stages[currentTime.value].transform.translateX += e.movementX;
        selectedElements.value[key].stages[currentTime.value].transform.translateY += e.movementY;
      });
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
          const elementStage = el.stages[currentTime.value] || el.stages[0];
          const time = el.stages[currentTime.value] ? currentTime.value : 0;

          return h(
            SVGElementComponent,
            {
              time,
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
