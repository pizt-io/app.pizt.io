import {
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
} from "@core/constants/svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ellipse = (stages: { [keyframe: string]: any }) => {
  const _mappedStages: any = {};

  Object.keys(stages).forEach((keyframe: string) => {
    _mappedStages[keyframe] = {
      attrs: Object.assign(
        {},
        {
          [POS_X_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: 0,
          [POS_Y_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: 0,
          [WIDTH_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: stages[keyframe].size.width / 2, // Divide to get radius
          [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: stages[keyframe].size.height / 2, // Divide to get radius
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
