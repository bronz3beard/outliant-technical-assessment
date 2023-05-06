import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react"
import { Products } from "@prisma/client"

import { Button } from "../../components/common/Button"
import Input from "../../components/common/Input"
import SimpleTable from "../../components/common/SimpleTable"
import {
  // SkeletonLoader,
  optimisticLoaderArray,
} from "../../components/designSystem/Loaders"
import { ScrollZone } from "../../components/designSystem/ScrollZone"
import { Title } from "../../components/designSystem/Title"
import PageContainer from "../../components/layout/PageContainer"
import PageTemplate from "../../components/layout/PageTemplate"
import useSWRAppData from "../../hooks/useSWRAppData"
import { simpleFetcher, singlePostRequest } from "../../utils/apiRequestHelpers"
import { apiEndPoint } from "../../utils/constants"
import { formatDate } from "../../utils/helpers/commonHelpers"
import UpdateProductsForm from "./components/UpdateForm"
import { conversationMatchesSearch } from "./helper"

interface FormattedProducts
  extends Omit<Products, "id" | "updatedAt" | "createdAt"> {
  createdAt: string
}

const columns = [{ title: "Name" }, { title: "Price" }, { title: "Action" }]

export default function ProductsPage() {
  const [editData, setEditData] = useState<Products | undefined>()
  const [searchFilter, setSearchFilter] = useState<string>("")

  const {
    data,
    // error,
    mutate,
    isLoading,
  } = useSWRAppData<{ success: boolean; products: Products[] }>(
    `${apiEndPoint}/products`,
    simpleFetcher,
    {
      // refreshInterval: 1000,
    }
  )

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchFilter(value)
  }

  const handleProductDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const { id } = event.currentTarget

    await singlePostRequest(`${apiEndPoint}/products?delete=1`, { id })
    mutate()
  }

  const handleProductEdit = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const { id: searchId } = event.currentTarget

      const findData = data.products.find(({ id }: Products) => id === searchId)

      setEditData(findData)
    },
    [data?.products]
  )

  const optimisticLoader = optimisticLoaderArray(7).map((_, index) => ({
    id: index,
    name: "Loading...",
    price: 0,
  }))

  const filteredProducts: FormattedProducts[] = useMemo(() => {
    const dataItems = conversationMatchesSearch(
      data?.products.map(({ name, price, id, createdAt }) => ({
        id,
        name,
        price,
        createdAt,
      })),
      searchFilter
    )

    if (!dataItems) return []

    return dataItems
      .sort(
        (
          objA: Omit<Products, "id" | "updatedAt">,
          objB: Omit<Products, "id" | "updatedAt">
        ) => {
          const dateA = new Date(objA.createdAt)
          const dateB = new Date(objB.createdAt)
          return Number(dateA) - Number(dateB)
        }
      )
      .map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt.toString(), "dateTime"),
      }))
  }, [data?.products, searchFilter])

  if (!data?.products) {
    return <div>Loading...</div>
  }

  return (
    <PageTemplate>
      <PageContainer className="pt-24">
        <div className="mx-36 px-4 flex-col justify-evenly relative w-full">
          <div className="flex space-x-4 items-center w-1/2">
            <Title
              {...{
                titleType: "h1",
                title: "Products",
                className: "text-black font-bold",
              }}
            />
            <Input
              id="name"
              name="name"
              role="textbox"
              ariaLabel="first name"
              value={searchFilter}
              onChange={inputChangeHandler}
              placeholder="Search for keywords..."
              className="rounded h-12 p-2 border border-black text-base w-1/3"
            />
          </div>
        </div>

        <div className="flex justify-evenly relative h-96 w-full my-12">
          <ScrollZone className="h-96 overflow-scroll">
            <ScrollZone.ViewPort>
              <SimpleTable
                {...{
                  data: isLoading ? optimisticLoader : filteredProducts,
                  className: "w-full",
                  columns,
                  tableId: "",
                  deleteRow: false,
                  handleCancelDelete: (
                    event: MouseEvent<HTMLButtonElement>
                  ) => {
                    event.preventDefault()
                  },
                  handleConfirmDelete: (
                    event: MouseEvent<HTMLButtonElement>
                  ) => {
                    event.preventDefault()
                  },
                }}
              >
                {({ value, index, id, column }) => {
                  return (
                    <td
                      key={index}
                      className="text-center border-r border-l border-black border-1"
                    >
                      {value}
                      {column.title.includes("Action") && (
                        <span className="flex space-x-2 p-2">
                          <Button
                            {...{
                              id,
                              text: "Edit",
                              className: "h-8",
                              onClick: handleProductEdit,
                            }}
                          />
                          <Button
                            {...{
                              id,
                              text: "Delete",
                              variant: "secondary",
                              className: "h-8",
                              onClick: handleProductDelete,
                            }}
                          />
                        </span>
                      )}
                    </td>
                  )
                }}
              </SimpleTable>
            </ScrollZone.ViewPort>
            <ScrollZone.ScrollBar />
          </ScrollZone>
          <UpdateProductsForm {...{ editData, mutate }} />
        </div>
      </PageContainer>
    </PageTemplate>
  )
}
