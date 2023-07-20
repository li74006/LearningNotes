function increasingTriplet(nums: number[]): boolean {
  let hasTriplet = false;
  let bigger: number[] = [];
  let now1 = -1;
  let now2 = -1;
  let firstTime1 = true;
  let firstTime2 = true;

  first: for (let i = 0; i < nums.length; i++) {
    if (!firstTime1) {
      if (now1 <= nums[i]) continue first;
    }

    for (let j = i; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        bigger.push(nums[j]);
      }
    }

    now1 = nums[i];

    for (let k = 0; k < bigger.length; k++) {
      if (!firstTime2) {
        if (now2 <= bigger[k] || now2 === now1) continue;
      }

      for (let l = k; l < bigger.length; l++) {
        if (bigger[k] < bigger[l]) {
          hasTriplet = true;
          break first;
        }
      }

      now2 = bigger[k];

      firstTime2 = false;
    }

    bigger = [];
    firstTime1 = false;
  }
  return hasTriplet;
}

console.log(increasingTriplet([5, 1, 5, 5, 2, 5, 4]));

// 神仙解法，牛逼！

// function increasingTriplet(nums: number[]): boolean {
//     // Nums has length of at least 1.
//     // Nums can also include negative numbers and zero.
//     // The indices don't need to be next to each other.

//     if (nums.length < 3) {
//         return false;
//     }

//     let a = Infinity;
//     let b = Infinity;

//     for (const n of nums) {
//         if (n <= a) {
//             a = n;
//         } else if (n <= b) {
//             b = n;
//         } else {
//             return true;
//         }
//     }

//     return false;
// };
