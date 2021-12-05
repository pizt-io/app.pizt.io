import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPath } from "@/types/svg";

export const usePathBorderBuilder = (borderOptions: any) => {
  const build = (el: SVGPath) =>
    el.boundingBox &&
    h(
      SVG_ELEMENT_TYPE.RECT,
      {
        ...borderOptions,
        x: el.boundingBox.x,
        y: el.boundingBox.y,
        width: el.boundingBox.width,
        height: el.boundingBox.height,
      },
      [],
    );

  return { build };
};
