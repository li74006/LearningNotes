function findMaxAverage(nums: number[], k: number): number {
  let sum = 0;

  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let biggest = sum;

  for (let i = 1; i <= nums.length - k; i++) {
    sum += -nums[i - 1] + nums[i + k - 1];
    biggest = Math.max(biggest, sum);
  }

  return biggest / k;
}
