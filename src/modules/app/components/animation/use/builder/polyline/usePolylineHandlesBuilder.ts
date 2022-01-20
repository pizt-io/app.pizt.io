import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolyline } from "@/types/svg";

export const usePolylineHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (stage: SVGPolyline, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, style: { cursor }, x, y });

    const handlers = [
      [-handlerOptions.width / 2 + stage.xMin, -handlerOptions.height / 2 + stage.yMin],
      [stage.xMax - handlerOptions.width / 2, stage.yMin - handlerOptions.height / 2],
      [stage.xMax - handlerOptions.width / 2, stage.yMax - handlerOptions.height / 2],
      [stage.xMin - handlerOptions.width / 2, stage.yMax - handlerOptions.height / 2],
    ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"));

    return h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
