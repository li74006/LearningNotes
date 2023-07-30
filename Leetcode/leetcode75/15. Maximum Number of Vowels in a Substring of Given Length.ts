function maxVowels(s: string, k: number): number {
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  let total = 0;

  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) total++;
  }

  let max = total;
  console.log("out:", total);

  for (let i = 1; i <= s.length - k; i++) {
    let before = vowels.has(s[i - 1]) ? -1 : 0;
    let after = vowels.has(s[i + k - 1]) ? 1 : 0;
    console.log("i:", i, "bfeore:", before, "after:", after);
    total += before + after;
    console.log("inFor:", total);
    max = Math.max(max, total);
  }

  return max;
}

console.log(maxVowels("leetcode", 3));

// 神仙方法
//   function maxVowels(s: string, k: number): number {
//     const v = new Set(["a", "e", "i", "o", "u"]);

//     let max = 0;
//     let tempMax = max;

//     for(let i = 0; i < s.length; i++){
//         if(i >= k && v.has(s[i - k])){
//             tempMax--;
//         }

//         if(v.has(s[i])){
//             tempMax++;
//             max = Math.max(tempMax, max);
//         }
//     }

//     return max;
// };
