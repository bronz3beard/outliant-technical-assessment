import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as ScrollArea from "@radix-ui/react-scroll-area"

import {
  cn,
  createNamespacedComponent,
} from "../../../utils/helpers/commonHelpers"

const ScrollZoneScrollBar = forwardRef<
  ElementRef<typeof ScrollArea.Scrollbar>,
  ComponentPropsWithoutRef<typeof ScrollArea.Scrollbar>
>(({ className, orientation = "vertical" }, ref) => (
  <ScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 border-t border-t-transparent p-[1px]",
      className
    )}
  >
    <ScrollArea.ScrollAreaThumb className="relative flex-1 rounded-full bg-transparent" />
  </ScrollArea.Scrollbar>
))
ScrollZoneScrollBar.displayName = "ScrollZoneScrollBar"

const ScrollZoneViewPort = forwardRef<
  ElementRef<typeof ScrollArea.Viewport>,
  ComponentPropsWithoutRef<typeof ScrollArea.Viewport>
>(({ children, className, ...props }, ref) => (
  <ScrollArea.Viewport
    ref={ref}
    className={cn("w-full h-full rounded-[inherit]", className)}
    {...props}
  >
    {children}
  </ScrollArea.Viewport>
))
ScrollZoneViewPort.displayName = "ScrollZoneViewPort"

const ScrollZoneComponent = forwardRef<
  ElementRef<typeof ScrollArea.Root>,
  ComponentPropsWithoutRef<typeof ScrollArea.Root>
>(({ children, className, ...props }, ref) => (
  <ScrollArea.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {children}
    <ScrollArea.Corner className="bg-theme-blue" />
  </ScrollArea.Root>
))
ScrollZoneComponent.displayName = "ScrollZoneComponent"

// Make the SqueezeBox children components available via SqueezeBox to namespace to avoid potential naming collisions.
const ScrollZone = createNamespacedComponent(() => ScrollZoneComponent, {
  ViewPort: ScrollZoneViewPort,
  ScrollBar: ScrollZoneScrollBar,
})

export { ScrollZone }
