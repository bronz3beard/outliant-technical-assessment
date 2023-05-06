import { FormDataItem, InputValues } from "../../hooks/useForm"

export const conversationMatchesSearch = <
  T extends { [index: string]: string }
>(
  arrayList: T[] | null,
  searchValue: string
): T[] | undefined => {
  if (arrayList?.length) {
    return arrayList?.filter((item: T) => {
      const name = item.name
      const price = item.price

      // I can do || or here because I know there should always be a least one value
      if (name || price) {
        return (
          name
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toString().toLowerCase()) !== -1 ||
          price
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toString().toLowerCase()) !== -1 ||
          !searchValue
        )
      }
      return false
    })
  }
}

export interface ProductsFormData extends FormDataItem {
  name: InputValues
  price: InputValues
}

export const getFormInputValues = (): ProductsFormData => ({
  name: {
    value: "",
    label: "Name",
    placeholder: "Name",
  },
  price: {
    value: "",
    label: "Price",
    placeholder: "Price",
  },
})