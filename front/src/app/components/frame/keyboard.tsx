export function Keyboard() {
  return (
    <div className="p-4 h-36 flex flex-row items-center justify-between gap-2">
      <div className="size-8 rounded-full bg-radial-[at_75%_25%] from-zinc-400 to-zinc-600 to-50% border-b-2 border-b-zinc-800 border-l-2 border-l-zinc-800"></div>

      <div className="flex flex-col w-3/5 gap-4">
        <div className="flex flex-row gap-2">
          <div className="w-full h-2 rounded-full bg-red-600 border-2 border-red-800"></div>
          <div className="w-full h-2 rounded-full bg-green-600 border-2 border-green-800"></div>          
        </div>
        <div className="w-full h-20 rounded-lg bg-gradient-to-r from-green-400 via-green-300 to-green-400 border-2 border-green-800"></div>
      </div>

      <div className="relative">
        {/* Cross button shadow */}
        <div 
          className="absolute top-1 right-1 size-18 bg-zinc-800" 
          style={{clipPath: "polygon(33% 0, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)"}}
        ></div>
        {/* Cross button */}
        <div 
          className="size-18 bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-600" 
          style={{clipPath: "polygon(33% 0, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)"}}
        ></div>
        {/* Cross button center circle detail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-3/5 -translate-y-1/2 size-4 rounded-full border-2 border-zinc-800"></div>
      </div>
    </div>
  )
}
