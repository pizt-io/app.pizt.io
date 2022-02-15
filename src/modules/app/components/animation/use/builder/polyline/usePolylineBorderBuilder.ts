import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

export const usePolylineBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    const x = attrs.svg.xMin;
    const y = attrs.svg.yMin;
    const width = Math.abs(attrs.svg.xMax - attrs.svg.xMin);
    const height = Math.abs(attrs.svg.yMax - attrs.svg.yMin);

    return [
      h(
        SVG_ELEMENT_TYPE.RECT,
        {
          ...borderOptions,
          x,
          y,
          width,
          height,
        },
        [],
      ),
      h(
        SVG_ELEMENT_TYPE.TEXT,
        {
          x: x + options.labelOffset + 2,
          y: y - options.labelOffset,
          fill: borderOptions.stroke,
          style: options.labelStyle,
        },
        options.name,
      ),
    ];
  };

  return { build };
};
