export const splitByMatch = (text: string, highlight: string): string[] => {
  if (!highlight.trim()) return [text];
  const regex = new RegExp(`(${highlight})`, "gi");
  return text.split(regex);
};
