import { Table } from "@shared/ui/Table"

export const DataTable = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>
            <slot name="header" />
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <slot name="body" />
      </Table.Body>
    </Table>
  )
}