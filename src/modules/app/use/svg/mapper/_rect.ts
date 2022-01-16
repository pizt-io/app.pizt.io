import {
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
} from "@core/constants/svg";

export const rect = (stages: { [keyframe: string]: any }) => {
  const _mappedStages: any = {};

  Object.keys(stages).forEach((keyframe: string) => {
    _mappedStages[keyframe] = {
      attrs: {
        [POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[keyframe].pos.x,
        [POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[keyframe].pos.y,
        [WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[keyframe].size.width,
        [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[keyframe].size.height,
        ...stages[keyframe].style,
      },
      transform: stages[keyframe].transform,
    };
  });

  return {
    stages: _mappedStages,
  };
};
