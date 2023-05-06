import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react"

export type InputValues = {
  value: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

export type FormDataItem = {
  [index: string]: InputValues
}

export type ErrorResponse = Record<string, string>

export type FormSubmitValue = {
  formType: string
  formData: FormDataItem
  error: ErrorResponse
  setErrors: Dispatch<SetStateAction<ErrorResponse>>
}

type DefaultOptions = {
  initialValues: FormDataItem
  onSubmit: (submitValues: FormSubmitValue) => void
  onHandleCancel?: (submitValues: FormSubmitValue) => void
  validate: (formData: FormDataItem) => ErrorResponse
}

const useForm = (options: DefaultOptions) => {
  const { initialValues, onSubmit, validate } = options
  const [formData, setFormData] = useState<FormDataItem>(initialValues)

  // currently errors are not being used but they can be in future.
  const [errors, setErrors] = useState<ErrorResponse>({})

  // accommodate all possible form types.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event
    const { value, name } = currentTarget

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        value,
      },
    })
  }

  const handleSubmit = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    const { id } = event.currentTarget
    const error = validate(formData)

    setErrors({
      ...errors,
      ...error,
    })

    const submitValues: FormSubmitValue = {
      formData,
      error,
      formType: id,
      setErrors,
    } as FormSubmitValue

    onSubmit(submitValues)
  }

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    handleSubmit,
  }
}

export default useForm
