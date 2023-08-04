function findDifference(nums1: number[], nums2: number[]): number[][] {
  let set1 = new Set(nums1),
    set2 = new Set(nums2),
    result: number[][] = [[], []];

  for (let i of set1) {
    if (!set2.has(i)) result[0].push(i);
  }
  for (let i of set2) {
    if (!set1.has(i)) result[1].push(i);
  }

  return result;
}

console.log(findDifference([1, 2, 3, 3], [1, 1, 2, 2]));

// 神仙写法

// function findDifference(nums1: number[], nums2: number[]): number[][] {
//     const s1 = new Set(nums1);
//     const s2 = new Set(nums2);

//     return [
//         [...s1].filter(n => !s2.has(n)),
//         [...s2].filter(n => !s1.has(n))
//     ]
// };
