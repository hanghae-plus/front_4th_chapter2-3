interface HighlightTextProps {
  text: string
  highlight: string
}

export function HighlightText(props: HighlightTextProps) {
  const { text, highlight } = props

  if (!text) return <></>
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}
