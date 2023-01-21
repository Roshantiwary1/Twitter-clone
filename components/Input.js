import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import React from 'react'

function Input() {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 whitespace-nowrap'>
       <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80" className="h-11 w-11 rounded-full cursor-pointer xl:mr-2 hover:brightness-95" alt="user"/>
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
       </div>
    </div>
  )
}

export default Input
