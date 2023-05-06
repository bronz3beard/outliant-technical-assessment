import { FC, HtmlHTMLAttributes, MouseEvent, ReactNode } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "../../../utils/helpers/commonHelpers"

interface HamburgerMenuAttributes extends HtmlHTMLAttributes<HTMLDivElement> {
  showMainMenu: boolean
  children?: ReactNode
  itemClassName?: string | undefined
  handleMainMenuClick: (event: MouseEvent<HTMLButtonElement>) => void
}
export interface HamburgerMenuProps
  extends HamburgerMenuAttributes,
    VariantProps<typeof hamburgerMenuVariants> {}

const hamburgerMenuVariants = cva(
  "group bg-theme-button flex justify-center items-center focus:outline-none focus:shadow-outline rounded-lg",
  {
    variants: {
      variant: {
        default: "",
        scaleUp:
          "transform transition hover:scale-105 duration-300 ease-in-out",
      },
      size: {
        default: "w-10 h-10 p-1",
        sm: "w-8 h-8",
        lg: "w-12 h-12 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const HamburgerMenu: FC<HamburgerMenuProps> = ({
  size,
  variant,
  className,
  children,
  showMainMenu,
  itemClassName,
  handleMainMenuClick,
}: HamburgerMenuProps) => {
  return (
    <button
      {...{
        id: "main-menu",
        onClick: handleMainMenuClick,
        className: cn(
          hamburgerMenuVariants({
            size,
            variant,
            className,
          })
        ),
      }}
    >
      {!children ? (
        <HamburgerMenuItems
          {...{
            showMainMenu,
            className: cn(
              hamburgerMenuItemsVariants({
                size,
                variant,
                className: itemClassName,
              })
            ),
          }}
        />
      ) : (
        children
      )}
    </button>
  )
}

interface HamburgerMenuItemsAttributes
  extends HtmlHTMLAttributes<HTMLDivElement> {
  showMainMenu: boolean
}
export interface HamburgerMenuItemProps
  extends HamburgerMenuItemsAttributes,
    VariantProps<typeof hamburgerMenuItemsVariants> {}

const hamburgerMenuItemsVariants = cva(
  "block absolute bg-theme-text group-hover:bg-theme-text bg-opacity-75 rounded-lg",
  {
    variants: {
      variant: {
        default: "transform transition duration-200 ease-in-out",
        scaleUp: "inherit",
      },
      size: {
        default: "w-6 h-1",
        sm: "w-4 h-1",
        lg: "w-8 h-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const HamburgerMenuItems: FC<HamburgerMenuItemProps> = ({
  size,
  variant,
  className,
  showMainMenu,
}: HamburgerMenuItemProps) => {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          hamburgerMenuItemsVariants({
            size,
            variant,
            className: `${className} ${
              !showMainMenu ? " -translate-y-1.5 mb-1" : "rotate-45"
            }`,
          })
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          hamburgerMenuItemsVariants({
            size,
            variant,
            className: `${className} ${!showMainMenu ? "my-1" : "opacity-0"}`,
          })
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          hamburgerMenuItemsVariants({
            size,
            variant,
            className: `${className} ${
              !showMainMenu ? " translate-y-1.5 mt-1" : "-rotate-45"
            }`,
          })
        )}
      />
    </>
  )
}

export {
  HamburgerMenu,
  HamburgerMenuItems,
  hamburgerMenuVariants,
  hamburgerMenuItemsVariants,
}
