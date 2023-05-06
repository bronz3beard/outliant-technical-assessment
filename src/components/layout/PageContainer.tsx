import { ReactNode } from "react"

type PageContainerProps = {
  children: ReactNode
  className?: string
}
const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`flex-1 overflow-hidden mb-64 ${className}`}>
      {children}
    </div>
  )
}

export default PageContainer
