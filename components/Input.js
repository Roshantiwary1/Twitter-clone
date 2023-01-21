import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import React from 'react'
import { useSession } from 'next-auth/react'
import  Image  from 'next/image';

function Input() {
  const {data:session} = useSession();
  console.log(session);
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 whitespace-nowrap'>
       {session && (<> <Image width="44" height="44" src={session?.user?.image} className="h-11 w-11 rounded-full cursor-pointer xl:mr-2 hover:brightness-95" alt=""/>
       
       <div className='w-full divide-y divide-gray-200'>
        <div>
            <textarea className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder="'What's Happening?"></textarea>
        </div>
        <div className="flex items-center pt-2.5">
            <div className='flex'>
                <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-600 hover:bg-sky-200'/>
                <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-600 hover:bg-sky-200'/>
            </div>
            <button className='ml-auto bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50'>Tweet</button>
        </div>
       </div></>)}
    </div>
  )
}

export default Input
