import { Input } from "@shared/ui/Input"
import { Search } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export const SearchInput = ({ value, onChange, onSearch }: SearchInputProps) => (
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
