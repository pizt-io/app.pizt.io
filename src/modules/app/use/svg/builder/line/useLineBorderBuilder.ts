import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGLine } from "@/types/svg";

export const useLineBorderBuilder = (borderOptions: any) => {
  const build = (el: SVGLine) => {
    return null;
    // return h(
    //   SVG_ELEMENT_TYPE.RECT,
    //   {
    //     ...borderOptions,
    //     x: Math.min(+el.attrs.x1, +el.attrs.x2),
    //     y: Math.min(+el.attrs.y1, +el.attrs.y2),
    //     width: Math.abs(+el.attrs.x2 - +el.attrs.x1),
    //     height: Math.abs(+el.attrs.y2 - +el.attrs.y1),
    //   },
    //   []
    // );
  };

  return { build };
};
