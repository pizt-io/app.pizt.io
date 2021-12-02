import {
  SVGElement,
  SVGElementDragPayload,
  SVGElementSelectPayload,
} from "@/types/svg";
import { SVG_ELEMENT_PREFIX, SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { computed, h, ref } from "vue";

import SVGElementComponent from "@modules/app/components/animation/svg/SVGElement.vue";

import { useSVGCanvasEvents } from "./events/useSVGCanvasEvents";
import { BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING } from "./mapper";

export const useSVGBuilder = (initialElementsData: Array<SVGElement>) => {
  const elements = ref<Array<SVGElement>>(initialElementsData);
  const selectedElements = ref<{ [x: string]: SVGElement }>({});
  const isMousedown = ref(false);

  const isTransforming = ref(false);

  const isSelectingMultiple = ref(false);

  // CANVAS HANDLERS

  const { isHoldingShift } = useSVGCanvasEvents({
    onKeydownControlA: (e: KeyboardEvent) => {
      e.preventDefault();
      elements.value.forEach((el: any) => {
        selectedElements.value[el.id] = el;
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
      selectedElements.value = {};
      isSelectingMultiple.value = false;
    }
  };
  const _handleMouseupCanvas = (e: MouseEvent) => {
    if (isMousedown.value) {
      isMousedown.value = false;
    }
  };

  // ELEMENT HANDLERS

  const _handleElementSelection = ({ id, el }: SVGElementSelectPayload) => {
    // Multiple selection
    if (isHoldingShift.value) {
      selectedElements.value[id] = el;
    } else if (isSelectingMultiple.value && selectedElements.value[id]) {
      // TODO(IMPROVEMENT): handle use case:
      // If got drag, do nothing
      // If it's not a drag, select this element and clear the others
    } else {
      selectedElements.value = {};
      selectedElements.value[id] = el;
    }

    if (Object.keys(selectedElements.value).length > 1) {
      isSelectingMultiple.value = true;
    }
  };

  const _handleElementDrag = ({ e, id, index }: SVGElementDragPayload) => {
    if (!isTransforming.value && isMousedown.value) {
      Object.keys(selectedElements.value).forEach((key) => {
        // Elements are passed into selectedElements by references so we can mutate them through the selectedElements object
        selectedElements.value[key].transform.translateX += e.movementX;
        selectedElements.value[key].transform.translateY += e.movementY;
      });
    }
  };

  const svgVNode = computed(() =>
    h(
      SVG_ELEMENT_TYPE.SVG,
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        onMouseup: _handleMouseupCanvas,
        onMousedown: _handleMousedownCanvas,
      },
      [
        elements.value.map((el: SVGElement, index: number) => {
          return h(
            SVGElementComponent,
            {
              index,
              element: el,
              id: el.id,
            },
            [
              h(
                el.tag,
                {
                  ...el.attrs,
                  onMousemove: (event: MouseEvent) =>
                    _handleElementDrag({ e: event, id: el.id, index }),
                  onMousedown: () => _handleElementSelection({ id: el.id, el }),
                  id: [SVG_ELEMENT_PREFIX, "el", index].join("-"),
                },
                []
              ),
              selectedElements.value[el.id] &&
                h(
                  SVG_ELEMENT_TYPE.G,
                  {
                    id: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                  },
                  [
                    BORDER_BUILDER_MAPPING[el.tag].build(el as any),
                    HANDLES_BUILDER_MAPPING[el.tag].build(el as any),
                  ]
                ),
            ]
          );
        }),
      ]
    )
  );

  return {
    svgVNode,
    elements,
    selectedElements,
    isMousedown,
    isHoldingShift,
  };
};
