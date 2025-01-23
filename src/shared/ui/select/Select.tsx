import * as SelectPrimitive from '@radix-ui/react-select';

/**
 * Radix UI의 Select 컴포넌트를 기반으로 한 드롭다운 선택 컴포넌트
 *
 * @example
 * <Select onValueChange={onChange}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="선택하세요" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">옵션 1</SelectItem>
 *     <SelectItem value="2">옵션 2</SelectItem>
 *   </SelectContent>
 * </Select>
 */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
