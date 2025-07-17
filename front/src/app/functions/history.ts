export type LocalStorageItem = {
  name: string,
  date: string,
  image: string
}

export function getHistory(): LocalStorageItem[] {
  const history = localStorage.getItem("history")
  if (history) {
    return JSON.parse(history)
  } else { 
    return [] 
  }
}

export function saveHistory(name: string, imageAsBase64: string) {
  const history = getHistory()
  const index = history.findIndex((e: LocalStorageItem) => e.name == name)
  const newHistory = [...history]
  if (index == -1) {
    newHistory.push({name, date: new Date().toISOString(), image: imageAsBase64})
  } else {
    newHistory[index] = {name, date: new Date().toISOString(), image: imageAsBase64}
  }
  try {
    localStorage.setItem("history", JSON.stringify(newHistory))
  } catch (err: any) {
    if (err.name == "QuotaExceededError") {
      throw new Error("507")  // Insufficient Storage
    }
  }
}