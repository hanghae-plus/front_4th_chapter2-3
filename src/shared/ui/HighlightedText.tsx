import { splitTextByHighlight } from '../lib/splitTextByHighlight';

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

export const HighlightedText = ({ text, highlight }: HighlightedTextProps) => {
  if (!text) return null;
  if (!highlight.trim()) return <span>{text}</span>;

  const { regex, parts } = splitTextByHighlight(text, highlight);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
      )}
    </span>
  );
};
