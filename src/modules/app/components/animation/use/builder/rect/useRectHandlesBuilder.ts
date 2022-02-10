import { h } from "vue";
import {
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
} from "@/core/constants/svg";

export const useRectHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        style: { cursor },
        x: x + +(attrs.svg[POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0),
        y: y + +(attrs.svg[POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0),
      });

    const handlers = [
      [-handlerOptions.width / 2, -handlerOptions.height / 2],
      [
        +(attrs.svg[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.width / 2,
        -handlerOptions.height / 2,
      ],
      [
        +(attrs.svg[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.width / 2,
        +(attrs.svg[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.height / 2,
      ],
      [
        -handlerOptions.width / 2,
        +(attrs.svg[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.height / 2,
      ],
    ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
