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
  const build = (stage: SVGRectangle, options: any = {}) => {
    const x = +(stage.attrs[POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0);
    const y = +(stage.attrs[POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0);

    const width = +(stage.attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0);
    const height = +(stage.attrs[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0);

    return [
      h(SVG_ELEMENT_TYPE.RECT, {
        ...borderOptions,
        x,
        y,
        width,
        height,
      }),
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
