import { ChangeEvent, Fragment, MouseEvent, useState } from "react"
import { Products } from "@prisma/client"

import { Button } from "../../components/common/Button"
import Input from "../../components/common/Input"
import SimpleTable from "../../components/common/SimpleTable"
import {
  // SkeletonLoader,
  optimisticLoaderArray,
} from "../../components/designSystem/Loaders"
import { Title } from "../../components/designSystem/Title"
import PageContainer from "../../components/layout/PageContainer"
import PageTemplate from "../../components/layout/PageTemplate"
import useSWRAppData from "../../hooks/useSWRAppData"
import { simpleFetcher } from "../../utils/apiRequestHelpers"
import UpdateProductsForm from "./components/UpdateForm"
import { conversationMatchesSearch } from "./helper"

const columns = [{ title: "Name" }, { title: "Price" }, { title: "Action" }]

export default function ProductsPage() {
  const [searchFilter, setSearchFilter] = useState<string>("")

  const {
    data,
    // error,
    isLoading,
  } = useSWRAppData<{ success: boolean; products: Products[] }>(
    "/api/products",
    simpleFetcher,
    {
      // refreshInterval: 1000,
    }
  )

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchFilter(value)
  }
  if (!data?.products) {
    return <div>Loading...</div>
  }
  const filteredProducts = conversationMatchesSearch(
    data?.products.map(({ name, price, id }) => ({ name, price, action: id })),
    searchFilter
  )
  const optimisticLoader = optimisticLoaderArray(7).map((_, index) => ({
    id: index,
    name: "Loading...",
    price: 0,
  }))

  return (
    <PageTemplate>
      <PageContainer className="pt-24">
        <div className="mx-16 flex-col justify-evenly relative w-full">
          <div className="flex justify-between items-center w-1/2">
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
              className="rounded h-12 p-2 border border-black text-base w-1/2"
            />
          </div>
        </div>
        <div className="flex justify-evenly relative h-96 w-full my-12">
          <SimpleTable
            {...{
              data: isLoading ? optimisticLoader : filteredProducts,
              className: "w-1/2",
              columns,
              tableId: "",
              deleteRow: false,
              handleCancelDelete: (event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              },
              handleConfirmDelete: (event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              },
            }}
          >
            {({ value, id }) => {
              return (
                <Fragment key={id}>
                  {value && (
                    <td
                      key={id}
                      className="text-center border-r border-l border-black border-1"
                    >
                      {value}
                    </td>
                  )}
                  {value === id && (
                    <td key={id} className="flex space-x-2 py-2 justify-center">
                      <Button {...{ text: "Edit", className: "h-8" }} />
                      <Button
                        {...{
                          text: "Delete",
                          variant: "secondary",
                          className: "h-8",
                        }}
                      />
                    </td>
                  )}
                </Fragment>
              )
            }}
          </SimpleTable>
          <UpdateProductsForm />
        </div>
      </PageContainer>
    </PageTemplate>
  )
}
