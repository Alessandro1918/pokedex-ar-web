export function Header() {
  return (
    <div className="relative p-4 h-30 flex flex-row gap-2">
      <div className="size-20 rounded-full bg-radial-[at_75%_25%] from-blue-400 to-blue-600 to-50% border-6 border-white"></div>
      <div className="size-4 rounded-full bg-radial-[at_75%_25%] from-red-400 to-red-600 to-50% border-2 border-red-800"></div>
      <div className="size-4 rounded-full bg-radial-[at_75%_25%] from-yellow-400 to-yellow-600 to-50% border-2 border-yellow-800"></div>
      <div className="size-4 rounded-full bg-radial-[at_75%_25%] from-green-400 to-green-600 to-50% border-2 border-green-800"></div>
      <div 
        className="absolute top-1/3 bottom-0 right-0 left-0 w-full bg-gradient-to-bl from-red-800 via-red-600 to-red-800" 
        style={{clipPath: "polygon(0% 90%, 40% 90%, 60% 0%, 100% 0%, 100% 10%, 100% 10%, 60% 10%, 40% 100%, 0% 100%)"}}
      ></div>
    </div>
  )
}
