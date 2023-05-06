import { FC, ReactNode } from "react"

export enum DrawerAnchor {
  right,
  left,
}

type DrawerProps = {
  anchor: DrawerAnchor
  children: ReactNode
  showMainMenu: boolean
}

const Drawer: FC<DrawerProps> = ({
  anchor,
  children,
  showMainMenu,
}: DrawerProps) => {
  return (
    <>
      <div
        className={`bg-theme-bg-dark mt-24 ${
          DrawerAnchor[anchor] === "left" ? "left-0" : "right-0"
        } w-96 min-h-screen h-full overflow-hidden content-center z-40 transition ease-in-out duration-900 ${
          showMainMenu
            ? "absolute"
            : `lg:hidden absolute transform lg:opacity-100 lg:translate-x-0 opacity-100 ${
                DrawerAnchor[anchor] === "left"
                  ? "-translate-x-96"
                  : "translate-x-96"
              }`
        }`}
      >
        <div className="flex h-full w-full min-h-0 flex-col">
          <div className="flex h-full w-full flex-1 items-start border-white/20">
            <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
              {children}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Drawer
