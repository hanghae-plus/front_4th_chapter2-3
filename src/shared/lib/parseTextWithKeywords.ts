import escapeStringRegexp from "escape-string-regexp"
import { isNonEmptyArray } from "./isNonEmptyArray"

export const parseTextWithKeywords = (source: string, keywords: string[]) => {
  const filteredKeywords = keywords.filter((keyword) => keyword !== "")

  if (!isNonEmptyArray(filteredKeywords)) {
    return [{ value: source, matched: false }]
  }

  const escapedKeywords = filteredKeywords.map(escapeStringRegexp)
  const regex = new RegExp(`(${escapedKeywords.join("|")})`, "g")

  const result = source
    .split(regex)
    .filter((segment) => segment !== "")
    .map((segment) => ({ value: segment, matched: regex.test(segment) }))

  return result
}
