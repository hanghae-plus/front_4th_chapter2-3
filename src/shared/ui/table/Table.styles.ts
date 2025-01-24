export const tableStyles = {
  table: "table-fixed w-full caption-bottom text-sm",
  wrapper: "w-full",
  header: "[&_tr]:border-b",
  body: "[&_tr:last-child]:border-0",
  row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14",
  head: "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  cell: "p-2 align-middle [&:has([role=checkbox])]:pr-0"
}