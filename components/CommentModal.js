import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/ModalAtom";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { userState } from "../atom/UserAtom";
import { themeState } from '../atom/ThemeAtom';
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import Image from 'next/image';
export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [ ] = useRecoilState(userState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const router = useRouter();
  const [currentUser] = useRecoilState(userState);

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId]);


  async function sendComment() {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: currentUser.name,
      username: currentUser.username,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  const [select] = useRecoilState(themeState)

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className={`${select?"bg-white text-black  border-gray-300":"bg-black text-white  border-gray-700"} max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] border-2 rounded-xl shadow-md`}
        >
          <div className="p-1">
            <div className={`${select?"border-b border-gray-300":"border-b border-gray-800"}  py-2 px-1.5`}>
              <div
                onClick={() => setOpen(false)}
                className={`${select?"hover:bg-gray-200":"hover:bg-gray-800"} hoverEffect w-10 h-10 flex items-center  justify-center`}
              >
                <XIcon className={`${select?"text-black":"text-white"} h-[23px]  p-0`} />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative whitespace-nowrap">
              <span className="w-0.5 h-full z-[-1] absolute xs:left-7 sm:left-9 top-11 bg-gray-300" />
              <Image
              width="44" height="44"
                className="sm:h-11 sm:w-11 xs:h-8 xs:w-8 rounded-full sm:mr-4 xs:mr-1"
                src={post?.data()?.userImg}
                alt="user-img"
              />
              <h4 className="font-bold xs:text-[12px] text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm  xs:text-[12px] sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
              <span className="text-sm  xs:text-[12px] sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className={`${select?"text-black":"text-white"}  text-[15px] sm:text-[16px] ml-16 mb-2`}>
              {post?.data()?.text}
            </p>

            <div className="flex  p-3 space-x-3">
              <Image
              width="44" height="44"
              src={currentUser?.userImg}
                alt="user-img"
                className="sm:h-11 sm:w-11 xs:h-8 xs:w-8 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className={`${select?"divide-gray-300":"divide-gray-700"} w-full divide-y `}>
                <div className="">
                  <textarea
                    className={`${select?"bg-white border-none text-black placeholder-black":"bg-black placeholder-white border-gray-700 text-white"} w-full  focus:ring-0 focus:ring-gray-700 sm:text-lg xs:text-sm   tracking-wide min-h-[50px] `}
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      
                    >
                      <PhotographIcon className={`${select?"hover:bg-sky-200":" hover:bg-gray-800"} h-10 w-10 hoverEffect p-2 text-sky-500`} />
                    </div>
                    <EmojiHappyIcon className={`${select?" hover:bg-sky-200":" hover:bg-gray-800"} h-10 w-10 hoverEffect p-2 text-sky-500`} />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}