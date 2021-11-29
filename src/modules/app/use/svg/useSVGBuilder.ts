import {
  SVGElement,
  SVGElementDragPayload,
  SVGElementSelectPayload,
} from "@/types/svg";
import { SVG_ELEMENT_PREFIX, SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { computed, h, ref } from "vue";

import SVGElementComponent from "@modules/app/components/animation/svg/SVGElement.vue";

import {
  useLineBorderBuilder,
  useLineHandlesBuilder,
  usePathBorderBuilder,
  usePathHandlesBuilder,
  useRadialBorderBuilder,
  useRadialHandlesBuilder,
  useRectBorderBuilder,
  useRectHandlesBuilder,
  usePolygonBorderBuilder,
  usePolygonHandlesBuilder,
  usePolylineBorderBuilder,
  usePolylineHandlesBuilder,
} from "./builder";

const borderOptions = Object.freeze({
  fill: "transparent",
  stroke: "#4794ff",
  strokeWidth: "2",
});

const handlerOptions = Object.freeze({
  width: 8,
  height: 8,
  fill: "white",
  stroke: "#52647d",
  strokeWidth: "2",
});

const HANDLES_BUILDER_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: useRadialHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.ELLIPSE]: useRadialHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.RECT]: useRectHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.LINE]: useLineHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.PATH]: usePathHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.POLYGON]: usePolygonHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.POLYLINE]: usePolylineHandlesBuilder(handlerOptions),
});

const BORDER_BUILDER_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: useRadialBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.ELLIPSE]: useRadialBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.RECT]: useRectBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.LINE]: useLineBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.PATH]: usePathBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.POLYGON]: usePolygonBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.POLYLINE]: usePolylineBorderBuilder(borderOptions),
});

export const useSVGBuilder = (initialElementsData: Array<SVGElement>) => {
  const elements = ref<Array<SVGElement>>(initialElementsData);
  const selectedElements = ref<{ [x: string]: SVGElement }>({});
  const isMousedown = ref(false);

  const isTransforming = ref(false);

  const _isClickingOnCanvas = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    return targetElement?.nodeName === SVG_ELEMENT_TYPE.SVG;
  };

  const _handleMousedownEl = ({ id, el }: SVGElementSelectPayload) => {
    selectedElements.value = {};
    // TODO(FEATURE): Haven't support multiple selection yet
    selectedElements.value[id] = el;
  };

  const _handleMousemoveEl = ({ e, id, index }: SVGElementDragPayload) => {
    const el = selectedElements.value[id];

    if (el && !isTransforming.value && isMousedown.value) {
      elements.value[index].transform.translateX += e.movementX;
      elements.value[index].transform.translateY += e.movementY;
    }
  };

  const _handleMousedownCanvas = (e: MouseEvent) => {
    isMousedown.value = true;

    if (_isClickingOnCanvas(e)) {
      selectedElements.value = {};
    }
  };
  const _handleMouseupCanvas = (e: MouseEvent) => {
    if (isMousedown.value) {
      isMousedown.value = false;
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
          const elementId = [SVG_ELEMENT_PREFIX, "g", index].join("-");

          return h(
            SVGElementComponent,
            {
              index,
              element: el,
              id: elementId,
              onMousemove: (event: MouseEvent) =>
                _handleMousemoveEl({ e: event, id: elementId, index }),
              onMousedown: () => _handleMousedownEl({ id: elementId, el }),
            },
            [
              h(
                el.tag,
                {
                  ...el.attrs,
                  id: [SVG_ELEMENT_PREFIX, "el", index].join("-"),
                },
                []
              ),
              selectedElements.value[elementId] &&
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
  };
};
