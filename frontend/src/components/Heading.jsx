import "../App.css"

export function Heading({ label }) {
  return (
    <h1 className="text-4xl font-bold pt-6 text-slate-800 dark:text-white">
      <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-400 bg-clip-text text-transparent">
        {label}
      </span>
      <div className="h-1 w-16 bg-blue-500 mt-2 rounded-full"></div>
    </h1>
  )
}
