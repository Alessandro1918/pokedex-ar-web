"use client"
import { useState, useRef } from "react"
import axios from "axios"

type PredictionProps = {
  label: string,
  accuracy: number
}

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [ selectedFile, setSelectedFile ] = useState<string>()
  const [ prediction, setPrediction ] = useState<PredictionProps>({label: "", accuracy: 0})

  function handleFileChange(e: any) {
    setSelectedFile(URL.createObjectURL(e.target.files[0]))
  }

  async function handleSubmit() {
    const form = new FormData()
    const file = inputRef.current?.files ? inputRef.current.files[0] : "-"
    form.append("file", file)
    const data = axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/id`, form)
    setPrediction((await data).data.prediction)
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-8">
      <h1>Hello, world!</h1>

      <img 
        src={selectedFile}
        className="size-24 aspect-auto bg-gray-400"
      />

      <input 
        ref={inputRef} 
        type="file" 
        accept="image/png, image/jpg, image/jpeg" 
        onChange={handleFileChange}
      />

      <button onClick={handleSubmit}>Eval</button>

      {
        prediction.accuracy > 0 &&
        <h1>{`${prediction.label} (${(100 * prediction.accuracy).toFixed(2)}%)`}</h1>
      }
    </div>
  )
}
