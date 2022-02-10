import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

export const usePathBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    if (!attrs.svg.boundingBox) {
      return null;
    } else {
      const x = attrs.svg.boundingBox.x;
      const y = attrs.svg.boundingBox.y;
      const width = attrs.svg.boundingBox.width;
      const height = attrs.svg.boundingBox.height;

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
    }
  };

  return { build };
};
