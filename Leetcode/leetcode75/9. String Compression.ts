function compress(chars: string[]): number {
  let countChar: any = {};
  let afterCompress = "";

  for (let char of chars) {
    if (!countChar[char]) {
      countChar[char] = 1;
    } else {
      countChar[char]++;
    }
  }

  for (let [k, v] of Object.entries(countChar)) {
    if (v === 1) {
      afterCompress += k;
    } else {
      afterCompress += k + v;
    }
  }

  let array = [...afterCompress];

  for (let i in array) {
    chars[i] = array[i];
  }
  chars.splice(array.length);
  console.log(chars);
  return chars.length;
}

console.log(compress(["a", "a", "b", "b", "c", "c", "c"]));
