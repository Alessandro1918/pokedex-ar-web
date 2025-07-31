import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function Screen({ children }: Props) {
  return (
    <div 
      className="m-3 p-3 pb-0 flex-1 flex flex-col h-full rounded-md bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 border-2 border-zinc-600"
      // style={{clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 94%)"}}
    >
      <div className="flex justify-center flex-1 w-full rounded-md space-y-4 overflow-auto bg-[url(/assets/home/1.jpg)] bg-cover bg-bottom">
        { children }
      </div>

      <div className="py-3 flex flex-row items-center justify-between">
          <div className="size-4 bg-red-600 border-2 border-black rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
            <div className="w-16 h-0.5 bg-zinc-800 rounded-b-4xl"></div>
          </div>
        </div>
    </div>
  )
}
