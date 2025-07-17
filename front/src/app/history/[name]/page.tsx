import gen1 from "../../../../public/data/gen1.json"
import gen2 from "../../../../public/data/gen2.json"
import { Image } from "./image"

type Props = {
  params: Promise<{ name: string }>
}

export default async function Details({ params }: Props) {

  const { name } = await params
  const names = [...gen1, ...gen2]
  const index = names.indexOf(decodeURI(name))
  console.log(index)

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${index+1}`
  )
  const result = await response.json()
  // console.log(result)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image name={decodeURI(name)}/>
      <h1>{`#${result.id}: ${decodeURI(name)}`}</h1>
    </div>
  )
}
