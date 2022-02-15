import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLineBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    return h(
      SVG_ELEMENT_TYPE.RECT,
      {
        ...borderOptions,
        x: Math.min(+attrs.svg.x1, +attrs.svg.x2),
        y: Math.min(+attrs.svg.y1, +attrs.svg.y2),
        width: Math.abs(+attrs.svg.x2 - +attrs.svg.x1),
        height: Math.abs(+attrs.svg.y2 - +attrs.svg.y1),
      },
      [],
    );
  };

  return { build };
};
