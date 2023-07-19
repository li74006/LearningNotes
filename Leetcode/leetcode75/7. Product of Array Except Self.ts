function productExceptSelf(nums: number[]): number[] {
  let afterProduct: any = [];
  let total = 1;
  let totalZero = 0;

  for (let i of nums) {
    if (i !== 0) total *= i;
    if (i === 0) {
      totalZero++;
    }
    if (totalZero > 1) break;
  }

  if (totalZero > 1) return nums.fill(0);

  afterProduct = Array.from(nums, (num) => {
    if (!totalZero) return total / num;
    return num === 0 ? total : 0;
  });

  return afterProduct;
}

console.log(productExceptSelf([0, 0]));
