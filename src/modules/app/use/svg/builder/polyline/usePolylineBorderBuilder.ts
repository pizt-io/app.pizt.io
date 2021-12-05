import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolyline } from "@/types/svg";

export const usePolylineBorderBuilder = (borderOptions: any) => {
  const build = (el: SVGPolyline) => {
    return h(
      SVG_ELEMENT_TYPE.RECT,
      {
        ...borderOptions,
        x: el.xMin,
        y: el.yMin,
        width: Math.abs(el.xMax - el.xMin),
        height: Math.abs(el.yMax - el.yMin),
      },
      [],
    );
  };

  return { build };
};
