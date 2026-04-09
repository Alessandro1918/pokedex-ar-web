import Link from "next/link"
import { LocalStorageItem } from "../functions/history"

// Sprites downloaded from https://github.com/PokeAPI/sprites
// (It could work just by passing the image url instead of saving 300+ image files)
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/25.png

type Props = {
  title: string,  // "Gen 2 - Johto"
  names: string[],  // ["Chikorita", ...]
  startIndex: number  // 152 (gen 1 had 151 names)
  history: LocalStorageItem[],
  // setHistory: (history: LocalStorageItem[]) => void,
}

export function Generation({ title, names, startIndex, history }: Props) {

  return (
    <div>
      <p className="text-lg font-semibold text-blue-100">
        {title}
      </p>

      <div className="grid grid-cols-5 gap-2">
        {names.map((name: string, i: number) => {

          const index = history.findIndex((e: LocalStorageItem) => e.name == name)

          return (
            <div 
              key={i}
              className="relative flex items-center justify-center size-full aspect-square bg-slate-400 border-[1px] border-blue-800 rounded-lg"
            >
              {
                index > -1
                ? // Already found: display image from History
                  <div className="size-full">
                    <Link href={`/history/${name}`}>
                      <img
                        src={history[index].image}
                        className="size-full object-cover rounded-lg"
                      />
                    </Link>
                  </div>
                : // Never found: display black-and-white asset shadow
                  <>
                    <img
                      src={`/assets/sprites/${i+startIndex}.png`}
                      // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+startIndex}.png`}
                      className="size-full object-cover rounded-lg brightness-0"
                    />
                    <div className="absolute size-full bg-blue-600 mix-blend-screen rounded-lg"></div>
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
