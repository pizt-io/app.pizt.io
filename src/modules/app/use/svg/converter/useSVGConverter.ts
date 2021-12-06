import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { SVGElement } from "@/types/svg";
import { useSVGMapper } from "@modules/app/use/svg/mapper";

export const useSVGConverter = () => {
  const { ellipse, circle, rect, line, path, polygon, polyline } = useSVGMapper();

  const SVG_COMMAND_MAPPING: any = Object.freeze({
    [SVG_ELEMENT_TYPE.CIRCLE]: circle,
    [SVG_ELEMENT_TYPE.ELLIPSE]: ellipse,
    [SVG_ELEMENT_TYPE.LINE]: line,
    [SVG_ELEMENT_TYPE.POLYGON]: polygon,
    [SVG_ELEMENT_TYPE.POLYLINE]: polyline,
    [SVG_ELEMENT_TYPE.RECT]: rect,
    [SVG_ELEMENT_TYPE.PATH]: path,
  });

  const convertDataToElements = (jsonArray: Array<any>): Array<SVGElement> => {
    const elements = jsonArray.map((el: any) => SVG_COMMAND_MAPPING[el.type](el._id)(el.stages));

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
