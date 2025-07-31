import { ReactNode } from "react"
import Link from "next/link"

type Props = {
  label: string,
  icon: ReactNode,
  dest: string
}

export function GlassButton({ label, icon, dest }: Props) {
  return (
    <Link 
      href={dest}
      className="w-48 py-3 rounded-lg shadow-lg bg-black/20 border border-black/25 backdrop-blur-[1px] hover:bg-black/25 hover:backdrop-blur-[2px]"
    >
      <div className="flex flex-row gap-4 text-white items-center justify-center">
        {icon}
        <span className="text-lg font-semibold">{label}</span>
      </div>
    </Link>
  )
}
