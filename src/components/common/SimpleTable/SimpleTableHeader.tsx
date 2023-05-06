import { FC } from "react"

import { ColumnData } from "."

type SimpleTableHeaderProps = {
  className?: string
  columns: ColumnData[]
  headerStyle?: Record<string, string>
}

const SimpleTableHeader: FC<SimpleTableHeaderProps> = ({
  className,
  columns,
  headerStyle,
}: SimpleTableHeaderProps) => {
  return (
    <thead
      className={`${className} text-base text-theme-button uppercase bg-theme-bg-light dark:bg-theme-bg-dark dark:text-theme-button`}
    >
      <tr className="text-base text-theme-button uppercase bg-theme-bg-light dark:bg-theme-bg-dark dark:text-theme-button">
        {columns.map(({ id, title, tableDataStyles }) => {
          return (
            title && (
              <th
                scope="col"
                key={`${title}-${id}`}
                className="text-center px-6 py-4 border-r border-l border-t border-black border-1"
                style={{
                  ...headerStyle,
                  ...tableDataStyles,
                }}
              >
                {title}
              </th>
            )
          )
        })}
      </tr>
    </thead>
  )
}

export default SimpleTableHeader
