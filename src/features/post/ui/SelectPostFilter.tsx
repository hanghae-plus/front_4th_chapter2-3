import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"

interface SelectPostFilterProps {
  value: string | undefined
  setValue: (value: string) => void
  options: { value: string; label: string }[]
}
export function SelectPostFilter(props: SelectPostFilterProps) {
  const { value, setValue, options } = props

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, i) => (
          <SelectItem key={i + item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
