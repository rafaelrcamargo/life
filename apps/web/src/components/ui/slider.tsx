"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/utils"

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden bg-zinc-800">
      <SliderPrimitive.Range className="absolute h-full bg-red-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 bg-red-500 outline-none ring-offset-zinc-800 duration-150 hover:scale-110 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
