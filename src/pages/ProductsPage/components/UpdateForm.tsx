import { Button } from "../../../components/common/Button"
import Input from "../../../components/common/Input"
import { Title } from "../../../components/designSystem/Title"
import useForm from "../../../hooks/useForm"
import { objectHasAttributes } from "../../../utils/helpers/commonHelpers"
import { getFormInputValues } from "../helper"

type FormErrorTemplate = {
  name: string
  price: string
}

const UpdateProductsForm = () => {
  const { formData: inputValues, handleChange } = useForm({
    initialValues: getFormInputValues(),
    async onSubmit({ error }) {
      if (error && objectHasAttributes(error)) {
        return // cancel the submit until errors are fixed
      } else {
        try {
          //   const { name, price } = formData
          // TODO:: update DB here
        } catch (error: any) {
          console.error(
            "🚀 ~ file: index.tsx ~ line 125 ~ onSubmit ~ error",
            error
          )
        }
      }
    },
    validate(formData) {
      const errors: FormErrorTemplate = {} as FormErrorTemplate

      if (!formData.name.value) {
        errors.name = "Please enter a Name"
      }

      if (!formData.price.value) {
        errors.price = "Please enter a Price"
      }

      return errors
    },
  })

  const { name, price } = inputValues

  return (
    <div className="bg-theme-bg-dark p-8 w-1/3 text-center">
      <Title
        {...{
          titleType: "h3",
          title: "Header Text",
          className: "font-bold mb-4 text-black",
        }}
      />
      <Title
        {...{
          titleType: "h6",
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          className: "px-1",
        }}
      />
      <div className="mt-4">
        <div className="relative py-2">
          <Input
            {...{
              role: "textbox",
              tabIndex: 1,
              autoFocus: true,
              required: true,
              id: "name",
              type: "text",
              name: "name",
              placeholder: name.placeholder as string,
              inputMode: "text",
              value: name.value,
              onChange: handleChange,
              ariaLabel: "email",
              className:
                "block w-full p-2 border hover:border-theme-orange text-base text-theme-dark-black appearance-none focus:outline-none rounded-md",
            }}
          />
        </div>
        <div className="relative py-2">
          <Input
            {...{
              role: "textbox",
              tabIndex: 2,
              autoFocus: true,
              required: true,
              id: "price",
              type: "text",
              name: "price",
              placeholder: price.placeholder as string,
              inputMode: "text",
              value: price.value,
              onChange: handleChange,
              ariaLabel: "email",
              className:
                "block w-full p-2 border hover:border-theme-orange text-base text-theme-dark-black appearance-none focus:outline-none rounded-md",
            }}
          />
        </div>
        <Button
          {...{
            text: "Call to Action",
            className: "w-full justify-center mt-4",
          }}
        />
      </div>
    </div>
  )
}

export default UpdateProductsForm
