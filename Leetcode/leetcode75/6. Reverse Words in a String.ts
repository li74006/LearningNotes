function reverseWords(s: string): string {
  let needReverse: string[] = [];
  let letterBlock = "";

  for (let i of s + " ") {
    if (i !== " ") {
      letterBlock += i;
      console.log(s.indexOf(i), s.length);
    } else {
      letterBlock && needReverse.push(letterBlock);
      letterBlock = "";
    }
  }
  console.log(needReverse);

  return needReverse.reverse().join(" ");
}

console.log(reverseWords("the sky is blue"));

// 正则表达式效率真的高

// const reverseWords = (s: string): string => {

//     const wordArray = s.trim().split(/\s+/);

//     return wordArray.reverse().join(' ');

// };
