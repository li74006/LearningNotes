function compress(chars: string[]): number {
  let afterCompress = "";
  let count = 1;

  for (let char in chars) {
    if (parseInt(char) === 0) {
      afterCompress += chars[char];
    } else if (chars[char] === chars[parseInt(char) - 1]) {
      count++;
    } else {
      if (count === 1) afterCompress += chars[parseInt(char)];
      else afterCompress += count + chars[parseInt(char)];
      count = 1;
    }
  }

  if (count !== 1) afterCompress += count;

  const final = [...afterCompress];
  chars.splice(0, chars.length, ...final);

  console.log(chars);

  return final.length;
}

console.log(compress(["a", "a", "b", "b", "c", "c", "c"]));
