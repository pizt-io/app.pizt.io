export const findValueBetweenTime = (
  t: number,
  t1: number,
  t2: number,
  valT1: any,
  valT2: any,
  nested?: boolean,
) => {
  const timeDistance = Math.abs(t2 - t1);

  const deltaTime = Math.abs(t - t1);

  const changeFraction = deltaTime / timeDistance;

  if (!nested) {
    const deltaValue = valT2 - valT1;

    return valT1 + deltaValue * changeFraction;
  } else {
    const result: any = {};

    Object.keys(valT1).forEach((key) => {
      const v1 = +valT1[key];
      const v2 = +valT2[key];

      const deltaValue = v2 - v1;

      result[key] = v1 + deltaValue * changeFraction;
    });

    return result;
  }
};
