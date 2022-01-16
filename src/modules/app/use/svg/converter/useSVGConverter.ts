import { SVGElement } from "@/types/svg";
import { SVG_COMMAND_MAPPING } from "../mapper";

export const useSVGConverter = () => {
  const convertDataToElements = (jsonArray: Array<any>): Array<SVGElement> => {
    const elements = jsonArray.map((el: any) => ({
      _id: el._id,
      tag: el.type,
      ...(SVG_COMMAND_MAPPING as any)[el.type](el.stages),
    }));

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
