import { CardContent } from "./CardContent"
import { CardHeader } from "./CardHeader"
import { CardRoot } from "./CardRoot"
import { CardTitle } from "./CardTitle"

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
})
