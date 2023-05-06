// TODO:: add classVariants for this component just like design system

import { FC } from "react"

type ThreeDotLoaderProps = {
  width?: string
  height?: string
}
const ThreeDotLoader: FC<ThreeDotLoaderProps> = ({
  width = "w-8",
  height = "h-8",
}: ThreeDotLoaderProps) => {
  return (
    <div className="flex justify-center items-center bg-transparent m-4">
      <div className="grid gap-2">
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className={`${width} ${height} bg-gray-50 rounded-full`}></div>
          <div className={`${width} ${height} bg-gray-100 rounded-full`}></div>
          <div className={`${width} ${height} bg-gray-200 rounded-full`}></div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDotLoader
