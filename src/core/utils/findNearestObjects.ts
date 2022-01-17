/**
 * Input: [1, 2, 5, 10], 3
 * Output: [2, 5]
 *
 * Complexity: O(arr.length)
 *
 * @param arr
 * @param num
 */
export const findNearestObjects = (arr: any[], value: any, key: string) => {
  let firstObj: any = {};
  let secondObj: any = {};

  arr.push({ [key]: value });
  arr.sort((a, b) => a[key] - b[key]);

  const numIndex = arr.findIndex((e) => e[key] === value);

  firstObj = arr[numIndex - 1];
  secondObj = arr[numIndex + 1];

  return [firstObj, secondObj];
};
