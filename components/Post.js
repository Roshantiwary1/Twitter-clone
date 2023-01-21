import React from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';

const Post = ({post}) => {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
    {/* userimage    */}
    <img className="h-11 w-11 rounded-full cursor-pointer mr-4 hover:brightness-95" src={post.userImg} alt="user" />

    {/* right */}
    <div>
    {/* header */}
    <div className='flex items-center justify-center'>
    <div className='flex sm:space-x-2 space-x-1 items-center whitespace-nowrap'>
        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.name}</h4>
        <span className='text-sm sm:text-[14px]'>@{post.userName}-</span>
        <span className='text-sm sm:text-[14px] hover:underline'>{post.timestamp}</span>
    </div>
    <DotsHorizontalIcon className='h-10 ml-auto w-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500'/>
    </div>

    {/* post text */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post.text}</p>
    {/* post image */}
        <img className='rounded-xl mr-2' src={post.img} alt="" />
    {/* icon */}
        <div className='flex justify-between text-gray-500 p-2'>
            <ChatIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100'/>
            <TrashIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>
            <HeartIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'/>
            <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'/>
            <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'/>
        </div>
    </div>
    </div>
  )
}

export default Post