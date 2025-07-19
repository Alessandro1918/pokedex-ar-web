"use client"
import { useState, useEffect } from "react"
import { getHistory, LocalStorageItem } from "../../functions/history"

type Props = {
  name: string
}

export function Image({ name }: Props) {

  const [ image, setImage ] = useState<string>()

  useEffect(() => {
    const history = getHistory()
    const index = history.findIndex((e: LocalStorageItem) => e.name == name)
    const image = index > -1 ? history[index].image : undefined
    setImage(image)
  }, [])

  return (
    <div className="relative flex items-center justify-center mt-4 size-48 aspect-square bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-gray-600 shadow-lg rounded-xs">
      <img
        src={image}
        className="absolute size-full p-2 object-cover "
      />
    </div>
  )
}
