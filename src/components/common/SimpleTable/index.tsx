import { FC, MouseEvent, ReactNode } from "react"
import { Products } from "@prisma/client"

import { getDescendantPropObject } from "../../../utils/helpers/commonHelpers"
import SimpleTableHeader from "./SimpleTableHeader"
import { ProviderSimpleTable } from "./tableRowContext"

export type RowData = {
  [index: string]: string | number
}
export type ColumnData = { [index: string]: string }

export type ChildData = {
  value: string
  id: string
  column: { [index: string]: string }
  index: number
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

const getRowProps = (item: Products, column: ColumnData, index: number) => {
  const tableDataValue = getDescendantPropObject(
    {
      name: item.name,
      price: item.price,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    },
    column.title.toLowerCase()
  )
  // TODO:: Look for better option than index.
  return { value: tableDataValue, id: item.id, column, index }
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
                {columns.map((col, index) =>
                  children(getRowProps(item, col, index))
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </ProviderSimpleTable>
  )
}

export default SimpleTable
