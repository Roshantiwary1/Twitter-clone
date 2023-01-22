import React, { useEffect, useState } from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import Moment from 'react-moment';
import { setDoc, doc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import {db, storage} from "../firebase"
import { useSession } from 'next-auth/react';
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { useRouter } from 'next/router';
import Image from 'next/image';
import { deleteObject, ref } from 'firebase/storage';

const Post = ({post}) => {
    console.log(post.data())
    const router = useRouter();
    const {data:session} = useSession()
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false)
   const likePost = async()=>{
    if(session){
        if(hasLiked){
        await deleteDoc(doc(db,"posts",post.id,"likes",session?.user?.uid))
    }else{
    await setDoc(doc(db,"posts",post.id,"likes",session?.user?.uid),{
        title:session?.user.name,
    })
}
    }else{
        router.push("/auth/signin")
    }
   }

   useEffect(()=>{
    const unsubscribe=onSnapshot((collection(db,"posts",post.id,"likes")),(snapshot)=>setLikes(snapshot.docs));
    return unsubscribe;
   },[post.id])

   useEffect(()=>{
    setHasLiked(likes.findIndex((like)=>(like.id===session?.user.uid))!== -1 )
   },[likes,session?.user.uid])

   async function deletePost(){
   if(confirm("are you sure to delete?")){
    await deleteDoc(doc(db,"posts",post.id))
    if(post.data().image){
     await deleteObject(ref(storage,`posts/${post.id}/image`))
    }
   }
   }
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
    {/* userimage    */}
    <Image height="44" width="44" className="h-11 w-11 rounded-full cursor-pointer mr-4 mt-2 hover:brightness-95" src={post.data().userImg} alt="user" />

    {/* right */}
    <div>
    {/* header */}
    <div className='flex items-center justify-center'>
    <div className='flex sm:space-x-2 space-x-1 items-center whitespace-nowrap'>
        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data().name}</h4>
        <span className='text-sm sm:text-[14px]'>@{post?.data().username}-</span>
        <span className='text-sm sm:text-[14px] hover:underline'><Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></span>
    </div>
    <DotsHorizontalIcon className='h-10 ml-auto w-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500'/>
    </div>

    {/* post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post?.data()?.text}</p>
    {/* post image */}
    <div className='flex items-center mr-8'>
    {post.data().image && (
         <Image height="650" width="550" className='rounded-xl mr-2' src={post?.data()?.image} alt="" />
    )}
        </div>
    {/* icon */}
        <div className='flex justify-between text-gray-500 p-2'>
            <ChatIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>

            {session?.user.uid===post?.data().id && (
        <TrashIcon onClick={deletePost} className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>
            )}
    <div className='flex items-center'>
    {hasLiked?(<HeartIconFilled onClick={likePost} className='text-red-600 h-9 w-9 hoverEffect p-2 hover:text-red-600 '/>):(<HeartIcon onClick={likePost} className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>)}
    <span className={`${hasLiked && "text-red-600"} text-sm`}>{likes.length>0 ? likes.length :""}</span>
    </div>
            <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'/>
            <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'/>
        </div>
    </div>
    </div>
  )
}

export default Post