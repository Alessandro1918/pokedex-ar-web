"use client"
import { useState, useEffect } from "react"
import { getHistory, LocalStorageItem } from "../functions/history"
import { Generation } from "../components/history-generation"
import gen1 from "../../../public/data/gen1.json"
import gen2 from "../../../public/data/gen2.json"

export default function History() {

  const [ history, setHistory ] = useState<LocalStorageItem[]>([])

  useEffect(() => {
    const history = getHistory()
    setHistory(history)
  }, [])

  // return (
  //   history.map((e: LocalStorageItem) => {
  //     return (
  //       <div 
  //         key={e.name}
  //         className="flex flex-row items-center justify-center gap-2"
  //       >
  //         <h3 >{e.name}</h3>
  //         <h3 >{e.date}</h3>
  //         <img src={e.image} className="size-8 aspect-auto bg-gray-200"/>
  //         {/* <button onClick={() => handleDelete(e.name)}>Delete</button> */}
  //       </div>
  //     )
  //   })
  // )

  return (
    <div className="p-3 h-screen w-full mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-red-800">
      <div className="p-3 pb-8 h-full w-full rounded-md bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 border-2 border-zinc-600">
        <div className="p-2 h-full w-full rounded-md space-y-4 overflow-auto bg-blue-600 border-2 border-blue-800">
          <Generation 
            title="Kanto"
            names={gen1}
            startIndex={1}
            history={history} 
            setHistory={setHistory} 
          />
          <Generation 
            title="Johto"
            names={gen2}
            startIndex={152}
            history={history} 
            setHistory={setHistory} 
          />
        </div>
        <div className="p-2 flex flex-row items-center justify-between">
          <div className="size-4 bg-red-600 border-2 border-black rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
