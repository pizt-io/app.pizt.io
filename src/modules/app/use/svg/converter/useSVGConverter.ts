import { SVG_ELEMENT_TYPE, SVG_PATH_CMD } from "@/core/constants/svg";
import { SVGElement } from "@/types/svg";
import { useSVGMapper, useSVGPathMapper } from "@modules/app/use/svg/mapper";

import _cloneDeep from "lodash/cloneDeep";

export const useSVGConverter = () => {
  const { ellipse, circle, rect, line, path, polygon, polyline } = useSVGMapper();
  const {
    moveTo,
    lineTo,
    lineToHorizontally,
    lineToVertically,
    cubicBezier,
    quadBezier,
    arc,
    closePath,
  } = useSVGPathMapper();

  const SVG_COMMAND_MAPPING: any = Object.freeze({
    [SVG_ELEMENT_TYPE.CIRCLE]: circle,
    [SVG_ELEMENT_TYPE.ELLIPSE]: ellipse,
    [SVG_ELEMENT_TYPE.LINE]: line,
    [SVG_ELEMENT_TYPE.POLYGON]: polygon,
    [SVG_ELEMENT_TYPE.POLYLINE]: polyline,
    [SVG_ELEMENT_TYPE.RECT]: rect,
    // [SVG_ELEMENT_TYPE.PATH]: path, // Path is handled specially below
  });

  const SVG_PATH_COMMAND_MAPPING: any = Object.freeze({
    [SVG_PATH_CMD.MOVE_TO]: moveTo,
    [SVG_PATH_CMD.LINE_TO]: lineTo,
    [SVG_PATH_CMD.LINE_TO_HORIZONTALLY]: lineToHorizontally,
    [SVG_PATH_CMD.LINE_TO_VERTICALLY]: lineToVertically,
    [SVG_PATH_CMD.CUBIC_BEZIER]: cubicBezier,
    [SVG_PATH_CMD.QUADRATIC_BEZIER]: quadBezier,
    [SVG_PATH_CMD.ARC_CURVE]: arc,
    [SVG_PATH_CMD.CLOSE_PATH]: closePath,
  });

  const convertDataToElements = (jsonArray: Array<any>): Array<SVGElement> => {
    const elements = jsonArray.map((el: any) => {
      switch (el.type) {
        // Special case handling for path element
        case SVG_ELEMENT_TYPE.PATH:
          return path(
            el.commands.map((command: { type: string; path: number[] }) =>
              SVG_PATH_COMMAND_MAPPING[command.type](...command.path),
            ),
            el.transform,
            el.style,
          );
        default:
          const _el = _cloneDeep(el);

          delete _el.type;

          return SVG_COMMAND_MAPPING[el.type](...Object.values(_el));
      }
    });

    return elements;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertElementsToData = (elements: Array<SVGElement>): Array<any> => {
    return [];
  };

  return {
    convertDataToElements,
    convertElementsToData,
  };
};
