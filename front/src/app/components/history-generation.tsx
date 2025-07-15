import { LocalStorageItem } from "../page"

type Props = {
  title: string,  // "Gen 2 - Johto"
  names: string[],  // ["Chikorita", ...]
  startIndex: number  // 152 (gen 1 had 151 names)
  history: LocalStorageItem[],
  setHistory: (history: LocalStorageItem[]) => void,
}

export function Generation({ title, names, startIndex, history, setHistory }: Props) {

  function handleDelete(name: string) {
    const newHistory = [...history]
    const index = newHistory.findIndex((e: LocalStorageItem) => e.name == name)
    newHistory.splice(index, 1)
    localStorage.setItem("history", JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  return (
    <div>

      <p>{title}</p>

      <div className="grid grid-cols-5 gap-2">

        {names.map((name: string, i: number) => {

          const index = history.findIndex((e: LocalStorageItem) => e.name == name)

          return (
            <div 
              key={i}
              className="relative flex items-center justify-center size-12 bg-slate-400 rounded-lg"
            >
              {
                index > -1
                ? // Already found: display image from History
                  <>
                    <img
                      src={history[index].image}
                      className="rounded-lg"
                    />
                    <button 
                      onClick={() => handleDelete(history[index].name)}
                      className="absolute top-0 right-0 cursor-pointer"
                    >
                      D
                    </button>
                  </>
                : // Never found: display black-and-white asset shadow
                  <>
                    <img
                      src={`./assets/sprites/${i+startIndex}.png`}
                      className="size-full object-cover brightness-0 rounded-lg"
                    />
                    <div className="absolute size-12 bg-blue-600 mix-blend-screen rounded-lg"></div>
                    <p className="absolute text-xl zfont-bold text-blue-100 opacity-40">
                      { i+startIndex }
                    </p>
                  </>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}
