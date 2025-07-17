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
    <img
      src={image}
      className="size-36 aspect-square object-cover bg-gray-300"
    />
  )
}
