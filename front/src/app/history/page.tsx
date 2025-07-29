"use client"
import { useState, useEffect } from "react"
import { getHistory, LocalStorageItem } from "../functions/history"
import { Screen } from "../components/frame/screen"
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
    <div className="pb-6 flex h-screen w-full mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-red-800">
      <Screen>
        <div className="flex flex-col h-full w-full gap-4 overflow-auto">
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
      </Screen>
    </div>
  )
}
