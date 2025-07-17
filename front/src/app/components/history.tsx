import { useState, useEffect } from "react"
import { getHistory, LocalStorageItem } from "../functions/history"
import { Generation } from "./history-generation"
import gen1 from "../../../public/data/gen1.json"
import gen2 from "../../../public/data/gen2.json"

export function History() {

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
  //         className="flex flex-row items-center gap-2"
  //       >
  //         <h3 >{e.name}</h3>
  //         <h3 >{e.date}</h3>
  //         <img src={e.image} className="size-8 aspect-auto bg-gray-200"/>
  //         <button onClick={() => handleDelete(e.name)}>Delete</button>
  //       </div>
  //     )
  //   })
  // )

  return (
    <div className="h-96 overflow-auto">
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
  )
}
