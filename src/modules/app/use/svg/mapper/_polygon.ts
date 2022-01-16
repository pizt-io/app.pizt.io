export const polygon = (stages: { [keyframe: string]: any }) => {
  const _mappedStages: any = {};

  Object.keys(stages).forEach((keyframe: string) => {
    const xPositions = stages[keyframe].pos.map((point: any) => point[0]);
    const yPositions = stages[keyframe].pos.map((point: any) => point[1]);

    _mappedStages[keyframe] = {
      attrs: {
        points: stages[keyframe].pos.map((point: number[]) => point.join(",")).join(" "),
        ...stages[keyframe].style,
      },
      xMin: Math.min(...xPositions),
      yMin: Math.min(...yPositions),
      xMax: Math.max(...xPositions),
      yMax: Math.max(...yPositions),
      transform: stages[keyframe].transform,
    };
  });

  return {
    stages: _mappedStages,
  };
};
