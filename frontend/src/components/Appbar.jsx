import "../App.css"
import { Wallet, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export const Appbar = () => {
  const [firstName, setFirstName] = useState("")
  const [firstLetter, setFirstLetter] = useState("U")

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser?.firstName) {
          setFirstName(parsedUser.firstName)
          setFirstLetter(parsedUser.firstName[0].toUpperCase())
        }
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/signin" 
  }

  return (
    <header className="bg-white shadow-md h-14 px-6 flex items-center fixed justify-between top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-2">
        <Wallet className="text-blue-600" size={22} />
        <span className="text-lg font-semibold tracking-wide text-gray-800">
          SwiftPay
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm">Hello, {firstName || "User"}</span>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium shadow-md">
          {firstLetter}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  )
}
