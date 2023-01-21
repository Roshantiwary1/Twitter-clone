import { SearchIcon } from "@heroicons/react/outline"
import { useState } from "react"
import News from "./News"
import User from "./User";

function Widget({newsResult,randomUser}) {
    const [NewsItem,setNewsItem]=useState(3);
    const [userItem,setUserItem]=useState(3);
  return (
    <div className="xl:w-[600px] lg:w-[500px] hidden lg:inline ml-8 space-y-5">
     <div className="w-[90%] lg:w-[75%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-49">
        <div className="flex items-center p-3 rounded-full relative"> 
            <SearchIcon className="h-5 z-50 text-gray-500"/>
            <input type="text" placeholder="Search twitter" className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700  focus:bg-white bg-gray-100 focus:border-gray-700 focus:ring-0 focus:shadow-lg" />
        </div>
     </div>
     <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] lg:w-[75%] xl:w-[75%] ">
        <h4 className="font-bold px-4 text-lg">What&apos;s happening</h4>
     {newsResult.slice(0,NewsItem).map((article,idx)=>(<News key={idx} article={article}/>))}
     <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400" onClick={()=>(setNewsItem(NewsItem+3))}>Show More</button>
     </div>
     <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] lg:w-[75%] xl:w-[75%] ">
        <h4 className="font-bold px-4 text-lg">Who To Follow</h4>
     {randomUser.slice(0,userItem).map((user,idx)=>(<User key={idx} user={user}/>))}
     <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400" onClick={()=>(setUserItem(userItem+3))}>Show More</button>
     </div>

    </div>
  )
}

export default Widget
