import { useSVGMapper } from "./useSVGMapper";
import { useSVGPathMapper } from "./useSVGPathMapper";

import { SVG_ELEMENT_TYPE } from "@core/constants/svg";

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
} from "@modules/app/use/svg/builder";

const borderOptions = Object.freeze({
  fill: "none",
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
  [SVG_ELEMENT_TYPE.CIRCLE as string]: useRadialHandlesBuilder(handlerOptions)(
    SVG_ELEMENT_TYPE.CIRCLE,
  ),
  [SVG_ELEMENT_TYPE.ELLIPSE as string]: useRadialHandlesBuilder(handlerOptions)(
    SVG_ELEMENT_TYPE.ELLIPSE,
  ),
  [SVG_ELEMENT_TYPE.RECT as string]: useRectHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.LINE as string]: useLineHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.PATH as string]: usePathHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.POLYGON as string]: usePolygonHandlesBuilder(handlerOptions),
  [SVG_ELEMENT_TYPE.POLYLINE as string]: usePolylineHandlesBuilder(handlerOptions),
});

const BORDER_BUILDER_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE as string]: useRadialBorderBuilder(borderOptions)(
    SVG_ELEMENT_TYPE.CIRCLE,
  ),
  [SVG_ELEMENT_TYPE.ELLIPSE as string]: useRadialBorderBuilder(borderOptions)(
    SVG_ELEMENT_TYPE.ELLIPSE,
  ),
  [SVG_ELEMENT_TYPE.RECT as string]: useRectBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.LINE as string]: useLineBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.PATH as string]: usePathBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.POLYGON as string]: usePolygonBorderBuilder(borderOptions),
  [SVG_ELEMENT_TYPE.POLYLINE as string]: usePolylineBorderBuilder(borderOptions),
});

export { useSVGMapper, useSVGPathMapper, BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING };
