import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "../../../utils/helpers/commonHelpers"

export interface ButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string
  id?: string | undefined
  text?: string
  type?: "submit" | "reset" | "button" | undefined
  name?: string
  role?: string
  ariaControls?: string
  children?: ReactNode
  buttonClass?: string
  dataAttribute?: number | string
  pciID?: string
  piiID?: string
  ariaLabel?: string
  busyNode?: ReactNode
  primary?: boolean
  disabled?: boolean
  isBusy?: boolean
  hasPCIPII?: boolean
}

export interface ButtonProps
  extends ButtonAttributes,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "inline-flex flex-row items-center text-sm rounded-md ease-linear transition-all duration-300 text-theme-text text-gray-700 static not-italic tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-theme-button hover:bg-theme-button active:bg-theme-button text-gray-200 hover:text-white",
        secondary:
          "font-semibold bg-transparent border border-slate-900 hover:bg-theme-button bg-opacity-75 active:bg-theme-button text-gray-700 hover:text-white",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        disabled: "bg-opacity-70 pointer-events-none",
        link: "bg-transparent active:bg-transparent dark:bg-transparent underline-offset-1 underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        grow: "transform transition hover:scale-105 duration-300 ease-in-out",
      },
      size: {
        default: "h-12 py-4 lg:px-7 px-4",
        sm: "h-9 lg:p-2 p-4",
        lg: "h-16 w-36",
        auto: "h-full w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type = "button",
      isBusy = false,
      busyNode = <span>...</span>,
      disabled,
      text,
      children,
      testId,
      hasPCIPII,
      pciID = "suppress_flag_pci",
      piiID = "suppress_flag_pii",
      dataAttribute,
      ariaControls,
      ariaLabel,
      ...props
    }: ButtonProps,
    ref
  ) => {
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID

    return (
      <button
        type={type}
        className={cn(
          buttonVariants({
            variant: disabled || isBusy ? "disabled" : variant,
            size,
            className,
          })
        )}
        ref={ref}
        data-testid={testId}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
        data-attribute={`${dataAttribute}${hasPCIPII ? ` ${privacyId}` : ""}`}
        {...props}
      >
        {text || children}
        {isBusy && busyNode}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
