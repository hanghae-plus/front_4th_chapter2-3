import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/ui'

interface SortBySelectProps {
  value: string
  onValueChange: (value: string) => void
}

export const SortBySelect = ({ value, onValueChange }: SortBySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">없음</SelectItem>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="title">제목</SelectItem>
        <SelectItem value="reactions">반응</SelectItem>
      </SelectContent>
    </Select>
  )
}
