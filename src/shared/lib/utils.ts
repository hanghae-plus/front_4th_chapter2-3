type ClassValue = string | number | boolean | undefined | null | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(10)
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(" ")
}
