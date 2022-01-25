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
      attrs: Object.assign(
        {},
        {
          [POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]]: 0,
          [POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]]: 0,
          [WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]]: stages[keyframe].size.width,
          [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]]: stages[keyframe].size.height,
        },
        stages[keyframe].style,
      ),
      transform: Object.assign({}, stages[keyframe].transform, {
        translateX: stages[keyframe].transform.translateX + stages[keyframe].pos.x,
        translateY: stages[keyframe].transform.translateY + stages[keyframe].pos.y,
      }),
      time: stages[keyframe].time,
    };
  });

  return {
    stages: _mappedStages,
  };
};
