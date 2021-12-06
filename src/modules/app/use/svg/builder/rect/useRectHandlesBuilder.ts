import { h } from "vue";
import {
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
} from "@/core/constants/svg";
import { SVGRectangle } from "@/types/svg";

export const useRectHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGRectangle) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        style: { cursor },
        x: x + +(el.attrs[POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0),
        y: y + +(el.attrs[POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0),
      });

    const handlers = [
      [-handlerOptions.width / 2, -handlerOptions.height / 2],
      [
        +(el.attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.width / 2,
        -handlerOptions.height / 2,
      ],
      [
        +(el.attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.width / 2,
        +(el.attrs[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.height / 2,
      ],
      [
        -handlerOptions.width / 2,
        +(el.attrs[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]] || 0) - handlerOptions.height / 2,
      ],
    ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
