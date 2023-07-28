// function maxOperations(nums: number[], k: number): number {
//   let total = 0;
//   let temp = Array.from(nums);
//   temp.filter((num) => num <= k);

//   console.log(temp);

//   first: for (let i = 0; i < temp.length; i++) {
//     console.log(temp, "length:", temp.length, "i:", i);

//     for (let j = i + 1; j <= temp.length; j++) {
//       if (temp[i] + temp[j] === k) {
//         temp = temp.filter((num, index) => index !== i && index !== j);
//         total++;
//         i--;
//         continue first;
//       }
//     }
//   }

//   console.log(total);
//   return total;
// }

// function maxOperations(nums: number[], k: number): number {
//   let total = 0;
//   let temp = Array.from(nums);
//   let bigger = k + 1;

//   first: for (let i = 0; i < temp.length; i++) {
//     console.log(temp, "length:", temp.length, "i:", i);
//     if (temp[i] > k) continue first;

//     let after = k - temp[i];
//     for (let j = i + 1; j <= temp.length; j++) {
//       if (after === temp[j]) {
//         temp[j] = bigger;
//         total++;
//         continue first;
//       }
//     }
//   }

//   console.log(total);
//   return total;
// }

maxOperations([3, 1, 3, 4, 3], 6);

// 神仙解法

function maxOperations(nums: number[], k: number) {
  const digitsSeen = {};
  let pairings = 0;
  for (let i = 0; i < nums.length; i++) {
    const digit = nums[i];
    if (digit < k) {
      // If our digit is larger than or equal to k, we can ignore it. Since we would need a negative number, or zero, to get to k.
      // This cannot happen given our constraints
      const comp = k - nums[i];
      if (digitsSeen[comp]) {
        digitsSeen[comp] = digitsSeen[comp] - 1;
        pairings++;
      } else {
        digitsSeen[digit] = (digitsSeen[digit] || 0) + 1;
      }
    }
  }
  return pairings;
}
