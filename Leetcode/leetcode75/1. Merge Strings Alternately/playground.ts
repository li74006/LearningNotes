function mergeAlternately(word1: string, word2: string): string {
  let afterMerge: string;

  for (let i of word1) {
    for (let j of word2) {
      afterMerge = i + j;
    }
  }
  return afterMerge;
}
