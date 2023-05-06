import { HtmlHTMLAttributes, ReactNode, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "../../../utils/helpers/commonHelpers"

interface NavLayoutHeaderAttributes extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface NavLayoutHeaderProps
  extends NavLayoutHeaderAttributes,
    VariantProps<typeof navLayoutHeaderVariants> {}

const navLayoutHeaderVariants = cva(
  "fixed w-full h-24 z-0 top-0 text-theme-text",
  {
    variants: {
      variant: {
        default: "bg-theme-bg-light",
        transparent: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const NavLayoutHeader = forwardRef<HTMLElement, NavLayoutHeaderProps>(
  ({ variant, className, children }: NavLayoutHeaderProps, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          navLayoutHeaderVariants({
            variant,
            className,
          })
        )}
      >
        <div className="py-2 w-full h-full lg:px-20 px-4 mx-auto flex flex-wrap items-center lg:justify-between justify-end mt-0">
          {children}
        </div>
      </nav>
    )
  }
)
NavLayoutHeader.displayName = "NavLayoutHeader"

export { NavLayoutHeader, navLayoutHeaderVariants }
