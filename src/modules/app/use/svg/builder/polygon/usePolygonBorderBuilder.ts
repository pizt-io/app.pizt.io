import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolygon } from "@/types/svg";

export const usePolygonBorderBuilder = (borderOptions: any) => {
  const build = (el: SVGPolygon) => {
    return h(
      SVG_ELEMENT_TYPE.RECT,
      {
        ...borderOptions,
        x: el.xMin,
        y: el.yMin,
        width: Math.abs(el.xMax - el.xMin),
        height: Math.abs(el.yMax - el.yMin),
      },
      []
    );
  };

  return { build };
};
