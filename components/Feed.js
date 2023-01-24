import { SparklesIcon } from "@heroicons/react/outline"
import Input from "./Input"
import Post from "./Post"
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Feed() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot((query(collection(db,"posts"),orderBy("timestamp","desc"))) , ((snapshot)=>{setPosts(snapshot.docs)}))
    return unsubscribe;
  },[])

  return (
    <div className="xl:ml-[400px] lg:ml-[250px] border-l border-r border-gray-200 xl:min-w-[650px] sm:ml-[73px] flex-grow max-w-xl w-[100%]">
      <div className="flex py-2 px-3 sticky z-99 bg-white top-0 border-b whitespace-nowrap border-gray-200">
        <h2 className="sm:text-lg xl:text-xl cursor-pointer font-bold">Home</h2>
        <div className="hoverEffect ml-auto flex items-center justify-center px-0 w-9 h-9"><SparklesIcon className="h-5"/></div>
      </div>

      <Input/>

      {posts.map((post,idx)=>(
        <Post key={idx} id={post.id} post={post} />
      ))}
      
    </div>
  )
}

export default Feed
