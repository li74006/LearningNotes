function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const max = Math.max(...candies);
  return Array.from(candies, (candie) => (candie + extraCandies >= max ? true : false));
}

console.log(kidsWithCandies([1, 2, 3, 1], 1));
