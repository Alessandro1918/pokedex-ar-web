"use client"
import { useRouter } from "next/navigation"
import { getHistory, LocalStorageItem } from "../../functions/history"

type Props = {
  name: string
}

export function Delete({ name }: Props) {

  const router = useRouter()

  function handleDelete(name: string) {
    const history = getHistory()
    const newHistory = [...history]
    const index = newHistory.findIndex((e: LocalStorageItem) => e.name == name)
    newHistory.splice(index, 1)
    localStorage.setItem("history", JSON.stringify(newHistory))
  }

  function handleClick() {
    if (confirm("Are you sure you want to delete this record?")) {
      console.log("Delete")
      handleDelete(name)
      router.push("/")
    }
  }

  return (
    <button 
      className="absolute right-4 top-4 cursor-pointer" 
      onClick={() => handleClick()}
    >
      Delete
    </button>
  )
}
