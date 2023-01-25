import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'
import { useRecoilState } from "recoil";
import { userState } from "../atom/UserAtom";
import { signOut, getAuth } from "firebase/auth";
import { themeState } from '../atom/ThemeAtom';
import  Image  from 'next/image';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function Input() {
  const [select] = useRecoilState(themeState)

  const [input , setInput] =useState("")
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [selectedFile,setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] =useState(false);
  const auth = getAuth();

  async function sendPost(){
    setLoading(true);
    setInput('');
    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      text: input,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      name: currentUser.name,
      username: currentUser.username,
    });

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
    <div className={`${select?"border-gray-300":"border-gray-700"} flex border-b  p-3 space-x-3 whitespace-nowrap`}>
       {currentUser && (<> <Image width="44" height="44" src={currentUser?.userImg} className="h-11 w-11 rounded-full cursor-pointer xl:mr-2 hover:brightness-95" alt=""/>
       
       <div className={`${select?"divide-gray-300":"divide-gray-800"} w-full divide-y `}>
        <div>
            <textarea value={input} onChange={(e)=>setInput(e.target.value)} className={`${select?"text-black border-none placeholder-black border-gray-300 bg-white":"text-white border-gray-900 placeholder-white bg-black"} w-full  focus:ring-0 text-lg tracking-wide min-h-[50px] `}rows="2" placeholder="What's Happening?"></textarea>
            {selectedFile && (
              <div className="relative">
              <XIcon className={`${select?"text-black":"text-white"} h-7 absolute right-1 top-1  bg-gray-700 p-1 rounded-full cursor-pointer`} onClick={()=>setSelectedFile(null)}/>
                <Image width="500" height="600" alt="img" src={selectedFile} className={`${loading && "animate-pulse"}`} />
              </div>
            )}
        </div>
        {!loading && (<><div className="flex items-center pt-2.5">
            <div className='flex'>
            <div onClick={()=>fileInputRef.current.click()}>
                <PhotographIcon className={`${select?"hover:bg-sky-200":"hover:bg-gray-700"} h-10 w-10 hoverEffect p-2 text-sky-600`}/>
                <input type="file" ref={fileInputRef} hidden onChange={addImageToPost}/>
                </div>
                <EmojiHappyIcon className={`${select?"hover:bg-sky-200":"hover:bg-gray-700"} h-10 w-10 hoverEffect p-2 text-sky-600`}/>
            </div>
            <button disabled={!input.trim()} onClick={sendPost} className={`${select?"text-black":"text-white"} ml-auto bg-blue-500  px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-60`}>Tweet</button>
        </div></>)}
       </div></>)}
    </div>
  )
}

export default Input
