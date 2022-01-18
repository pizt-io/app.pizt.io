export const findValueBetweenTime = (
  currentTime: number,
  t1: number,
  t2: number,
  valT1: number,
  valT2: number,
) => {
  const timeDistance = Math.abs(t2 - t1);
  const movedTime = Math.abs(currentTime - t1);

  const changeFraction = movedTime / timeDistance;

  const valueDistance = valT2 - valT1;

  return valT1 + valueDistance * changeFraction;
};
