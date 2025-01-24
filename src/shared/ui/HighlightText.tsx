import { getHighlightText } from "../lib";

interface HighlightTextProps {
  text: string;
  highlight: string;
}

export const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  const parts = getHighlightText(text, highlight);
  return (
    <span>
      {parts.map(({ text, isHighlight }, i) =>
        isHighlight ? <mark key={i}>{text}</mark> : <span key={i}>{text}</span>,
      )}
    </span>
  );
};
