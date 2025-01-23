import { isHighlightMatch, splitByMatch } from "@shared/hightlight/lib";

export const HighlightMatch = (text: string, highlight: string): React.ReactNode => {
  if (!highlight || !highlight.trim()) return <span>{text}</span>;
  const parts = splitByMatch(text, highlight);

  return (
    <span>
      {parts.map((part, i) =>
        isHighlightMatch(part, highlight) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
      )}
    </span>
  );
};
