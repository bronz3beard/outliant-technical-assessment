import { MouseEvent, useEffect, useRef, useState } from "react"

import { cn } from "../../../utils/helpers/commonHelpers"

interface FillPhoto {
  title?: string
  fill: boolean
  width?: number
  height?: number
  src: string
  alt: string
  draggable?: boolean
  className?: string
  isLoading?: boolean
  onLoadEnd?: () => void
  onClick?: (event: MouseEvent<HTMLImageElement>) => void
}
interface WidthHeightPhoto {
  title?: string
  fill?: boolean
  width: number
  height: number
  src: string
  alt: string
  draggable?: boolean
  className?: string
  isLoading?: boolean
  onLoadEnd?: () => void
  onClick?: (event: MouseEvent<HTMLImageElement>) => void
}

type PhotoProps = FillPhoto | WidthHeightPhoto

const Photo = ({
  alt,
  title,
  className,
  fill,
  src,
  width,
  height,
  isLoading = true,
  onLoadEnd,
  ...props
}: PhotoProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(isLoading)
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const targetCurrent = imgRef.current

      // check event listener is available on targetElement, TODO:: maybe add assert here?
      if (!targetCurrent?.getBoundingClientRect) {
        return undefined
      }

      const rect = targetCurrent?.getBoundingClientRect()
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const targetCurrent = imgRef.current

    const observer = new IntersectionObserver(
      (item) => {
        const [entry] = item
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px", threshold: 0.5 }
    )

    if (targetCurrent) {
      observer.observe(targetCurrent)
    }

    return () => {
      if (targetCurrent) {
        observer.unobserve(targetCurrent)
      }
    }
  }, [])

  const loadingComplete = () => {
    setIsVisible(true)
    if (!onLoadEnd) {
      setImageLoading(false)
    } else {
      onLoadEnd()
    }
  }

  return (
    <img
      ref={imgRef}
      {...{
        alt,
        title,
        src: `${src}?w=${width}&q=${imageLoading ? 15 : 85}`,
        ...(!fill
          ? {
              width,
              height,
            }
          : { fill }),
        className: cn(`${className} duration-700 ease-in-out`, {
          grayscale: !isVisible,
          "blur-2xl scale-110": !isVisible,
          "grayscale-0 blur-0 scale-100": isVisible,
        }),
        onLoad: loadingComplete,
      }}
      {...props}
    />
  )
}

export default Photo
