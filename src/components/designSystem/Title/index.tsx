import React, { ElementType, FC, HtmlHTMLAttributes, useMemo } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "../../../utils/helpers/commonHelpers"
import { assertIsTrue } from "../../../utils/helpers/valueCheckers"

export type TitleVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | null
  | undefined

interface TitleAttributes extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | JSX.Element
  titleType: TitleVariant
  title: string
}

export interface TitleProps
  extends TitleAttributes,
    VariantProps<typeof titleVariants> {}

const titleVariants = cva("m-0 p-0 select-none font-normal", {
  variants: {
    variant: {
      default: "break-words leading-normal",
      breaknormal: "break-words leading-normal",
      boldfont: "font-bold break-words leading-normal",
      pointer: "break-words leading-normal cursor-pointer",
    },
    size: {
      h1: "h1 lg:text-6xl md:text-4xl text-4xl",
      h2: "h2 lg:text-4xl md:text-3xl text-xl",
      h3: "h3 lg:text-2xl md:text-2xl text-lg",
      h4: "h4 sm:text-xl",
      h5: "h5 sm:text-lg",
      h6: "h6 sm:text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "h1",
  },
})

interface ComponentProps extends HtmlHTMLAttributes<HTMLOrSVGElement> {
  tag: ElementType | ElementType<HTMLSpanElement>
}

type HeaderType = {
  [index: string]: ComponentProps
}

const headerTypeList: HeaderType = {
  h1: {
    tag: "h1",
  },
  h2: {
    tag: "h2",
  },
  h3: {
    tag: "h3",
  },
  h4: {
    tag: "h4",
  },
  h5: {
    tag: "h5",
  },
  h6: {
    tag: "h6",
  },
}

const Title: FC<TitleProps> = ({
  variant,
  className,
  children,
  title,
  titleType,
}: TitleProps) => {
  const styleSize: string = useMemo(
    () => titleVariants({ size: titleType }),
    [titleType]
  )

  assertIsTrue(
    Boolean(titleType && styleSize.indexOf(titleType!) !== -1),
    "The size variant and the headerType should be the same."
  )

  const Component = !titleType ? "span" : headerTypeList[titleType]?.tag

  return (
    <Component
      className={cn(
        titleVariants({
          variant,
          size: titleType,
          className,
        })
      )}
    >
      {children || title}
    </Component>
  )
}

export { Title, titleVariants }
