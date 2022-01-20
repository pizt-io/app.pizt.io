import { SVG_ELEMENT_TYPE, WIDTH_MAPPING, POS_X_MAPPING, POS_Y_MAPPING } from "@core/constants/svg";

export const circle = (stages: { [keyframe: string]: any }) => {
  const _mappedStages: any = {};

  Object.keys(stages).forEach((keyframe: string) => {
    _mappedStages[keyframe] = {
      attrs: {
        [POS_X_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[keyframe].pos.x,
        [POS_Y_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[keyframe].pos.y,
        [WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[keyframe].size.width / 2, // Divide to get radius
        ...stages[keyframe].style,
      },
      transform: stages[keyframe].transform,
      time: stages[keyframe].time,
    };
  });

  return {
    stages: _mappedStages,
  };
};
