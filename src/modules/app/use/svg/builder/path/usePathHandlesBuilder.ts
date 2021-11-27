import { h } from "vue";
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGPath } from "@/types/svg";

export const usePathHandlesBuilder = (handlerOptions: any) => {
  const build = (el: SVGPath) => {
    const rect = (x: number, y: number) =>
      el.boundingBox &&
      h(SVG_ELEMENT_TYPE.RECT, {
        ...handlerOptions,
        x: x + el.boundingBox.x,
        y: y + el.boundingBox.y,
      });

    return (
      el.boundingBox &&
      h(SVG_ELEMENT_TYPE.G, {}, [
        rect(-handlerOptions.width / 2, -handlerOptions.height / 2),
        rect(
          el.boundingBox.width - handlerOptions.width / 2,
          -handlerOptions.height / 2
        ),
        rect(
          el.boundingBox.width - handlerOptions.width / 2,
          el.boundingBox.height - handlerOptions.height / 2
        ),
        rect(
          -handlerOptions.width / 2,
          el.boundingBox.height - handlerOptions.height / 2
        ),
      ])
    );
  };

  return { build };
};
