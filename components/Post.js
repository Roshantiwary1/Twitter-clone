import React, { useEffect, useState } from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import Moment from 'react-moment';
import { setDoc, doc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import {db, storage} from "../firebase"
import { userState } from "../atom/UserAtom"; 
import { themeState } from '../atom/ThemeAtom';  
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { useRouter } from 'next/router';
import Image from 'next/image';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/ModalAtom';

const Post = ({post,id}) => {
    const [open,setOpen] = useRecoilState(modalState)
    const [postId,setPostId] = useRecoilState(postIdState)
    const router = useRouter();
    const [currentUser] = useRecoilState(userState);
    const [likes,setLikes] = useState([]);
    const [comments,setComments] = useState([]);
    const [hasLiked,setHasLiked] = useState(false)
    const [select] = useRecoilState(themeState)

   const likePost = async()=>{
    if(currentUser){
        if(hasLiked){
        await deleteDoc(doc(db,"posts",id,"likes",currentUser?.uid))
    }else{
    await setDoc(doc(db,"posts",id,"likes",currentUser?.uid),{
        title:currentUser?.name,
    })
}
    }else{
        router.push("/auth/signin")
    }
   }

   useEffect(()=>{
    const unsubscribe=onSnapshot((collection(db,"posts",id,"likes")),(snapshot)=>setLikes(snapshot.docs));
    return unsubscribe;
   },[id])

   useEffect(()=>{
    const unsubscribe=onSnapshot((collection(db,"posts",id,"comments")),(snapshot)=>setComments(snapshot.docs));
    return unsubscribe;
   },[id])

   useEffect(()=>{
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);

   async function deletePost(){
   if(confirm("are you sure to delete?")){
    await deleteDoc(doc(db,"posts",id))
    if(post.data().image){
     await deleteObject(ref(storage,`posts/${id}/image`))
    }
   }
   }
  return (
    <div className={`${select?"border-gray-300":"border-gray-800"} flex p-3 cursor-pointer border-b xs:p-0`}>
    {/* userimage    */}
    <Image height="44" width="44" className="md:h-11 md:w-11 xs:h-8 xs:w-8 rounded-full cursor-pointer md:mr-4 mt-2 xs:mr-1 hover:brightness-95" src={post?.data()?.userImg} alt="user" />

    {/* right */}
    <div className='flex-1'>
    {/* header */}
    <div className='flex items-center justify-center '>
    <div className='flex sm:space-x-2 space-x-1 items-center whitespace-nowrap'>
        <h4 className='font-bold text-[15px] sm:text-[16px] xs:text-[12px] hover:underline'>{post?.data().name}</h4>
        <span className='text-sm sm:text-[14px] xs:text-[12px]'>@{post?.data().username}-</span>
        <span className='text-sm sm:text-[14px] hover:underline xs:text-[12px]'><Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></span>
    </div>
    <DotsHorizontalIcon className='md:h-10 ml-auto md:w-10 p-2 hoverEffect hover:bg-gray-700 hover:text-sky-500 xs:h-8 xs:w-8'/>
    </div>

    {/* post text */}
        <p className={`${select?"text-black":"text-white"} ' text-[15px] sm:text-[16px] mb-2`}>{post?.data()?.text}</p>
    {/* post image */}
    <div className='flex items-center mr-8'>
    {post?.data()?.image && (
         <Image height="650" width="550" className='rounded-xl mr-2' src={post?.data()?.image} alt="" />
    )}
        </div>
    {/* icon */}
        <div className={`${select?"text-black":"text-white"} flex justify-between p-2`}>
        <div className="flex items-center">
            <ChatIcon onClick={()=>{
                if(!currentUser){
                    router.push('/auth/signin')
                }else{
                setOpen(!open);setPostId(id)}}} className={`${select?"hover:bg-sky-200 hover:text-blue-500":"hover:bg-gray-700 hover:text-blue-500"} h-9 w-9 hoverEffect p-2 `}/>
                 <span className= {`${select?"text-black ":"text-white"} "text-sm"`}>{comments.length>0 ? comments.length :""}</span>
        </div>
            
            {currentUser?.uid===post?.data().id && (
        <TrashIcon onClick={deletePost} className=' h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-200 '/>
            )}
    <div className='flex items-center'>
    {hasLiked?(<HeartIconFilled onClick={likePost} className='text-red-600 h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-200 '/>):(<HeartIcon onClick={likePost} className={`${select?"hover:bg-red-200":"hover:bg-gray-700"}h-9 w-9 hoverEffect p-2 hover:text-red-600  `}/>)}
    <span className={`${hasLiked && "text-red-600"} text-sm`}>{likes.length>0 ? likes.length :""}</span>
    </div>
            <ShareIcon className={`${select?"hover:bg-sky-200 hover:text-blue-500":"hover:bg-gray-700 hover:text-blue-500"} h-9 w-9 hoverEffect p-2 `}/>
            <ChartBarIcon className={`${select?"hover:bg-sky-200 hover:text-blue-500":"hover:bg-gray-700 hover:text-blue-500"} h-9 w-9 hoverEffect p-2 `}/>
        </div>
    </div>
    </div>
  )
}

export default Post