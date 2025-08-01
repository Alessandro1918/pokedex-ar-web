export function convertImageToBase64(file: File): Promise<string> {
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
export function resizeBase64Image(base64Image: string): Promise<string> {
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
