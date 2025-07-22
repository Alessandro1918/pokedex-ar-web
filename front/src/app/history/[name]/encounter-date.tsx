"use client"
import { useEffect, useState } from "react"
import { FaRegClock } from "react-icons/fa"
import { getHistory, LocalStorageItem } from "../../functions/history"

type Props = {
  name: string
}

export function EncounterDate({ name }: Props) {

  const [ date, setDate ] = useState<string>("")
  
  useEffect(() => {
    const history = getHistory()
    const index = history.findIndex((e: LocalStorageItem) => e.name == name)
    const date = history[index].date
    const dateAsDate = new Date(date)
    const options = {
      // year: "numeric",
      // month: "long",
      // day: "numeric",
      dateStyle: "medium" as const // "Jan 15, 2025"
    }
    setDate(dateAsDate.toLocaleDateString("en-US", options))
  })

  return (
    <div className="flex flex-row items-center gap-1">
      <FaRegClock />
      <p>{date}</p>
    </div>
  )
}
