import { ReactNode, forwardRef, useEffect, useRef, useState } from "react"

import { cn } from "../../../utils/helpers/commonHelpers"

interface PhotoProps extends React.HTMLAttributes<HTMLElement> {
  url?: string
  className: string
  isLoading?: boolean
  imagePosition?: string
  onLoadEnd?: () => void
  elementTag?: string
  children?: ReactNode
}

type ComponentProps = PhotoProps & {
  ref?: React.Ref<HTMLElement>
}

const Component = forwardRef(
  ({ elementTag = "div", ...props }: ComponentProps, ref) => {
    const ElementTag = elementTag
    return <ElementTag ref={ref} {...props} />
  }
)

Component.displayName = "DynamicBackgroundImageComponent"

const BackgroundImage = ({
  url,
  children,
  className,
  isLoading = true,
  imagePosition = "center",
  onLoadEnd,
  elementTag,
  ...rest
}: PhotoProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const elementCurrent = elementRef.current

    const handleScroll = () => {
      const rect = elementCurrent?.getBoundingClientRect()
      if (rect && rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const elementCurrent = elementRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px", threshold: 0.5 }
    )

    if (elementCurrent) {
      observer.observe(elementCurrent)
    }

    return () => {
      if (elementCurrent) {
        observer.unobserve(elementCurrent)
      }
    }
  }, [])

  const loadingComplete = () => {
    setIsVisible(true)
    if (onLoadEnd) {
      onLoadEnd()
    }
  }

  return (
    <Component
      {...{
        url,
        elementTag,
        onLoad: loadingComplete,
        className: cn(`${className} duration-700 ease-in-out`, {
          grayscale: !isVisible,
          "blur-2xl scale-110": !isVisible,
          "grayscale-0 blur-0 scale-100": isVisible,
        }),
      }}
      {...rest}
      ref={elementRef}
    >
      {isVisible && !children ? null : children}
    </Component>
  )
}

export default BackgroundImage
