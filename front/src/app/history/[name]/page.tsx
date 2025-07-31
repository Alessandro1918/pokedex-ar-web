import gen1 from "../../../../public/data/gen1.json"
import gen2 from "../../../../public/data/gen2.json"
import { Screen } from "../../components/frame/screen"
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
    <div className="pb-6 flex h-screen w-full mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-red-800">
      <Screen>
        <div 
          className="relative flex justify-center h-full"  // dinamic background with tailwind's "bg-[url(/assets/backgrounds/grass.jpg)]" will not work
          style={{backgroundImage: `url(/assets/backgrounds/${data.types[0]}.jpg)`, backgroundSize: "cover"}}
        >
          {/* opacity: */}
          <div className="absolute size-full bg-white opacity-35"></div>
          
          {/* content: */}
          <div className="z-10 py-2 px-4 flex flex-col gap-2 items-center">
            <Delete name={nameFormated}/>

            <span className="text-4xl">{nameFormated}</span>

            <Image name={nameFormated}/>

            <div className="mt-1 py-0.5 px-12 text-xs flex flex-col bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-gray-600 shadow-md rounded-xs">
              <div className="flex flex-row gap-3 items-center justify-center">
                <span className="capitalize">{`#${data.id}`}</span>
                <span className="capitalize">{data.species}</span>
              </div>
              <div className="flex flex-row gap-3 items-center justify-center">
                <span className="capitalize">{`Height: ${data.height}m`}</span>
                <span className="capitalize">{`Weight: ${data.weight}kg`}</span>
              </div>
            </div>

            <div className="text-sm flex flex-row w-full justify-between">
              <EncounterViews viewCount={data.encounters.count}/>
              <EncounterDate name={nameFormated}/>
            </div>

            <h2 className="text-lg text-justify">
              {data.description}
            </h2>
          </div>
        </div>
      </Screen>
    </div>
  )
}
