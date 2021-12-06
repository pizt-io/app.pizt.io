import { h } from "vue";
import {
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
} from "@/core/constants/svg";
import { SVGEllipse, SVGCircle } from "@/types/svg";

export const useRadialBorderBuilder =
  (borderOptions: any) => (tag: SVG_ELEMENT_TYPE.CIRCLE | SVG_ELEMENT_TYPE.ELLIPSE) => {
    const build = (el: SVGEllipse | SVGCircle) => {
      return h(SVG_ELEMENT_TYPE.RECT, {
        ...borderOptions,
        x: +(el.attrs[POS_X_MAPPING[tag]] || 0) - +(el.attrs[WIDTH_MAPPING[tag]] || 0),
        y: +(el.attrs[POS_Y_MAPPING[tag]] || 0) - +(el.attrs[HEIGHT_MAPPING[tag]] || 0),
        width: +(el.attrs[WIDTH_MAPPING[tag]] || 0) * 2,
        height: +(el.attrs[HEIGHT_MAPPING[tag]] || 0) * 2,
      });
    };

    return { build };
  };
