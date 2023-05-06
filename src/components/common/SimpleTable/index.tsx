import { FC, MouseEvent, ReactNode } from "react"

import { getDescendantPropObject } from "../../../utils/helpers/commonHelpers"
import SimpleTableHeader from "./SimpleTableHeader"
import { ProviderSimpleTable } from "./tableRowContext"

export type RowData = {
  [index: string]: string
}
export type ColumnData = any

export type SimpleTableProps = {
  data: RowData[]
  columns: ColumnData[]
  tableId?: string
  deleteRow?: boolean
  className: string
  children: (rowValue: string) => ReactNode
  handleCancelDelete: (event: MouseEvent<HTMLButtonElement>) => void
  handleConfirmDelete: (event: MouseEvent<HTMLButtonElement>) => void
}

const getRowProps = (item: RowData, column: ColumnData) => {
  const tableDataValue = getDescendantPropObject(
    item,
    column.title.toLowerCase()
  )

  return tableDataValue
}

const SimpleTable: FC<SimpleTableProps> = ({
  children,
  data,
  columns,
  tableId,
  className,
  ...rest
}: SimpleTableProps) => {
  return (
    <ProviderSimpleTable value={{ ...rest }}>
      <table
        className={`${className} text-sm text-left text-gray-500 dark:text-gray-400`}
        id={`${tableId?.toLowerCase()}-table`}
      >
        <SimpleTableHeader columns={columns} />
        <tbody role="rowgroup">
          {data?.length > 0 &&
            data.map((item: RowData, key: number) => (
              <tr
                key={key}
                className="border-r border-l border-b border-black border-1"
              >
                {columns.map((col, index) => children(getRowProps(item, col)))}
              </tr>
            ))}
        </tbody>
      </table>
    </ProviderSimpleTable>
  )
}

export default SimpleTable
