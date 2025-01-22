import { Input } from "@shared/ui"
import { Search } from "lucide-react"

interface PostSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export const PostSearch = ({ value, onChange, onSearch }: PostSearchProps) => (
  <div className="relative">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="게시물 검색..."
      className="pl-8"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && onSearch()}
    />
  </div>
)
