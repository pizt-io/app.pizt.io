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
    const rect = (x: number, y: number) =>
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        x: x + +el.attrs[POS_X_MAPPING[el.tag]],
        y: y + +el.attrs[POS_Y_MAPPING[el.tag]],
      });

    return h(SVG_ELEMENT_TYPE.G, {}, [
      rect(-handlerOptions.width / 2, -handlerOptions.height / 2),
      rect(
        +el.attrs[WIDTH_MAPPING[el.tag]] - handlerOptions.width / 2,
        -handlerOptions.height / 2
      ),
      rect(
        +el.attrs[WIDTH_MAPPING[el.tag]] - handlerOptions.width / 2,
        +el.attrs[HEIGHT_MAPPING[el.tag]] - handlerOptions.height / 2
      ),
      rect(
        -handlerOptions.width / 2,
        +el.attrs[HEIGHT_MAPPING[el.tag]] - handlerOptions.height / 2
      ),
    ]);
  };

  return { build };
};
