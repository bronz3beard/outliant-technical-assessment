import {
  ChangeEvent,
  Fragment,
  MouseEvent,
  useId,
  useMemo,
  useState,
} from "react"

import { Button } from "../../components/common/Button"
import Input from "../../components/common/Input"
import SimpleTable from "../../components/common/SimpleTable"
import { Title } from "../../components/designSystem/Title"
import PageContainer from "../../components/layout/PageContainer"
import PageTemplate from "../../components/layout/PageTemplate"
import UpdateProductsForm from "./components/UpdateForm"
import { conversationMatchesSearch } from "./helper"

const data = [
  {
    name: "Lorem ipsum",
    price: "Lorem ipsum",
    action: "",
  },
  { name: "Lorem ipsum", price: "Lorem ipsum", action: "" },
  { name: "Lorem ipsum", price: "Lorem ipsum", action: "" },
]

const columns = [{ title: "Name" }, { title: "Price" }, { title: "Action" }]

export default function ProductsPage() {
  const [searchFilter, setSearchFilter] = useState<string>("")

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchFilter(value)
  }
  const filteredProducts = useMemo(
    () => conversationMatchesSearch(data, searchFilter),
    [data, searchFilter]
  )

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
              data: filteredProducts ?? [],
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
            {(item) => {
              const id = useId()

              return (
                <Fragment key={id}>
                  {item ? (
                    <td className="text-center border-r border-l border-black border-1">
                      {item}
                    </td>
                  ) : (
                    <td className="flex space-x-2 py-2 justify-center">
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
