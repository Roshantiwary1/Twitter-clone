import { SparklesIcon } from "@heroicons/react/outline"
import Input from "./Input"

function Feed() {
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky z-99 bg-white top-0 border-b border-gray-200">
        <h2 className="sm:text-lg xl:text-xl cursor-pointer font-bold">Home</h2>
        <div className="hoverEffect ml-auto flex items-center justify-center px-0 w-9 h-9"><SparklesIcon className="h-5"/></div>
      </div>

      <Input/>
    </div>
  )
}

export default Feed
