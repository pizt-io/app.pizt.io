import { SVGElement } from "@/types/svg";
import { SVG_ELEMENT_TYPE } from "@core/constants/svg";
import { computed, h } from "vue";

import {
  useLineBorderBuilder,
  useLineHandlesBuilder,
  usePathBorderBuilder,
  usePathHandlesBuilder,
  useRadialBorderBuilder,
  useRadialHandlesBuilder,
  useRectBorderBuilder,
  useRectHandlesBuilder,
} from "./builders";
import { usePolygonBorderBuilder } from "./builders/polygon/usePolygonBorderBuilder";
import { usePolygonHandlesBuilder } from "./builders/polygon/usePolygonHandlesBuilder";
import { usePolylineBorderBuilder } from "./builders/polyline/usePolylineBorderBuilder";
import { usePolylineHandlesBuilder } from "./builders/polyline/usePolylineHandlesBuilder";

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
  const svgVNode = computed(() =>
    h(
      SVG_ELEMENT_TYPE.SVG,
      { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%" },
      [
        elements.map((el: SVGElement, index: number) => {
          return h(
            SVG_ELEMENT_TYPE.G,
            {
              id: "el-" + index,
              class: "el-" + el.tag,
              transform: `translate(${el.transform.translateX}, ${el.transform.translateY})`,
            },
            [
              h(el.tag, { ...el.attrs }, []),
              h(SVG_ELEMENT_TYPE.G, {}, [
                BORDER_BUILDER_MAPPING[el.tag].build(el as any),
                HANDLES_BUILDER_MAPPING[el.tag].build(el as any),
              ]),
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
