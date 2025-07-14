import { LocalStorageItem } from "../page"

type Props = {
  history: LocalStorageItem[]
  handleDelete(name: string): void
}

export function History({ history, handleDelete }: Props) {

  const gen1 = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]

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
    <div className="grid grid-cols-5 gap-2 h-96 overflow-auto">

      {gen1.map((name: string, i: number) => {

        const index = history.findIndex((e: LocalStorageItem) => e.name == name)

        return (
          <div 
            key={i}
            className="relative flex items-center justify-center size-12 bg-slate-400 rounded-lg"
          >
            {/* {
              index && index > -1
              ? <p className="absolute text-green-700">{i+1}</p>
              : <p className="absolute text-red-600">{i+1}</p>
            } */}
            {
              index && index > -1
              ?
                <>
                  <img
                    src={history[index].image}
                    className="rounded-lg"
                  />
                  <button 
                    onClick={() => handleDelete(history[index].image)}
                    className="absolute top-0 right-0 cursor-pointer"
                  >
                    D
                  </button>
                </>
              :
                <>
                  <img
                    src={`./assets/sprites/${i+1}.png`}
                    className="size-full object-cover brightness-0 rounded-lg"
                  />
                  <div className="absolute size-12 bg-blue-600 mix-blend-screen rounded-lg"></div>
                  <p className="absolute text-xl zfont-bold text-blue-100 opacity-40">
                    {i+1}
                  </p>
                </>
            }
          </div>
        )
      })}
    </div>
  )
}