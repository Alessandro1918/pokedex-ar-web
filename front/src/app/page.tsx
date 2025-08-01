"use client"
import { useRouter } from "next/navigation"
import { Header } from "./components/frame/header"
import { Screen } from "./components/frame/screen"
import { Keyboard } from "./components/frame/keyboard"
import { GlassButton } from "./components/glassButton"
import { FaBinoculars, FaClock, FaChartBar } from "react-icons/fa"

export default function Home() {

  const router = useRouter()

  return (
    <div className="flex flex-col h-screen w-full mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-red-800">
      <Header />

      <Screen>
        <div className="h-full w-full flex flex-col items-center justify-center gap-8 rounded-md border-[0px] border-blue-800">
          <GlassButton
            label="ID"
            icon={<FaBinoculars className="size-6"/>}
            onClick={() => router.push("/id")}
          />

          <GlassButton 
            label="History"
            icon={<FaClock className="size-6"/>}
            onClick={() => router.push("/history")}
          />

          <GlassButton 
            label="Stats"
            icon={<FaChartBar className="size-6"/>}
            onClick={() => router.push("/stats")}
          />
        </div>
      </Screen>

      <Keyboard />
    </div>
  )
}
