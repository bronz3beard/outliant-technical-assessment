import { RefObject, useEffect, useRef } from "react"

/*
  - "type" of listener.
  - "listenerCallback" to handle event.
  The keyof operator takes an object type and produces a string or numeric literal union of its keys

  - "target" for listener to be attached to,
  right now can be window or html element not hooked up to work with document.

  "options" generally goes unused can also be set to false by default, but unused is okay.
*/

const useEventListener = <
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  type: KW | KH,
  listenerCallback: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
  ) => void,
  target?: RefObject<T>
  // options?: boolean | EventListenerOptions | undefined
): void => {
  // using ref so we dont have to add listenerCallback
  // to the dependency array of the useEffect where the listener is added below.
  const savedHandler = useRef(listenerCallback)

  useEffect(() => {
    // add callback to ref
    savedHandler.current = listenerCallback
  }, [listenerCallback])

  useEffect(() => {
    // window or element
    const targetActual: T | Window = target?.current || window

    // check event listener is available on targetElement, TODO:: maybe add assert here?
    if (!targetActual?.addEventListener) {
      return undefined
    }

    // Create event listener that calls handler function stored in ref
    const eventListenerCallback: typeof listenerCallback = (event) =>
      savedHandler.current(event)
    // on component mount listen for event
    targetActual.addEventListener(type, eventListenerCallback)
    // on component unmount remove listener
    return () => targetActual.removeEventListener(type, eventListenerCallback)
  }, [target, type])
}

export default useEventListener
