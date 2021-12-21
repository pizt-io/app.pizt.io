/**
 * Input: [1, 2, 5, 10], 3
 * Output: [2, 5]
 *
 * Complexity: O(arr.length)
 *
 * @param arr
 * @param num
 */
export const findNearestNumbers = (arr: number[], num: number) => {
  let firstNumber = 0;
  let secondNumber = 0;

  arr.push(num);
  arr.sort((a, b) => a - b);

  const numIndex = arr.indexOf(num);

  firstNumber = arr[numIndex - 1];
  secondNumber = arr[numIndex + 1];

  return [firstNumber, secondNumber];
};
