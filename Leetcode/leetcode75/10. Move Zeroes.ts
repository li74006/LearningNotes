function moveZeroes(nums: number[]): void {
  let temp: number[] = [];
  let zeros: number[] = [];

  for (let num of nums) {
    if (num !== 0) {
      temp.push(num);
    } else {
      zeros.push(0);
    }
  }

  let afterMove = temp.concat(zeros);

  for (let i in nums) {
    nums[i] = afterMove[i];
  }
}

moveZeroes([0, 1, 0, 3, 12]);

// // 神仙方法
// function moveZeroes(nums: number[]): void {
//   const sorted = nums.sort((a, b): any => {
//     if (a === 0 && b !== 0) return 1;
//     if (a !== 0 && b === 0) return -1;
//     if ((a === 0 && b === 0) || (a !== 0 && b !== 0)) return 0;
//   });
// }
