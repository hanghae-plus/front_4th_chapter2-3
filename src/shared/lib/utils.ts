export const getHighlightText = (text: string, highlight: string) => {
  if (!text) return [];
  if (!highlight.trim()) {
    return [{ text, isHighlight: false }];
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return parts.map((part) => ({
    text: part,
    isHighlight: regex.test(part),
  }));
};
