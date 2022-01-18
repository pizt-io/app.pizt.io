import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPath } from "@/types/svg";

export const usePathBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (stage: SVGPath, options: any = {}) => {
    if (!stage.boundingBox) {
      return null;
    } else {
      const x = stage.boundingBox.x;
      const y = stage.boundingBox.y;
      const width = stage.boundingBox.width;
      const height = stage.boundingBox.height;

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
