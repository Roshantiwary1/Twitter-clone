
import Input from "./Input"
import Post from "./Post"
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Radio from './Radio';
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
import Hamburger from "./Hamburger";

function Feed() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot((query(collection(db,"posts"),orderBy("timestamp","desc"))) , ((snapshot)=>{setPosts(snapshot.docs)}))
    return unsubscribe;
  },[])
  const [select] = useRecoilState(themeState)

  return (
    <div className={`${select?"border-gray-300":"border-gray-800"} xl:ml-[400px] lg:ml-[250px] border-l border-r  xl:min-w-[650px] sm:ml-[73px] flex-grow max-w-xl w-[100%]`}>
      <div className={`${select?"bg-white border-gray-300":"bg-black border-gray-700"} flex py-2 px-3 sticky z-99  top-0 border-b whitespace-nowrap `}>
        <h2 className={`${select?"text-black":"text-white "}sm:text-lg xs:hidden sm:block xl:text-xl cursor-pointer font-bold`}>Home</h2>
        <Hamburger/>
        <div className="ml-auto mr-7 flex items-center xs:text-sm xs:items-start justify-center w-9 h-9"><Radio/></div>
      </div>

      <Input/>

      {posts.map((post,idx)=>(
        <Post key={idx} id={post.id} post={post} />
      ))}
      
    </div>
  )
}

export default Feed
