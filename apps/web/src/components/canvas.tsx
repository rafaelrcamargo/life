"use client"

import { Slider } from "@/components/ui/slider"
import { BASE, useCanvas } from "@/utils/canvas"
import { useEffect, useState } from "react"

const INITIAL_SIZE = 32
const INITIAL_DELAY = 100
export const Canvas = () => {
  const [size, setSize] = useState(INITIAL_SIZE)
  const [delay, setDelay] = useState(INITIAL_DELAY)

  const [playing, setPlaying] = useState(false)
  const [universe, setUniverse] = useState<number[]>(
    new Array(size * size).fill(0)
  )

  const { ref, play, render } = useCanvas(universe, setUniverse, size)

  useEffect(() => {
    render(ref.current!, universe)
  }, [universe])

  useEffect(() => {
    if (!playing) return

    const interval = setInterval(() => {
      if (universe.every(cell => cell === 0)) return setPlaying(false)
      setUniverse(prev => play(prev))
    }, delay)

    return () => clearInterval(interval)
  }, [playing])

  useEffect(() => {
    setPlaying(false)
    setUniverse(new Array(size * size).fill(0))
  }, [size])

  useEffect(() => {
    setPlaying(false)
    setTimeout(() => setPlaying(true), 50)
  }, [delay])

  return (
    <div className="flex flex-col gap-4 p-4 min-w-[50vw]">
      <div className="flex flex-wrap md:flex-nowrap gap-6 pb-1 md:gap-4">
        <span className="hidden md:flex">🌐</span>
        <Slider
          onValueCommit={x => setSize(x?.[0]!)}
          defaultValue={[INITIAL_SIZE]}
          max={128}
          step={8}
          min={8}
        />
        <span className="hidden md:flex">⌚</span>
        <Slider
          onValueCommit={x => setDelay(x?.[0]!)}
          defaultValue={[INITIAL_DELAY]}
          max={500}
          step={50}
          min={0}
        />
      </div>

      <canvas
        ref={ref}
        width={BASE + 0.5}
        height={BASE + 0.5}
        className="border border-red-500"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        {!playing ? (
          <button
            className="w-full bg-red-500 p-4 font-medium text-white duration-150 hover:scale-[1.025]"
            onClick={() => setPlaying(true)}
          >
            Play ⏱️
          </button>
        ) : (
          <button
            className="w-full bg-red-500/30 p-4 font-medium text-white duration-150 hover:scale-[1.025]"
            onClick={() => setPlaying(false)}
          >
            Pause ⏱️
          </button>
        )}

        <button
          className="w-full border border-red-500 p-4 font-medium text-white duration-150 hover:scale-[1.025]"
          onClick={() => setUniverse(prev => play(prev))}
        >
          Step 👀
        </button>

        <button
          className="w-full border border-red-500 p-4 font-medium text-white duration-150 hover:scale-[1.025]"
          onClick={() => setUniverse(new Array(size * size).fill(0))}
        >
          Clear 🧹
        </button>

        <button
          className="w-full border border-red-500 p-4 font-medium text-white duration-150 hover:scale-[1.025]"
          onClick={() =>
            setUniverse(prev => prev.map(() => Math.round(Math.random())))
          }
        >
          Random ✨
        </button>
      </div>
    </div>
  )
}
