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

export { useSVGMapper, useSVGPathMapper, BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING };
