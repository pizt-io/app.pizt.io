import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolygon } from "@/types/svg";

export const usePolygonBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (stage: SVGPolygon, options: any = {}) => {
    const x = stage.xMin;
    const y = stage.yMin;
    const width = Math.abs(stage.xMax - stage.xMin);
    const height = Math.abs(stage.yMax - stage.yMin);

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
