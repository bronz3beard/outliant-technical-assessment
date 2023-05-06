import { FC, ReactNode } from "react"

type BannerProps = {
  id: string
  children: ReactNode
  className?: string
}

const Banner: FC<BannerProps> = ({ id, children, className }: BannerProps) => {
  return (
    <div
      id={id}
      className={`${className} w-full flex flex-col py-4 content-center justify-center bg-no-repeat bg-cover bg-center bg-transparent`}
    >
      <div className="relative h-max w-full">
        <div className="md:mx-0 mx-6 flex flex-wrap flex-col md:flex-row items-start justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
export default Banner
