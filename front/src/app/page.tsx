"use client"
import { useState, useRef } from "react"
import axios from "axios"

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [ selectedFile, setSelectedFile ] = useState<string>()

  function handleFileChange(e: any) {
    setSelectedFile(URL.createObjectURL(e.target.files[0]))
  }

  async function handleSubmit() {
    const form = new FormData()
    const file = inputRef.current?.files ? inputRef.current.files[0] : "-"
    form.append("file", file)
    axios.post('http://localhost:5001/eval', form)
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
        accept="image/png, image/jpg" 
        onChange={handleFileChange}
      />

      <button onClick={handleSubmit}>Eval</button>
    </div>
  )
}
