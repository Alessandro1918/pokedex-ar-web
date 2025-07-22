import { FaRegEye } from "react-icons/fa"

type Props = {
  viewCount: number
}

export function EncounterViews({ viewCount }: Props) {
  return (
    <div className="flex flex-row items-center gap-1">
      <FaRegEye />
      <p>{viewCount}</p>
    </div>
  )
}
