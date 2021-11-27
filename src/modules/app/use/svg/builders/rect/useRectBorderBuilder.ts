import { h } from "vue";
import {
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
} from "@/core/constants/svg";
import { SVGRectangle } from "@/types/svg";

export const useRectBorderBuilder = (borderOptions: any) => {
  const build = (el: SVGRectangle) =>
    h(
      SVG_ELEMENT_TYPE.RECT,
      {
        ...borderOptions,
        x: +el.attrs[POS_X_MAPPING[el.tag]],
        y: +el.attrs[POS_Y_MAPPING[el.tag]],
        width: +el.attrs[WIDTH_MAPPING[el.tag]],
        height: +el.attrs[HEIGHT_MAPPING[el.tag]],
      },
      []
    );

  return { build };
};
