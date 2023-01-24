import Image  from 'next/image';
import SidebarMenuItem from './SidebarMenuItem';
import { HomeIcon} from "@heroicons/react/solid"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../atom/UserAtom";
import { useRouter } from 'next/router'
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon,} from "@heroicons/react/outline";
   
    
    const Sidebar = () => {
      const router = useRouter();
      const [currentUser, setCurrentUser] = useRecoilState(userState);
      console.log(currentUser);
      const auth = getAuth();
      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const fetchUser = async () => {
              const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setCurrentUser(docSnap.data());
              }
            };
            fetchUser();
          }
        });
      }, [auth,setCurrentUser]);
    
      function onSignOut() {
        signOut(auth);
        setCurrentUser(null);
      }

      function logOut() {
        signOut(auth);
        setCurrentUser(null);
      }
      return (
        <div className='hidden sm:flex flex-col p-2 lg:items-start fixed h-full xl:ml-24'>
        {/* twitter logo */}
        <div className='hoverEffect hover:bg-blue-200 p-0'>
        <Image src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" width="50" height="50" alt="logo"></Image>
        </div>
        {/* menu */}
        <div className='mt-4 mb-2.5 '>
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {currentUser && (
          <><SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} /></>
        )}
        </div>
        {/* button  */}
        {currentUser && <button onClick={logOut} className='text-white rounded-full bg-blue-500 w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline '>Logout</button>}
        {!currentUser && <button onClick={()=>router.push("/auth/signin")} className='text-white rounded-full bg-blue-500 w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline '>Signin</button>}
        {/* profile */}
       {currentUser && ( <div className='hoverEffect text-gray-700 flex items-center mt-auto '>
            <Image height="40" width="40"  src={currentUser?.userImg} className="rounded-full xl:mr-2" alt="user"/>
            <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold'>{currentUser?.name}</h4>
                <p className='text-gray-500'>@{currentUser?.username}</p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>)}
    </div>
  )
}

export default Sidebar