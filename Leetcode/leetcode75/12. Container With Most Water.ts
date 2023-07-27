// function maxArea(height: number[]): number {
//   let maxArea = 0;

//   for (let i = 0; i < height.length; i++) {
//     for (let j = i + 1; j < height.length; j++) {
//       let area = (height[i] < height[j] ? height[i] : height[j]) * (j - i);
//       if (area > maxArea) maxArea = area;
//     }
//   }

//   return maxArea;
// }

maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);

function maxArea(height: number[]): number {
  let pointerLeft = 0;
  let pointerRight = height.length - 1;
  let maxArea = 0;

  while (pointerLeft <= pointerRight) {
    let smaller = height[pointerLeft] > height[pointerRight] ? height[pointerRight] : height[pointerLeft];
    let area = (pointerRight - pointerLeft) * smaller;
    if (area > maxArea) maxArea = area;

    if (height[pointerLeft] > height[pointerRight]) {
      pointerRight--;
    } else {
      pointerLeft++;
    }
  }

  console.log(maxArea);
  return maxArea;
}

// 使用 Math.min 比较大小，执行效率会比三元表达式高很多
