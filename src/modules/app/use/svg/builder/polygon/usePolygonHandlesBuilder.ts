import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPolygon } from "@/types/svg";

export const usePolygonHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGPolygon) => {
    const rect = (x: number, y: number) =>
      h(SVG_ELEMENT_TYPE.RECT, { ...handlerOptions, x, y });

    return h(SVG_ELEMENT_TYPE.G, {}, [
      rect(
        -handlerOptions.width / 2 + el.xMin,
        -handlerOptions.height / 2 + el.yMin
      ),
      rect(
        el.xMax - handlerOptions.width / 2,
        el.yMin - handlerOptions.height / 2
      ),
      rect(
        el.xMax - handlerOptions.width / 2,
        el.yMax - handlerOptions.height / 2
      ),
      rect(
        el.xMin - handlerOptions.width / 2,
        el.yMax - handlerOptions.height / 2
      ),
    ]);
  };

  return { build };
};
