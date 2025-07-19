import gen1 from "../../../../public/data/gen1.json"
import gen2 from "../../../../public/data/gen2.json"
import { getPokemonData } from "../../functions/getPokemonData"
import { Image } from "./image"
import { Delete } from "./delete"

type Props = {
  params: Promise<{ name: string }>
}

export default async function Details({ params }: Props) {

  const { name } = await params
  const nameFormated = decodeURI(name)
  const names = [...gen1, ...gen2]
  const index = names.indexOf(nameFormated)
  // console.log(index)

  const data = await getPokemonData(index)

  return (
    <div 
      className="py-12 flex h-screen zbg-[url(/assets/backgrounds/grass.jpg)]"
      style={{backgroundImage: `url(/assets/backgrounds/${data.types[0]}.jpg)`, backgroundSize: "cover"}}
    >
      {/* opacity: */}
      <div className="absolute size-full top-0 right-0 bg-white opacity-35"></div>
      
      {/* content: */}
      <div className="z-10 flex flex-col items-center">
        <Delete name={nameFormated}/>
        <h1 className="text-4xl">{nameFormated}</h1>
        <Image name={nameFormated}/>
        <div className="mt-3 py-0.5 px-6 flex flex-row gap-3 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-gray-600 shadow-md rounded-xs">
          <h3 className="capitalize text-sm">{`#${data.id}`}</h3>
          <h3 className="capitalize text-sm">{data.type}</h3>
          <h3 className="capitalize text-sm">{`Height: ${data.height}m`}</h3>
          <h3 className="capitalize text-sm">{`Weight: ${data.weight}kg`}</h3>
        </div>
        <h2 className="mt-8 w-4/5 text-lg text-justify">
          {data.description}
        </h2>
      </div>
    </div>
  )
}
