import {
  SVGElement,
  SVGElementDragPayload,
  SVGElementSelectPayload,
} from "@/types/svg";
import { SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { computed, h, ref } from "vue";

import SVGElementComponent from "@core/components/SVGElement.vue";

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

export const useSVGBuilder = (elements: Array<SVGElement>) => {
  const _elements = ref(elements);
  const _selectedElements = ref<{ [x: string]: SVGElement }>({});

  const handleElementDragged = ({ index, dx, dy }: SVGElementDragPayload) => {
    _elements.value[index].transform.translateX += dx;
    _elements.value[index].transform.translateY += dy;
  };

  const handleElementSelected = ({ id, el }: SVGElementSelectPayload) => {
    _selectedElements.value = {};
    // TODO(FEATURE): Haven't support multiple selection yet
    _selectedElements.value[id] = el;
  };

  const svgVNode = computed(() =>
    h(
      SVG_ELEMENT_TYPE.SVG,
      { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
      [
        _elements.value.map((el: SVGElement, index: number) => {
          const elementId = "el-" + index;

          return h(
            SVGElementComponent,
            {
              index,
              element: el,
              id: elementId,
              onDrag: handleElementDragged,
              onSelect: handleElementSelected,
            },
            [
              h(el.tag, { ...el.attrs }, []),
              _selectedElements.value[elementId] &&
                h(
                  SVG_ELEMENT_TYPE.G,
                  {
                    id: "el-bbox-" + index,
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
  };
};
