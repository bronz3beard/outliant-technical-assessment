import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  cloneElement,
  lazy,
  memo,
} from "react"
import { Link } from "react-router-dom"

import useMenu from "../../hooks/useMenu"
import ErrorBoundary from "../ErrorBoundary"
import { Button } from "../common/Button"
import Drawer, { DrawerAnchor } from "../designSystem/Drawer"
import { HamburgerMenu } from "../designSystem/HamburgerMenu"
import { SkeletonLoader } from "../designSystem/Loaders"
import NavLinks from "../siteNav/NavLinks"
import { NavLayoutHeader } from "./NavLayoutHeader"

const Footer = lazy(() => import("../layout/Footer"))

type Props = {
  children: ReactNode | ReactNode[]
  fixedRightContent?: ReactNode | ReactNode[]
}

const DrawerMemo = memo(Drawer)

const PageTemplate: FC<Props> = ({ children, fixedRightContent = null }) => {
  const { showMainMenu, handleMainMenuClick } = useMenu()

  return (
    <ErrorBoundary>
      <div className="w-full h-full relative">
        <div className="min-h-screen flex">
          <div className="flex-0">
            <DrawerMemo
              {...{ showMainMenu, anchor: DrawerAnchor.right }}
              key="app-drawer"
            >
              <NavLinks />
            </DrawerMemo>
          </div>
          <div className="flex-1 w-full">
            <NavLayoutHeader className="items-center z-50">
              <div className="lg:flex justify-start w-min p-2 text-theme-text text-sm hidden">
                Logo.
              </div>
              <div className="lg:flex justify-center w-max space-x-10 text-theme-text text-sm hidden">
                <Link to="/" className="p-1 hover:underline active:underline">
                  Home
                </Link>
                <Link
                  to="/products"
                  className="p-1 hover:underline active:underline"
                >
                  Products
                </Link>
              </div>
              <div className="lg::mr-0 mr-4">
                <Button
                  {...{
                    type: "button",
                    text: "Call to Action",
                  }}
                />
              </div>
              <HamburgerMenu
                {...{
                  variant: "scaleUp",
                  className: `lg:hidden`,
                  showMainMenu,
                  handleMainMenuClick,
                }}
              />
            </NavLayoutHeader>
            <main role="main" className="relative flex flex-col flex-1 top-0">
              {children}
            </main>
            <Suspense fallback={<SkeletonLoader />}>
              <Footer />
            </Suspense>
          </div>
          <div
            className={`${
              !fixedRightContent || Children.count(fixedRightContent) === 0
                ? "hidden"
                : "flex-1"
            }`}
          >
            {Children.count(fixedRightContent) > 0
              ? Children.map(fixedRightContent, (child, index) =>
                  cloneElement(child as unknown as ReactElement, { index })
                )
              : null}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default PageTemplate
