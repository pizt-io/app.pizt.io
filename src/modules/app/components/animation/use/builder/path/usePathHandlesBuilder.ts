import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

export const usePathHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (attrs: any, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      attrs.svg.boundingBox &&
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        style: { cursor },
        x: x + attrs.svg.boundingBox.x,
        y: y + attrs.svg.boundingBox.y,
      });

    const handlers = attrs.svg.boundingBox
      ? [
          [-handlerOptions.width / 2, -handlerOptions.height / 2],
          [attrs.svg.boundingBox.width - handlerOptions.width / 2, -handlerOptions.height / 2],
          [
            attrs.svg.boundingBox.width - handlerOptions.width / 2,
            attrs.svg.boundingBox.height - handlerOptions.height / 2,
          ],
          [-handlerOptions.width / 2, attrs.svg.boundingBox.height - handlerOptions.height / 2],
        ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"))
      : [];

    return attrs.svg.boundingBox && handlers;
  };

  return { build };
};
