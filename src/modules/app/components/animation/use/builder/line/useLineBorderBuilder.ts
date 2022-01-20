import { SVGLine } from "@/types/svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLineBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (stage: SVGLine, options: any = {}) => {
    return null;
    // return h(
    //   SVG_ELEMENT_TYPE.RECT,
    //   {
    //     ...borderOptions,
    //     x: Math.min(+stage.attrs.x1, +stage.attrs.x2),
    //     y: Math.min(+stage.attrs.y1, +stage.attrs.y2),
    //     width: Math.abs(+stage.attrs.x2 - +stage.attrs.x1),
    //     height: Math.abs(+stage.attrs.y2 - +stage.attrs.y1),
    //   },
    //   []
    // );
  };

  return { build };
};
