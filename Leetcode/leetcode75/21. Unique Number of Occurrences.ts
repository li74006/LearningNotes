function uniqueOccurrences(arr: number[]): boolean {
  let array = [...new Set(arr)];
  let result: number[] = [];

  for (let i = 0; i < array.length; i++) {
    result[i] = 0;

    for (let j of arr) {
      if (array[i] === j) result[i]++;
    }
  }

  return array.length === new Set(result).size;
}

console.log(uniqueOccurrences([1, 2]));

// 神仙写法

// function uniqueOccurrences(arr: number[]): boolean {

//     let m = new Map ();
//     for(let i = 0;i<arr.length; i ++) {
//         m.set(arr[i], (m.get(arr[i])?? 0)+1);
//     }
//     let s = new Set ([...m.values()]);
//     return s.size === m.size;
// };
