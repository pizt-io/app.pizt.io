import { SVG_ELEMENT_TYPE, POS_X_MAPPING, POS_Y_MAPPING, WIDTH_MAPPING } from "@core/constants/svg";

export const circle = (stages: { [time: number]: any }) => {
  const _mappedStages: any = {};

  const _stages = Object.keys(stages) as unknown as number[];

  _stages.forEach((time: number) => {
    _mappedStages[time] = {
      pos: {
        x: stages[time].attrs[POS_X_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]],
        y: stages[time].attrs[POS_Y_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]],
      },
      size: {
        width: stages[time].attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]] * 2,
        height: stages[time].attrs[WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]] * 2,
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
