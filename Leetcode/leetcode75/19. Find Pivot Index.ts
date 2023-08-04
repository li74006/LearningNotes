function pivotIndex(nums: number[]): number {
  let total = 0,
    left = 0,
    pivot = -1;

  for (let i of nums) {
    total += i;
  }

  for (let i = 0; i < nums.length; i++) {
    total -= nums[i];

    if (left === total) {
      pivot = i;
      break;
    }

    left += nums[i];
  }

  return pivot;
}

console.log(pivotIndex([-1, -1, 0, 0, -1, -1]));
