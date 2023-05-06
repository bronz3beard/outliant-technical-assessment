import { ChangeEvent, FocusEvent, MouseEvent, forwardRef } from "react"

type InputEventProps = {
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: MouseEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  onMouseUp?: (event: MouseEvent<HTMLInputElement>) => void
  onMouseDown?: (event: MouseEvent<HTMLInputElement>) => void
  onMouseEnter?: (event: MouseEvent<HTMLInputElement>) => void
  onMouseLeave?: (event: MouseEvent<HTMLInputElement>) => void
}

type InputProps = {
  id: string
  name: string
  className: string
  disabled?: boolean
  placeholder: string
  role: string
  type?: string
  value: string
  ariaLabel: string
  hasPCIPII?: boolean
  dataAttribute?: number | string
  pciID?: string
  piiID?: string
  required?: boolean
}
const Input = forwardRef<HTMLInputElement, InputProps & InputEventProps>(
  (
    {
      disabled = false,
      className,
      dataAttribute,
      type = "text",
      ariaLabel,
      required,
      hasPCIPII,
      piiID,
      pciID,
      ...props
    }: InputProps & InputEventProps,
    ref
  ) => {
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        aria-required={required}
        data-attribute={`${dataAttribute}${hasPCIPII ? ` ${privacyId}` : ""}`}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
