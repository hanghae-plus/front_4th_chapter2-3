import { TableBody } from "./TableBody"
import { TableCell } from "./TableCell"
import { TableHead } from "./TableHead"
import { TableHeader } from "./TableHeader"
import { TableRoot } from "./TableRoot"
import { TableRow } from "./TableRow"

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
})
