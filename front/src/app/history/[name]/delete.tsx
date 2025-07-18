"use client"

export function Delete() {

  function handleDelete() {
    if (confirm("Are you sure you want to delete this record?")) {
      console.log("Delete")
    }
  }

  return (
    <button 
      className="absolute right-4 top-4 cursor-pointer" 
      onClick={() => handleDelete()}
    >
      Delete
    </button>
  )
}
