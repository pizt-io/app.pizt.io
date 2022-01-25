export const findValueBetweenTime = (
  currentTime: number,
  t1: number,
  t2: number,
  valT1: any,
  valT2: any,
  nested?: boolean,
) => {
  const timeDistance = Math.abs(t2 - t1);
  const movedTime = Math.abs(currentTime - t1);

  const changeFraction = movedTime / timeDistance;

  if (!nested) {
    const valueDistance = valT2 - valT1;

    return valT1 + valueDistance * changeFraction;
  } else {
    const result: any = {};

    Object.keys(valT1).forEach((key) => {
      const v1 = +valT1[key];
      const v2 = +valT2[key];

      const valueDistance = v1 - v2;

      result[key] = v1 + valueDistance * changeFraction;
    });

    return result;
  }
};
