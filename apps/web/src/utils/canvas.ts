import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react"

export const BASE =
  typeof window === "undefined" ? 256 : window.innerWidth <= 768 ? 256 : 640
const COLOR = "rgb(239 68 68)"

const raw_render = (
  canvas: HTMLCanvasElement,
  universe: Array<number>,
  PER_LINE: number,
  SIZE: number
) => {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, BASE, BASE)

  universe.forEach((cell, i) => {
    const x = i % PER_LINE
    const y = Math.floor(i / PER_LINE)

    if (cell === 1) {
      ctx.fillStyle = COLOR
      ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
    } else {
      ctx.strokeStyle = COLOR.replace(")", "/ 0.05)")
      ctx.strokeRect(x * SIZE + 0.5, y * SIZE + 0.5, SIZE, SIZE)
    }
  })
}

const raw_play = (universe: Array<number>, PER_LINE: number) =>
  universe.map((cell, i) => {
    const x = i % PER_LINE
    const y = Math.floor(i / PER_LINE)

    const left = (x + PER_LINE - 1) % PER_LINE
    const right = (x + 1) % PER_LINE
    const top = (y + PER_LINE - 1) % PER_LINE
    const bottom = (y + 1) % PER_LINE

    const neighbors =
      universe[left + top * PER_LINE]! + // The top-left cell.
      universe[x + top * PER_LINE]! + // The top cell.
      universe[right + top * PER_LINE]! + // The top-right cell.
      universe[left + y * PER_LINE]! + // The left cell.
      universe[right + y * PER_LINE]! + // The right cell.
      universe[left + bottom * PER_LINE]! + // The bottom-left cell.
      universe[x + bottom * PER_LINE]! + // The bottom cell.
      universe[right + bottom * PER_LINE]! // The bottom-right cell.

    if (cell === 1 && neighbors < 2) {
      return 0
    } else if (cell === 1 && neighbors > 3) {
      return 0
    } else if (cell === 0 && neighbors === 3) {
      return 1
    } else {
      return cell
    }
  })

type UseCanvas = (
  universe: Array<number>,
  setUniverse: Dispatch<SetStateAction<Array<number>>>,
  perLine?: number
) => {
  ref: RefObject<HTMLCanvasElement>
  play: (universe: Array<number>) => Array<number>
  render: (canvas: HTMLCanvasElement, universe: Array<number>) => void
}

export const useCanvas: UseCanvas = (universe, setUniverse, perLine = 32) => {
  const ref = useRef<HTMLCanvasElement>(null)

  const PER_LINE = perLine
  const SIZE = BASE / PER_LINE

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const event = (e: MouseEvent) => {
      // getBoundingClientRect() returns the size of an element and its position relative to the viewport.
      const rect = canvas.getBoundingClientRect()

      const x = e.clientX - rect.left // The e is the event object, and e.clientX is the horizontal coordinate of the mouse pointer relative to the left edge of the browser viewport.
      const y = e.clientY - rect.top // And we use the rect.left and rect.top to get the position of the canvas element relative to the viewport.

      // The i is the index of the cell in the universe array.
      const i = Math.floor(x / SIZE) + Math.floor(y / SIZE) * PER_LINE
      // universe[i] = universe[i] === 1 ? 0 : 1
      setUniverse(prev => {
        const newUniverse = [...prev]
        newUniverse[i] = newUniverse[i] === 1 ? 0 : 1

        return newUniverse
      })

      render(canvas, universe) // We call the render function to render the canvas.
    }

    // We add the event listener to the canvas element.
    canvas.addEventListener("click", event)
    render(canvas, universe)

    return () => {
      canvas.removeEventListener("click", event)
    }
  }, [ref, PER_LINE])

  const play = (universe: Array<number>) => {
    const PER_LINE = perLine

    return raw_play(universe, PER_LINE)
  }

  const render = (canvas: HTMLCanvasElement, universe: Array<number>) => {
    const PER_LINE = perLine
    const SIZE = BASE / PER_LINE

    return raw_render(canvas, universe, PER_LINE, SIZE)
  }

  return { ref, play, render }
}
