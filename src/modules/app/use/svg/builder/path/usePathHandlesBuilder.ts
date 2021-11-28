import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPath } from "@/types/svg";

export const usePathHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGPath) => {
    const rect = (x: number, y: number, cursor: string) =>
      el.boundingBox &&
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        style: { cursor },
        x: x + el.boundingBox.x,
        y: y + el.boundingBox.y,
      });

    const handlers = el.boundingBox
      ? [
          [-handlerOptions.width / 2, -handlerOptions.height / 2],
          [
            el.boundingBox.width - handlerOptions.width / 2,
            -handlerOptions.height / 2,
          ],
          [
            el.boundingBox.width - handlerOptions.width / 2,
            el.boundingBox.height - handlerOptions.height / 2,
          ],
          [
            -handlerOptions.width / 2,
            el.boundingBox.height - handlerOptions.height / 2,
          ],
        ].map(([x, y], index: number) =>
          rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize")
        )
      : [];

    return el.boundingBox && h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
