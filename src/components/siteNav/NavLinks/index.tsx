import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Link } from "react-router-dom"

const NavLinks = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<any>>(
  (_, _ref) => {
    return (
      <div className="flex w-full flex-1 flex-col space-y-4 border border-red-500 border-1">
        <div className="overflow-y-auto">
          <ul className="font-medium flex flex-col items-center">
            <li>
              <div className="h-10 items-center flex justify-between m-0">
                <Link
                  {...{
                    to: "/",
                    id: "home",
                    className:
                      "font-bold hover:no-underline underline mx-1 text-theme-button hover:text-theme-text",
                  }}
                >
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="h-10 items-center flex justify-between m-0">
                <Link
                  {...{
                    to: "/products",
                    id: "products",
                    className:
                      "font-bold hover:no-underline underline mx-1 text-theme-button hover:text-theme-text",
                  }}
                >
                  Products
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
)

NavLinks.displayName = "NavLinks"
export default NavLinks
