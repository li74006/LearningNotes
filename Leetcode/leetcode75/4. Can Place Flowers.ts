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
        let canBlockPlace = blockNum % 2 === 0 ? blockNum / 2 - 1 : Math.floor(blockNum / 2);
        canPlaceTotal += canBlockPlace;
      }
      blockNum = 0;
    }
  }

  return canPlaceTotal >= n;
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));
