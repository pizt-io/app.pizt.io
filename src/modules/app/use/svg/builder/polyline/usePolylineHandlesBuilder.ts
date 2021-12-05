import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolyline } from "@/types/svg";

export const usePolylineHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGPolyline) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, style: { cursor }, x, y });

    const handlers = [
      [-handlerOptions.width / 2 + el.xMin, -handlerOptions.height / 2 + el.yMin],
      [el.xMax - handlerOptions.width / 2, el.yMin - handlerOptions.height / 2],
      [el.xMax - handlerOptions.width / 2, el.yMax - handlerOptions.height / 2],
      [el.xMin - handlerOptions.width / 2, el.yMax - handlerOptions.height / 2],
    ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
