function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  if (n === 0) return true;

  flowerbed.unshift(1, 0);
  flowerbed.push(0, 1);

  let canPlaceTotal = 0;
  let blockNum = 0;

  for (let i of flowerbed) {
    if (i === 0) {
      blockNum++;
    } else {
      if (blockNum >= 3) {
        let canBlockPlace = blockNum % 2 === 0 ? blockNum - 2 : blockNum - 1;
        canPlaceTotal += canBlockPlace;
      }
      blockNum = 0;
    }
  }

  return canPlaceTotal / 2 >= n;
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));
