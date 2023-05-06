import {
  Children,
  FC,
  Fragment,
  HtmlHTMLAttributes,
  ReactNode,
  cloneElement,
} from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "../../../utils/helpers/commonHelpers"

type SelfAlignType = {
  [key: number]: string
}

interface FlexGridLayoutAttributes extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  role?: string
  ariaLabel?: string
  childContainerClass?: string
  selfStyling?: SelfAlignType
}

export interface FlexGridLayoutProps
  extends FlexGridLayoutAttributes,
    VariantProps<typeof flexGridLayoutVariants> {}

const flexGridLayoutVariants = cva("flex", {
  variants: {
    variant: {
      default: "justify-evenly flex-wrap items-center",
      center: "justify-center items-center",
      grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2",
    },
    size: {
      default: "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-auto",
      sm: "w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-auto",
      lg: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const FlexGridLayout: FC<FlexGridLayoutProps> = ({
  variant,
  size,
  className,
  children,
  role = "group",
  selfStyling = "",
  ariaLabel = "group",
  childContainerClass = "",
}: FlexGridLayoutProps) => {
  return (
    <div
      className={cn(
        flexGridLayoutVariants({
          variant,
          size,
          className,
        })
      )}
      role={role}
      aria-label={ariaLabel}
    >
      {Children.toArray(children)
        .filter(Boolean)
        .map((child: any, key) => (
          //  I know this is bad practice but on render the order can change and it is expected.
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={key}>
            {child && (
              <div
                className={`${
                  !selfStyling ? childContainerClass : selfStyling[key]
                }`}
              >
                {cloneElement(child)}
              </div>
            )}
          </Fragment>
        ))}
    </div>
  )
}

export { FlexGridLayout, flexGridLayoutVariants }
