import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGLine } from "@/types/svg";

export const useLineHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGLine) => {
    const rect = (x: number, y: number) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, x, y });

    return h(SVG_ELEMENT_TYPE.G, {}, [
      rect(
        -handlerOptions.width / 2 + Math.min(+el.attrs.x1, +el.attrs.x2),
        -handlerOptions.height / 2 + Math.min(+el.attrs.y1, +el.attrs.y2)
      ),
      el.bordered &&
        rect(
          Math.max(+el.attrs.x1, +el.attrs.x2) - handlerOptions.width / 2,
          Math.min(+el.attrs.y1, +el.attrs.y2) - handlerOptions.height / 2
        ),
      rect(
        Math.max(+el.attrs.x1, +el.attrs.x2) - handlerOptions.width / 2,
        Math.max(+el.attrs.y1, +el.attrs.y2) - handlerOptions.height / 2
      ),
      el.bordered &&
        rect(
          Math.min(+el.attrs.x1, +el.attrs.x2) - handlerOptions.width / 2,
          Math.max(+el.attrs.y1, +el.attrs.y2) - handlerOptions.height / 2
        ),
    ]);
  };

  return { build };
};
