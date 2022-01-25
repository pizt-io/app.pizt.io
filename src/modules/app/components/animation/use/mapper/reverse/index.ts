import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

import { circle } from "./_circle";
import { ellipse } from "./_ellipse";
import { line } from "./_line";
import { polygon } from "./_polygon";
import { polyline } from "./_polyline";
import { rect } from "./_rect";
import { path } from "./_path";

export const SVG_STAGES_REVERSE_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: circle,
  [SVG_ELEMENT_TYPE.ELLIPSE]: ellipse,
  [SVG_ELEMENT_TYPE.LINE]: line,
  [SVG_ELEMENT_TYPE.POLYGON]: polygon,
  [SVG_ELEMENT_TYPE.POLYLINE]: polyline,
  [SVG_ELEMENT_TYPE.RECT]: rect,
  [SVG_ELEMENT_TYPE.PATH]: path,
});
