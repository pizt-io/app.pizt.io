import { blender } from "../blender";

export const findColorBetweenTime = (
  t: number,
  t1: number,
  t2: number,
  color1 = "#ffffff",
  color2 = "#000000",
) => {
  const timeDistance = Math.abs(t2 - t1);
  const deltaTime = Math.abs(t - t1);

  const changePercentage = (deltaTime * 100) / timeDistance;

  return blender(color1, color2, changePercentage);
};
