export const polyline = (stages: { [time: number]: any }) => {
  const _mappedStages: any = {};

  const _stages = Object.keys(stages) as unknown as number[];

  _stages.forEach((time: number) => {
    _mappedStages[time] = {
      pos: stages[time].attrs.points.split(" ").map((point: any) => point.split(",")),
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
