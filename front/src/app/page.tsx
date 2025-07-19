"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { saveHistory } from "./functions/history"

type PredictionResponse = {
  prediction: {
    label: string,
    accuracy: number
  }
}

export default function Home() {

  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [ selectedFile, setSelectedFile ] = useState<string>()
  const [ result, setResult ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState(false)

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result)
        } else {
          reject(new Error("FileReader result is not a string."))
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }

  //https://kutia.net/resizing-base64-images-with-javascript-a-snap-to-scale/
  function resizeBase64Image(base64Image: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const maxSizeInKB = 50
      const maxSizeInBytes = maxSizeInKB * 1024
      const img = new Image()
      img.src = base64Image
      img.onload = function () {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const width = img.width
        const height = img.height
        const aspectRatio = width / height
        const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio)
        const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio)
        canvas.width = newWidth
        canvas.height = newHeight
        ctx!.drawImage(img, 0, 0, newWidth, newHeight)
        let quality = 0.7
        let dataURL = canvas.toDataURL("image/jpeg", quality)
        resolve(dataURL)
      }
    })
  }

  function handleInputFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    setSelectedFile(URL.createObjectURL(file))
  }

  async function handleSubmit() {
    setIsLoading(true)
    try {
      setResult(null)
      if (!inputRef.current || !inputRef.current.files || !inputRef.current.files[0]) {
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
        throw new Error(String(response.status))
      }
      const result: PredictionResponse = await response.json()
      const label = result.prediction.label
      const accuracy = (100 * result.prediction.accuracy).toFixed(2)
      setResult(`${label} (${accuracy}%)`)

      const imageAsBase64 = await convertToBase64(file)
      // console.log(`base64 size: ${Math.floor(Math.ceil(imageAsBase64.length / 4) * 3 / 1024)} kB`)
      const resizedImageAsBase64 = await resizeBase64Image(imageAsBase64)
      // console.log(`resized base64 size: ${Math.floor(Math.ceil(resizedImageAsBase64.length / 4) * 3 / 1024)} kB`)
      saveHistory(label, resizedImageAsBase64)
      router.push(`/history/${label}`)
    } catch (err: any) {
      switch (err.message) {
        case "400": setResult("Error: No file"); break;
        case "404": setResult("Error: Pokemon not found"); break;
        case "507": setResult("Error: No localStorage space available"); break;
        default: setResult("Error: Internal server error")
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-8">

      <img 
        src={selectedFile}
        className="size-24 aspect-square object-cover bg-gray-300"
      />

      <input 
        ref={inputRef} 
        type="file" 
        accept="image/png, image/jpg, image/jpeg" 
        onChange={handleInputFileChange}
      />

      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        //OBS: Visual transformation to simulate a 3D key press:
        //1. Button will have a "margin-top" and a "border-bottom";
        //2. When clicked, shrink "border-bottom" height by half, and lower the button by adding to the "margin-top" this same amount of pixels.
        className={
          `w-24 font-bold px-2 py-1 rounded-lg 
          bg-red-600 hover:bg-red-700 text-white border-red-800 cursor-pointer 
          disabled:bg-gray-400 disabled:text-gray-600 disabled:border-gray-500 disabled:cursor-default
           mt-[0px] border-b-[6px]
           disabled:active:mt-[0px] disabled:active:border-b-[6px] 
           active:mt-[3px] active:border-b-[3px]`
        }
      >
        ID
      </button>

      <button 
        onClick={() => router.push("/history")}
        disabled={isLoading}
        //OBS: Visual transformation to simulate a 3D key press:
        //1. Button will have a "margin-top" and a "border-bottom";
        //2. When clicked, shrink "border-bottom" height by half, and lower the button by adding to the "margin-top" this same amount of pixels.
        className={
          `w-24 font-bold px-2 py-1 rounded-lg 
          bg-red-600 hover:bg-red-700 text-white border-red-800 cursor-pointer 
          disabled:bg-gray-400 disabled:text-gray-600 disabled:border-gray-500 disabled:cursor-default
           mt-[0px] border-b-[6px]
           disabled:active:mt-[0px] disabled:active:border-b-[6px] 
           active:mt-[3px] active:border-b-[3px]`
        }
      >
        History
      </button>

      {
        isLoading &&
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-300 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      }

      {
        result &&
        <h1>{result}</h1>
      }
    </div>
  )
}
