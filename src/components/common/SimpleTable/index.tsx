import { FC, MouseEvent, ReactNode } from "react"
import { Products } from "@prisma/client"

import { getDescendantPropObject } from "../../../utils/helpers/commonHelpers"
import SimpleTableHeader from "./SimpleTableHeader"
import { ProviderSimpleTable } from "./tableRowContext"

export type RowData = {
  [index: string]: string
}
export type ColumnData = any

export type ChildData = {
  value: string
  id: string
}
export type SimpleTableProps = {
  data: any[]
  columns: ColumnData[]
  tableId?: string
  deleteRow?: boolean
  className: string
  children: (rowValue: ChildData) => ReactNode
  handleCancelDelete: (event: MouseEvent<HTMLButtonElement>) => void
  handleConfirmDelete: (event: MouseEvent<HTMLButtonElement>) => void
}

const getRowProps = (item: Products, column: ColumnData) => {
  const tableDataValue = getDescendantPropObject(
    item,
    column.title.toLowerCase()
  )

  return { value: tableDataValue, id: item.id }
}

const SimpleTable: FC<SimpleTableProps> = ({
  children,
  data,
  columns,
  tableId,
  className,
  ...rest
}) => {
  return (
    <ProviderSimpleTable value={{ ...rest }}>
      <table
        className={`${className} text-sm text-left text-gray-500 dark:text-gray-400`}
        id={`${tableId?.toLowerCase()}-table`}
      >
        <SimpleTableHeader columns={columns} />
        <tbody role="rowgroup">
          {data?.length > 0 &&
            data.map((item: Products, key: number) => (
              <tr
                key={key}
                className="border-r border-l border-b border-black border-1"
              >
                {columns.map((col, _index) => children(getRowProps(item, col)))}
              </tr>
            ))}
        </tbody>
      </table>
    </ProviderSimpleTable>
  )
}

export default SimpleTable
