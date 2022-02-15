import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

export const usePolygonHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, style: { cursor }, x, y });

    const handlers = [
      [-handlerOptions.width / 2 + attrs.svg.xMin, -handlerOptions.height / 2 + attrs.svg.yMin],
      [attrs.svg.xMax - handlerOptions.width / 2, attrs.svg.yMin - handlerOptions.height / 2],
      [attrs.svg.xMax - handlerOptions.width / 2, attrs.svg.yMax - handlerOptions.height / 2],
      [attrs.svg.xMin - handlerOptions.width / 2, attrs.svg.yMax - handlerOptions.height / 2],
    ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
