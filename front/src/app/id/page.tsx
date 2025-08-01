"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoCameraOutline } from "react-icons/io5"
import { GrGallery } from "react-icons/gr"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { TfiReload } from "react-icons/tfi"
import { saveHistory } from "../functions/history"
import { convertImageToBase64, resizeBase64Image } from "../functions/base64"
import { Header } from "../components/frame/header"
import { Screen } from "../components/frame/screen"
import { Keyboard } from "../components/frame/keyboard"
import { GlassButton } from "../components/glassButton"

type PredictionResponse = {
  prediction: {
    label: string,
    accuracy: number
  }
}

export default function Id() {

  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const [ selectedFile, setSelectedFile ] = useState<string>()
  const [ isLoading, setIsLoading ] = useState(false)

  async function handleSubmit() {
    setIsLoading(true)
    try {
      if (
        !inputRef.current || 
        !inputRef.current.files || 
        !inputRef.current.files[0]
      ) {
        throw new Error("400")  // Bad request
      }
      const file = inputRef.current.files[0]
      // console.log(`file size: ${Math.floor(file.size / 1024)} kB`)
      const form = new FormData()
      form.append("file", file)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/id`,
        {
          method: 'POST',
          // headers: { 'Content-Type': 'multipart/form-data', }, // fetch will set this
          body: form,
        }
      )
      if (response.status != 200) {
        console.log(response.status)
        throw new Error(String(response.status))
      }
      const result: PredictionResponse = await response.json()
      const label = result.prediction.label
      // const accuracy = (100 * result.prediction.accuracy).toFixed(2)
      // console.log(`${label} (${accuracy}%)`)

      const imageAsBase64 = await convertImageToBase64(file)
      // console.log(`base64 size: ${Math.floor(Math.ceil(imageAsBase64.length / 4) * 3 / 1024)} kB`)
      const resizedImageAsBase64 = await resizeBase64Image(imageAsBase64)
      // console.log(`resized base64 size: ${Math.floor(Math.ceil(resizedImageAsBase64.length / 4) * 3 / 1024)} kB`)
      saveHistory(label, resizedImageAsBase64)
      router.push(`/history/${label}`)
    } catch (err: any) {
      switch (err.message) {
        case "400": alert("Error: No file"); break;
        case "404": alert("Error: Pokemon not found"); break;
        case "507": alert("Error: No localStorage space available"); break;
        default: alert("Error: Internal server error")
      }
    }
    setIsLoading(false)
  }

  function handleInputFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      !e.target.files || 
      !e.target.files[0]
    ) return
    const file = e.target.files[0]
    setSelectedFile(URL.createObjectURL(file))
  }

  return (
    <div className="flex flex-col h-screen w-full mx-auto max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-gradient-to-r from-red-600 via-red-400 to-red-600 border-2 border-red-800">
      <Header />

      <Screen>
        <div className="h-full w-full flex items-center justify-center rounded-md zborder-2 zborder-blue-800">
          <input 
            hidden
            type="file"
            ref={inputRef}  
            // accept="image/png, image/jpg, image/jpeg" 
            capture
            onChange={handleInputFileChange}
          />

          <input 
            hidden
            type="file" 
            ref={inputRef}
            accept="image/png, image/jpg, image/jpeg" 
            // capture
            onChange={handleInputFileChange}
          />

          {
            selectedFile 
            ?
            <div className="flex flex-col items-center gap-4">
              <img 
                src={selectedFile}
                className="size-24 aspect-square object-cover bg-gray-300"
              />

              <GlassButton
                label="ID"
                icon={<FaMagnifyingGlass className="size-6"/>}
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
              />

              <GlassButton 
                label="Try again"
                icon={<TfiReload className="size-7"/>}
                onClick={() => setSelectedFile("")}
                disabled={isLoading}
                isLoading={false}
              />
            </div>
            :
            <div className="flex flex-col items-center gap-16">
              <GlassButton 
                label="Camera"
                icon={<IoCameraOutline className="size-7"/>}
                onClick={() => inputRef.current?.click()}
              />

              <GlassButton 
                label="Gallery"
                icon={<GrGallery className="size-6"/>}
                onClick={() => inputRef.current?.click()}
              />
            </div>
          }
        </div>
      </Screen>

      <Keyboard />
    </div>
  )
}