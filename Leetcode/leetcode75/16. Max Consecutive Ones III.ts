// function longestOnes(nums: number[], k: number): number {
//   let queue: number[] = [];
//   let count = k;
//   let max = 0;
//   let now = 0;

//   if (k === 0) {
//     for (let i of nums) {
//       if (i) {
//         now++;
//       } else {
//         now = 0;
//       }

//       max = Math.max(max, now);
//     }
//   } else {
//     for (let i = 0; i < nums.length; i++) {
//       if (!nums[i]) {
//         if (count > 0) {
//           queue.push(i);
//           now++;
//           count--;
//         } else if (count === 0) {
//           now = i - queue[0];
//           queue.push(i);
//           queue.shift();
//         }
//       } else {
//         now++;
//       }

//       console.log("i:", i, queue, max);
//       max = Math.max(max, now);
//     }
//   }

//   return max;
// }

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2));

// 神仙解法
function longestOnes(nums: number[], k: number): number {
  let i = 0,
    what = 0;

  for (; i < nums.length; i++) {
    if (nums[i] === 0) k--;

    if (k < 0) {
      if (nums[what] === 0) k++;
      what++;
    }
  }

  return i - what;
}
