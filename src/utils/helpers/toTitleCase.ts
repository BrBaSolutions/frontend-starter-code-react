const toTitleCase = (word: string): string => {
  const words = word.split(" ");
  const titleCaseWords = words.map((key) => {
    if (key.length > 0) {
      return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    }
    return "";
  });
  return titleCaseWords.join(" ");
};

export default toTitleCase;
