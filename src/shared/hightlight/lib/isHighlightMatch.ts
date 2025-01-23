export const isHighlightMatch = (text: string, highlight: string): boolean => {
  const regex = new RegExp(`(${highlight})`, "gi");
  return regex.test(text);
};
