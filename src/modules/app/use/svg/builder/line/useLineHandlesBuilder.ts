import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGLine } from "@/types/svg";

export const useLineHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGLine) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, style: { cursor }, x, y });

    const handlers = [
      [+el.attrs.x1 - handlerOptions.width / 2, +el.attrs.y1 - handlerOptions.height / 2],
      [+el.attrs.x2 - handlerOptions.width / 2, +el.attrs.y2 - handlerOptions.height / 2],
    ]
      .filter((e) => e as number[])
      .map(([x, y]) => rect(x, y, "move"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
