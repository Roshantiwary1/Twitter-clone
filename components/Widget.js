import { SearchIcon } from "@heroicons/react/outline"
import { useState } from "react"
import News from "./News"
import User from "./User";
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
function Widget({newsResult,randomUser}) {
   const [select] = useRecoilState(themeState)

    const [NewsItem,setNewsItem]=useState(3);
    const [userItem,setUserItem]=useState(3);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
     <div className={`${select?"bg-white":"bg-black"} w-[90%] xl:w-[75%] sticky top-0  py-1.5 z-50`}>
        <div className={`${select?" bg-gray-500":" bg-black"} flex items-center p-3 rounded-full relative`}> 
            <SearchIcon className={`${select?"text-black":"text-white"} h-5 z-50  `}/>
            <input type="text" placeholder="Search twitter" className={`${select?"focus:bg-black border-gray-300  bg-gray-200":"focus:bg-white border-gray-700  bg-black"} absolute inset-0 rounded-full pl-11  text-white  focus:border-gray-700 focus:ring-0 focus:shadow-lg`} />
        </div>
     </div>
     <div className={`${select?"text-black bg-gray-200":"text-white bg-black"} space-y-3 rounded-xl pt-2 w-[90%] lg:w-[75%] xl:w-[75%] `}>
        <h4 className="font-bold px-4 text-lg">What&apos;s happening</h4>
     {newsResult?.slice(0,NewsItem).map((article,idx)=>(<News key={idx} article={article}/>))}
     <button className="text-blue-800 pl-6 pb-3 hover:text-blue-900" onClick={()=>(setNewsItem(NewsItem+3))}>Show More</button>
     </div>
     <div className={`${select?" bg-gray-200 text-black":" bg-black text-white "} sticky top-16 space-y-3 rounded-xl pt-2 w-[90%] lg:w-[75%] xl:w-[75%]`}>
        <h4 className="font-bold px-4 text-lg">Who To Follow</h4>
     {randomUser?.slice(0,userItem).map((user,idx)=>(<User key={idx} user={user}/>))}
     <button className="text-blue-800 pl-6 pb-3 hover:text-blue-900" onClick={()=>(setUserItem(userItem+3))}>Show More</button>
     </div>

    </div>
  )
}

export default Widget
