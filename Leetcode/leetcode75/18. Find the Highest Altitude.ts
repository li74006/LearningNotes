function largestAltitude(gain: number[]): number {
  let now = 0,
    max = 0;

  for (let i = 0; i < gain.length; i++) {
    now += gain[i];
    max = Math.max(max, now);
  }

  return max;
}

console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2]));
