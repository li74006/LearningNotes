function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  let greatestKids: boolean[] = [];
  let max = 0;
  for (let i in candies) {
    if (candies[i] > candies[i + 1]) {
      max = candies[i];
    } else {
      max = candies[i + 1];
    }
  }

  return greatestKids;
}

console.log(kidsWithCandies([1, 2, 3, 1], 10));
