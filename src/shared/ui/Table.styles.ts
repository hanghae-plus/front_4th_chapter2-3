import { cva } from "class-variance-authority"

export const table = cva("w-full table-fixed caption-bottom text-sm")

export const thead = cva("[&_tr]:border-b")

export const tbody = cva("[&_tr:last-child]:border-0")

export const tr = cva("hover:bg-muted/50 data-[state=selected]:bg-muted h-14 border-b transition-colors")

export const th = cva("text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0")

export const td = cva("p-2 align-middle [&:has([role=checkbox])]:pr-0")
