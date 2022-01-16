export const line = (stages: { [keyframe: string]: any }) => {
  const _mappedStages: any = {};

  Object.keys(stages).forEach((keyframe: string) => {
    _mappedStages[keyframe] = {
      attrs: {
        x1: stages[keyframe].pos[0].x,
        y1: stages[keyframe].pos[0].y,
        x2: stages[keyframe].pos[1].x,
        y2: stages[keyframe].pos[1].y,
        ...stages[keyframe].style,
      },
      transform: stages[keyframe].transform,
    };
  });

  return {
    stages: _mappedStages,
  };
};
