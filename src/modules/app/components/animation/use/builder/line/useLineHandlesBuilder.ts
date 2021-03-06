import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

export const useLineHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, style: { cursor }, x, y });

    const handlers = [
      [+attrs.svg.x1 - handlerOptions.width / 2, +attrs.svg.y1 - handlerOptions.height / 2],
      [+attrs.svg.x2 - handlerOptions.width / 2, +attrs.svg.y2 - handlerOptions.height / 2],
    ]
      .filter((e) => e as number[])
      .map(([x, y]) => rect(x, y, "move"));

    return handlers;
  };

  return { build };
};
