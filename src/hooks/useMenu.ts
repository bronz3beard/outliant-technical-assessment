import { MouseEvent, useState } from "react"

import useEventListener from "./useEventListener"

const useMenu = () => {
  const [showMainMenu, setShowMainMenu] = useState<boolean>(false)

  const handleMainMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setShowMainMenu((prevState) => !prevState)
  }

  const handleMouseScroll = () => {
    setShowMainMenu(false)
  }

  // const handleMouseAway = useCallback(() => {
  //   setShowMainMenu(false)
  // }, [])

  // useEventListener("click", handleMouseAway)
  useEventListener("scroll", handleMouseScroll)

  return {
    showMainMenu,
    handleMainMenuClick,
  }
}

export default useMenu
