function mergeAlternately(word1: string, word2: string): string {
  let afterMerge: string = "";

  for (let i = 0; i < word1.length || i < word2.length; i++) {
    let frontWord = word1[i] ?? "";
    let backWord = word2[i] ?? "";

    afterMerge += frontWord + backWord;
  }

  return afterMerge;
}

console.log(mergeAlternately("abc", "777777"));
