import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'
import { useRecoilState } from "recoil";
import { userState } from "../atom/UserAtom";
import { signOut, getAuth } from "firebase/auth";
import  Image  from 'next/image';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function Input() {
  const [input , setInput] =useState("")
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [selectedFile,setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] =useState(false);
  const auth = getAuth();

  async function sendPost(){
    setLoading(true);
    setInput('');
    const docRef = await addDoc(collection(db,"posts"),{
      id: currentUser.uid,
     text:input,
     userImg:currentUser.image,
     timestamp:serverTimestamp(),
     name:currentUser.name,
     username:currentUser.username,
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setSelectedFile(null);
    setLoading(false)
  };
    
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 whitespace-nowrap'>
       {currentUser && (<> <Image width="44" height="44" src={currentUser?.userImg} className="h-11 w-11 rounded-full cursor-pointer xl:mr-2 hover:brightness-95" alt=""/>
       
       <div className='w-full divide-y divide-gray-200'>
        <div>
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder="What's Happening?"></textarea>
            {selectedFile && (
              <div className="relative">
              <XIcon className='h-7 absolute right-1 top-1 text-white bg-gray-700 p-1 rounded-full cursor-pointer' onClick={()=>setSelectedFile(null)}/>
                <Image width="500" height="600" alt="img" src={selectedFile} className={`${loading && "animate-pulse"}`} />
              </div>
            )}
        </div>
        {!loading && (<><div className="flex items-center pt-2.5">
            <div className='flex'>
            <div onClick={()=>fileInputRef.current.click()}>
                <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-600 hover:bg-sky-200'/>
                <input type="file" ref={fileInputRef} hidden onChange={addImageToPost}/>
                </div>
                <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-600 hover:bg-sky-200'/>
            </div>
            <button disabled={!input.trim()} onClick={sendPost} className='ml-auto bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50'>Tweet</button>
        </div></>)}
       </div></>)}
    </div>
  )
}

export default Input
