export const path = (stages: { [time: number]: any }) => {
  const _mappedStages: any = {};

  const _stages = Object.keys(stages) as unknown as number[];

  _stages.forEach((time: number) => {
    _mappedStages[time] = {
      commands:
        window.parsePathDataString(stages[time].attrs.d).map((i) => {
          return {
            type: i.type,
            path: i.values,
          };
        }) || [],
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
