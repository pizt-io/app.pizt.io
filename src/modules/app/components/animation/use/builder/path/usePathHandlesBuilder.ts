import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPath } from "@/types/svg";

export const usePathHandlesBuilder = (handlerOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (stage: SVGPath, options: any = {}) => {
    const rect = (x: number, y: number, cursor: string) =>
      stage.boundingBox &&
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        style: { cursor },
        x: x + stage.boundingBox.x,
        y: y + stage.boundingBox.y,
      });

    const handlers = stage.boundingBox
      ? [
          [-handlerOptions.width / 2, -handlerOptions.height / 2],
          [stage.boundingBox.width - handlerOptions.width / 2, -handlerOptions.height / 2],
          [
            stage.boundingBox.width - handlerOptions.width / 2,
            stage.boundingBox.height - handlerOptions.height / 2,
          ],
          [-handlerOptions.width / 2, stage.boundingBox.height - handlerOptions.height / 2],
        ].map(([x, y], index: number) => rect(x, y, index % 2 ? "nesw-resize" : "nwse-resize"))
      : [];

    return stage.boundingBox && h(SVG_ELEMENT_TYPE.G, {}, handlers);
  };

  return { build };
};
