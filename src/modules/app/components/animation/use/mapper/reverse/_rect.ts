import {
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
} from "@core/constants/svg";

export const rect = (stages: { [time: number]: any }) => {
  const _mappedStages: any = {};

  const _stages = Object.keys(stages) as unknown as number[];

  _stages.forEach((time: number) => {
    _mappedStages[time] = {
      pos: {
        x: stages[time].attrs[POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]],
        y: stages[time].attrs[POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]],
      },
      size: {
        width: stages[time].attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]],
        height: stages[time].attrs[HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]],
      },
      style: {
        fill: stages[time].attrs.fill,
        opacity: stages[time].attrs.opacity,
        stroke: stages[time].attrs.stroke,
        strokeWidth: stages[time].attrs.strokeWidth,
      },
      transform: stages[time].transform,
      time: stages[time].time,
    };
  });

  return _mappedStages;
};
