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

console.log(longestOnes([0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3));

function longestOnes(nums: number[], k: number): number {
  let i = 0,
    what = 0;

  for (; i < nums.length; i++) {
    console.log("次数++++++++++++++++++:", i, "当前:", nums[i], "k:", k);
    if (nums[i] === 0) k--;
    console.log("k~~~~~~~~~~~~~~~~~~~~~", k);

    if (k < 0) {
      if (nums[what] === 0) k++;
      what++;
      console.log("if22:", "k:", k, "what:", what);
    }
    console.log("for:", "k:", k, "what:", what, "i:", i);
  }

  return i - what;
}
