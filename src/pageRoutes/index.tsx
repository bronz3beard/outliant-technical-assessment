import { ReactNode } from "react"

import LandingPage from "../pages/LandingPage"
import ProductsPage from "../pages/ProductsPage"

export type MainRoutes = {
  path: string
  exact: boolean
  element: ReactNode
}

export const mainRoutes: MainRoutes[] = [
  {
    path: "/",
    exact: true,
    element: <LandingPage />,
  },
  {
    path: "/products",
    exact: true,
    element: <ProductsPage />,
  },
]
