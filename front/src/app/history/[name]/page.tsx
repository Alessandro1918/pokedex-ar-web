import gen1 from "../../../../public/data/gen1.json"
import gen2 from "../../../../public/data/gen2.json"
import { Image } from "./image"
import { EncounterViews } from "./encounter-views"
import { EncounterDate } from "./encounter-date"
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/data/${index+1}`,
    {
      next: {
        revalidate: 60 //[s]. Obs: cache will not work on dev mode. Run with "npm run build && npm run start" 
      },
    }
  )
  const data = await response.json()

  return (
    <div 
      className="py-12 flex justify-center h-screen"  // dinamic background with tailwind's "bg-[url(/assets/backgrounds/grass.jpg)]" will not work
      style={{backgroundImage: `url(/assets/backgrounds/${data.types[0]}.jpg)`, backgroundSize: "cover"}}
    >
      {/* opacity: */}
      <div className="absolute size-full top-0 right-0 bg-white opacity-35"></div>
      
      {/* content: */}
      <div className="z-10 flex flex-col items-center">
        <Delete name={nameFormated}/>

        <h1 className="text-4xl">{nameFormated}</h1>

        <Image name={nameFormated}/>

        <div className="flex flex-col gap-3">
          <div className="mt-3 py-0.5 px-6 flex flex-row gap-3 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-gray-600 shadow-md rounded-xs">
            <h3 className="capitalize text-sm">{`#${data.id}`}</h3>
            <h3 className="capitalize text-sm">{data.species}</h3>
            <h3 className="capitalize text-sm">{`Height: ${data.height}m`}</h3>
            <h3 className="capitalize text-sm">{`Weight: ${data.weight}kg`}</h3>
          </div>
          <div className="flex flex-row justify-between">
            <EncounterViews viewCount={data.encounters.count}/>
            <EncounterDate name={nameFormated}/>
          </div>
        </div>

        <h2 className="mt-8 w-4/5 text-lg text-justify">
          {data.description}
        </h2>
      </div>
    </div>
  )
}
