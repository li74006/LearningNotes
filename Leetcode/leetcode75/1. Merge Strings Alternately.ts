function mergeAlternately(word1: string, word2: string): string {
  let afterMerge: string = "";

  for (let i = 0; i < word1.length || i < word2.length; i++) {
    let frontWord = word1[i] ? word1[i] : "";
    let backWord = word2[i] ? word2[i] : "";
    let merge = frontWord + backWord;
    afterMerge += merge;
  }

  return afterMerge;
}

console.log(mergeAlternately("abc", "777777"));
