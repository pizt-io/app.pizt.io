import { SVGLine } from "@/types/svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLineBorderBuilder = (borderOptions: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const build = (el: SVGLine) => {
    return null;
    // return h(
    //   SVG_ELEMENT_TYPE.RECT,
    //   {
    //     ...borderOptions,
    //     x: Math.min(+el.attrs.x1, +el.attrs.x2),
    //     y: Math.min(+el.attrs.y1, +el.attrs.y2),
    //     width: Math.abs(+el.attrs.x2 - +el.attrs.x1),
    //     height: Math.abs(+el.attrs.y2 - +el.attrs.y1),
    //   },
    //   []
    // );
  };

  return { build };
};
