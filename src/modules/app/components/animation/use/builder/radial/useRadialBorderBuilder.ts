import { h } from "vue";
import {
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
} from "@/core/constants/svg";

export const useRadialBorderBuilder =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (borderOptions: any) => (tag: SVG_ELEMENT_TYPE.CIRCLE | SVG_ELEMENT_TYPE.ELLIPSE) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const build = (attrs: any, options: any = {}) => {
      const x = +(attrs.svg[POS_X_MAPPING[tag]] || 0) - +(attrs.svg[WIDTH_MAPPING[tag]] || 0);
      const y = +(attrs.svg[POS_Y_MAPPING[tag]] || 0) - +(attrs.svg[HEIGHT_MAPPING[tag]] || 0);
      const width = +(attrs.svg[WIDTH_MAPPING[tag]] || 0) * 2;
      const height = +(attrs.svg[HEIGHT_MAPPING[tag]] || 0) * 2;

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
