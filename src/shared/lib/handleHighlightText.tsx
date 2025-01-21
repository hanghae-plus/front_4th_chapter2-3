export const highlightText = (text: string, searchTarget: string) => {
  if (!text) return null;

  if (!searchTarget.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchTarget})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};
