function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  let j = 0;
  let temp = "";

  first: for (i = 0; i < s.length; i++) {
    for (j; j < t.length; j++) {
      if (s[i] === t[j]) {
        temp += t[j];
        j++;
        continue first;
      }
    }
    j++;
  }

  return temp === s;
}

console.log(isSubsequence("abc", "avbvc"));

// // 神仙写法
// function isSubsequence(s: string, t: string): boolean {
//   let ps = 0;

//   for (let pt = 0; pt < t.length; pt++) {
//     if (ps === s.length) break;

//     s[ps] === t[pt] && ps++;
//   }

//   return ps === s.length;
// }
