function reverseVowels(s: string): string {
  const vowels = ["a", "e", "i", "o", "u"];
  const inputString = [...s];
  let afterReverse = "";
  let needReverseIndex: any = [];
  let needReverseLetter: any = [];

  for (let i in inputString) {
    for (let j of vowels) {
      if (inputString[i].toLowerCase() === j) {
        needReverseIndex.push(i);
        needReverseLetter.push(inputString[i]);
      }
    }
  }

  needReverseLetter.reverse();

  for (let i = 0; i < needReverseIndex.length; i++) {
    inputString[needReverseIndex[i]] = needReverseLetter[i];
    console.log(inputString);
  }

  afterReverse = inputString.join("");

  return afterReverse;
}

console.log(reverseVowels("hello"));
